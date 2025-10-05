import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  XCircle,
  ArrowLeft,
  RefreshCw,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';

const CheckoutCancel = () => {
  const reasons = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Need More Information?",
      description: "Contact us for a detailed consultation about your project requirements.",
      action: { text: "Contact Us", link: "/contact" }
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Want to Modify Your Plan?",
      description: "Explore our different service packages to find the perfect fit for your needs.",
      action: { text: "View Plans", link: "/services" }
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Prefer to Talk First?",
      description: "Schedule a free consultation call to discuss your project in detail.",
      action: { text: "Schedule Call", link: "/contact" }
    }
  ];

  const benefits = [
    "Free initial consultation",
    "Transparent pricing with no hidden fees",
    "30-day money-back guarantee",
    "Experienced team of professionals",
    "Ongoing support and maintenance",
    "Portfolio of 500+ successful projects"
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto" data-testid="checkout-cancel">
          {/* Cancel Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="cancel-title">
              Payment Cancelled
            </h1>
            <p className="text-xl text-gray-600" data-testid="cancel-subtitle">
              No worries! Your payment was not processed. We're still here to help you succeed.
            </p>
          </div>

          {/* Why Did You Cancel? */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8" data-testid="cancel-reasons">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              How Can We Help You Move Forward?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reasons.map((reason, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                  data-testid={`cancel-reason-${index}`}
                >
                  <div className="text-primary mb-4 flex justify-center">{reason.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 mb-4">{reason.description}</p>
                  <Link to={reason.action.link}>
                    <Button className="btn-secondary w-full">
                      {reason.action.text}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8" data-testid="why-choose-us">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Why Businesses Trust Web X Media
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center" data-testid={`benefit-${index}`}>
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 mb-8" data-testid="special-offer">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                🎉 Special Offer: Free Consultation Worth $100
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Since you're considering our services, we'd like to offer you a complimentary 
                project consultation to discuss your needs and provide personalized recommendations.
              </p>
              <Link to="/contact" data-testid="free-consultation-btn">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  Claim Free Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 rounded-xl p-8 mb-8" data-testid="contact-section">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Our team is ready to answer any questions and help you choose the right solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@webxmedia.com" 
                className="flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                data-testid="contact-email-link"
              >
                <Mail className="w-5 h-5 mr-2" />
                info@webxmedia.com
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                data-testid="contact-phone-link"
              >
                <Phone className="w-5 h-5 mr-2" />
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-testid="action-buttons">
            <Link to="/services" data-testid="back-to-services-btn">
              <Button className="btn-primary text-lg px-8 py-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Services
              </Button>
            </Link>
            <Link to="/" data-testid="go-home-btn">
              <Button className="btn-secondary text-lg px-8 py-4">
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Testimonial */}
          <div className="mt-12 text-center" data-testid="testimonial-section">
            <blockquote className="text-lg italic text-gray-600 mb-4">
              "Web X Media transformed our business with their exceptional web design and digital marketing. 
              The results exceeded our expectations!"
            </blockquote>
            <cite className="text-gray-500">
              - Priya Sharma, Tech Solutions India
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;