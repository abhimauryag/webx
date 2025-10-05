import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Users,
  Award,
  Target,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe
} from 'lucide-react';

const About = () => {
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

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Clients", color: "text-blue-500" },
    { icon: <Award className="w-8 h-8" />, number: "1200+", label: "Projects Completed", color: "text-green-500" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "98%", label: "Client Satisfaction", color: "text-purple-500" },
    { icon: <Globe className="w-8 h-8" />, number: "50+", label: "Cities Served", color: "text-orange-500" }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Excellence",
      description: "We strive for perfection in every project, delivering solutions that exceed expectations and drive real business results."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Client-Centric",
      description: "Your success is our success. We listen, understand, and tailor our solutions to meet your unique business needs."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Innovation",
      description: "We stay ahead of the curve, using cutting-edge technologies and creative approaches to solve complex challenges."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Integrity",
      description: "Transparency, honesty, and ethical practices are at the core of everything we do. We build trust through our actions."
    }
  ];

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1758599543120-4e462429a4d7",
      bio: "8+ years of experience in web development and digital strategy. Passionate about helping businesses grow online."
    },
    {
      name: "Priya Singh",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1666698809123-44e998e93f23",
      bio: "Creative director with expertise in UI/UX design and brand identity. Loves creating beautiful, functional designs."
    },
    {
      name: "Amit Kumar",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1758876022213-fbf6e54ad52e",
      bio: "Full-stack developer specializing in modern web technologies. Committed to writing clean, efficient code."
    }
  ];

  const achievements = [
    "Top-rated web design agency in Bihar",
    "500+ successful website launches",
    "98% client retention rate",
    "Featured in local business magazines",
    "Google Partner certification",
    "Award-winning digital campaigns"
  ];

  const milestones = [
    { year: "2019", title: "Company Founded", description: "Started as a small web design studio in Patna" },
    { year: "2020", title: "First 100 Clients", description: "Reached our first major milestone with 100 happy clients" },
    { year: "2022", title: "Team Expansion", description: "Grew our team to 15+ professionals" },
    { year: "2023", title: "Digital Marketing", description: "Launched comprehensive digital marketing services" },
    { year: "2024", title: "500+ Projects", description: "Completed over 500 successful projects" },
    { year: "2025", title: "Future Goals", description: "Expanding services and reaching 1000+ clients" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary via-primary-dark to-secondary text-white" data-testid="about-hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Web X Media
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Empowering businesses across Bihar with innovative web solutions and digital marketing strategies that drive growth and success.
              </p>
              <Link to="/contact" data-testid="about-hero-cta">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  Let's Work Together
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="animate-fadeInRight">
              <img 
                src="https://images.unsplash.com/photo-1666698809123-44e998e93f23" 
                alt="Web X Media Team"
                className="w-full h-auto rounded-xl shadow-2xl"
                data-testid="about-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center fade-in-element"
                data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className={`${stat.color} mb-4 flex justify-center`}>{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-gray-50" data-testid="story-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-element">
              <img 
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab" 
                alt="Our Office"
                className="w-full h-auto rounded-xl shadow-lg"
                data-testid="story-image"
              />
            </div>
            <div className="fade-in-element">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2019 in the heart of Patna, Bihar, Web X Media started with a simple mission: 
                to help local businesses establish a strong online presence and compete in the digital world.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a small web design studio has grown into a full-service digital agency, 
                serving clients across Bihar and beyond. We've helped hundreds of businesses transform 
                their digital presence and achieve remarkable growth.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we're proud to be recognized as one of Bihar's leading digital agencies, 
                known for our innovative solutions, exceptional customer service, and commitment to client success.
              </p>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start" data-testid={`achievement-${index}`}>
                    <CheckCircle className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white" data-testid="values-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our clients and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="text-center fade-in-element group hover:shadow-lg p-6 rounded-xl transition-all duration-300"
                data-testid={`value-${value.title.toLowerCase()}`}
              >
                <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-gray-50" data-testid="timeline-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming Bihar's trusted digital partner.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block"></div>
              
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center mb-12 fade-in-element ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  data-testid={`milestone-${index}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hidden md:flex">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-white" data-testid="team-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to bringing your digital vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="text-center fade-in-element group"
                data-testid={`team-member-${index}`}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-primary font-medium mb-4">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white" data-testid="about-cta">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of satisfied clients who have transformed their businesses with our help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" data-testid="about-cta-contact">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  Get In Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services" data-testid="about-cta-services">
                <Button className="btn-secondary text-lg px-8 py-4">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;