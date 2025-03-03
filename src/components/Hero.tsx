
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SlideData = {
  id: number;
  videoSrc: string;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    videoSrc: 'https://player.vimeo.com/external/373895732.sd.mp4?s=6e0b20c0040fcb14bac4f7cf09eb0c8e9511fba5&profile_id=164&oauth2_token_id=57447761',
    title: 'Experience Rapids Adventure',
    subtitle: 'Navigate through thrilling white water rafting in Dandeli'
  },
  {
    id: 2,
    videoSrc: 'https://player.vimeo.com/external/434085178.sd.mp4?s=95afc62ecd5625cf9e2c0655d1f990183bbb4c52&profile_id=164&oauth2_token_id=57447761',
    title: 'Explore Kali River',
    subtitle: 'Immerse yourself in the natural beauty of Dandeli wilderness'
  },
  {
    id: 3,
    videoSrc: 'https://player.vimeo.com/external/338205352.sd.mp4?s=6af52a8c365041abee0f3965dd133496ae66d72e&profile_id=164&oauth2_token_id=57447761',
    title: 'Connect With Nature',
    subtitle: 'Experience the thrill of river adventures in Dandeli'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Longer interval for videos
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            src={slide.videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-20">
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white max-w-5xl leading-tight mb-4",
                "transition-all duration-700 transform",
                currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              {slide.title}
            </h1>
            <p 
              className={cn(
                "text-lg md:text-xl text-white/90 max-w-2xl mb-8",
                "transition-all duration-700 delay-300 transform",
                currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
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
                className="btn-primary text-lg"
              >
                Book Your Adventure
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[slide-down_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
