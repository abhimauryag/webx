#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class WebXMediaAPITester:
    def __init__(self, base_url="https://sitespark.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.log_test("API Root", True, f"Status: {response.status_code}, Message: {data.get('message', 'N/A')}")
            else:
                self.log_test("API Root", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("API Root", False, f"Exception: {str(e)}")

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "service": "Web Design & Development",
            "message": "This is a test message for the contact form."
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.log_test("Contact Form Submission", True, 
                            f"Status: {response.status_code}, Success: {data.get('success', False)}")
            else:
                self.log_test("Contact Form Submission", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")

    def test_contact_form_retrieval(self):
        """Test contact form retrieval"""
        try:
            response = requests.get(f"{self.base_url}/api/contact", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.log_test("Contact Form Retrieval", True, 
                            f"Status: {response.status_code}, Forms count: {len(data) if isinstance(data, list) else 'N/A'}")
            else:
                self.log_test("Contact Form Retrieval", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Contact Form Retrieval", False, f"Exception: {str(e)}")

    def test_checkout_session_bronze(self):
        """Test checkout session creation for Bronze plan"""
        test_data = {
            "plan_type": "bronze",
            "customer_email": "test@example.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/checkout/session",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                has_url = 'url' in data and data['url']
                has_session_id = 'session_id' in data and data['session_id']
                
                if has_url and has_session_id:
                    self.log_test("Checkout Session (Bronze)", True, 
                                f"Status: {response.status_code}, URL: {data['url'][:50]}..., Session ID: {data['session_id'][:20]}...")
                    return data['session_id']
                else:
                    self.log_test("Checkout Session (Bronze)", False, 
                                "Missing URL or session_id in response", data)
            else:
                self.log_test("Checkout Session (Bronze)", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Checkout Session (Bronze)", False, f"Exception: {str(e)}")
        
        return None

    def test_checkout_session_silver(self):
        """Test checkout session creation for Silver plan"""
        test_data = {
            "plan_type": "silver",
            "customer_email": "test@example.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/checkout/session",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                has_url = 'url' in data and data['url']
                has_session_id = 'session_id' in data and data['session_id']
                
                if has_url and has_session_id:
                    self.log_test("Checkout Session (Silver)", True, 
                                f"Status: {response.status_code}, URL: {data['url'][:50]}..., Session ID: {data['session_id'][:20]}...")
                else:
                    self.log_test("Checkout Session (Silver)", False, 
                                "Missing URL or session_id in response", data)
            else:
                self.log_test("Checkout Session (Silver)", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Checkout Session (Silver)", False, f"Exception: {str(e)}")

    def test_checkout_session_gold(self):
        """Test checkout session creation for Gold plan"""
        test_data = {
            "plan_type": "gold",
            "customer_email": "test@example.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/checkout/session",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                has_url = 'url' in data and data['url']
                has_session_id = 'session_id' in data and data['session_id']
                
                if has_url and has_session_id:
                    self.log_test("Checkout Session (Gold)", True, 
                                f"Status: {response.status_code}, URL: {data['url'][:50]}..., Session ID: {data['session_id'][:20]}...")
                else:
                    self.log_test("Checkout Session (Gold)", False, 
                                "Missing URL or session_id in response", data)
            else:
                self.log_test("Checkout Session (Gold)", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Checkout Session (Gold)", False, f"Exception: {str(e)}")

    def test_checkout_session_custom(self):
        """Test checkout session creation for Custom plan"""
        test_data = {
            "plan_type": "custom",
            "customer_email": "test@example.com",
            "custom_amount": 500.0
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/checkout/session",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                has_url = 'url' in data and data['url']
                has_session_id = 'session_id' in data and data['session_id']
                
                if has_url and has_session_id:
                    self.log_test("Checkout Session (Custom)", True, 
                                f"Status: {response.status_code}, URL: {data['url'][:50]}..., Session ID: {data['session_id'][:20]}...")
                    return data['session_id']
                else:
                    self.log_test("Checkout Session (Custom)", False, 
                                "Missing URL or session_id in response", data)
            else:
                self.log_test("Checkout Session (Custom)", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Checkout Session (Custom)", False, f"Exception: {str(e)}")
        
        return None

    def test_checkout_status(self, session_id: str):
        """Test checkout status retrieval"""
        if not session_id:
            self.log_test("Checkout Status", False, "No session ID provided")
            return
            
        try:
            response = requests.get(f"{self.base_url}/api/checkout/status/{session_id}", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.log_test("Checkout Status", True, 
                            f"Status: {response.status_code}, Payment Status: {data.get('payment_status', 'N/A')}")
            else:
                self.log_test("Checkout Status", False, 
                            f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Checkout Status", False, f"Exception: {str(e)}")

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper errors"""
        try:
            response = requests.get(f"{self.base_url}/api/nonexistent", timeout=10)
            success = response.status_code == 404
            
            self.log_test("Invalid Endpoint (404)", success, 
                        f"Status: {response.status_code} (Expected 404)")
                
        except Exception as e:
            self.log_test("Invalid Endpoint (404)", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Web X Media API Tests")
        print("=" * 50)
        
        # Basic API tests
        self.test_api_root()
        
        # Contact form tests
        self.test_contact_form_submission()
        self.test_contact_form_retrieval()
        
        # Checkout session tests
        bronze_session_id = self.test_checkout_session_bronze()
        self.test_checkout_session_silver()
        self.test_checkout_session_gold()
        custom_session_id = self.test_checkout_session_custom()
        
        # Checkout status tests
        if bronze_session_id:
            self.test_checkout_status(bronze_session_id)
        
        # Error handling tests
        self.test_invalid_endpoints()
        
        # Print summary
        print("=" * 50)
        print(f"📊 Test Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = WebXMediaAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'total_tests': tester.tests_run,
                'passed_tests': tester.tests_passed,
                'failed_tests': tester.tests_run - tester.tests_passed,
                'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
                'timestamp': datetime.now().isoformat()
            },
            'detailed_results': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())