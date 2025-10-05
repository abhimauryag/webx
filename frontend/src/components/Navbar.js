import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
            data-testid="navbar-logo"
          >
            Web X Media
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : isScrolled
                    ? 'text-gray-700 hover:text-primary'
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/services" data-testid="navbar-cta-btn">
              <Button className="btn-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                } ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              ></span>
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                } ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              ></span>
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                } ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                className={`block text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : isScrolled
                    ? 'text-gray-700 hover:text-primary'
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="mobile-cta-btn"
            >
              <Button className="btn-primary w-full mt-4">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;