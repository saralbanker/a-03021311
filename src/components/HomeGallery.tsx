
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/44997248-2a7d-4c4b-8656-13d704d35b37.png",
    alt: "Riverside Cottages",
  },
  {
    id: 2,
    src: "/lovable-uploads/a9ae304d-ac8b-4671-94c1-c3a3013a0711.png",
    alt: "Scenic Mountain View",
  },
  {
    id: 3,
    src: "/lovable-uploads/b4c6f3a5-3500-43ad-97e1-e69041317e64.png",
    alt: "River Rafting Adventure",
  },
  {
    id: 4,
    src: "/lovable-uploads/39f35db-5cf1-4a0b-be13-c4f3947bec67.png", 
    alt: "Forest Meditation",
  },
  {
    id: 5,
    src: "/lovable-uploads/fa6d6df3-ea4b-4f3f-9db1-81fbb2370f9f.png", 
    alt: "Luxury Accommodation",
  },
  {
    id: 6, 
    src: "/lovable-uploads/f97f4d91-56e4-4e2f-bb73-93760030da48.png",
    alt: "Wildlife Safari"
  }
];

const HomeGallery: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Auto scroll every 3 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explore Our Gallery
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Take a visual journey through the beautiful landscapes and experiences that await you at Dandeli Adventure Resorts
          </p>
        </div>
        
        <div className="relative mx-auto max-w-5xl px-8">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 h-64">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-4 font-medium">{image.alt}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/80 backdrop-blur-sm hover:bg-white" />
            <CarouselNext className="right-0 bg-white/80 backdrop-blur-sm hover:bg-white" />
          </Carousel>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/gallery" className="btn-primary inline-flex items-center gap-2 hover-scale">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
