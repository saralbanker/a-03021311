
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Add this import for the Button component
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedActivities from '@/components/FeaturedActivities';
import SpecialOffers from '@/components/SpecialOffers';
import PromotionBanner from '@/components/PromotionBanner';
import { ArrowRight, Leaf, Shield, Award } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromotionBanner 
        title="Welcome Offer"
        description="Use code WELCOME15 for 15% off your first booking"
        code="WELCOME15"
        backgroundClass="bg-green-700"
        textColorClass="text-white"
        linkPath="/booking?promo=WELCOME15"
        discountPercentage={15}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* About section */}
        <section className="section-padding container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80" 
                  alt="Dandeli Adventures Resort" 
                  className="w-full h-[500px] object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=400&q=80" 
                    alt="Wildlife" 
                    className="w-40 h-32 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up animation-delay-200">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Experience Nature's Paradise in Dandeli
              </h2>
              <p className="text-foreground/70 mb-6">
                Nestled in the heart of Western Ghats, Dandeli Adventures offers an immersive experience in one of India's most biodiverse regions. Our eco-friendly resort combines luxury with wilderness, providing the perfect backdrop for your nature retreat.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Eco-Friendly Resort</h3>
                    <p className="text-sm text-foreground/70">
                      Committed to sustainable tourism practices with minimal environmental impact.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Safety First Adventures</h3>
                    <p className="text-sm text-foreground/70">
                      All activities conducted by certified professionals with top-tier safety equipment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Award-Winning Hospitality</h3>
                    <p className="text-sm text-foreground/70">
                      Recognized for exceptional service and authentic local experiences.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center text-green-700 hover:underline"
              >
                Learn more about us <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Special Offers Section */}
        <SpecialOffers />
        
        <FeaturedActivities />
        
        {/* Accommodations preview */}
        <section className="py-20 bg-secondary">
          <div className="container px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Stunning Accommodations
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Relax in comfort after your adventure in our thoughtfully designed spaces that blend with nature.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Riverside Cottages",
                  image: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=600&q=80",
                  description: "Wake up to the soothing sounds of the river",
                  delay: 0
                },
                {
                  title: "Treehouse Villas",
                  image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
                  description: "Elevated living with panoramic forest views",
                  delay: 200
                },
                {
                  title: "Luxury Tents",
                  image: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?auto=format&fit=crop&w=600&q=80",
                  description: "Glamping experience with all modern amenities",
                  delay: 400
                }
              ].map((accommodation, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-xl group shadow-md animate-slide-up card-hover bg-white"
                  style={{ animationDelay: `${accommodation.delay}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={accommodation.image} 
                      alt={accommodation.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {accommodation.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      {accommodation.description}
                    </p>
                    <Link 
                      to="/accommodation" 
                      className="text-green-700 hover:underline inline-flex items-center"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Link 
                to="/accommodation" 
                className="btn-primary"
              >
                Explore All Accommodations
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="section-padding container">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Guest Experiences
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our guests have to say about their stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                quote: "The river rafting experience was exhilarating! The staff was incredibly knowledgeable and made us feel safe while still having a blast.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
                delay: 0
              },
              {
                name: "Raj Patel",
                location: "Mumbai, India",
                quote: "The treehouse villa exceeded our expectations. Waking up to birds chirping and the view of the forest canopy was magical. A perfect anniversary getaway.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                delay: 200
              },
              {
                name: "Emma Chen",
                location: "Singapore",
                quote: "The wildlife safari was the highlight of our trip. We spotted elephants, deer, and even a black panther! Our guide was exceptional in tracking the animals.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
                delay: 400
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md animate-slide-up"
                style={{ animationDelay: `${testimonial.delay}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/70">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-foreground/80 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} filled={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter sign-up */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Get Exclusive Updates
              </h2>
              <p className="text-foreground/70 mb-8">
                Subscribe to our newsletter and be the first to know about new adventures and seasonal experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button variant="default" className="w-full sm:w-auto bg-green-700 hover:bg-green-800">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-green-700 text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Your Adventure Awaits!
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Book your stay now and create memories that will last a lifetime.
              </p>
              <Link 
                to="/booking" 
                className="inline-block px-8 py-4 bg-white text-green-700 font-medium text-lg rounded-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Book Your Adventure Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper component for star rating
const Star: React.FC<{ filled: boolean }> = ({ filled }) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-yellow-500"
    >
      <path 
        d="M10 1L12.39 6.55L18.5 7.31L14.25 11.75L15.51 18L10 15.09L4.49 18L5.75 11.75L1.5 7.31L7.61 6.55L10 1Z" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Index;
