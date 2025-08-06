import React from 'react';
import { Menu, X, Users, Code, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import MentorsSection from './components/MentorsSection.tsx';
import FAQSection from './components/FAQSection.tsx';
import SponsorsSection from './components/SponsorsSection.tsx';
import SponsorsCarousel from './components/SponsorsCarousel.tsx';
import Footer from './components/Footer.tsx';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [animatedSquares, setAnimatedSquares] = React.useState<Set<string>>(new Set());
  // Track which countries are expanded in the promotional list
  const [expandedCountries, setExpandedCountries] = React.useState<Set<string>>(new Set());
  // Accordion state for Rules section
  const [expandedRules, setExpandedRules] = React.useState<Set<string>>(new Set<string>());
  // Scroll lock for promotional section
  const promoSectionRef = React.useRef<HTMLDivElement>(null);
  const listContainerRef = React.useRef<HTMLDivElement>(null);
  const [isScrollLocked, setIsScrollLocked] = React.useState(false);
  const [lockStartY, setLockStartY] = React.useState<number | null>(null);
  // Additional scroll distance before list begins moving (pixels)
  const LIST_SCROLL_START_OFFSET = 250;
  
  // Floating navbar state
  const [isNavbarFloating, setIsNavbarFloating] = React.useState(false);
  
  // Scroll animation states
  const [animatedElements, setAnimatedElements] = React.useState<Set<string>>(new Set());

  const handleMouseMove = React.useCallback(() => {
    // Get all squares including video section
    const heroSquares = Array.from({length: 175}, (_, i) => `square-${i}`);
    const videoSquares = Array.from({length: 27}, (_, i) => `video-square-${i + 1}`);
    const trackSquares = [
      ...Array.from({length: 12}, (_, i) => `track1-square${i + 1}`),
      ...Array.from({length: 12}, (_, i) => `track2-square${i + 1}`),
      ...Array.from({length: 12}, (_, i) => `track3-square${i + 1}`),
      ...Array.from({length: 12}, (_, i) => `track4-square${i + 1}`)
    ];
    const allSquares = [...heroSquares, ...videoSquares, ...trackSquares];
    
    const squaresToAnimate = Math.floor(Math.random() * 25) + 15; // 15-40 squares
    
    const newAnimatedSquares = new Set<string>();
    
    for (let i = 0; i < squaresToAnimate; i++) {
      const randomIndex = Math.floor(Math.random() * allSquares.length);
      newAnimatedSquares.add(allSquares[randomIndex]);
    }
    
    setAnimatedSquares(newAnimatedSquares);
    
    // Clear animation after 600ms
    setTimeout(() => {
      setAnimatedSquares(new Set());
    }, 600);
  }, []);

  // Add continuous animation effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      const heroSquares = Array.from({length: 175}, (_, i) => `square-${i}`);
      const videoSquares = Array.from({length: 27}, (_, i) => `video-square-${i + 1}`);
      const trackSquares = [
        ...Array.from({length: 28}, (_, i) => `track1-square${i + 1}`),
        ...Array.from({length: 28}, (_, i) => `track2-square${i + 1}`),
        ...Array.from({length: 28}, (_, i) => `track3-square${i + 1}`),
        ...Array.from({length: 28}, (_, i) => `track4-square${i + 1}`)
      ];
      const allSquares = [...heroSquares, ...videoSquares, ...trackSquares];
      
      const squaresToAnimate = Math.floor(Math.random() * 12) + 8; // 8-19 squares
      
      const newAnimatedSquares = new Set<string>();
      
      for (let i = 0; i < squaresToAnimate; i++) {
        const randomIndex = Math.floor(Math.random() * allSquares.length);
        newAnimatedSquares.add(allSquares[randomIndex]);
      }
      
      setAnimatedSquares(prev => new Set([...prev, ...newAnimatedSquares]));
      
      // Clear these specific squares after 400ms
      setTimeout(() => {
        setAnimatedSquares(prev => {
          const updated = new Set(prev);
          newAnimatedSquares.forEach(square => updated.delete(square));
          return updated;
        });
      }, 400);
    }, 200); // Trigger every 200ms

    return () => clearInterval(interval);
  }, []);

  const toggleCountry = (country: string) => {
    setExpandedCountries(prev => {
      const updated = new Set(prev);
      if (updated.has(country)) {
        updated.delete(country);
      } else {
        updated.add(country);
      }
      return updated;
    });
  };

  const toggleRule = (rule: string) => {
    setExpandedRules(prev => {
      const updated = new Set(prev);
      if (updated.has(rule)) {
        updated.delete(rule);
      } else {
        updated.add(rule);
      }
      return updated;
    });
  };

  // Scroll speed control for countries list
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const [isButtonActive, setIsButtonActive] = React.useState(false);
  const [activeDirection, setActiveDirection] = React.useState<'up' | 'down'>('up');
  const [isHovering, setIsHovering] = React.useState(false);
  const animationRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);

  const handleScrollSpeed = (direction: 'up' | 'down', isActive: boolean) => {
    setIsButtonActive(isActive);
    if (isActive) {
      setActiveDirection(direction);
    }
  };

  // Continuous scroll animation
  React.useEffect(() => {
    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      let speed;
      let direction;

      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;

      if (isButtonActive) {
        speed = 0.02; // Fast scroll speed
        direction = activeDirection === 'up' ? -1 : 1;
      } else if (isHovering && !isMobile) {
        speed = 0; // Pause animation when hovering (desktop only)
        direction = 0;
      } else if (isMobile) {
        speed = 0; // No automatic animation on mobile
        direction = 0;
      } else {
        speed = 0.003; // Normal scroll speed (desktop only)
        direction = -1; // Always up when not active
      }

      setScrollOffset(prev => {
        const newOffset = prev + (direction * speed * deltaTime);
        // Reset when we've scrolled through one full cycle
        if (newOffset <= -50) return 0;
        if (newOffset >= 0) return -50;
        return newOffset;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isButtonActive, activeDirection, isHovering]);

  // Handle window resize for mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      // Force re-render when screen size changes
      // This will trigger the animation useEffect to re-evaluate mobile state
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Lock page scroll when promotional section is in focus
  React.useEffect(() => {
    const section = promoSectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      // If section fully covers viewport height, initiate lock
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        if (!isScrollLocked) {
          setIsScrollLocked(true);
          setLockStartY(window.scrollY);
        }
      } else {
        if (isScrollLocked) {
          setIsScrollLocked(false);
          setLockStartY(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollLocked]);

  // No body overflow lock; allow global scroll while section is pinned

  // Sync list scrollTop with page scroll delta while section is locked
  React.useEffect(() => {
    if (!isScrollLocked || lockStartY === null) return;

    const handleWindowScroll = () => {
      const listEl = listContainerRef.current;
      if (!listEl) return;

      const totalDelta = window.scrollY - lockStartY; // total distance scrolled since pin
      const maxScroll = listEl.scrollHeight - listEl.clientHeight;
      const EPS = 1; // pixel tolerance

      // scrolling upwards past pin → release lock
      if (totalDelta < 0) {
        listEl.scrollTop = 0;
        return;
      }

      if (totalDelta <= LIST_SCROLL_START_OFFSET) {
        // Still within initial offset – list remains at top
        listEl.scrollTop = 0;
        return;
      }

      const listDelta = totalDelta - LIST_SCROLL_START_OFFSET;
      if (listDelta >= maxScroll - EPS) {
        // List has fully scrolled; set to bottom and release lock after allowing a tiny extra scroll (comfort)
        listEl.scrollTop = maxScroll;
        setIsScrollLocked(false);
        setLockStartY(null);
        return;
      }

      // Normal range: map page delta to list scroll
      listEl.scrollTop = listDelta;
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [isScrollLocked, lockStartY]);

  // Scroll animation observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              setAnimatedElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with data-animate-id
    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className={`min-h-screen w-full ${isNavbarFloating ? 'pt-20' : ''}`} style={{ backgroundColor: '#EFE8F7' }}>
      {/* Navigation Bar */}
      <nav className={`${isNavbarFloating ? 'fixed bg-black/90 backdrop-blur-md shadow-lg' : 'absolute bg-transparent'} top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/Group 86.png" 
                alt="Hedera Africa Hackathon Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            
            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Home</a>
              <Link to="/tracks" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Tracks</Link>
              <Link to="/tools" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Tools</Link>
              <Link to="/media-kit" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Media Kit</Link>
              <Link to="/rules" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Rules</Link>
  
                              <a 
                  href="/#judges" 
                  className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('judges');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  Judges
                </a>
                              <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className={`nav-link text-sm ${isNavbarFloating ? 'text-white' : 'text-white'}`}>Contact</a>
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
                <a href="#" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Home</a>
                <Link to="/tracks" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tracks</Link>
                <Link to="/tools" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tools</Link>
                <Link to="/media-kit" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Media Kit</Link>
                <Link to="/rules" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Rules</Link>
    
                <a 
                  href="/#judges" 
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('judges');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  Judges
                </a>
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

      {/* Hero Section with Header Image Background */}
      <div 
        className="h-screen w-full bg-black relative overflow-hidden page-content-fade-in" 
        style={{ height: '100vh' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
      >
        {/* Main Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 transform -translate-y-2 sm:-translate-y-6 pt-8 sm:pt-16 pb-8 sm:pb-16 md:pb-24 px-4">
          <div className="text-center w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
            <h1 
              className={`text-white font-bold mb-2 sm:mb-3 md:mb-4 leading-tight text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl scroll-hidden ${animatedElements.has('hero-title1') ? 'animate-pixel-slide-up animation-delay-200' : ''}`}
              data-animate-id="hero-title1"
            >
              <span className="font-black">WORLD'S</span> <span className="text-gray-300 font-extralight" style={{ fontFamily: 'Archivo, sans-serif' }}>LARGEST</span>
            </h1>
            <h1 
              className={`font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl scroll-hidden ${animatedElements.has('hero-title2') ? 'animate-pixel-slide-up animation-delay-400' : ''}`}
              data-animate-id="hero-title2"
            >
              <span style={{ fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace', color: '#0350F3' }}>WEB3</span> <span className="text-white italic">HACKATHON</span>
            </h1>
            
            <div 
              className={`mb-4 sm:mb-6 md:mb-8 scroll-hidden ${animatedElements.has('hero-prize') ? 'animate-pixel-pop' : ''}`}
              data-animate-id="hero-prize"
            >
              <span className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace', color: '#95E000' }}>
                $ 1,000,000 
              </span>
              <span className="ml-1 sm:ml-2 text-base sm:text-base md:text-lg lg:text-xl" style={{ fontFamily: 'Archivo, sans-serif', color: '#95E000' }}>
                Prize Pool
              </span>
            </div>
            
            <p 
              className={`text-gray-300 mb-2 sm:mb-3 md:mb-4 text-base sm:text-base md:text-lg lg:text-xl max-w-full sm:max-w-lg md:max-w-2xl mx-auto scroll-hidden ${animatedElements.has('hero-subtitle1') ? 'animate-pixel-slide-up animation-delay-500' : ''}`}
              data-animate-id="hero-subtitle1"
            >
              Join 10,000+ Builders for Africa's Largest Web3 Hackathon
            </p>
            <p 
              className={`text-gray-400 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-sm sm:text-sm md:text-base lg:text-lg max-w-full sm:max-w-sm md:max-w-xl mx-auto -mt-1 scroll-hidden ${animatedElements.has('hero-subtitle2') ? 'animate-pixel-slide-up animation-delay-500' : ''}`}
              data-animate-id="hero-subtitle2"
            >
              and get a chance to win
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center -mt-2 sm:-mt-4 scroll-hidden ${animatedElements.has('hero-buttons') ? 'animate-pixel-pop animation-delay-500' : ''}`}
              data-animate-id="hero-buttons"
            >
              <a 
                href="https://dorahacks.io/hackathon/hederahackafrica/detail" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white px-6 py-4 font-semibold transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] text-lg sm:text-base animate-pixel-glow hover:opacity-90 hover:scale-105 inline-block text-center" 
                style={{ backgroundColor: '#0350F3' }}
              >
                REGISTER NOW
              </a>
              <a 
                href="https://discord.com/invite/9bwrpTK6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-6 py-4 font-semibold transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] text-lg sm:text-base hover:scale-105 inline-block text-center"
              >
                JOIN COMMUNITY
              </a>
            </div>
          </div>
        </div>

        {/* Dense pixelated transition effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 md:h-40 lg:h-48 xl:h-56">
          {/* Bottom rows - Very dense, almost solid white with tetris/QR patterns */}
          
          {/* Row 1 - Bottom, almost complete */}
          {Array.from({length: 25}, (_, i) => {
            const skip = [3, 7, 12, 18, 22, 24];
            if (skip.includes(i)) return null;
            const squareId = `square-${i}`;
            const isAnimated = animatedSquares.has(squareId);
            return <div key={`r1-${i}`} className="absolute bottom-0 transition-colors duration-500" style={{left: `${i * 4}%`, width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
          })}
          
          {/* Row 2 - Dense with QR-like pattern */}
          {Array.from({length: 25}, (_, i) => {
            const skip = [1, 4, 5, 9, 10, 11, 15, 16, 20, 23, 24];
            if (skip.includes(i)) return null;
            const squareId = `square-${25 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return <div key={`r2-${i}`} className="absolute transition-colors duration-500" style={{left: `${i * 4}%`, bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
          })}
          
          {/* Row 3 - Tetris L-shape and blocks */}
          {Array.from({length: 25}, (_, i) => {
            const keep = [0, 1, 2, 6, 7, 8, 9, 13, 14, 17, 18, 19];
            if (!keep.includes(i)) return null;
            const squareId = `square-${50 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return <div key={`r3-${i}`} className="absolute transition-colors duration-500" style={{left: `${i * 4}%`, bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
          })}
          
          {/* Row 4 - T-shapes and squares */}
          {/* Additional squares for row 1 to make it even denser */}
          {[14, 30, 46, 62, 78].map((pos, i) => {
            const squareId = `square-${75 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`row1-extra-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* Additional squares for row 2 */}
          {[18, 34, 50, 66, 82].map((pos, i) => {
            const squareId = `square-${80 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`row2-extra-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* Additional squares for row 3 */}
          {[22, 38, 54, 70, 86].map((pos, i) => {
            const squareId = `square-${86 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`row3-extra-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 1 (bottom) additional squares */}
          {[26, 42, 58, 74, 90].map((pos, i) => {
            const squareId = `square-${91 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr1-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 2 additional squares */}
          {[6, 22, 38, 54, 70, 86, 94].map((pos, i) => {
            const squareId = `square-${98 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr2-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 3 additional squares */}
          {[10, 26, 42, 58, 74, 90, 94].map((pos, i) => {
            const squareId = `square-${107 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr3-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 4 (new sparse row) */}
          {[14, 30, 46, 62, 78, 94].map((pos, i) => {
            const squareId = `square-${118 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr4-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '7.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 5 (very sparse) */}
          {[18, 34, 50, 66, 82].map((pos, i) => {
            const squareId = `square-${127 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr5-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '10vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* QR Code-like random pattern - Row 6 (minimal) */}
          {[22, 38, 54, 70, 86].map((pos, i) => {
            const squareId = `square-${133 + i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div key={`qr6-${i}`} className="absolute transition-colors duration-500" style={{left: `${pos}%`, bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: isAnimated ? '#000000' : '#EFE8F7'}}></div>
            );
          })}
          
          {/* Edge squares - Left side */}
          <div className="absolute transition-colors duration-500" style={{left: '0%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-136') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '2%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-137') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '1%', bottom: '10vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-138') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Edge squares - Right side */}
          <div className="absolute transition-colors duration-500" style={{left: '98%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-139') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '97%', bottom: '7.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-140') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '99%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-141') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Left Side Tetris Shapes */}
          {/* L-Shape 1 - Bottom left */}
          <div className="absolute transition-colors duration-500" style={{left: '4%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-142') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '4%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-143') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '4%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-144') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '8%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-145') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* T-Shape - Left side */}
          <div className="absolute transition-colors duration-500" style={{left: '2%', bottom: '10vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-146') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '0%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-147') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '2%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-148') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '4%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-149') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Square block - Left */}
          <div className="absolute transition-colors duration-500" style={{left: '6%', bottom: '15vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-150') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '10%', bottom: '15vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-151') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '6%', bottom: '17.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-152') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '10%', bottom: '17.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-153') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Vertical line - Left */}
          <div className="absolute transition-colors duration-500" style={{left: '3%', bottom: '20vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-154') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '3%', bottom: '22.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-155') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '3%', bottom: '25vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-156') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Right Side Tetris Shapes */}
          {/* L-Shape 2 - Bottom right (mirrored) */}
          <div className="absolute transition-colors duration-500" style={{left: '96%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-157') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '96%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-158') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '96%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-159') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '92%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-160') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Z-Shape - Right side */}
          <div className="absolute transition-colors duration-500" style={{left: '94%', bottom: '10vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-161') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '98%', bottom: '10vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-162') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '96%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-163') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '100%', bottom: '12.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-164') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Square block - Right */}
          <div className="absolute transition-colors duration-500" style={{left: '90%', bottom: '15vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-165') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '94%', bottom: '15vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-166') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '90%', bottom: '17.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-167') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '94%', bottom: '17.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-168') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Vertical line - Right */}
          <div className="absolute transition-colors duration-500" style={{left: '97%', bottom: '20vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-169') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '97%', bottom: '22.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-170') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '97%', bottom: '25vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-171') ? '#000000' : '#EFE8F7'}}></div>
          
          {/* Additional scattered pieces for more tetris feel */}
          <div className="absolute transition-colors duration-500" style={{left: '8%', bottom: '27.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-172') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '5%', bottom: '30vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-173') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '92%', bottom: '27.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-174') ? '#000000' : '#EFE8F7'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '95%', bottom: '30vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-175') ? '#000000' : '#EFE8F7'}}></div>
          
        </div>
      </div>

      {/* Prize Pool Section */}
      <section className="py-56 bg-[#EFE8F7] relative">
        {/* Black squares transition at the top */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 md:h-24">
          {/* Left side - L-shape pattern */}
          <div className="absolute top-0 transition-colors duration-500" style={{left: '0%', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-left-1') ? '#EFE8F7' : '#000000'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '0%', top: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-left-3') ? '#EFE8F7' : '#000000'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '2.5%', top: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-left-4') ? '#EFE8F7' : '#000000'}}></div>
          
          {/* Left side - scattered squares */}
          <div className="absolute transition-colors duration-500" style={{left: '8%', top: '2vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-left-10') ? '#EFE8F7' : '#000000'}}></div>
          
          {/* Right side - minimal pattern */}
          <div className="absolute transition-colors duration-500" style={{left: '95%', top: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-right-1') ? '#EFE8F7' : '#000000'}}></div>
          <div className="absolute transition-colors duration-500" style={{left: '92%', top: '3vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-right-2') ? '#EFE8F7' : '#000000'}}></div>
          
          {/* Right side - scattered squares */}
          <div className="absolute transition-colors duration-500" style={{left: '89%', top: '6vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('square-right-10') ? '#EFE8F7' : '#000000'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       <div className="text-center">
               <img 
                 src="/Text.png" 
                 alt="Prize Pool" 
                 className="mx-auto max-w-full h-auto"
               />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        className="w-full"
      >
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black relative overflow-hidden">
          {/* Top edge squares */}
          <div className="absolute top-0 left-0 right-0 h-16">
            {/* Left side squares */}
            <div className="absolute top-0 transition-colors duration-500" style={{left: '1%', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-1') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '4%', top: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-2') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '8%', top: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-3') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '6%', top: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-4') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '12%', top: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-5') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '15%', top: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-21') ? '#000000' : '#EFE8F7'}}></div>
            
            {/* Right side squares */}
            <div className="absolute top-0 transition-colors duration-500" style={{left: '96%', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-6') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '93%', top: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-7') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '89%', top: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-8') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '85%', top: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-9') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '91%', top: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-10') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '87%', top: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-22') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '82%', top: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-23') ? '#000000' : '#EFE8F7'}}></div>
          </div>
          
          {/* Video iframe */}
          <div className="absolute inset-0 flex items-center justify-center z-10 p-4 sm:p-6 md:p-8">
            <iframe
              src="https://www.youtube.com/embed/LrlYp9C-230?rel=0&modestbranding=1&showinfo=0"
              title="Hackathon Video"
              className="w-full h-full max-w-4xl max-h-[80%] sm:max-h-[70%] md:max-h-[80%]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Bottom edge squares */}
          <div className="absolute bottom-0 left-0 right-0 h-16">
            {/* Left side squares */}
            <div className="absolute bottom-0 transition-colors duration-500" style={{left: '2%', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-11') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '0%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-12') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '7%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-13') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '11%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-14') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '5%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-15') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '9%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-24') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '14%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-25') ? '#000000' : '#EFE8F7'}}></div>
            
            {/* Right side squares */}
            <div className="absolute bottom-0 transition-colors duration-500" style={{left: '98%', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-16') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '94%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-17') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '88%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-18') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '91%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-19') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '84%', bottom: '0', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-20') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '86%', bottom: '5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-26') ? '#000000' : '#EFE8F7'}}></div>
            <div className="absolute transition-colors duration-500" style={{left: '80%', bottom: '2.5vw', width: '2.5vw', height: '2.5vw', backgroundColor: animatedSquares.has('video-square-27') ? '#000000' : '#EFE8F7'}}></div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-12">
            
            {/* Organized By */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-8 tracking-wide">
                ORGANIZED BY
              </h3>
              <div className="flex justify-center items-center space-x-8">
                <a 
                  href="https://www.hashgraph.swiss/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-105"
                >
                  <img 
                    src="/hs.png" 
                    alt="HS Logo" 
                    className="h-16 w-auto brightness-50 contrast-150 cursor-pointer"
                  />
                </a>
                <a 
                  href="https://www.exp.science/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-105"
                >
                  <img 
                    src="/exp.png" 
                    alt="Exp Logo" 
                    className="h-16 w-auto brightness-50 contrast-150 cursor-pointer"
                  />
                </a>
              </div>
            </div>

            {/* Operated By */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-8 tracking-wide">
                OPERATED BY
              </h3>
              <div className="flex justify-center">
                <img 
                  src="/Logo White Horizental@4x-8 1.png" 
                  alt="Operated By Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>
      </div>
      {/* How it works Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 sm:mb-12 md:mb-16 scroll-hidden ${animatedElements.has('how-title') ? 'animate-pixel-pop' : ''}`}
              data-animate-id="how-title"
            >
              HOW IT WORKS
            </h2>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-20 md:gap-24 lg:gap-32 max-w-5xl mx-auto">
              
              {/* Step 1 */}
              <div 
                className={`text-center scroll-hidden ${animatedElements.has('how-step1') ? 'animate-pixel-slide-up animation-delay-100' : ''}`}
                data-animate-id="how-step1"
              >
                {/* Pixelated Icon Placeholder */}
                <div className="mb-6 sm:mb-8 md:mb-10 h-32 sm:h-36 md:h-40 flex items-center justify-center">
                  <img 
                    src="/pixel icon tick.png" 
                    alt="Tick Icon" 
                    className="w-auto h-auto max-w-none max-h-full"
                  />
                </div>
                
                {/* Step Number */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full border-2 border-purple-600 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-black whitespace-nowrap">
                    Register &amp; Choose Your Track
                  </h3>
                </div>
              </div>

              {/* Step 2 */}
              <div 
                className={`text-center scroll-hidden ${animatedElements.has('how-step2') ? 'animate-pixel-slide-up animation-delay-200' : ''}`}
                data-animate-id="how-step2"
              >
                {/* Pixelated Icon Placeholder */}
                <div className="mb-6 sm:mb-8 md:mb-10 h-32 sm:h-36 md:h-40 flex items-center justify-center">
                  <img 
                    src="/pixel icon team.png" 
                    alt="Team Icon" 
                    className="w-auto h-auto max-w-none max-h-full"
                  />
                </div>
                
                {/* Step Number */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full border-2 border-purple-600 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-black whitespace-nowrap">
                    Build With a Team
                  </h3>
                </div>
              </div>

              {/* Step 3 */}
              <div 
                className={`text-center scroll-hidden ${animatedElements.has('how-step3') ? 'animate-pixel-slide-up animation-delay-300' : ''}`}
                data-animate-id="how-step3"
              >
                {/* Pixelated Icon Placeholder */}
                <div className="mb-6 sm:mb-8 md:mb-10 h-32 sm:h-36 md:h-40 flex items-center justify-center">
                  <img 
                    src="/pixel icon trophy.png" 
                    alt="Trophy Icon" 
                    className="w-auto h-auto max-w-none max-h-full"
                  />
                </div>
                
                {/* Step Number */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full border-2 border-purple-600 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-black whitespace-nowrap">
                    Submit. Pitch. Win.
                  </h3>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Tracks & Challenges Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-7 md:mb-8 scroll-hidden ${animatedElements.has('tracks-title') ? 'animate-pixel-pop' : ''}`}
              data-animate-id="tracks-title"
            >
              TRACKS & CHALLENGES
            </h2>
            <p 
              className={`text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 scroll-hidden ${animatedElements.has('tracks-desc') ? 'animate-pixel-slide-up animation-delay-200' : ''}`}
              data-animate-id="tracks-desc"
            >
              Each track represents a real-world challenge waiting for bold ideas. Whether you're passionate about climate, AI, 
              health, or decentralized tech, there's a space for you to innovate. Dive into the track that inspires you, explore its 
              unique challenges, and create a solution that could make a real difference.
            </p>
          </div>

          {/* Track Cards */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8 max-w-5xl mx-auto">
            
            {/* Track 1: Onchain Finance & Real-World Assets */}
            <div 
              className={`bg-black p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative overflow-hidden scroll-hidden ${animatedElements.has('track1') ? 'animate-pixel-slide-left animation-delay-100' : ''}`}
              data-animate-id="track1"
            >
              {/* QR code-like squares eating into edges */}
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square1') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square2') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square3') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square4') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square5') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square6') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square7') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square8') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square9') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square10') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square11') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square12') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square13') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square14') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square15') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square16') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square17') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square18') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square19') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square20') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square21') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square22') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square23') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square24') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square25') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square26') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square27') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track1-square28') ? '#000000' : '#EFE8F7'}}></div>
              
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Onchain Finance" 
                  className="w-48 h-32 object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Onchain Finance & Real-World Assets (RWA)
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Build inclusive financial tools and tokenize real-world assets to 
                  unlock new investment opportunities.
                </p>
                
                {/* Prize and Button Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Link 
                    to="/tracks#track-1" 
                    className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm inline-block text-center hover:opacity-90" 
                    style={{ backgroundColor: '#0350F3' }}
                  >
                    VIEW CHALLENGES
                  </Link>
                </div>
              </div>
            </div>

            {/* Track 2: DLT for Operations */}
            <div className="bg-black p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              {/* QR code-like squares eating into edges */}
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square1') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square2') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '32px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square3') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square4') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square5') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square6') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '32px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square7') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square8') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square9') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '32px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square10') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square11') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square12') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square13') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '32px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square14') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square15') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square16') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '32px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square17') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square18') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square19') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square20') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '32px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square21') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square22') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square23') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '32px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square24') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square25') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square26') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square27') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '32px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track2-square28') ? '#000000' : '#EFE8F7'}}></div>
              
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="DLT Operations" 
                  className="w-48 h-32 object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  DLT for Operations
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Use Hedera to streamline sustainable industries like healthcare, 
                  agriculture, and supply chains with secure, transparent systems.
                </p>
                
                {/* Prize and Button Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Link 
                    to="/tracks#track-2" 
                    className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm inline-block text-center hover:opacity-90" 
                    style={{ backgroundColor: '#0350F3' }}
                  >
                    VIEW CHALLENGES
                  </Link>
                </div>
              </div>
            </div>

            {/* Track 3: AI & DePIN */}
            <div className="bg-black p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              {/* QR code-like squares eating into edges */}
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square1') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square2') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square3') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '40px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square4') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square5') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square6') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square7') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square8') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square9') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square10') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '40px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square11') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square12') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square13') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square14') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square15') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square16') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square17') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '40px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square18') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square19') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square20') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square21') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square22') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square23') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square24') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '40px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square25') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square26') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square27') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '24px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track3-square28') ? '#000000' : '#EFE8F7'}}></div>
              
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="AI & DePIN" 
                  className="w-48 h-32 object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  AI & DePIN (Decentralized Physical Infrastructure Networks)
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Develop smart, decentralized solutions using AI and 
                  community-driven infrastructure.
                </p>
                
                {/* Prize and Button Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Link 
                    to="/tracks#track-3" 
                    className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm inline-block text-center hover:opacity-90" 
                    style={{ backgroundColor: '#0350F3' }}
                  >
                    VIEW CHALLENGES
                  </Link>
                </div>
              </div>
            </div>

            {/* Track 4: Immersive Experience */}
            <div className="bg-black p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              {/* QR code-like squares eating into edges */}
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square1') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square2') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '32px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square3') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '48px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square4') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square5') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square6') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square7') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square8') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square9') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '32px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square10') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '48px', top: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square11') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square12') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', top: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square13') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', top: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square14') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square15') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '16px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square16') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '32px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square17') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '48px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square18') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square19') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '24px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square20') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{left: '8px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square21') ? '#000000' : '#EFE8F7'}}></div>
              
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square22') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '16px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square23') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '32px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square24') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '48px', bottom: '0px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square25') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '0px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square26') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '24px', bottom: '8px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square27') ? '#000000' : '#EFE8F7'}}></div>
              <div className="absolute transition-colors duration-500" style={{right: '8px', bottom: '16px', width: '8px', height: '8px', backgroundColor: animatedSquares.has('track4-square28') ? '#000000' : '#EFE8F7'}}></div>
              
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Immersive Experience" 
                  className="w-48 h-32 object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Immersive Experience
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Create immersive games, digital collectibles, and player-owned economies powered by NFTs.
                </p>
                
                {/* Prize and Button Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Link 
                    to="/tracks#track-4" 
                    className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm inline-block text-center hover:opacity-90" 
                    style={{ backgroundColor: '#0350F3' }}
                  >
                    VIEW CHALLENGES
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Rules and Eligibility Section */}
      <section className="py-20 px-4 bg-[#EFE8F7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              RULES AND ELIGIBILITY
            </h2>
            <p className="text-gray-600 text-lg">
              Guidelines for participating in the Hedera Africa Hackathon 2025
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                name: 'Team Requirements',
                icon: <Users className="w-6 h-6 text-gray-600" />,
                description: 'Guidelines for forming your hackathon team',
                content: 'Teams must have 2–7 members to be eligible. Use Discord or Telegram for team matchmaking. All team members must register individually and complete Hedera certification by September 30.'
              },
              {
                name: 'Technical Requirements',
                icon: <Code className="w-6 h-6 text-gray-600" />,
                description: 'Technical guidelines for your project',
                content: 'Projects must use Hedera services and align with one of the 4 hackathon tracks. Solutions should address real-world challenges and demonstrate practical implementation.'
              },
              {
                name: 'Submission Requirements',
                icon: <FileText className="w-6 h-6 text-gray-600" />,
                description: 'What you need to deliver for your project',
                content: 'Submit your project on DoraHacks between August 1 and September 30. Include code, demo, and pitch presentation. Completed Hedera certification is mandatory for eligibility.'
              }
            ].map(({ name, icon, description, content }) => {
              const isOpen = expandedRules.has(name);
              return (
                <div key={name} className="p-6 bg-white/5 rounded-md">
                  <button
                    onClick={() => toggleRule(name)}
                    className="flex w-full items-start justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        {icon}
                  </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-black mb-1">{name}</h3>
                        <p className="text-gray-600">{description}</p>
                  </div>
                </div>
                    <img 
                      src="/pixel arrow 1.png" 
                      alt="expand"
                      className={`w-10 h-10 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {content}
                    </p>
              </div>
            </div>
              );
            })}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Link 
              to="/rules"
              className="inline-flex items-center gap-3 text-white px-8 py-4 font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 text-lg"
              style={{ backgroundColor: '#0350F3' }}
            >
              <FileText className="w-5 h-5" />
              VIEW COMPLETE RULES
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-[#EFE8F7]">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 tracking-wider scroll-hidden ${animatedElements.has('timeline-title') ? 'animate-pixel-pop' : ''}`}
            data-animate-id="timeline-title"
          >
            TIMELINE
          </h2>
          
          <div className="relative">
            {/* Vertical dashed line */}
            <div className="absolute left-6 top-12 bottom-12 w-0.5 border-l-4 border-dashed" style={{borderSpacing: '8px', borderColor: '#0350F3'}}></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {/* Preparation Phase */}
              <div 
                className={`relative flex items-start scroll-hidden ${animatedElements.has('timeline-prep') ? 'animate-pixel-slide-right animation-delay-100' : ''}`}
                data-animate-id="timeline-prep"
              >
                <div className="flex-shrink-0 w-12 h-12 border-4 flex items-center justify-center z-10 relative bg-[#EFE8F7] animate-pixel-flicker" style={{borderColor: '#0350F3'}}>
                  <div className="w-6 h-6" style={{backgroundColor: '#0350F3'}}></div>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-wider text-left" style={{fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace'}}>
                    PREPARATION PHASE
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-4 text-left">
                    June 1 - July 31, 2025
                  </p>
                  <ul className="text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Onboarding
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Training & educational sessions
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Community engagement activities
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hacking & Mentorship Phase */}
              <div 
                className={`relative flex items-start scroll-hidden ${animatedElements.has('timeline-hacking') ? 'animate-pixel-slide-right animation-delay-200' : ''}`}
                data-animate-id="timeline-hacking"
              >
                     <div className="flex-shrink-0 w-12 h-12 border-4 flex items-center justify-center z-10 relative bg-[#EFE8F7] animate-pixel-glow" style={{borderColor: '#0350F3'}}>
                       <div className="w-6 h-6 animate-spin" style={{backgroundColor: '#0350F3'}}></div>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-wider text-left" style={{fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace'}}>
                    HACKING & MENTORSHIP PHASE
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-4 text-left">
                    August 1 - September 30, 2025
                  </p>
                  <ul className="text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Project development
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mentor support
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#0350F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Final submissions by end of September
                    </li>
                  </ul>
                </div>
              </div>

              {/* Evaluation & Awards */}
              <div 
                className={`relative flex items-start scroll-hidden ${animatedElements.has('timeline-eval') ? 'animate-pixel-slide-right animation-delay-300' : ''}`}
                data-animate-id="timeline-eval"
              >
                <div className="flex-shrink-0 w-12 h-12 border-4 flex items-center justify-center z-10 relative bg-[#EFE8F7] animate-pixel-flicker" style={{borderColor: '#0350F3'}}>
                  <div className="w-6 h-6" style={{backgroundColor: '#0350F3'}}></div>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-wider text-left" style={{fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace'}}>
                    EVALUATION & AWARDS
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-4 text-left">
                    November 30, 2025
                  </p>
                  <p className="text-gray-700 text-left">
                    Judging and winner announcements during the closing ceremony
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hack. Quest. Earn. Section */}
      <section className="pt-20 pb-16 px-6 bg-[#171717] relative overflow-hidden">
        {/* Animated squares in corners */}
        <div className="absolute top-0 left-0 w-32 h-32">
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const squareId = `hack-quest-square-${i}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div
                key={i}
                className="absolute transition-colors duration-500"
                style={{
                  left: `${col * 8}px`,
                  top: `${row * 8}px`,
                  width: '8px',
                  height: '8px',
                  backgroundColor: isAnimated ? '#ffffff' : '#EFE8F7'
                }}
              />
            );
          })}
        </div>
        
        <div className="absolute top-0 right-0 w-32 h-32">
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const squareId = `hack-quest-square-${i + 16}`;
            const isAnimated = animatedSquares.has(squareId);
            return (
              <div
                key={i + 16}
                className="absolute transition-colors duration-500"
                style={{
                  right: `${col * 8}px`,
                  top: `${row * 8}px`,
                  width: '8px',
                  height: '8px',
                  backgroundColor: isAnimated ? '#ffffff' : '#EFE8F7'
                }}
              />
            );
          })}
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider scroll-hidden ${animatedElements.has('hack-quest-earn-title') ? 'animate-pixel-pop' : ''}`}
              data-animate-id="hack-quest-earn-title"
              style={{fontFamily: 'Archivo, sans-serif'}}
            >
              HACK. QUEST. EARN.
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              The ultimate gamified blockchain learning experience
            </p>
          </div>

          {/* Core Mechanics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
              <div className="bg-[#EFE8F7] p-6">
                <h3 className="text-xl font-bold text-black mb-3">Quest Completion</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Complete blockchain challenges, build projects, and master Hedera skills to unlock exclusive NFT badges and earn points.
                </p>
              </div>
              
              <div className="bg-[#EFE8F7] p-6">
                <h3 className="text-xl font-bold text-black mb-3">NFT Badges</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Earn verifiable on-chain credentials that showcase your blockchain expertise and unlock new opportunities.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#EFE8F7] p-6">
                <h3 className="text-xl font-bold text-black mb-3">Points to HBAR</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Convert your earned points directly into $HBAR cryptocurrency. The more you learn, the more you earn.
                </p>
              </div>
              
              <div className="bg-[#EFE8F7] p-6">
                <h3 className="text-xl font-bold text-black mb-3">Dual Benefits</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Advance your ranking while building verifiable on-chain skills that open doors to new opportunities.
                </p>
              </div>
            </div>
          </div>



          {/* Engagement Principle */}
          <div className="text-center mb-8">
            <div className="bg-[#EFE8F7] p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-black mb-3">Engagement = Rewards</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                The more you engage with the platform, the more you earn. Every quest completed, every skill mastered, 
                every project shared contributes to your growing $HBAR balance and blockchain reputation.
              </p>
            </div>
          </div>

          {/* Launch Date */}
          <div className="text-center">
            <div className="bg-[#0350F3] p-6 max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">The Quest Begins</h3>
              <p className="text-xl font-bold text-white">August 10th</p>
              <p className="text-blue-100 mt-1 text-sm">Get ready to hack, quest, and earn!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hedera Africa Hackathon Section */}
      <section className="pt-32 pb-20 px-6" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-5xl font-bold text-black mb-4 scroll-hidden ${animatedElements.has('why-hedera-title1') ? 'animate-pixel-pop' : ''}`}
              data-animate-id="why-hedera-title1"
            >
              WHY HEDERA
            </h2>
            <h2 
              className={`text-4xl md:text-5xl font-bold text-black scroll-hidden ${animatedElements.has('why-hedera-title2') ? 'animate-pixel-pop animation-delay-200' : ''}`}
              data-animate-id="why-hedera-title2"
            >
              AFRICA HACKATHON?
            </h2>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Countries Card */}
            <div 
              className={`border-2 border-blue-600 p-8 text-center hover:shadow-lg transition-shadow scroll-hidden ${animatedElements.has('stats-card1') ? 'animate-pixel-slide-up animation-delay-100' : ''}`}
              data-animate-id="stats-card1"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 animate-pixel-flicker">
                22
              </div>
              <div className="text-lg font-semibold text-black tracking-wide">
                COUNTRIES
              </div>
            </div>

            {/* Speakers Card */}
            <div 
              className={`border-2 border-blue-600 p-8 text-center hover:shadow-lg transition-shadow scroll-hidden ${animatedElements.has('stats-card2') ? 'animate-pixel-slide-up animation-delay-200' : ''}`}
              data-animate-id="stats-card2"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 animate-pixel-flicker">
                49
              </div>
              <div className="text-lg font-semibold text-black tracking-wide">
                SPEAKERS
              </div>
            </div>

            {/* Sessions Card */}
            <div 
              className={`border-2 border-blue-600 p-8 text-center hover:shadow-lg transition-shadow scroll-hidden ${animatedElements.has('stats-card3') ? 'animate-pixel-slide-up animation-delay-300' : ''}`}
              data-animate-id="stats-card3"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 animate-pixel-flicker">
                30
              </div>
              <div className="text-lg font-semibold text-black tracking-wide">
                SESSIONS
              </div>
            </div>

            {/* Attendees Card */}
            <div 
              className={`border-2 border-blue-600 p-8 text-center hover:shadow-lg transition-shadow scroll-hidden ${animatedElements.has('stats-card4') ? 'animate-pixel-slide-up animation-delay-400' : ''}`}
              data-animate-id="stats-card4"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 animate-pixel-flicker">
                10K+
              </div>
              <div className="text-lg font-semibold text-black tracking-wide">
                ATTENDEES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <MentorsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Promotional Image Section */}
      <section ref={promoSectionRef} className={`relative m-0 p-0 ${isScrollLocked ? 'fixed inset-0 z-50' : ''}`} style={{ backgroundColor: '#171717' }}>
        <img
          src="/Frame 39 (1).png"
          alt="Promotional Graphic"
          className="w-full h-auto block"
        />

        {/* Africa Countries List Overlay */}
        <div 
          className={`absolute right-0 flex flex-col items-end justify-center pr-1 sm:pr-2 md:pr-4 lg:pr-6 scroll-hidden ${animatedElements.has('countries-list') ? 'animate-pixel-slide-left' : ''}`}
          style={{ top: '45%' }}
          data-animate-id="countries-list"
        >
          {/* Scroll buttons container */}
          <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 justify-center w-full">
            {/* Up scroll button */}
            <button 
              className="bg-black/50 backdrop-blur-sm rounded-full p-1 sm:p-2 hover:bg-black/70 transition-colors duration-200"
              onMouseDown={() => handleScrollSpeed('up', true)}
              onMouseUp={() => handleScrollSpeed('up', false)}
              onMouseLeave={() => handleScrollSpeed('up', false)}
              onTouchStart={() => handleScrollSpeed('up', true)}
              onTouchEnd={() => handleScrollSpeed('up', false)}
            >
              <img 
                src="/button.png" 
                alt="Scroll Up" 
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transform rotate-180"
              />
            </button>
            
            {/* Down scroll button */}
            <button 
              className="bg-black/50 backdrop-blur-sm rounded-full p-1 sm:p-2 hover:bg-black/70 transition-colors duration-200"
              onMouseDown={() => handleScrollSpeed('down', true)}
              onMouseUp={() => handleScrollSpeed('down', false)}
              onMouseLeave={() => handleScrollSpeed('down', false)}
              onTouchStart={() => handleScrollSpeed('down', true)}
              onTouchEnd={() => handleScrollSpeed('down', false)}
            >
              <img 
                src="/button.png" 
                alt="Scroll Down" 
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            </button>
          </div>
          
          <div 
            ref={listContainerRef} 
            className="max-h-[10rem] sm:max-h-[12rem] md:max-h-[14rem] lg:max-h-[20rem] w-64 sm:w-72 md:w-80 lg:w-[32rem] xl:w-[36rem] overflow-hidden px-1 sm:px-2 md:px-3 lg:px-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ul
              className="space-y-2 sm:space-y-1.5 md:space-y-1 lg:space-y-1 text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold"
              style={{ 
                fontFamily: 'PixelOperator8, Silkscreen, VT323, monospace',
                transform: `translateY(${scrollOffset}%)`,
                transition: isButtonActive ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              {[
                { name: 'Tunisia', code: 'tn', capital: 'Tunis', partners: ['Orange Digital Center', 'Honoris - (ESPRIT)'] },
                { name: 'Egypt', code: 'eg', capital: 'Cairo', partners: ['Orange Digital Center', 'New Horizons University'] },
                { name: 'Morocco', code: 'ma', capital: 'Casablanca', partners: ['Orange Digital Center', 'Honoris - Université Mundiapolis'] },
                { name: 'Nigeria', code: 'ng', capital: 'Lagos', partners: ['Orange Digital Center', 'Honoris - Nile University of Nigeria', 'Kaminova labs group', 'Creative onchain'] },
                { name: 'Senegal', code: 'sn', capital: 'Dakar', partners: ['Orange Digital Center'] },
                { name: 'Côte d\'Ivoire', code: 'ci', capital: 'Abidjan', partners: ['Orange Digital Center'] },
                { name: 'Burkina Faso', code: 'bf', capital: 'Ouagadougou', partners: ['Orange Digital Center'] },
                { name: 'Sierra Leone', code: 'sl', capital: 'Freetown', partners: ['Orange Digital Center'] },
                { name: 'Kenya', code: 'ke', capital: 'Nairobi', partners: ['Orange Digital Center'] },
                { name: 'Ethiopia', code: 'et', capital: 'Addis Ababa', partners: ['Orange Digital Center'] },
                { name: 'Madagascar', code: 'mg', capital: 'Antananarivo', partners: ['Orange Digital Center'] },
                { name: 'Cameroon', code: 'cm', capital: 'Yaoundé', partners: ['Orange Digital Center'] },
                { name: 'DR Congo', code: 'cd', capital: 'Kinshasa', partners: ['Orange Digital Center'] },
                { name: 'South Africa', code: 'za', capital: 'Cape Town', partners: ['Orange Digital Center'] },
                { name: 'Botswana', code: 'bw', capital: 'Gaborone', partners: ['Orange Digital Center'] },
                { name: 'Algeria', code: 'dz', capital: 'Alger', partners: ['Co My code ALgeria'] }
              ].concat([
                { name: 'Tunisia', code: 'tn', capital: 'Tunis', partners: ['Orange Digital Center', 'Honoris - (ESPRIT)'] },
                { name: 'Egypt', code: 'eg', capital: 'Cairo', partners: ['Orange Digital Center', 'New Horizons University'] },
                { name: 'Morocco', code: 'ma', capital: 'Casablanca', partners: ['Orange Digital Center', 'Honoris - Université Mundiapolis'] },
                { name: 'Nigeria', code: 'ng', capital: 'Lagos', partners: ['Orange Digital Center', 'Honoris - Nile University of Nigeria', 'Kaminova labs group', 'Creative onchain'] },
                { name: 'Senegal', code: 'sn', capital: 'Dakar', partners: ['Orange Digital Center'] },
                { name: 'Côte d\'Ivoire', code: 'ci', capital: 'Abidjan', partners: ['Orange Digital Center'] },
                { name: 'Burkina Faso', code: 'bf', capital: 'Ouagadougou', partners: ['Orange Digital Center'] },
                { name: 'Sierra Leone', code: 'sl', capital: 'Freetown', partners: ['Orange Digital Center'] },
                { name: 'Kenya', code: 'ke', capital: 'Nairobi', partners: ['Orange Digital Center'] },
                { name: 'Ethiopia', code: 'et', capital: 'Addis Ababa', partners: ['Orange Digital Center'] },
                { name: 'Madagascar', code: 'mg', capital: 'Antananarivo', partners: ['Orange Digital Center'] },
                { name: 'Cameroon', code: 'cm', capital: 'Yaoundé', partners: ['Orange Digital Center'] },
                { name: 'DR Congo', code: 'cd', capital: 'Kinshasa', partners: ['Orange Digital Center'] },
                { name: 'South Africa', code: 'za', capital: 'Cape Town', partners: ['Orange Digital Center'] },
                { name: 'Botswana', code: 'bw', capital: 'Gaborone', partners: ['Orange Digital Center'] },
                { name: 'Algeria', code: 'dz', capital: 'Alger', partners: ['Co My code ALgeria'] }
              ]).map(({ name, code, capital, partners }, index) => {
                const isOpen = expandedCountries.has(name);
                return (
                  <li
                    key={`${name}-${index}`}
                    className="bg-white/10 backdrop-blur-sm rounded-md px-2 sm:px-3 md:px-4 lg:px-5 py-2.5 sm:py-2 md:py-2 lg:py-2 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1 sm:space-x-2">
                        <img src={`https://flagcdn.com/24x18/${code}.png`} alt={`${name} flag`} width={16} height={12} className="w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-[18px] inline-block rounded-sm border border-white/20" />
                        <span className="truncate text-xs sm:text-sm md:text-base lg:text-lg">{name} - {capital}</span>
                      </span>
                      <button
                        onClick={() => toggleCountry(name)}
                        className={`text-sm sm:text-base md:text-lg lg:text-xl transform transition-transform duration-300 focus:outline-none flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}
                        aria-label={`Toggle ${name}`}
                      >
                        +
                      </button>
                    </div>
                    {/* Expandable content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-32 sm:max-h-36 md:max-h-40 mt-1 sm:mt-2' : 'max-h-0'}`}
                    >
                      <div className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        <p className="font-semibold mb-1 sm:mb-2">Partners:</p>
                        <ul className="space-y-0.5 sm:space-y-1">
                          {partners.map((partner, index) => (
                            <li key={index} className="text-white/70 text-xs sm:text-sm">• {partner}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Sponsors & Partners Section */}
      <SponsorsSection />
        <SponsorsCarousel />
      
      {/* Footer */}
      <Footer />
    </>

  );
}

export default App;