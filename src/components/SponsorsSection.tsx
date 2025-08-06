import React from 'react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: 'sponsor' | 'partner' | 'media';
}

const partners: Partner[] = [
  { id: 1, name: "DAR Blockchain", logo: "/partners/dar-blockchain.png", category: 'partner' },
  { id: 2, name: "Lightency", logo: "/partners/lightency.png", category: 'partner' },
  { id: 3, name: "10000codeurs", logo: "/partners/org/10000codeurs.webp", category: 'partner' },
  { id: 4, name: "ARSIIsmalllogo 1", logo: "/partners/org/ARSIIsmalllogo 1.webp", category: 'partner' },
  { id: 5, name: "blokkat", logo: "/partners/org/blokkat-logo 1.webp", category: 'partner' },
  { id: 6, name: "cclub scientifique esi", logo: "/partners/org/cclub scientifique esi.webp", category: 'partner' },
  { id: 7, name: "classX", logo: "/partners/org/classX.webp", category: 'partner' },
  { id: 8, name: "CRMN", logo: "/partners/org/CRMN.webp", category: 'partner' },
  { id: 9, name: "enetcom", logo: "/partners/org/enetcom.webp", category: 'partner' },
  { id: 10, name: "ENIS", logo: "/partners/org/ENIS.webp", category: 'partner' },
  { id: 11, name: "ENISO", logo: "/partners/org/ENISO.webp", category: 'partner' },
  { id: 12, name: "ENIT", logo: "/partners/org/ENIT.webp", category: 'partner' },
  { id: 13, name: "eni carthage", logo: "/partners/org/eni_carthage_logo-removebg-preview.webp", category: 'partner' },
  { id: 14, name: "ensi", logo: "/partners/org/ensi.webp", category: 'partner' },
  { id: 15, name: "Enstab", logo: "/partners/org/Enstab-logo-3.webp", category: 'partner' },
  { id: 16, name: "epi", logo: "/partners/org/epi.webp", category: 'partner' },
  { id: 17, name: "EPT", logo: "/partners/org/EPT.webp", category: 'partner' },
  { id: 18, name: "ESCS", logo: "/partners/org/ESCS.webp", category: 'partner' },
  { id: 19, name: "ESEN", logo: "/partners/org/ESEN.webp", category: 'partner' },
  { id: 20, name: "esprit career center", logo: "/partners/org/esprit career center.webp", category: 'partner' },
  { id: 21, name: "esprit", logo: "/partners/org/esprit.webp", category: 'partner' },
  { id: 22, name: "gdg", logo: "/partners/org/gdg.webp", category: 'partner' },
  { id: 23, name: "HHT_main_logo", logo: "/partners/org/HHT_main_logo.webp", category: 'partner' },
  { id: 24, name: "honoris", logo: "/partners/org/honoris.webp", category: 'partner' },
  { id: 25, name: "ICRBP", logo: "/partners/org/ICRBP.webp", category: 'partner' },
  { id: 26, name: "ieee-logo (2)", logo: "/partners/org/ieee-logo (2).webp", category: 'partner' },
  { id: 27, name: "ieee-logo", logo: "/partners/org/ieee-logo.webp", category: 'partner' },
  { id: 28, name: "IEI", logo: "/partners/org/IEI.webp", category: 'partner' },
  { id: 29, name: "IIT", logo: "/partners/org/IIT.webp", category: 'partner' },
  { id: 30, name: "INJAZ", logo: "/partners/org/INJAZ.webp", category: 'partner' },
  { id: 31, name: "insat_logo", logo: "/partners/org/insat_logo.webp", category: 'partner' },
  { id: 32, name: "Institut_Supérieur_d'Informatique_(logo).svg", logo: "/partners/org/Institut_Supérieur_d'Informatique_(logo).svg.webp", category: 'partner' },
  { id: 33, name: "iot network", logo: "/partners/org/iot network.webp", category: 'partner' },
  { id: 34, name: "isima", logo: "/partners/org/isima.webp", category: 'partner' },
  { id: 35, name: "ISIMG", logo: "/partners/org/ISIMG.webp", category: 'partner' },
  { id: 36, name: "ISIM_LOGO_ar-removebg-preview", logo: "/partners/org/ISIM_LOGO_ar-removebg-preview.webp", category: 'partner' },
  { id: 37, name: "Logo-EMLV-web", logo: "/partners/org/Logo-EMLV-web.webp", category: 'partner' },
  { id: 38, name: "Logo-Pi-RVB", logo: "/partners/org/Logo-Pi-RVB.webp", category: 'partner' },
  { id: 39, name: "Logo-SESAME-png", logo: "/partners/org/Logo-SESAME-png.webp", category: 'partner' },
  { id: 40, name: "logo-supnum2", logo: "/partners/org/logo-supnum2.webp", category: 'partner' },
  { id: 41, name: "logoTek-up_university", logo: "/partners/org/logoTek-up_university.webp", category: 'partner' },
  { id: 42, name: "logouma", logo: "/partners/org/logouma.webp", category: 'partner' },
  { id: 43, name: "logo_orangedigitalcenter", logo: "/partners/org/logo_orangedigitalcenter.webp", category: 'partner' },
  { id: 44, name: "logo_the_dot", logo: "/partners/org/logo_the_dot.webp", category: 'partner' },
  { id: 45, name: "mmulogo1", logo: "/partners/org/mmulogo1.webp", category: 'partner' },
  { id: 46, name: "msb", logo: "/partners/org/msb.webp", category: 'partner' },
  { id: 47, name: "nerdx", logo: "/partners/org/nerdx.webp", category: 'partner' },
  { id: 48, name: "NETINFO", logo: "/partners/org/NETINFO.webp", category: 'partner' },
  { id: 49, name: "polygon", logo: "/partners/org/polygon.webp", category: 'partner' },
  { id: 50, name: "polytechnique sousse", logo: "/partners/org/polytechnique sousse.webp", category: 'partner' },
  { id: 51, name: "start bnech", logo: "/partners/org/start bnech.webp", category: 'partner' },
  { id: 52, name: "startuptun", logo: "/partners/org/startuptun.webp", category: 'partner' },
  { id: 53, name: "SUPCOM", logo: "/partners/org/SUPCOM.webp", category: 'partner' },
  { id: 54, name: "teach code", logo: "/partners/org/teach code.webp", category: 'partner' },
  { id: 55, name: "techcircle-8", logo: "/partners/org/techcircle-8.webp", category: 'partner' },
  { id: 56, name: "teen girls blockchain", logo: "/partners/org/teen girls blockchain.webp", category: 'partner' },
  { id: 57, name: "Tshwane_University_of_Technology_logo", logo: "/partners/org/Tshwane_University_of_Technology_logo.webp", category: 'partner' },
  { id: 58, name: "TUK", logo: "/partners/org/TUK.webp", category: 'partner' },
  { id: 59, name: "tunEgov", logo: "/partners/org/tunEgov.webp", category: 'partner' },
  { id: 60, name: "TUNIS university", logo: "/partners/org/TUNIS university.webp", category: 'partner' },
  { id: 61, name: "UC", logo: "/partners/org/UC.webp", category: 'partner' },
  { id: 62, name: "UoN_Logo", logo: "/partners/org/UoN_Logo.webp", category: 'partner' },
  { id: 63, name: "WOMEN IN BLCOKCHAIN", logo: "/partners/org/WOMEN IN BLCOKCHAIN.webp", category: 'partner' },
  { id: 64, name: "women_for_cyber_africa_logo-removebg-preview", logo: "/partners/org/women_for_cyber_africa_logo-removebg-preview.webp", category: 'partner' },
  { id: 65, name: "HFO", logo: "/sponsors/hfo.png", category: 'sponsor' }
];

const SponsorsSection: React.FC = () => {
  // Duplicate the partners array to create seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="pt-0 pb-16 md:pb-20 px-4 md:px-6 bg-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            ORGANIZATIONAL PARTNERS
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl md:max-w-3xl mx-auto px-4">
            We're proud to collaborate with leading blockchain organizations to bring you this hackathon.
          </p>
        </div>

        {/* Desktop: Static Image */}
        <div className="hidden md:block">
          <div className="flex justify-center">
            <img
              src="/OrgPartners.png"
              alt="Organizational Partners"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile: Carousel Container */}
        <div className="md:hidden relative">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#171717] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#171717] to-transparent z-10"></div>
          
          {/* Scrolling Container */}
          <div className="sponsors-carousel-container">
            <div className="sponsors-carousel-track">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="sponsor-card flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
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

export default SponsorsSection;