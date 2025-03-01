
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Mail, Phone, Heart, Leaf, Shield, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-accent text-accent-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 animate-fade-in">About Us</h1>
            <p className="text-xl max-w-2xl animate-fade-in animation-delay-200">
              Discover the story behind Dandeli Adventures and our commitment to sustainable tourism
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="section-padding container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Story</h2>
              <p className="text-foreground/80 mb-4">
                Dandeli Adventures was born from a passion for nature and a desire to share the pristine beauty of the Western Ghats with the world. Founded in 2005 by nature enthusiasts Anand and Meera Sharma, our resort began as a small collection of eco-friendly cottages by the Kali River.
              </p>
              <p className="text-foreground/80 mb-4">
                Over the years, we've grown into a premier adventure destination while staying true to our core values of environmental conservation and community development. We work closely with local tribal communities, employing their knowledge of the land to create authentic and respectful experiences for our guests.
              </p>
              <p className="text-foreground/80">
                Today, Dandeli Adventures stands as a testament to sustainable tourism, offering world-class adventure activities and accommodations that exist in harmony with nature. Our team of passionate naturalists, adventure experts, and hospitality professionals are dedicated to creating unforgettable experiences that connect people with the natural world.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 animate-slide-up animation-delay-200">
              <div className="overflow-hidden rounded-tl-3xl rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
                  alt="Dandeli Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-tr-3xl rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80" 
                  alt="Wildlife" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-bl-3xl rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=600&q=80" 
                  alt="Adventure Activities" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-br-3xl rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=600&q=80" 
                  alt="Local Culture" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-20 bg-secondary">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-foreground/80 mb-8 text-lg">
                To create immersive nature experiences that inspire conservation, support local communities, and promote sustainable tourism practices in the Western Ghats ecosystem.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: <Heart className="h-8 w-8 text-red-500" />,
                    title: "Passion for Nature",
                    description: "We are driven by our love for the outdoors and commitment to preserving it for future generations."
                  },
                  {
                    icon: <Leaf className="h-8 w-8 text-green-500" />,
                    title: "Eco-Conscious",
                    description: "All our operations are designed to minimize environmental impact and promote conservation."
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-500" />,
                    title: "Community Support",
                    description: "We empower local communities through employment, education, and cultural preservation."
                  }
                ].map((value, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="section-padding container">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet Our Team</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              The passionate individuals behind your unforgettable experiences at Dandeli Adventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Anand Sharma",
                role: "Founder & CEO",
                bio: "Wildlife enthusiast with 20+ years of experience in eco-tourism",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Meera Sharma",
                role: "Co-Founder & Conservation Director",
                bio: "Former wildlife biologist dedicated to preserving the Western Ghats ecosystem",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Rahul Nair",
                role: "Adventure Activities Manager",
                bio: "Certified adventure specialist with expertise in water sports and trekking",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Priya Desai",
                role: "Hospitality Manager",
                bio: "Creating memorable guest experiences with attention to every detail",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md animate-slide-up card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold">{member.name}</h3>
                  <p className="text-foreground/70 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-foreground/80">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Awards and Recognition */}
        <section className="py-20 bg-secondary">
          <div className="container px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Awards & Recognition
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Our commitment to excellence has been recognized by leading industry organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  award: "Best Eco-Tourism Destination",
                  year: "2022",
                  organization: "Sustainable Tourism India"
                },
                {
                  award: "Excellence in Adventure Tourism",
                  year: "2021",
                  organization: "Adventure Travel Awards"
                },
                {
                  award: "Top Wildlife Experience",
                  year: "2020",
                  organization: "Travel & Leisure India"
                },
                {
                  award: "Best Responsible Tourism Initiative",
                  year: "2019",
                  organization: "World Travel Awards"
                },
                {
                  award: "Outstanding Hospitality",
                  year: "2018",
                  organization: "Hospitality Excellence Awards"
                },
                {
                  award: "Environmental Conservation Award",
                  year: "2017",
                  organization: "Green Business Awards"
                }
              ].map((award, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md flex items-start animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mr-4 mt-1">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{award.award}</h3>
                    <p className="text-foreground/70">{award.organization}</p>
                    <p className="text-sm text-foreground/60">{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Location */}
        <section className="section-padding container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our Location
              </h2>
              <p className="text-foreground/80 mb-6">
                Dandeli Adventures is located in the heart of the Western Ghats, one of India's richest biodiversity hotspots and a UNESCO World Heritage site. Our resort is situated along the banks of the Kali River, surrounded by lush forests teeming with wildlife.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-accent mr-3 mt-1" />
                  <p className="text-foreground/80">
                    Dandeli Wildlife Sanctuary, Karnataka, India - 581325
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-accent mr-3 mt-1" />
                  <p className="text-foreground/80">
                    +91 (123) 456-7890
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-accent mr-3 mt-1" />
                  <p className="text-foreground/80">
                    info@dandeliadventures.com
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">How to Reach</h3>
                <div className="space-y-2">
                  <p className="text-foreground/80">
                    <span className="font-medium">By Air:</span> The nearest airport is Goa International Airport (160 km) or Hubli Airport (75 km).
                  </p>
                  <p className="text-foreground/80">
                    <span className="font-medium">By Train:</span> Alnavar Junction (40 km) is the nearest railway station.
                  </p>
                  <p className="text-foreground/80">
                    <span className="font-medium">By Road:</span> Well-connected by road from Bangalore (465 km), Goa (125 km), and Mumbai (500 km).
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up animation-delay-200">
              <div className="relative shadow-xl rounded-xl overflow-hidden h-[400px]">
                {/* This would typically be a Google Maps embed */}
                <img 
                  src="https://images.unsplash.com/photo-1576374894533-75a92ca76e9d?auto=format&fit=crop&w=800&q=80" 
                  alt="Map of Dandeli" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 glass rounded-xl">
                    <h3 className="font-display font-medium text-lg">Dandeli Adventures</h3>
                    <p className="text-sm">Dandeli Wildlife Sanctuary, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
