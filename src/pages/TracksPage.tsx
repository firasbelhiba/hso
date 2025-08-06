import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Footer from '../components/Footer';

const TracksPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [animatedSquares, setAnimatedSquares] = React.useState<Set<string>>(new Set());
  const [isNavbarFloating, setIsNavbarFloating] = React.useState(false);

  // Animation effect for decorative squares
  React.useEffect(() => {
    const interval = setInterval(() => {
             const trackSquares = [
         // Track 1 corner squares
         ...Array.from({length: 12}, (_, i) => `track1-tl-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track1-tr-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track1-bl-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track1-br-square${i + 1}`),
         // Track 3 corner squares
         ...Array.from({length: 12}, (_, i) => `track3-tl-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track3-tr-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track3-bl-square${i + 1}`),
         ...Array.from({length: 12}, (_, i) => `track3-br-square${i + 1}`)
       ];
             const allSquares = [...trackSquares];
      
      const squaresToAnimate = Math.floor(Math.random() * 15) + 10; // 10-24 squares
      const newAnimatedSquares = new Set<string>();
      
      for (let i = 0; i < squaresToAnimate; i++) {
        const randomIndex = Math.floor(Math.random() * allSquares.length);
        newAnimatedSquares.add(allSquares[randomIndex]);
      }
      
      setAnimatedSquares(prev => new Set([...prev, ...newAnimatedSquares]));
      
      setTimeout(() => {
        setAnimatedSquares(prev => {
          const updated = new Set(prev);
          newAnimatedSquares.forEach(square => updated.delete(square));
          return updated;
        });
      }, 400);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Floating navbar scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarFloating(scrollTop > 100); // Float after scrolling 100px
    };

    // Call handleScroll immediately to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation for smooth scrolling to specific tracks
  React.useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Add a small delay to ensure the page is fully loaded
          setTimeout(() => {
            const navbarHeight = 80; // Approximate navbar height
            const elementPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Handle initial hash navigation
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  const tracks = [
    {
      id: 1,
      title: "Onchain Finance & Real-World Assets",
      objective: "Empower communities by enabling equitable access to decentralized financial tools and democratizing investment opportunities through blockchain",
      categories: [
        {
          name: "Financial Inclusion",
          description: "Peer-to-peer mobile payment systems, decentralized lending platforms, blockchain-based savings applications"
        },
        {
          name: "Asset Tokenization", 
          description: "Fractional real estate ownership (NFTs), tokenized commodities trading, stablecoins pegged to local currencies"
        },
        {
          name: "Decentralized Financial Systems",
          description: "DAO-governed investment pools, decentralized exchanges (DEXs), microfinance solutions"
        }
      ]
    },
    {
      id: 2,
      title: "DLT for Operations",
      objective: "Transform and optimize operational processes across essential sectors by leveraging transparency, efficiency, and security of distributed ledger technology",
      categories: [
        {
          name: "Healthcare",
          description: "Blockchain-based electronic medical records, pharmaceutical tracking and traceability"
        },
        {
          name: "Agriculture",
          description: "Smart contracts for automated payments, blockchain produce tracking from farm-to-table"
        },
        {
          name: "Supply Chain",
          description: "End-to-end tracking systems, decentralized logistics platforms"
        },
        {
          name: "Sustainability",
          description: "Carbon credit systems, tracking sustainable practices and incentivizing environmental stewardship"
        }
      ]
    },
    {
      id: 3,
      title: "Immersive Experiences",
      objective: "Cultivate creative, culturally rich, and economically empowering digital environments through immersive technologies integrated with blockchain",
      categories: [
        {
          name: "Play-to-Earn Games",
          description: "Gamified education applications, blockchain-powered mobile games rewarding users with NFTs and digital tokens"
        },
        {
          name: "Metaverse Environments",
          description: "Virtual African cultural spaces, decentralized marketplaces, virtual tourism platforms"
        },
        {
          name: "Digital Collectibles",
          description: "NFT platforms for African art, music, and cultural artifacts"
        },
        {
          name: "Community Governance",
          description: "DAO-driven platforms for collaborative content management and tokenized community incentives"
        }
      ]
    },
    {
      id: 4,
      title: "AI & Decentralized Physical Infrastructure (DePIN)",
      objective: "Leverage decentralized infrastructure and artificial intelligence to deliver smart, scalable solutions addressing infrastructure and automation challenges across Africa",
      categories: [
        {
          name: "AI Agents on Hedera",
          description: "Healthcare chatbots for triage, diagnostics, and medical resource allocation, local-language customer bots"
        },
        {
          name: "Global DePIN Solutions",
          description: "Decentralized mesh networks for internet access, blockchain-based solar grids, decentralized cloud storage and computing solutions"
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen w-full ${isNavbarFloating ? 'pt-20' : ''}`} style={{ backgroundColor: '#EFE8F7' }}>
      {/* Navigation Bar */}
      <nav className={`${isNavbarFloating ? 'fixed bg-black/90 backdrop-blur-md shadow-lg' : 'absolute bg-black'} top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img 
                  src="/Group 86.png" 
                  alt="Hedera Africa Hackathon Logo" 
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
            </div>
            
            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="nav-link text-sm">Home</Link>
              <Link to="/tracks" className="nav-link text-sm text-blue-400">Tracks</Link>
              <Link to="/tools" className="nav-link text-sm">Tools</Link>
              <Link to="/media-kit" className="nav-link text-sm">Media Kit</Link>
              <Link to="/rules" className="nav-link text-sm">Rules</Link>
  
              
              <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="nav-link text-sm">Contact</a>
            </div>
            
            {/* Desktop Register Button */}
            <div className="hidden lg:block">
              <a 
                href="https://dorahacks.io/hackathon/hederahackafrica/detail" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm hover:opacity-90 inline-block" 
                style={{ backgroundColor: '#0350F3' }}
              >
                REGISTER NOW
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`lg:hidden p-2 ${isNavbarFloating ? 'text-white' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-600 bg-black/90 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col space-y-4 pt-6 px-4">
                <Link to="/" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/tracks" className="nav-link text-base block py-2 text-blue-400 transition-colors">Tracks</Link>
                <Link to="/tools" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tools</Link>
                <Link to="/media-kit" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Media Kit</Link>
                <Link to="/rules" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Rules</Link>
    

                <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Contact</a>
                <a 
                  href="https://dorahacks.io/hackathon/hederahackafrica/detail" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white px-4 py-3 font-medium transition-colors text-base mt-4 w-full rounded-md hover:opacity-90 inline-block text-center" 
                  style={{ backgroundColor: '#0350F3' }}
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            HACKATHON <span style={{ color: '#0350F3' }}>TRACKS</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            Explore four innovative tracks designed to drive Web3 innovation across Africa. 
            Choose your challenge and build solutions that matter.
          </p>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="pb-20">
        {tracks.map((track, index) => (
                                <section 
            key={track.id} 
            id={`track-${track.id}`}
            className={`${index % 2 === 0 ? 'bg-black' : 'bg-[#EFE8F7]'} py-16 relative overflow-hidden`}
          >
             {/* Animated squares in corners of each track section - only for track 1 and 3 */}
             {track.id === 1 || track.id === 3 ? (
               <div className="absolute inset-0 pointer-events-none">
                             {/* Top-left corner squares - Tetris pattern */}
               {Array.from({length: 12}, (_, i) => {
                 // Create Tetris-like patterns
                 let row, col;
                 if (i < 4) {
                   // First row - 4 squares in a line
                   row = 0;
                   col = i;
                 } else if (i < 7) {
                   // Second row - 3 squares (L shape)
                   row = 1;
                   col = i - 4;
                 } else if (i < 9) {
                   // Third row - 2 squares
                   row = 2;
                   col = i - 7;
                 } else {
                   // Fourth row - 3 squares (T shape)
                   row = 3;
                   col = i - 9;
                 }
                 
                 const squareId = `track${track.id}-tl-square${i + 1}`;
                 const isAnimated = animatedSquares.has(squareId);
                 const isBlackSection = index % 2 === 0;
                 
                 return (
                   <div
                     key={squareId}
                     className="absolute transition-colors duration-500"
                     style={{
                       left: `${col * 2.5}%`,
                       top: `${row * 2.5}%`,
                       width: '12px',
                       height: '12px',
                       backgroundColor: isAnimated 
                         ? (isBlackSection ? '#ffffff' : '#000000')
                         : (isBlackSection ? '#000000' : '#EFE8F7')
                     }}
                   />
                 );
               })}
              
                             {/* Top-right corner squares - Tetris pattern */}
               {Array.from({length: 12}, (_, i) => {
                 // Create Tetris-like patterns
                 let row, col;
                 if (i < 4) {
                   // First row - 4 squares in a line
                   row = 0;
                   col = i;
                 } else if (i < 7) {
                   // Second row - 3 squares (L shape)
                   row = 1;
                   col = i - 4;
                 } else if (i < 9) {
                   // Third row - 2 squares
                   row = 2;
                   col = i - 7;
                 } else {
                   // Fourth row - 3 squares (T shape)
                   row = 3;
                   col = i - 9;
                 }
                 
                 const squareId = `track${track.id}-tr-square${i + 1}`;
                 const isAnimated = animatedSquares.has(squareId);
                 const isBlackSection = index % 2 === 0;
                 
                 return (
                   <div
                     key={squareId}
                     className="absolute transition-colors duration-500"
                     style={{
                       right: `${col * 2.5}%`,
                       top: `${row * 2.5}%`,
                       width: '12px',
                       height: '12px',
                       backgroundColor: isAnimated 
                         ? (isBlackSection ? '#ffffff' : '#000000')
                         : (isBlackSection ? '#000000' : '#EFE8F7')
                     }}
                   />
                 );
               })}
              
                             {/* Bottom-left corner squares - Tetris pattern */}
               {Array.from({length: 12}, (_, i) => {
                 // Create Tetris-like patterns
                 let row, col;
                 if (i < 4) {
                   // First row - 4 squares in a line
                   row = 0;
                   col = i;
                 } else if (i < 7) {
                   // Second row - 3 squares (L shape)
                   row = 1;
                   col = i - 4;
                 } else if (i < 9) {
                   // Third row - 2 squares
                   row = 2;
                   col = i - 7;
                 } else {
                   // Fourth row - 3 squares (T shape)
                   row = 3;
                   col = i - 9;
                 }
                 
                 const squareId = `track${track.id}-bl-square${i + 1}`;
                 const isAnimated = animatedSquares.has(squareId);
                 const isBlackSection = index % 2 === 0;
                 
                 return (
                   <div
                     key={squareId}
                     className="absolute transition-colors duration-500"
                     style={{
                       left: `${col * 2.5}%`,
                       bottom: `${row * 2.5}%`,
                       width: '12px',
                       height: '12px',
                       backgroundColor: isAnimated 
                         ? (isBlackSection ? '#ffffff' : '#000000')
                         : (isBlackSection ? '#000000' : '#EFE8F7')
                     }}
                   />
                 );
               })}
              
                             {/* Bottom-right corner squares - Tetris pattern */}
               {Array.from({length: 12}, (_, i) => {
                 // Create Tetris-like patterns
                 let row, col;
                 if (i < 4) {
                   // First row - 4 squares in a line
                   row = 0;
                   col = i;
                 } else if (i < 7) {
                   // Second row - 3 squares (L shape)
                   row = 1;
                   col = i - 4;
                 } else if (i < 9) {
                   // Third row - 2 squares
                   row = 2;
                   col = i - 7;
                 } else {
                   // Fourth row - 3 squares (T shape)
                   row = 3;
                   col = i - 9;
                 }
                 
                 const squareId = `track${track.id}-br-square${i + 1}`;
                 const isAnimated = animatedSquares.has(squareId);
                 const isBlackSection = index % 2 === 0;
                 
                 return (
                   <div
                     key={squareId}
                     className="absolute transition-colors duration-500"
                     style={{
                       right: `${col * 2.5}%`,
                       bottom: `${row * 2.5}%`,
                       width: '12px',
                       height: '12px',
                       backgroundColor: isAnimated 
                         ? (isBlackSection ? '#ffffff' : '#000000')
                         : (isBlackSection ? '#000000' : '#EFE8F7')
                     }}
                   />
                 );
                                })}
               </div>
             ) : null}
             
             <div className="max-w-6xl mx-auto px-4 relative z-10">
              {/* Track Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span 
                    className={`text-2xl font-bold px-4 py-2 ${index % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}
                    style={{fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace'}}
                  >
                    TRACK {track.id}
                  </span>

                </div>
                                 <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${index % 2 === 0 ? 'text-white' : 'text-gray-800'}`}>
                   {track.title}
                 </h2>
                 <p className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${index % 2 === 0 ? 'text-gray-300' : 'text-gray-600'}`}>
                   {track.objective}
                 </p>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {track.categories.map((category, categoryIndex) => (
                  <div 
                    key={categoryIndex}
                                         className={`p-6 border-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden ${
                       index % 2 === 0 
                         ? 'bg-gray-900 border-blue-600 hover:border-green-400' 
                         : 'bg-white border-blue-600 hover:border-blue-600'
                     }`}
                  >
                    

                                         <h3 className={`text-xl font-bold mb-4 ${index % 2 === 0 ? 'text-white' : 'text-gray-800'}`}>
                       {category.name}
                     </h3>
                     <p className={`leading-relaxed ${index % 2 === 0 ? 'text-gray-300' : 'text-gray-600'}`}>
                       {category.description}
                     </p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center mt-12">
                <a 
                  href="https://dorahacks.io/hackathon/hederahackafrica/detail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-3 font-medium transition-colors text-base hover:opacity-90 inline-block"
                  style={{ backgroundColor: '#0350F3' }}
                >
                  START BUILDING IN TRACK {track.id}
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>

             {/* Call to Action Section */}
       <section className="bg-black py-20">
         <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers, designers, and innovators in creating solutions that will transform Africa through Web3 technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://dorahacks.io/hackathon/hederahackafrica/detail"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-8 py-4 font-semibold transition-colors text-lg inline-block text-center"
              style={{ backgroundColor: '#0350F3' }}
            >
              REGISTER FOR HACKATHON
            </a>
            <Link 
              to="/"
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-4 font-semibold transition-colors text-lg text-center"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TracksPage;