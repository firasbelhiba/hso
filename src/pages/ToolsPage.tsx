import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code, Terminal, Brain, Smartphone, Database, Cloud, Palette, Globe, Shield, Zap } from 'lucide-react';
import Footer from '../components/Footer';

interface Tool {
  name: string;
  description: string;
  website: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  category: string;
  featured?: boolean;
}

interface Sponsor {
  name: string;
  logo: string;
  description: string;
  website: string;
  featured?: boolean;
}

const ToolsPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = useState(false);
  const [animatedSquares, setAnimatedSquares] = useState<Set<string>>(new Set());

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

  // Animated squares for coding atmosphere
  useEffect(() => {
    const interval = setInterval(() => {
      const allSquares = Array.from({length: 50}, (_, i) => `square-${i}`);
      const squaresToAnimate = Math.floor(Math.random() * 12) + 8;
      const selectedSquares = [];
      
      for (let i = 0; i < squaresToAnimate; i++) {
        const randomSquare = allSquares[Math.floor(Math.random() * allSquares.length)];
        selectedSquares.push(randomSquare);
      }
      
      setAnimatedSquares(new Set(selectedSquares));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const aiCodeHelpers: Tool[] = [
    {
      name: "Cursor",
      description: "AI-powered code editor with intelligent completion and chat interface",
      website: "https://cursor.sh",
      pricing: "Freemium",
      category: "AI Code Editor",
      featured: true
    },
    {
      name: "Bolt",
      description: "AI-powered full-stack web development platform for rapid prototyping",
      website: "https://bolt.new",
      pricing: "Freemium",
      category: "AI Development Platform",
      featured: true
    },
    {
      name: "v0 by Vercel",
      description: "AI-powered UI generation tool that creates React components from text descriptions",
      website: "https://v0.dev",
      pricing: "Freemium",
      category: "AI UI Generator",
      featured: true
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that suggests code completions and entire functions",
      website: "https://github.com/features/copilot",
      pricing: "Paid",
      category: "AI Code Assistant"
    },
    {
      name: "ChatGPT",
      description: "Versatile AI assistant for code review, debugging, and programming help",
      website: "https://chat.openai.com",
      pricing: "Freemium",
      category: "AI Assistant"
    },
    {
      name: "Claude",
      description: "Advanced AI assistant with strong coding capabilities and code analysis",
      website: "https://claude.ai",
      pricing: "Freemium",
      category: "AI Assistant"
    },
    {
      name: "Tabnine",
      description: "AI code completion tool that learns from your coding patterns",
      website: "https://www.tabnine.com",
      pricing: "Freemium",
      category: "AI Code Completion"
    },
    {
      name: "CodeT5",
      description: "Open-source AI model for code understanding and generation",
      website: "https://github.com/salesforce/CodeT5",
      pricing: "Free",
      category: "AI Code Model"
    }
  ];

  const [activeTrack, setActiveTrack] = React.useState(1);

  const hederaTrackTools = {
    1: {
      title: "Onchain Finance & Real-World Assets",
      description: "Leveraging DLT to enhance financial systems in Africa, emphasizing accessibility, transparency, and asset management.",
      useCases: [
        "Financial Inclusion: Building solutions for underbanked regions, micro-lending platforms, stablecoin-based remittances",
        "Asset Tokenization: Tokenizing real estate, commodities for fractional ownership and broader investment access",
        "Decentralized Financial Systems: Developing lending protocols, DEXs, and compliance platforms"
      ],
      coreTools: [
        { name: "Hedera Token Service (HTS)", description: "For tokenizing assets like real estate, commodities, and stablecoins", featured: true, website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/token-service" },
        { name: "Hedera Smart Contract Service (HSCS)", description: "For deploying DeFi systems, including lending protocols and DEXs", featured: true, website: "https://hedera.com/smart-contract" },
        { name: "Hedera Consensus Service (HCS)", description: "For logging secure and transparent transactions with immutable records", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service" },
        { name: "Mirror Nodes", description: "For efficient querying of blockchain data and real-time transaction monitoring", website: "https://docs.hedera.com/hedera/core-concepts/mirror-nodes" },
        { name: "JSON-RPC Relay", description: "Enables EVM-compatible integrations with Web3.js or Ethers.js", website: "https://docs.hedera.com/hedera/core-concepts/smart-contracts/json-rpc-relay" },
        { name: "Hedera SDKs", description: "For building custom finance dApps and integrating with wallets like HashPack", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks" }
      ],
      ecosystemProjects: [
        { name: "SaucerSwap", description: "DEX on Hedera for DeFi trading" },
        { name: "Tokeny", description: "Compliant RWA tokenization for security tokens" },
        { name: "Stader", description: "Staking and liquid staking derivatives in RWAs" },
        { name: "Bonzo", description: "DeFi platform on Hedera for financial services", website: "https://bonzo.finance/" }
      ]
    },
    2: {
      title: "DLT for Operations",
      description: "Applying Hedera's DLT to optimize operational sectors, improving efficiency, transparency, and sustainability.",
      useCases: [
        "Healthcare: Secure patient data management and drug traceability systems",
        "Agriculture: Token-based transactions for farm-to-market supply chains",
        "Supply Chain Management: Automating logistics, payments, and immutable tracking"
      ],
      coreTools: [
        { name: "Hedera Token Service (HTS)", description: "Facilitate secure transactions across healthcare, agriculture, and supply chains", featured: true, website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/token-service" },
        { name: "Hedera Smart Contract Service (HSCS)", description: "Automating business processes like payments, logistics, and compliance", featured: true, website: "https://hedera.com/smart-contract" },
        { name: "Hedera Consensus Service (HCS)", description: "Provide immutable transaction ordering and enhance transparency", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service" },
        { name: "Hedera File Service (HFS)", description: "Decentralized file storage for patient records or supply chain documents", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/file-service" },
        { name: "Mirror Nodes", description: "Real-time querying of transaction data for supply chain traceability", website: "https://docs.hedera.com/hedera/core-concepts/mirror-nodes" },
        { name: "Hedera SDKs", description: "Integrating operational dApps with external systems like IoT", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks" }
      ],
      ecosystemProjects: [
        { name: "Dovu", description: "Carbon credits and sustainability tracking in supply chains" },
        { name: "Chainlink Oracles", description: "Real-world data feeds for operations via Hedera's EVM compatibility" },
        { name: "Hedera Guardian", description: "Open-source platform for digital environmental assets and sustainability tracking", website: "https://github.com/hashgraph/guardian" }
      ]
    },
    3: {
      title: "Gaming and NFTs",
      description: "Exploring immersive digital experiences, play-to-earn models, metaverses, and community-driven economies.",
      useCases: [
        "Play-to-Earn Games: Creating games that reward players with blockchain assets",
        "Metaverse Development: Building virtual worlds for interaction and trading digital assets",
        "Digital Collectibles: Developing NFT platforms for African cultural assets with decentralized governance"
      ],
      coreTools: [
        { name: "Hedera Token Service (HTS)", description: "Creating and managing in-game currencies, NFTs, and digital assets", featured: true, website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/token-service" },
        { name: "Hedera Smart Contract Service (HSCS)", description: "Building game logic, NFT economies, and decentralized governance", featured: true, website: "https://hedera.com/smart-contract" },
        { name: "Hedera Consensus Service (HCS)", description: "Robust event logging in games and NFTs for data integrity", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service" },
        { name: "Hedera File Service (HFS)", description: "Storing NFT metadata or game assets in a decentralized manner", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/file-service" },
        { name: "Mirror Nodes", description: "Efficient querying of NFT ownership and transaction history", website: "https://docs.hedera.com/hedera/core-concepts/mirror-nodes" },
        { name: "Hedera SDKs", description: "Developing cross-platform games and integrating with wallets", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks" }
      ],
      ecosystemProjects: [
        { name: "Unity Integration", description: "Metaverse development via SDKs" }
      ]
    },
    4: {
      title: "AI and Decentralized Physical Infrastructure (DePIN)",
      description: "Integrating AI with decentralized networks to create intelligent, autonomous systems for global infrastructure.",
      useCases: [
        "AI Integration: Developing AI agents for secure decision-making in healthcare, finance, or smart cities",
        "Global DePIN Solutions: Creating networks for decentralized internet, energy, or services",
        "AI-Based Economic Systems: Optimizing tokenomics and rewards in DePIN using AI"
      ],
      sponsor: {
        name: "Supported by Hashgraph Online",
        logo: "/sponsors/hfo.png",
        description: "Leading AI development platform and proud sponsor of the AI track",
        website: "https://hashgraphonline.com",
        featured: true
      },
      coreTools: [
        { name: "Hedera Agent Kit", description: "Build Hedera-powered AI agents in under a minute with LangChain, Vercel AI SDK, or MCP", website: "https://www.npmjs.com/package/hedera-agent-kit" },
        { name: "Hedera Token Service (HTS)", description: "Managing AI-based economic systems and tokenized incentives", featured: true, website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/token-service" },
        { name: "Hedera Consensus Service (HCS)", description: "Secure, decentralized decision-making and event logging in AI applications", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service" },
        { name: "Hedera Smart Contract Service (HSCS)", description: "Automating actions in DePIN with AI logic integration", website: "https://hedera.com/smart-contract" },
        { name: "JSON-RPC Relay", description: "EVM-compatible AI integrations for cross-network DePIN", website: "https://docs.hedera.com/hedera/core-concepts/smart-contracts/json-rpc-relay" },
        { name: "Hedera SDKs", description: "Developing AI-driven dApps with oracle support for real-world data", website: "https://docs.hedera.com/hedera/sdks-and-apis/sdks" }
      ],
      ecosystemProjects: [
        { name: "Kwik Pik", description: "DePIN for logistics and delivery in Africa" },
        { name: "Drosera", description: "AI/DePIN infrastructure solutions" },
        { name: "Chainlink Oracles", description: "AI data feeds in decentralized networks via EVM" }
      ]
    }
  };

  const toolCategories = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <Globe className="w-6 h-6" />,
      color: "#3B82F6",
      tools: [
        { name: "React", description: "Popular JavaScript library for building user interfaces", website: "https://reactjs.org", pricing: "Free", category: "Framework" },
        { name: "Vue.js", description: "Progressive JavaScript framework for building UIs", website: "https://vuejs.org", pricing: "Free", category: "Framework" },
        { name: "Angular", description: "Platform for building mobile and desktop web applications", website: "https://angular.io", pricing: "Free", category: "Framework" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development", website: "https://tailwindcss.com", pricing: "Free", category: "CSS Framework" },
        { name: "Figma", description: "Collaborative interface design tool", website: "https://figma.com", pricing: "Freemium", category: "Design Tool" },
        { name: "Vite", description: "Fast build tool for modern web projects", website: "https://vitejs.dev", pricing: "Free", category: "Build Tool" }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      color: "#10B981",
      tools: [
        { name: "Node.js", description: "JavaScript runtime for server-side development", website: "https://nodejs.org", pricing: "Free", category: "Runtime" },
        { name: "Express.js", description: "Fast, minimalist web framework for Node.js", website: "https://expressjs.com", pricing: "Free", category: "Framework" },
        { name: "FastAPI", description: "Modern, fast web framework for building APIs with Python", website: "https://fastapi.tiangolo.com", pricing: "Free", category: "Framework" },
        { name: "Django", description: "High-level Python web framework", website: "https://djangoproject.com", pricing: "Free", category: "Framework" },
        { name: "PostgreSQL", description: "Advanced open source relational database", website: "https://postgresql.org", pricing: "Free", category: "Database" },
        { name: "Redis", description: "In-memory data structure store", website: "https://redis.io", pricing: "Free", category: "Database" }
      ]
    },
    {
      id: "mobile",
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      color: "#8B5CF6",
      tools: [
        { name: "React Native", description: "Framework for building mobile apps using React", website: "https://reactnative.dev", pricing: "Free", category: "Framework" },
        { name: "Flutter", description: "Google's UI toolkit for mobile, web, and desktop", website: "https://flutter.dev", pricing: "Free", category: "Framework" },
        { name: "Expo", description: "Platform for universal React applications", website: "https://expo.dev", pricing: "Freemium", category: "Platform" },
        { name: "SwiftUI", description: "Modern UI framework for iOS development", website: "https://developer.apple.com/xcode/swiftui/", pricing: "Free", category: "Framework" },
        { name: "Kotlin", description: "Modern programming language for Android development", website: "https://kotlinlang.org", pricing: "Free", category: "Language" },
        { name: "Ionic", description: "Cross-platform mobile app development framework", website: "https://ionicframework.com", pricing: "Freemium", category: "Framework" }
      ]
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      icon: <Cloud className="w-6 h-6" />,
      color: "#F59E0B",
      tools: [
        { name: "Docker", description: "Containerization platform for application deployment", website: "https://docker.com", pricing: "Freemium", category: "Containerization" },
        { name: "Kubernetes", description: "Container orchestration platform", website: "https://kubernetes.io", pricing: "Free", category: "Orchestration" },
        { name: "AWS", description: "Comprehensive cloud computing platform", website: "https://aws.amazon.com", pricing: "Freemium", category: "Cloud Platform" },
        { name: "Vercel", description: "Frontend cloud platform for static sites and serverless functions", website: "https://vercel.com", pricing: "Freemium", category: "Hosting" },
        { name: "GitHub Actions", description: "CI/CD platform integrated with GitHub", website: "https://github.com/features/actions", pricing: "Freemium", category: "CI/CD" },
        { name: "Terraform", description: "Infrastructure as code tool", website: "https://terraform.io", pricing: "Freemium", category: "Infrastructure" }
      ]
    },
    {
      id: "design",
      title: "Design & UI/UX",
      icon: <Palette className="w-6 h-6" />,
      color: "#EC4899",
      tools: [
        { name: "Figma", description: "Collaborative interface design tool", website: "https://figma.com", pricing: "Freemium", category: "Design Tool" },
        { name: "Adobe XD", description: "Vector-based user experience design tool", website: "https://adobe.com/products/xd.html", pricing: "Freemium", category: "Design Tool" },
        { name: "Sketch", description: "Digital design toolkit for Mac", website: "https://sketch.com", pricing: "Paid", category: "Design Tool" },
        { name: "Canva", description: "Graphic design platform for non-designers", website: "https://canva.com", pricing: "Freemium", category: "Graphic Design" },
        { name: "Framer", description: "Interactive design and prototyping tool", website: "https://framer.com", pricing: "Freemium", category: "Prototyping" },
        { name: "InVision", description: "Digital product design platform", website: "https://invisionapp.com", pricing: "Freemium", category: "Prototyping" }
      ]
    },
    {
      id: "testing",
      title: "Testing & Security",
      icon: <Shield className="w-6 h-6" />,
      color: "#EF4444",
      tools: [
        { name: "Jest", description: "JavaScript testing framework with focus on simplicity", website: "https://jestjs.io", pricing: "Free", category: "Testing Framework" },
        { name: "Cypress", description: "Fast, easy and reliable testing for anything that runs in a browser", website: "https://cypress.io", pricing: "Freemium", category: "E2E Testing" },
        { name: "Playwright", description: "Fast and reliable end-to-end testing framework", website: "https://playwright.dev", pricing: "Free", category: "E2E Testing" },
        { name: "SonarQube", description: "Code quality and security analysis platform", website: "https://sonarqube.org", pricing: "Freemium", category: "Code Quality" },
        { name: "OWASP ZAP", description: "Free security testing proxy", website: "https://owasp.org/www-project-zap/", pricing: "Free", category: "Security Testing" },
        { name: "Postman", description: "API development and testing platform", website: "https://postman.com", pricing: "Freemium", category: "API Testing" }
      ]
    }
  ];

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free': return 'text-green-400';
      case 'Freemium': return 'text-blue-400';
      case 'Paid': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen w-full ${isNavbarFloating ? 'pt-20' : ''}`} style={{ backgroundColor: '#EFE8F7' }}>
      {/* Animated Background Squares */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({length: 50}, (_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const isAnimated = animatedSquares.has(`square-${i}`);
          return (
            <div
              key={`square-${i}`}
              className="absolute transition-all duration-1000"
              style={{
                left: `${col * 10}%`,
                top: `${row * 20}%`,
                width: '1.5vw',
                height: '1.5vw',
                backgroundColor: isAnimated ? '#0350F3' : 'transparent',
                opacity: isAnimated ? 0.3 : 0
              }}
            />
          );
        })}
      </div>

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
              <Link to="/tools" className="nav-link text-sm text-blue-400">Tools</Link>
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
                <Link to="/tracks" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tracks</Link>
                <Link to="/tools" className="nav-link text-base block py-2 text-blue-400 transition-colors">Tools</Link>
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
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
            DEVELOPER <span style={{ color: '#0350F3' }}>TOOLS</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Discover the essential tools and technologies that power modern development. 
            From AI-powered code assistants to cutting-edge frameworks.
          </p>
          
          {/* Terminal-style decoration */}
          <div className="bg-black/90 backdrop-blur-sm p-6 max-w-2xl mx-auto mb-8 font-mono text-left">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 ml-4 text-sm">~/developer-tools</span>
            </div>
            <div className="text-green-400 text-sm">
              <span className="text-blue-400">$</span> npm install <span className="text-yellow-400">awesome-tools</span><br/>
              <span className="text-gray-400">✓ Installing developer productivity tools...</span><br/>
              <span className="text-gray-400">✓ Configuring AI assistants...</span><br/>
              <span className="text-green-400">✓ Ready to build amazing projects!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hedera Tools by Track Section - Featured */}
      <section className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
                HEDERA TOOLS BY <span className="text-blue-400">TRACK</span>
              </h2>
            </div>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Discover track-specific Hedera tools and ecosystem projects for your hackathon journey
            </p>
            
            {/* Terminal decoration */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-4 max-w-xl mx-auto font-mono text-left">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 ml-3 text-xs">~/hedera-hackathon</span>
              </div>
              <div className="text-green-400 text-xs">
                <span className="text-blue-400">$</span> hedera init --track={activeTrack}<br/>
                <span className="text-gray-400">✓ Loading track-specific tools...</span>
              </div>
            </div>
          </div>

          {/* Track Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.entries(hederaTrackTools).map(([trackId, track]) => (
                              <button
                key={trackId}
                onClick={() => setActiveTrack(parseInt(trackId))}
                className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
                  activeTrack === parseInt(trackId)
                    ? parseInt(trackId) === 4 
                      ? 'bg-yellow-600 text-white shadow-lg' 
                      : 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {track.title}
                {parseInt(trackId) === 4 && activeTrack !== 4 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Active Track Content */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 border border-blue-500/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Track {activeTrack}: {hederaTrackTools[activeTrack].title}
              </h3>
              <p className="text-gray-300 text-lg max-w-4xl mx-auto">
                {hederaTrackTools[activeTrack].description}
              </p>
            </div>

            {/* Special Sponsor Showcase for AI Track */}
            {hederaTrackTools[activeTrack].sponsor && (
              <div className="mb-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 border border-yellow-400/30">
                <div className="flex items-center space-x-4">
                  <img 
                    src={hederaTrackTools[activeTrack].sponsor.logo} 
                    alt={hederaTrackTools[activeTrack].sponsor.name}
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-yellow-400 text-xs font-semibold">AI TRACK SPONSOR</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{hederaTrackTools[activeTrack].sponsor.name}</h4>
                    <p className="text-gray-300 text-sm">{hederaTrackTools[activeTrack].sponsor.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Use Cases */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Use Cases
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {hederaTrackTools[activeTrack].useCases.map((useCase, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 border border-gray-700">
                    <p className="text-gray-300 text-sm">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tools */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-blue-400 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Core Hedera Tools
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hederaTrackTools[activeTrack].coreTools.map((tool, index) => (
                  <div 
                    key={index}
                    className={`bg-gray-800/80 p-6 border-2 transition-all duration-300 hover:scale-105 border-gray-600 hover:border-blue-400 ${tool.website ? 'cursor-pointer' : ''}`}
                    onClick={tool.website ? () => window.open(tool.website, '_blank', 'noopener,noreferrer') : undefined}
                  >
                    <h5 className="text-lg font-bold text-white mb-3">{tool.name}</h5>
                    <p className="text-gray-300 text-sm">{tool.description}</p>
                    {tool.website && (
                      <div className="mt-4 flex items-center">
                        <span className="text-blue-400 text-xs bg-blue-600/20 px-3 py-1">
                          Click to visit →
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem Projects */}
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Ecosystem Projects
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hederaTrackTools[activeTrack].ecosystemProjects.map((project, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/80 p-6 border border-gray-600 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                  >
                    <h5 className="text-lg font-bold text-white mb-3">{project.name}</h5>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                    <div className="mt-4">
                      <span className="text-purple-400 text-xs bg-purple-600/20 px-3 py-1">
                        Ecosystem
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code snippet for active track */}
            <div className="mt-10 bg-black/50 p-6 font-mono text-sm">
              <div className="text-gray-400 mb-3">// Quick start for Track {activeTrack}</div>
              <div className="text-green-400">
                <span className="text-blue-400">import</span> {`{ Client, TokenCreateTransaction }`} <span className="text-blue-400">from</span> <span className="text-orange-400">"@hashgraph/sdk"</span>;<br/>
                <span className="text-blue-400">const</span> client = Client.forTestnet();<br/>
                <span className="text-gray-400">// Build your Track {activeTrack} solution!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Code Helpers Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
                AI CODE <span style={{ color: '#0350F3' }}>HELPERS</span>
              </h2>
            </div>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
              Supercharge your development workflow with AI-powered coding assistants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCodeHelpers.map((tool, index) => (
              <div 
                key={index}
                className={`bg-white/90 p-6 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 ${
                  tool.featured ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                }`}
              >
                {tool.featured && (
                  <div className="flex items-center mb-4">
                    <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-yellow-600 text-sm font-semibold">FEATURED</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{tool.name}</h3>
                  <span className={`text-sm font-semibold px-2 py-1 ${getPricingColor(tool.pricing)}`}>
                    {tool.pricing}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1">{tool.category}</span>
                  <a 
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                  >
                    Try It →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <div className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-wider" style={{fontFamily: 'Archivo, sans-serif'}}>
              DEVELOPMENT <span style={{ color: '#0350F3' }}>CATEGORIES</span>
            </h2>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Explore tools organized by development focus areas
            </p>
            
            {/* Command line decoration */}
            <div className="bg-black/90 backdrop-blur-sm p-4 max-w-xl mx-auto font-mono text-left">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 ml-3 text-xs">~/explore-tools</span>
              </div>
              <div className="text-green-400 text-xs">
                <span className="text-blue-400">$</span> cat categories.json | grep -E "(framework|sdk|tool)"<br/>
                <span className="text-gray-400">✓ Found {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} development tools...</span>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {toolCategories.map((category, categoryIndex) => (
              <div 
                key={category.id} 
                className={`relative p-8 shadow-2xl border-2 overflow-hidden ${
                  category.special 
                    ? 'bg-gradient-to-br from-blue-900/90 to-black/90 border-blue-400 shadow-blue-400/20' 
                    : 'bg-white/90 backdrop-blur-sm border-gray-200'
                }`}
              >
                {/* Terminal header for special categories */}
                {category.special && (
                  <div className="absolute top-0 left-0 right-0 bg-gray-800 px-6 py-3 border-b border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-300 text-sm font-mono">hedera-ecosystem.json</span>
                      </div>
                      <div className="text-blue-400 text-xs font-mono">★ FEATURED ECOSYSTEM</div>
                    </div>
                  </div>
                )}

                <div className={`flex items-center mb-8 ${category.special ? 'mt-12' : ''}`}>
                  <div 
                    className={`w-14 h-14 flex items-center justify-center mr-6 shadow-lg ${
                      category.special ? 'bg-blue-600 animate-pulse' : ''
                    }`}
                    style={{ backgroundColor: category.special ? category.color : category.color }}
                  >
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold tracking-wider ${
                      category.special ? 'text-white' : 'text-gray-800'
                    }`} style={{fontFamily: 'Archivo, sans-serif'}}>
                      {category.title}
                    </h3>
                    {category.special && (
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                        <span className="text-green-400 text-sm font-mono">Hackathon Recommended</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <div 
                      key={toolIndex}
                      className={`p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 ${
                        category.special 
                          ? 'bg-gray-800/80 border-gray-600 hover:border-blue-400' 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      } ${tool.featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
                    >
                      {tool.featured && (
                        <div className="flex items-center mb-3">
                          <Zap className="w-3 h-3 text-yellow-400 mr-2" />
                          <span className="text-yellow-400 text-xs font-semibold">RECOMMENDED</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`text-lg font-bold ${
                          category.special ? 'text-white' : 'text-gray-800'
                        }`}>{tool.name}</h4>
                        <span className={`text-xs font-semibold px-2 py-1 ${getPricingColor(tool.pricing)}`}>
                          {tool.pricing}
                        </span>
                      </div>
                      <p className={`mb-4 text-sm leading-relaxed ${
                        category.special ? 'text-gray-300' : 'text-gray-600'
                      }`}>{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 ${
                          category.special 
                            ? 'bg-blue-600/30 text-blue-300' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>{tool.category}</span>
                        <a 
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-semibold transition-colors flex items-center space-x-1 ${
                            category.special 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          <span>Explore</span>
                          <Code className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Code snippet decoration for special categories */}
                {category.special && (
                  <div className="mt-8 bg-black/50 p-4 font-mono text-sm">
                    <div className="text-gray-400 mb-2">// Quick start with Hedera SDK</div>
                    <div className="text-green-400">
                      <span className="text-blue-400">const</span> client = <span className="text-yellow-400">Client</span>.forTestnet();<br/>
                      <span className="text-blue-400">const</span> accountId = <span className="text-orange-400">"0.0.123456"</span>;<br/>
                      <span className="text-gray-400">// Start building on Hedera! 🚀</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-20 bg-black relative">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <Terminal className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Level Up Your Development?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers using these tools to build the future of Web3 and blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tracks"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-colors"
            >
              Explore Hackathon Tracks
            </Link>
            <Link 
              to="/"
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-3 font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ToolsPage;