
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Activities', path: '/activities' },
    { name: 'Booking', path: '/booking' },
  ];
  
  return (
    <header
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold text-accent transition-all duration-300 hover:opacity-80"
        >
          Dandeli Adventures
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium relative transition-all duration-300',
                'after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0',
                'after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300',
                'hover:after:scale-x-100 hover:after:origin-bottom-left',
                location.pathname === link.path 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-foreground/80 hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="p-2 rounded-full text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <Search size={20} />
          </button>
          <Link 
            to="/booking" 
            className="btn-primary"
          >
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-background pt-20 px-4 z-40 transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xl font-medium py-2 border-b border-border',
                location.pathname === link.path 
                  ? 'text-accent' 
                  : 'text-foreground/80'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/booking" 
            className="btn-primary text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
