import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Star,
  Clock,
  Users
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    amount: ''
  });

  // Get plan details from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const planType = searchParams.get('plan') || 'bronze';
  const planPrice = searchParams.get('price');

  const plans = {
    bronze: {
      name: "Bronze Plan",
      price: 50,
      features: [
        "5-page responsive website",
        "Basic SEO optimization",
        "Contact form integration",
        "1 month support",
        "Mobile-friendly design",
        "Social media integration"
      ],
      color: "from-amber-500 to-orange-500",
      deliveryTime: "2-3 weeks"
    },
    silver: {
      name: "Silver Plan",
      price: 100,
      features: [
        "10-page responsive website",
        "Advanced SEO optimization",
        "E-commerce functionality",
        "3 months support",
        "Custom design",
        "Analytics integration",
        "Blog setup",
        "Email marketing setup"
      ],
      color: "from-gray-400 to-gray-600",
      deliveryTime: "3-4 weeks",
      popular: true
    },
    gold: {
      name: "Gold Plan",
      price: 250,
      features: [
        "Unlimited pages",
        "Premium SEO package",
        "Full e-commerce platform",
        "6 months support",
        "Custom development",
        "Advanced integrations",
        "Performance optimization",
        "Digital marketing setup",
        "Priority support"
      ],
      color: "from-yellow-400 to-yellow-600",
      deliveryTime: "4-6 weeks"
    },
    custom: {
      name: "Custom Plan",
      price: 0,
      features: [
        "Tailored to your needs",
        "Custom functionality",
        "Unlimited revisions",
        "Extended support",
        "Premium integrations",
        "Dedicated project manager"
      ],
      color: "from-purple-500 to-indigo-600",
      deliveryTime: "Varies",
      isCustom: true
    }
  };

  const selectedPlan = plans[planType] || plans.bronze;
  const finalPrice = planPrice ? parseFloat(planPrice) : selectedPlan.price;

  useEffect(() => {
    if (selectedPlan.isCustom && !customerInfo.amount) {
      setCustomerInfo(prev => ({ ...prev, amount: '' }));
    } else if (!selectedPlan.isCustom) {
      setCustomerInfo(prev => ({ ...prev, amount: finalPrice.toString() }));
    }
  }, [selectedPlan, finalPrice]);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    // Validation
    if (!customerInfo.email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    if (selectedPlan.isCustom && (!customerInfo.amount || parseFloat(customerInfo.amount) <= 0)) {
      setError('Please enter a valid amount');
      setIsLoading(false);
      return;
    }

    try {
      const checkoutData = {
        plan_type: planType,
        customer_email: customerInfo.email,
        custom_amount: selectedPlan.isCustom ? parseFloat(customerInfo.amount) : null
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/checkout/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.detail || 'Failed to create checkout session');
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8" data-testid="checkout-header">
            <button 
              onClick={handleBack}
              className="flex items-center text-primary hover:text-primary-dark transition-colors mr-4"
              data-testid="back-to-services-btn"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8" data-testid="order-summary">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedPlan.name}</h3>
                      {selectedPlan.popular && (
                        <span className="inline-flex items-center text-xs text-primary">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {selectedPlan.isCustom ? (
                        <span className="text-lg font-bold text-gray-900">
                          ${customerInfo.amount || '0'}
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">${finalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">What's Included:</h4>
                    {selectedPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Delivery: {selectedPlan.deliveryTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      Dedicated support included
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span data-testid="total-amount">
                        ${selectedPlan.isCustom ? (customerInfo.amount || '0') : finalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-lg p-8" data-testid="checkout-form">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center" data-testid="error-message">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-red-800">{error}</span>
                  </div>
                )}

                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                      data-testid="customer-email-input"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We'll send your receipt and project updates to this email.
                    </p>
                  </div>

                  {selectedPlan.isCustom && (
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Amount (USD) *
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={customerInfo.amount}
                        onChange={handleInputChange}
                        min="1"
                        step="0.01"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your budget"
                        data-testid="custom-amount-input"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Enter the amount you'd like to pay for your custom project.
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-900 mb-1">
                          Secure Payment with Stripe
                        </h3>
                        <p className="text-sm text-blue-700">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full btn-primary text-lg py-4"
                    data-testid="proceed-to-payment-btn"
                  >
                    {isLoading ? (
                      'Processing...'
                    ) : (
                      `Proceed to Payment - $${selectedPlan.isCustom ? (customerInfo.amount || '0') : finalPrice}`
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
                    <p className="mt-1">You will be redirected to Stripe for secure payment processing.</p>
                  </div>
                </form>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 grid md:grid-cols-3 gap-6" data-testid="trust-indicators">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Money-Back Guarantee</h3>
                  <p className="text-sm text-gray-600">30-day refund policy</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
                  <p className="text-sm text-gray-600">Dedicated project team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;