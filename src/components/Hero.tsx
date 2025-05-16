
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSpring, animated } from '@react-spring/web';

type SlideData = {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    imageSrc: 'https://shorturl.at/Q2a17',
    title: 'Industrial Steam Boilers',
    subtitle: 'High-efficiency industrial steam boilers for all your manufacturing needs'
  },
  {
    id: 2,
    imageSrc: 'https://api.deepai.org/job-view-file/a7ac6d1a-08a1-489a-99f6-185d077a109c/outputs/output.jpg',
    title: 'Hot Water Generators',
    subtitle: 'Reliable hot water generators for residential and commercial applications'
  },
  {
    id: 3,
    imageSrc: '/lovable-uploads/968e9c7f-6872-4c43-ad59-1dd92c92d29a.png',
    title: 'Boiler Systems',
    subtitle: 'Complete boiler systems with state-of-the-art technology and safety features'
  },
  {
    id: 4,
    imageSrc: '/lovable-uploads/ac22646b-1aa2-41fc-8799-5ece999eabac.png', 
    title: 'Thermic Fluid Heaters',
    subtitle: 'Efficient thermic fluid heating solutions for industrial processes'
  },
  {
    id: 5,
    imageSrc: '/lovable-uploads/b4c6f3a5-3500-43ad-97e1-e69041317e64.png', 
    title: 'Bath Heaters',
    subtitle: 'Premium bath heaters with advanced temperature control'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const parallaxProps = useSpring({
    transform: `translateY(${scrollY * 0.3}px)`,
    config: { mass: 1, tension: 120, friction: 14 }
  });
  
  const textFloatProps = useSpring({
    transform: `translateY(${-scrollY * 0.2}px)`,
    config: { mass: 1, tension: 120, friction: 14 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollPos = Math.max(0, -rect.top);
        setScrollY(scrollPos);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1500 ease-in-out',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <animated.div 
            style={{
              backgroundImage: `url(${slide.imageSrc})`,
              filter: 'contrast(1.1) brightness(0.9)',
              transform: currentSlide === index ? parallaxProps.transform : 'none'
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
          />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-20">
            <animated.div style={currentSlide === index ? textFloatProps : {}}>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white max-w-5xl leading-tight mb-4",
                  "transition-all duration-700 transform",
                  "text-shadow-lg",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.7)'
                }}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl text-white max-w-2xl mb-8",
                  "transition-all duration-700 delay-300 transform",
                  "text-shadow-md",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              >
                {slide.subtitle}
              </p>
              <div 
                className={cn(
                  "transition-all duration-700 delay-500 transform",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
              >
                <Link 
                  to="/booking" 
                  className="btn-primary text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-110"
                >
                  Book Your Boiler
                </Link>
              </div>
            </animated.div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300 transform',
              currentSlide === index 
                ? 'bg-white scale-150 shadow-glow' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-125'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <animated.div 
        style={useSpring({
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
          delay: 800,
          config: { tension: 120, friction: 14 }
        })}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/70 flex items-start justify-center hover:border-white hover:shadow-glow transition-all duration-300">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[slide-down_1.5s_ease-in-out_infinite]" />
        </div>
      </animated.div>
    </div>
  );
};

export default Hero;
