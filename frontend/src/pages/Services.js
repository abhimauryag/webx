import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Globe,
  ShoppingCart,
  Search,
  TrendingUp,
  Palette,
  Mail,
  Check,
  ArrowRight,
  Star,
  Users,
  Clock,
  HeadphonesIcon
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Design & Development",
      description: "Custom, responsive websites that convert visitors into customers. We create stunning designs that work perfectly on all devices.",
      features: [
        "Responsive Design",
        "Custom Development",
        "SEO Optimized",
        "Fast Loading",
        "Content Management",
        "Security Features"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms that drive sales. From product catalogs to payment processing, we handle everything.",
      features: [
        "Online Store Setup",
        "Payment Gateway Integration",
        "Inventory Management",
        "Shopping Cart",
        "Order Management",
        "Multi-vendor Support"
      ],
      image: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f"
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "SEO Optimization",
      description: "Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.",
      features: [
        "Keyword Research",
        "On-page SEO",
        "Technical SEO",
        "Content Optimization",
        "Link Building",
        "Analytics & Reporting"
      ],
      image: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing campaigns that increase brand awareness and generate quality leads.",
      features: [
        "Social Media Marketing",
        "PPC Advertising",
        "Content Marketing",
        "Email Marketing",
        "Conversion Optimization",
        "Performance Tracking"
      ],
      image: "https://images.unsplash.com/photo-1666698809123-44e998e93f23"
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Brand Identity Design",
      description: "Create a memorable brand identity that sets you apart from the competition with our creative design services.",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Business Card Design",
        "Marketing Materials",
        "Social Media Graphics",
        "Brand Strategy"
      ],
      image: "https://images.unsplash.com/photo-1758876022213-fbf6e54ad52e"
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Content Marketing",
      description: "Engage your audience with high-quality content that builds trust and drives conversions across all channels.",
      features: [
        "Content Strategy",
        "Blog Writing",
        "Social Media Content",
        "Video Content",
        "Copywriting",
        "Content Distribution"
      ],
      image: "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab"
    }
  ];

  const pricingPlans = [
    {
      name: "Bronze",
      price: 50,
      period: "per project",
      description: "Perfect for small businesses getting started online",
      features: [
        "5-page responsive website",
        "Basic SEO optimization",
        "Contact form integration",
        "1 month support",
        "Mobile-friendly design",
        "Social media integration"
      ],
      popular: false,
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "Silver",
      price: 100,
      period: "per project",
      description: "Ideal for growing businesses with advanced needs",
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
      popular: true,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Gold",
      price: 250,
      period: "per project",
      description: "Complete solution for established businesses",
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
      popular: false,
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We understand your business goals, target audience, and project requirements."
    },
    {
      number: "02",
      title: "Design & Development",
      description: "Our team creates beautiful designs and develops robust, scalable solutions."
    },
    {
      number: "03",
      title: "Testing & Launch",
      description: "Thorough testing ensures everything works perfectly before we launch your project."
    },
    {
      number: "04",
      title: "Support & Growth",
      description: "Ongoing support and optimization to help your business grow and succeed online."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary via-primary-dark to-secondary text-white" data-testid="services-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fadeInUp">
            Comprehensive digital solutions to help your business thrive in the online world
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white" data-testid="services-grid">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From web design to digital marketing, we provide everything you need to succeed online
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white border border-gray-100"
                data-testid={`service-${service.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="text-primary mr-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <Check className="w-4 h-4 text-accent mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50" data-testid="process-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results every time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="text-center group"
                data-testid={`process-step-${index}`}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section bg-white" data-testid="pricing-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the plan that fits your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-primary scale-105' : 'border-gray-100 hover:border-gray-200'
                }`}
                data-testid={`pricing-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600"> {plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-center mb-8">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-accent mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/checkout?plan=${plan.name.toLowerCase()}&price=${plan.price}`}
                    data-testid={`choose-plan-${plan.name.toLowerCase()}`}
                  >
                    <Button 
                      className={`w-full ${
                        plan.popular ? 'btn-primary' : 'btn-secondary'
                      }`}
                    >
                      Choose {plan.name}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Plan */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Need Something Custom?</h3>
              <p className="text-gray-600 mb-6">
                Every business is unique. Let us create a custom solution tailored specifically to your needs and budget.
              </p>
              <Link to="/checkout?plan=custom" data-testid="custom-plan-btn">
                <Button className="btn-primary text-lg px-8">
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gray-50" data-testid="why-choose-us">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Why Businesses Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="benefit-experienced">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
              <p className="text-gray-600">5+ years of experience in web development and digital marketing</p>
            </div>
            <div className="text-center" data-testid="benefit-delivery">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-600">We deliver projects on time, every time, without compromising quality</p>
            </div>
            <div className="text-center" data-testid="benefit-support">
              <HeadphonesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock support to ensure your website runs smoothly</p>
            </div>
            <div className="text-center" data-testid="benefit-results">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Track record of delivering measurable results for our clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white" data-testid="services-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="services-contact-btn">
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/checkout?plan=custom" data-testid="services-quote-btn">
              <Button className="btn-secondary text-lg px-8 py-4">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;