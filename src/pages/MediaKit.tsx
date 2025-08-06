import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Footer from '../components/Footer';
import articlesData from '../data/articles.json';

const MediaKit: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = useState(false);
  const [activeLanguageTab, setActiveLanguageTab] = useState('en');

  // Language tabs configuration
  const languageTabs = [
    { id: 'all', label: 'All Languages', color: 'bg-gray-600' },
    { id: 'en', label: 'English', color: 'bg-blue-600' },
    { id: 'ar', label: 'Arabic', color: 'bg-orange-600' },
    { id: 'fr', label: 'French', color: 'bg-green-600' },
    { id: 'de', label: 'German', color: 'bg-yellow-600' },
    { id: 'ru', label: 'Russian', color: 'bg-red-600' },
    { id: 'vi', label: 'Vietnamese', color: 'bg-purple-600' }
  ];

  // Helper function to determine article language based on badge content
  const getArticleLanguage = (badgeText: string): string => {
    switch (badgeText) {
      case 'EN': return 'en';
      case 'AR': return 'ar';
      case 'FR': return 'fr';
      case 'DE': return 'de';
      case 'RU': return 'ru';
      case 'VI': return 'vi';
      default: return 'en';
    }
  };

  // Helper function to get language badge color
  const getLanguageBadgeColor = (badgeText: string): string => {
    switch (badgeText) {
      case 'EN': return '#0350F3'; // Hedera blue
      case 'AR': return '#D97706'; // Orange
      case 'FR': return '#059669'; // Green
      case 'DE': return '#CA8A04'; // Yellow/Gold
      case 'RU': return '#DC2626'; // Red
      case 'VI': return '#7C3AED'; // Purple
      default: return '#0350F3';
    }
  };

  // Helper function to check if article should be shown based on active tab
  const shouldShowArticle = (badgeText: string): boolean => {
    if (activeLanguageTab === 'all') return true;
    return getArticleLanguage(badgeText) === activeLanguageTab;
  };

  // Redesigned Article Card Component with pixel-art gaming aesthetic
  const ArticleCard: React.FC<{
    language: string;
    title?: string;
    source?: string;
    description?: string;
    category?: string;
    link?: string;
    children?: React.ReactNode;
  }> = ({ language, title, source, description, category, link, children }) => {
    if (!shouldShowArticle(language)) return null;
    
    // If children are provided, render the old format for compatibility
    if (children) {
      return <>{children}</>;
    }
    
    // Provide fallbacks for missing props
    const safeTitle = title || 'Article Title';
    const safeSource = source || 'News Source';
    const safeDescription = description || 'Article description';
    const safeCategory = category || 'News';
    const safeLink = link || '#';
    
    return (
      <div className="group relative bg-black border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transform">
        {/* Pixel-style corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Language Badge - Moved to top of content */}
        <div className="absolute top-3 right-3 z-10">
          <div className="relative">
            <span 
              className="text-white text-xs font-bold px-3 py-1 border-2 border-white shadow-lg relative z-10" 
              style={{ 
                backgroundColor: getLanguageBadgeColor(language),
                fontFamily: 'PixelOperator8, monospace',
                letterSpacing: '1px'
              }}
            >
              {language}
            </span>
            {/* Pixel glow effect */}
            <div className="absolute inset-0 bg-white opacity-20 blur-sm"></div>
          </div>
        </div>
        
        {/* Content with Gaming Aesthetic */}
        <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
          {/* Source with pixel styling */}
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-blue-500 mr-2 animate-pulse"></div>
            <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'PixelOperator8, monospace', letterSpacing: '0.5px' }}>
              {safeSource.toUpperCase()}
            </h3>
          </div>
          
          {/* Title with hover glow */}
          <a 
            href={safeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 group/title"
          >
            <h4 className="text-lg font-semibold mb-3 line-clamp-2 text-white group-hover/title:text-blue-400 transition-colors duration-300 leading-snug" style={{ fontFamily: 'Archivo, sans-serif' }}>
              {safeTitle}
            </h4>
          </a>
          
          {/* Description with improved styling */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
            {safeDescription}
          </p>
          
          {/* Bottom section with pixel-style divider */}
          <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold" style={{ fontFamily: 'PixelOperator8, monospace' }}>
                {safeCategory.toUpperCase()}
              </span>
              
              {/* Enhanced Read Article Button */}
              <a 
                href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
                className="group/btn bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 border-2 border-blue-400 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 flex items-center"
                style={{ fontFamily: 'PixelOperator8, monospace' }}
              >
                READ ARTICLE
                <svg className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
        </div>
        
        {/* Subtle pixel noise effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='1' height='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    );
  };

  // Media partners data
  const mediaPartners = [
    {
      id: 1,
      name: "Cryptonomist",
      logo: "/media-partners/cryptonomist-1.webp",
      description: "Leading blockchain and cryptocurrency news platform"
    },
    {
      id: 2,
      name: "Crypto Reporter",
      logo: "/media-partners/cr_logo_no_bg.webp",
      description: "Comprehensive cryptocurrency news and analysis"
    },
    {
      id: 3,
      name: "TCV Media",
      logo: "/media-partners/TCV Color logo with background.webp",
      description: "Technology and innovation media outlet"
    },
    {
      id: 4,
      name: "Tech Media Partner",
      logo: "/media-partners/ab6765630000ba8a6471f2fb3010d0325140dd34.webp",
      description: "Digital technology news and insights"
    },
    {
      id: 5,
      name: "Future Focus",
      logo: "/media-partners/FF-2022-LOGO-RECTANGLE-REDBLACK-R.webp",
      description: "Future technology and innovation coverage"
    },
    {
      id: 6,
      name: "Digital Innovation Hub",
      logo: "/media-partners/2025-06-25 09.09.57.webp",
      description: "Digital transformation and Web3 news"
    }
  ];

  // Floating navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFloating(window.scrollY > 100);
    };

    // Call handleScroll immediately to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isNavbarFloating ? 'pt-20' : ''}`} style={{ backgroundColor: '#EFE8F7' }}>
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
              <Link to="/tracks" className="nav-link text-sm">Tracks</Link>
              <Link to="/media-kit" className="nav-link text-sm text-blue-400">Media Kit</Link>
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
                <Link to="/tracks" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tracks</Link>
                <Link to="/media-kit" className="nav-link text-base block py-2 text-blue-400 transition-colors">Media Kit</Link>
                <Link to="/rules" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Rules</Link>
                <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Contact</a>
                <a 
                  href="https://dorahacks.io/hackathon/hederahackafrica/detail" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white px-4 py-3 font-medium transition-colors text-base mt-4 w-full hover:opacity-90 inline-block text-center" 
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
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            MEDIA <span style={{ color: '#0350F3' }}>KIT</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Partner with Africa's largest Web3 hackathon to reach thousands of developers, 
            innovators, and blockchain enthusiasts across the continent.
          </p>
          
          {/* Download Media Kit Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                📥 Download Complete Media Kit
              </h2>
              <p className="text-blue-100 mb-6 text-lg">
                Get all official logos, assets, and press materials in one convenient package
              </p>
              <button 
                onClick={() => {
                  // Download the main logo files
                  const files = [
                    { url: '/mediakithederahacks/HH.png', name: 'HH.png' },
                    { url: '/mediakithederahacks/HH_Black.png', name: 'HH_Black.png' },
                    { url: '/mediakithederahacks/HH_white.png', name: 'HH_white.png' },
                    { url: '/mediakithederahacks/Asset 1.svg', name: 'Asset_1.svg' },
                    { url: '/mediakithederahacks/Asset 2.svg', name: 'Asset_2.svg' },
                    { url: '/mediakithederahacks/Asset 3.svg', name: 'Asset_3.svg' },
                    { url: '/mediakithederahacks/Asset 4.svg', name: 'Asset_4.svg' },
                    { url: '/mediakithederahacks/Asset 5.svg', name: 'Asset_5.svg' },
                    { url: '/mediakithederahacks/Asset 6.svg', name: 'Asset_6.svg' },
                    { url: '/mediakithederahacks/Asset 7.svg', name: 'Asset_7.svg' },
                    { url: '/mediakithederahacks/Asset 8.svg', name: 'Asset_8.svg' },
                    { url: '/mediakithederahacks/Asset 10.svg', name: 'Asset_10.svg' },
                    { url: '/mediakithederahacks/Asset 11.svg', name: 'Asset_11.svg' }
                  ];
                  
                  // Download each file
                  files.forEach((file, index) => {
                    setTimeout(() => {
                      const link = document.createElement('a');
                      link.href = file.url;
                      link.download = file.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }, index * 100); // Stagger downloads by 100ms
                  });
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎯 Download Media Kit
              </button>
              <p className="text-blue-200 text-sm mt-4">
                Includes logos, brand assets, and press materials
              </p>
            </div>
          </div>
          
          <div className="bg-black/10 backdrop-blur-sm p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-black">$1M+</div>
                <div className="text-gray-600 text-sm">Prize Pool</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-black">10,000+</div>
                <div className="text-gray-600 text-sm">Participants</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-black">1,000+</div>
                <div className="text-gray-600 text-sm">Project Submissions</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-black">20+</div>
                <div className="text-gray-600 text-sm">African Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Partnership Benefits Section */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Join leading media organizations in amplifying Africa's Web3 innovation story
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 hover:bg-gray-800 transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Expanded Visibility</h3>
              <p className="text-gray-300 leading-relaxed">
                Reach a highly engaged audience of developers, entrepreneurs, and Web3 enthusiasts across Africa and globally.
              </p>
            </div>

            <div className="bg-gray-900 p-8 hover:bg-gray-800 transition-colors duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Web3 Education</h3>
              <p className="text-gray-300 leading-relaxed">
                Support educational initiatives and promote blockchain literacy across emerging markets in Africa.
              </p>
            </div>

            <div className="bg-gray-900 p-8 hover:bg-gray-800 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community Engagement</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with Africa's fastest-growing tech community and showcase innovation stories that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Partners Showcase */}
      <section className="py-20" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Our Media Partners
            </h2>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
              Join these leading organizations in covering Africa's Web3 revolution
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {mediaPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage Section with JSON Data */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Press Coverage
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Discover comprehensive coverage of the Hedera Africa Hackathon across leading media outlets worldwide
            </p>
          </div>

          {/* Enhanced Language Filter Tabs with Pixel Aesthetic */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {languageTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLanguageTab(tab.id)}
                  className={`px-6 py-3 font-bold transition-all duration-300 border-2 transform hover:scale-105 ${
                    activeLanguageTab === tab.id
                      ? `${tab.color} text-white border-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  }`}
                  style={{ fontFamily: 'PixelOperator8, monospace' }}
                >
                  {tab.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Enhanced Language Statistics with Gaming Style */}
            <div className="text-center mb-8">
              <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 bg-gray-900/50 px-6 py-3 border border-gray-700">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>ENGLISH ARTICLES</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>ARABIC ARTICLES</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>FRENCH ARTICLES</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>GERMAN ARTICLES</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>RUSSIAN ARTICLES</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 mr-2 animate-pulse"></div>
                  <span style={{ fontFamily: 'PixelOperator8, monospace' }}>VIETNAMESE ARTICLES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Articles Grid with Pixel Design */}
          <div className="relative">
            {/* Grid background pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230350F3' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {/* Render all articles from JSON data */}
            {articlesData.map((article) => (
              <ArticleCard 
                key={article.id}
                language={article.language}
                title={article.title}
                source={article.source}
                description={article.description}
                category={article.category}
                link={article.link}
              />
            ))}
            </div>
          </div>

          {/* Press Kit CTA */}
          <div className="mt-16 bg-black text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Press Kit & Media Resources
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Access high-resolution logos, press releases, fact sheets, and executive bios for your coverage of the Hedera Africa Hackathon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://linktr.ee/HederaAfricahackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Download Press Kit
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
              <a 
                href="https://linktr.ee/HederaAfricahackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-medium transition-colors"
              >
                Media Contact
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20" style={{ backgroundColor: '#EFE8F7' }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Join us in covering Africa's largest Web3 hackathon and be part of the innovation story that's shaping the continent's digital future.
          </p>
          <a
            href="https://forms.office.com/pages/responsepage.aspx?id=S3aP1c4mAU2ZrHQRpFj06iDcBTZVD_pEhfblQkpL3ShUQzlHV0daWTNSU0hSREY4T0pWSzFBUEk5Mi4u&route=shorturl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Apply as Media Partner
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MediaKit;