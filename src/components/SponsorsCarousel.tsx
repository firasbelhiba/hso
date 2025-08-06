import React from 'react';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

const sponsors: Sponsor[] = [
  { id: 1, name: "Hashgraph Online", logo: "/sponsors/hfo.png" },
  { id: 2, name: "Orange Digital Center", logo: "/sponsors/logo_orangedigitalcenter.png" },
  { id: 3, name: "White Logo", logo: "/sponsors/white_logo_1920x1080.png" },
  { id: 4, name: "Image Removebg Preview", logo: "/sponsors/image-removebg-preview.png" },
  { id: 5, name: "Image Removebg Preview 1", logo: "/sponsors/image-removebg-preview (1).png" },
  { id: 6, name: "Sygnum Logo", logo: "/sponsors/Sygnum-Logo-Red-Icon_PNG-1.png" },
  { id: 7, name: "Scenic Swisscoast", logo: "/sponsors/Scenic-Swisscoast_transparent-2.png" },
  { id: 8, name: "THG Logo", logo: "/sponsors/THG_Logo_Symbol_RGB_White.png" },
  { id: 9, name: "Esprit", logo: "/sponsors/esprit.webp" },
  { id: 10, name: "G7 Logo", logo: "/sponsors/G7vw4YOs9H1Vgu0Cc4cqtdhPQeh1697437565592_200x200.png" }
];

const SponsorsCarousel: React.FC = () => {
  // Duplicate the sponsors array to create seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="pt-0 pb-16 md:pb-20 px-4 md:px-6 bg-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            SPONSORS
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl md:max-w-3xl mx-auto px-4">
            We're grateful for the support of our generous sponsors who make this hackathon possible.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#171717] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#171717] to-transparent z-10"></div>
          
          {/* Scrolling Container */}
          <div className="sponsors-carousel-container">
            <div className="sponsors-carousel-track">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.id}-${index}`}
                  className="sponsor-card flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-12 md:max-h-16 max-w-full object-contain transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel; 