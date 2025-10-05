from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Stripe integration
stripe_api_key = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# Define Models
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = None
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: str = None
    service: str
    message: str

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    amount: float
    currency: str
    plan_type: str
    customer_email: str = None
    payment_status: str = "pending"
    status: str = "initiated"
    metadata: Dict = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CheckoutRequest(BaseModel):
    plan_type: str
    customer_email: str = None
    custom_amount: float = None

# Pricing plans
PLANS = {
    "bronze": {"amount": 50.0, "name": "Bronze Plan"},
    "silver": {"amount": 100.0, "name": "Silver Plan"},
    "gold": {"amount": 250.0, "name": "Gold Plan"}
}

# Routes
@api_router.get("/")
async def root():
    return {"message": "Web X Media API"}

@api_router.post("/contact")
async def submit_contact_form(form_data: ContactFormCreate):
    try:
        contact = ContactForm(**form_data.dict())
        await db.contact_forms.insert_one(contact.dict())
        return {"success": True, "message": "Contact form submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contact")
async def get_contact_forms():
    try:
        contacts = await db.contact_forms.find().to_list(1000)
        return [ContactForm(**contact) for contact in contacts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/checkout/session")
async def create_checkout_session(request: Request, checkout_data: CheckoutRequest):
    try:
        # Get host URL from request
        host_url = str(request.base_url).rstrip('/')
        
        # Determine amount based on plan type
        if checkout_data.plan_type == "custom":
            if not checkout_data.custom_amount or checkout_data.custom_amount <= 0:
                raise HTTPException(status_code=400, detail="Invalid custom amount")
            amount = float(checkout_data.custom_amount)
            plan_name = f"Custom Plan - ${amount}"
        elif checkout_data.plan_type in PLANS:
            amount = PLANS[checkout_data.plan_type]["amount"]
            plan_name = PLANS[checkout_data.plan_type]["name"]
        else:
            raise HTTPException(status_code=400, detail="Invalid plan type")
        
        # Create success and cancel URLs
        success_url = f"{host_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{host_url}/checkout/cancel"
        
        # Initialize Stripe checkout
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "plan_type": checkout_data.plan_type,
                "customer_email": checkout_data.customer_email or "",
                "plan_name": plan_name
            }
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store payment transaction
        transaction = PaymentTransaction(
            session_id=session.session_id,
            amount=amount,
            currency="usd",
            plan_type=checkout_data.plan_type,
            customer_email=checkout_data.customer_email,
            metadata={
                "plan_name": plan_name,
                "checkout_url": session.url
            }
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        return {"url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        logging.error(f"Checkout session creation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str):
    try:
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
        
        # Get status from Stripe
        status_response: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update our database
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        if transaction:
            update_data = {
                "payment_status": status_response.payment_status,
                "status": status_response.status,
                "updated_at": datetime.now(timezone.utc)
            }
            
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": update_data}
            )
        
        return {
            "status": status_response.status,
            "payment_status": status_response.payment_status,
            "amount_total": status_response.amount_total,
            "currency": status_response.currency,
            "metadata": status_response.metadata
        }
        
    except Exception as e:
        logging.error(f"Checkout status error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    try:
        body = await request.body()
        signature = request.headers.get("stripe-signature")
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Update transaction in database
        if webhook_response.session_id:
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {
                    "payment_status": webhook_response.payment_status,
                    "updated_at": datetime.now(timezone.utc)
                }}
            )
        
        return JSONResponse(content={"status": "success"}, status_code=200)
        
    except Exception as e:
        logging.error(f"Webhook error: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=400)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()