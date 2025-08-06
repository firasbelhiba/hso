import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Judge {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  description: string;
}

const judges: Judge[] = [
  {
    id: 1,
    name: "Kamal Youssfi",
    title: "BLOCKCHAIN EXPERT",
    company: "HEDERA HASHGRAPH",
    image: "/mentors/Kamal-youssfi.jpg",
    description: "Expert in distributed ledger technology and consensus algorithms"
  },
  {
    id: 2,
    name: "Salman Halawi",
    title: "BLOCKCHAIN EXPERT",
    company: "HEDERA HASHGRAPH",
    image: "/mentors/Salman%20Halawi.jpeg",
    description: "Expert in distributed ledger technology and consensus algorithms"
  },
  {
    id: 3,
    name: "Karen Sciberras",
    title: "BLOCKCHAIN EXPERT",
    company: "HEDERA HASHGRAPH",
    image: "/mentors/KarenSciberras.jpg",
    description: "Expert in distributed ledger technology and consensus algorithms"
  },
  {
    id: 4,
    name: "Jake Hall",
    title: "BLOCKCHAIN ARCHITECT",
    company: "DLT SOLUTIONS",
    image: "/mentors/JakeHall.jpg",
    description: "Pioneer in smart contract development and DeFi protocols"
  },
  {
    id: 5,
    name: "Oyedotun Loye London",
    title: "INNOVATION EXPERT",
    company: "TECH STARTUPS",
    image: "/mentors/Oyedotun-Loye-London.jpg",
    description: "Investment expert in Web3 startups and emerging technologies"
  },
  {
    id: 6,
    name: "Thomas Puschmann",
    title: "FINANCIAL TECHNOLOGY EXPERT",
    company: "DIGITAL BANKING",
    image: "/mentors/Thomas%20Puschmann.jpg",
    description: "Expert in fintech innovation and digital financial services"
  }
];

const MentorsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Start with first card expanded
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0); // Return to first card when no hover
  };

  // Touch handlers for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    handleUserInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
    handleUserInteraction();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleUserInteraction();
  };

  // Pause animation when user is interacting
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    // Resume animation after 3 seconds of no interaction
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  return (
    <section id="judges" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden bg-[#EFE8F7]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-5 md:mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            JUDGES
          </h2>
          <p className="text-black-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-black px-4">
            Meet the expert judges who will evaluate your innovations and determine the winners. 
            Our panel brings decades of combined experience in blockchain, Web3, and emerging technologies.
          </p>
        </div>

        {/* Desktop: Animated Cards Container */}
        <div className="hidden md:flex gap-6 justify-center items-end mb-12 mentor-cards-container">
          {judges.map((judge, index) => (
            <div
              key={judge.id}
              className={`mentor-card ${hoveredIndex === index ? 'expanded' : 'collapsed'} cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden group`}
              style={{
                backgroundImage: `url(${judge.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Pixel Layer Frame Overlay - On Top */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url('/pixel layer 1.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  pointerEvents: 'none',
                }}
              />
              
              {/* Gradient overlay at the top for better name readability */}
              <div 
                className="absolute top-0 left-0 right-0 h-16"
                style={{ 
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none' 
                }}
              />
              
              {/* Judge Name Overlay - Show on expanded card */}
              {hoveredIndex === index && (
                <div className="absolute top-2 left-2 transition-opacity duration-300 z-10">
                  <p className="text-2xl font-semibold text-white" style={{fontFamily: 'Archivo, sans-serif'}}>{judge.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Judge Carousel */}
        <div className="block md:hidden mb-12">
          <div className="relative">
            {/* Gradient Overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#EFE8F7] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#EFE8F7] to-transparent z-10"></div>
            
            {/* Carousel Container */}
            <div 
              className="mentors-carousel-container"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div 
                className={`mentors-carousel-track ${isUserInteracting ? 'paused' : ''}`}
              >
                {/* Duplicate judges for seamless infinite scroll */}
                {[...judges, ...judges].map((judge, index) => (
                  <div
                    key={`${judge.id}-${index}`}
                    className="mentor-carousel-card flex-shrink-0 mx-3 relative overflow-hidden"
                  >
                    <div
                      className="w-full h-full relative"
                      style={{
                        backgroundImage: `url(${judge.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {/* Pixel Layer Frame Overlay */}
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backgroundImage: `url('/pixel layer 1.png')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          pointerEvents: 'none',
                        }}
                      />
                      
                      {/* Gradient overlay for better text readability */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-20"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
                          pointerEvents: 'none' 
                        }}
                      />
                      
                      {/* Judge Info */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="text-white font-bold text-lg mb-1" style={{fontFamily: 'Archivo, sans-serif'}}>
                          {judge.name}
                        </h3>
                        {/* <p className="text-blue-300 text-sm font-medium">
                          {judge.title}
                        </p>
                        <p className="text-gray-300 text-xs">
                          {judge.company}
                        </p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link 
            to="/mentors"
            className="text-white px-8 py-3 font-semibold transition-all duration-300 hover:opacity-90 transform hover:scale-105 inline-block"
            style={{ backgroundColor: "#0350F3" }}
          >
            SEE MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;