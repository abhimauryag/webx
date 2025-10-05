import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Zap,
  Eye,
  Rocket,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [animationElements, setAnimationElements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const workSteps = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Consult",
      description: "We understand your business goals and target audience to create the perfect strategy."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Create",
      description: "Our expert team designs and develops stunning websites that convert visitors into customers."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch",
      description: "We launch your project and provide ongoing support to ensure your continued success."
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Clients" },
    { icon: <Award className="w-8 h-8" />, number: "1200+", label: "Projects Completed" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "98%", label: "Client Satisfaction" },
    { icon: <Zap className="w-8 h-8" />, number: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      company: "Tech Solutions India",
      text: "Web X Media transformed our online presence completely. Our website traffic increased by 300% within 3 months!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      company: "Bihar Exports Ltd",
      text: "Professional, reliable, and excellent results. They delivered exactly what we needed for our e-commerce platform.",
      rating: 5
    },
    {
      name: "Anita Gupta",
      company: "Digital Marketing Pro",
      text: "The team's creativity and technical expertise helped us achieve our digital marketing goals faster than expected.",
      rating: 5
    }
  ];

  const websiteFaqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-6 weeks depending on complexity. We provide detailed timelines during consultation."
    },
    {
      question: "Do you provide website maintenance?",
      answer: "Yes, we offer ongoing maintenance and support packages to keep your website secure and updated."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Absolutely! All our websites are fully responsive and optimized for all devices and screen sizes."
    },
    {
      question: "Can I update the website content myself?",
      answer: "Yes, we build user-friendly CMS that allows you to easily update content, images, and pages."
    }
  ];

  const marketingFaqs = [
    {
      question: "What digital marketing services do you offer?",
      answer: "We offer SEO, social media marketing, PPC advertising, content marketing, and email marketing."
    },
    {
      question: "How do you measure marketing success?",
      answer: "We track KPIs like website traffic, conversion rates, lead generation, and ROI through detailed analytics."
    },
    {
      question: "What's included in your SEO service?",
      answer: "On-page optimization, keyword research, content creation, link building, and monthly performance reports."
    },
    {
      question: "How quickly can I see marketing results?",
      answer: "SEO results typically take 3-6 months, while PPC and social media can show results within weeks."
    }
  ];

  const currentFaqs = activeTab === 'website' ? websiteFaqs : marketingFaqs;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)',
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp" data-testid="hero-title">
              Transform Your Digital Presence with 
              <span className="text-secondary block mt-2">Web X Media</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fadeInUp" data-testid="hero-subtitle">
              We create stunning websites and powerful digital marketing strategies that drive real results for businesses in Bihar and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp">
              <Link to="/services" data-testid="hero-cta-btn">
                <Button className="btn-primary text-lg px-8 py-4">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact" data-testid="hero-contact-btn">
                <Button className="btn-secondary text-lg px-8 py-4">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* How We Work Section */}
      <section className="section bg-gray-50" data-testid="how-we-work-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven 3-step process ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workSteps.map((step, index) => (
              <div 
                key={index} 
                className="text-center fade-in-element"
                data-testid={`work-step-${step.title.toLowerCase()}`}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < workSteps.length - 1 && (
                  <div className="hidden md:block mt-8">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center fade-in-element"
                data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="text-primary mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-element">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Why Choose Web X Media?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine creativity with technology to deliver exceptional digital experiences that drive business growth.
              </p>
              
              <div className="space-y-4">
                {[
                  "Custom web design tailored to your brand",
                  "Mobile-responsive and SEO-optimized",
                  "Fast loading and secure websites",
                  "Comprehensive digital marketing strategies",
                  "24/7 support and maintenance",
                  "Affordable pricing with transparent costs"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start" data-testid={`feature-${index}`}>
                    <CheckCircle className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about" data-testid="features-learn-more-btn">
                  <Button className="btn-primary">
                    Learn More About Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="fade-in-element">
              <img 
                src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506" 
                alt="Web X Media Team Working"
                className="w-full h-auto rounded-xl shadow-lg"
                data-testid="features-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg fade-in-element"
                data-testid={`testimonial-${index}`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white" data-testid="cta-section">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Let's discuss how we can help you achieve your digital goals. Get a free consultation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" data-testid="cta-contact-btn">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services" data-testid="cta-services-btn">
                <Button className="btn-secondary text-lg px-8 py-4">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white" data-testid="faq-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 fade-in-element">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('website')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'website'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-testid="faq-tab-website"
              >
                Website Development
              </button>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'marketing'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-testid="faq-tab-marketing"
              >
                Digital Marketing
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4 fade-in-element">
            {currentFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  data-testid={`faq-question-${index}`}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700" data-testid={`faq-answer-${index}`}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;