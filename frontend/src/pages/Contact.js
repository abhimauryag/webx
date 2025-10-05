import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    'Web Design & Development',
    'E-commerce Solutions',
    'SEO Optimization',
    'Digital Marketing',
    'Brand Identity Design',
    'Content Marketing',
    'Custom Solution'
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      content: "Patna, Bihar, India",
      description: "Come visit us for a face-to-face consultation"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+91 98765 43210",
      description: "Mon-Fri 9AM-6PM, Sat 9AM-3PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "info@webxmedia.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM",
      description: "Saturday: 9AM-3PM, Sunday: Closed"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary via-primary-dark to-secondary text-white" data-testid="contact-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fadeInUp">
            Ready to transform your digital presence? Let's discuss your project and create something amazing together.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section bg-white" data-testid="contact-main">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div data-testid="contact-info">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear about your project. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    data-testid={`contact-info-${info.title.toLowerCase().replace(/ /g, '-')}`}
                  >
                    <div className="text-primary mr-4 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.content}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/10 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Choose Web X Media?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    Free consultation and project estimation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    Transparent pricing with no hidden costs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    Experienced team of professionals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    Ongoing support and maintenance
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div data-testid="contact-form-container">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center" data-testid="success-message">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center" data-testid="error-message">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-red-800">Sorry, there was an error sending your message. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Your full name"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="+91 98765 43210"
                        data-testid="contact-phone-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service of Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        data-testid="contact-service-select"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      data-testid="contact-message-textarea"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-4"
                    data-testid="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="section bg-gray-50" data-testid="map-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Find Us Here
            </h2>
            <p className="text-lg text-gray-600">
              Visit our office in Patna for an in-person consultation.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.60491505754!2d85.04063127125103!3d25.596888766120232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4a5fd6d401a49519!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1672000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Web X Media Office Location"
                  data-testid="google-map"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">Web X Media Office, Patna, Bihar, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white" data-testid="contact-faq">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Quick Questions
            </h2>
            <p className="text-lg text-gray-600">
              Here are answers to some common questions we get.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div data-testid="faq-response-time">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly do you respond to inquiries?
                </h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, you can call us directly.
                </p>
              </div>
              <div data-testid="faq-consultation">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer free consultations?
                </h3>
                <p className="text-gray-600">
                  Yes! We provide free initial consultations to discuss your project requirements and provide preliminary estimates.
                </p>
              </div>
              <div data-testid="faq-timeline">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's the typical project timeline?
                </h3>
                <p className="text-gray-600">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex e-commerce sites may take 6-8 weeks.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div data-testid="faq-pricing">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do you determine pricing?
                </h3>
                <p className="text-gray-600">
                  Our pricing is based on project scope, features required, and timeline. We provide detailed, transparent quotes with no hidden fees.
                </p>
              </div>
              <div data-testid="faq-support">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-600">
                  We offer ongoing maintenance, updates, and technical support packages to keep your website running smoothly after launch.
                </p>
              </div>
              <div data-testid="faq-location">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you work with clients outside Bihar?
                </h3>
                <p className="text-gray-600">
                  Absolutely! While we're based in Patna, we serve clients across India and internationally through digital communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;