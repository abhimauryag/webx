import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'Web Design',
    'E-commerce Development', 
    'SEO Optimization',
    'Digital Marketing',
    'Brand Identity',
    'Content Marketing'
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-primary"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2" data-testid="footer-company-info">
            <h3 className="text-3xl font-bold mb-4 text-white">Web X Media</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We are a full-service web design and digital marketing agency based in Patna, Bihar. 
              We help businesses grow online with stunning websites and effective marketing strategies.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300" data-testid="footer-address">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>Patna, Bihar, India</span>
              </div>
              <div className="flex items-center text-gray-300" data-testid="footer-phone">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-300" data-testid="footer-email">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>info@webxmedia.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6" data-testid="footer-social-links">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div data-testid="footer-services">
            <h4 className="text-xl font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                    data-testid={`footer-service-${service.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-testid="footer-newsletter">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:mx-0 lg:text-left">
            <h4 className="text-xl font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest web design trends and tips.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                data-testid="newsletter-email-input"
              />
              <button 
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 font-semibold"
                data-testid="newsletter-subscribe-btn"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center" data-testid="footer-bottom">
          <p className="text-gray-400 text-sm">
            © 2025 Web X Media. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors duration-300"
            data-testid="scroll-to-top-btn"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;