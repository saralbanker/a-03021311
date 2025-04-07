
import { useEffect, useState, useRef } from 'react';

type ScrollAnimationOptions = {
  threshold?: number; // Value between 0-1, representing the percentage of element that needs to be visible
  rootMargin?: string; // Margin around the root element
  once?: boolean; // Whether to trigger the animation only once
};

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);
  
  return { isVisible, elementRef };
}

// Create a component wrapper for animated elements
export const ScrollAnimationWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}> = ({ 
  children, 
  className = '', 
  animation = 'animate-fade-in', 
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}) => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold, rootMargin, once });
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: '700ms',
        transitionProperty: 'all'
      }}
    >
      {children}
    </div>
  );
};
