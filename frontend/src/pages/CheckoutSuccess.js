import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  CheckCircle,
  ArrowRight,
  Home,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  Loader
} from 'lucide-react';

const CheckoutSuccess = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  // Get session ID from URL
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setError('No session ID found');
      setPaymentStatus('error');
    }
  }, [sessionId]);

  const checkPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000; // 2 seconds

    if (attempts >= maxAttempts) {
      setError('Payment status check timed out. Please contact support if you were charged.');
      setPaymentStatus('error');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkout/status/${sessionId}`
      );

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      const data = await response.json();
      
      if (data.payment_status === 'paid') {
        setPaymentDetails(data);
        setPaymentStatus('success');
      } else if (data.status === 'expired') {
        setError('Payment session expired');
        setPaymentStatus('error');
      } else {
        // Continue polling if payment is still pending
        setTimeout(() => checkPaymentStatus(sessionId, attempts + 1), pollInterval);
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
      setError('Error checking payment status. Please try again.');
      setPaymentStatus('error');
    }
  };

  const nextSteps = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Check Your Email",
      description: "We've sent a confirmation email with your receipt and project details."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Project Kickoff Call",
      description: "Our team will contact you within 24 hours to schedule your project kickoff."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Project Timeline",
      description: "We'll provide a detailed project timeline and milestones during our kickoff call."
    }
  ];

  if (paymentStatus === 'checking') {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center" data-testid="payment-checking">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Checking Payment Status...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center" data-testid="payment-error">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Status Unclear</h1>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Need Help?</h3>
              <p className="text-yellow-700 mb-4">
                If you were charged but received this error, please contact us immediately with your session ID: 
                <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{sessionId}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@webxmedia.com" 
                  className="inline-flex items-center text-yellow-800 hover:text-yellow-900"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  info@webxmedia.com
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex items-center text-yellow-800 hover:text-yellow-900"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" data-testid="error-home-btn">
                <Button className="btn-primary">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link to="/contact" data-testid="error-contact-btn">
                <Button className="btn-secondary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto" data-testid="payment-success">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="success-title">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600" data-testid="success-subtitle">
              Thank you for choosing Web X Media. We're excited to work with you!
            </p>
          </div>

          {/* Payment Details */}
          {paymentDetails && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8" data-testid="payment-details">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Amount Paid</h3>
                  <p className="text-2xl font-bold text-gray-900" data-testid="paid-amount">
                    ${(paymentDetails.amount_total / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Plan</h3>
                  <p className="text-lg font-semibold text-gray-900" data-testid="plan-name">
                    {paymentDetails.metadata?.plan_name || 'Custom Plan'}
                  </p>
                </div>
                {paymentDetails.metadata?.customer_email && (
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Email</h3>
                    <p className="text-gray-900" data-testid="customer-email">
                      {paymentDetails.metadata.customer_email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8" data-testid="next-steps">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start" data-testid={`next-step-${index}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary/10 rounded-xl p-8 mb-8" data-testid="contact-info">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Questions? We're Here to Help!
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is ready to assist you throughout the project. Don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:info@webxmedia.com" 
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
                data-testid="contact-email"
              >
                <Mail className="w-5 h-5 mr-2" />
                info@webxmedia.com
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
                data-testid="contact-phone"
              >
                <Phone className="w-5 h-5 mr-2" />
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-testid="action-buttons">
            <Link to="/" data-testid="success-home-btn">
              <Button className="btn-primary text-lg px-8 py-4">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/services" data-testid="success-services-btn">
              <Button className="btn-secondary text-lg px-8 py-4">
                View Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Session ID for Reference */}
          {sessionId && (
            <div className="mt-8 text-center text-sm text-gray-500" data-testid="session-reference">
              <p>Reference ID: <span className="font-mono">{sessionId}</span></p>
              <p className="mt-1">Please save this ID for your records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;