import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, Filter, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';
import mentorsData from '../data/mentors.json';

interface Mentor {
  id: number;
  image: string;
  fullName: string;
  email: string;
  phone: string;
  professionalTitle: string;
  organization: string;
  yearsOfExperience: string;
  certifications: string | null;
  linkedinUrl: string;
  professionalSummary: string;
  technicalSkills: string[] | null;
  preferredMentorshipType: string | null;
  availability: string[] | null;
  estimatedTimeCommitment: string;
  previousMentorshipExperience: string | null;
  valueAdd: string | null;
  confirmInfoAccuracy: boolean;
}

const MentorsPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'mentor' | 'judge' | 'both'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Convert JSON data to our interface
  const mentors: Mentor[] = mentorsData as Mentor[];

  // Floating navbar scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarFloating(scrollTop > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMentors = mentors.filter(() => {
    if (activeFilter === 'all') return true;
    // For now, all mentors from JSON are considered mentors
    return activeFilter === 'mentor';
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mentor': return 'MENTOR';
      case 'judge': return 'JUDGE';
      case 'both': return 'MENTOR & JUDGE';
      default: return 'MENTOR';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mentor': return 'bg-blue-500';
      case 'judge': return 'bg-green-500';
      case 'both': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`min-h-screen w-full ${isNavbarFloating ? "pt-20" : ""}`} style={{ backgroundColor: "#EFE8F7" }}>
      {/* Navigation Bar */}
      <nav className={`${isNavbarFloating ? "fixed bg-black/90 backdrop-blur-md shadow-lg" : "absolute bg-black"} top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img src="/Group 86.png" alt="Hedera Africa Hackathon Logo" className="h-8 sm:h-10 w-auto" />
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="nav-link text-sm">Home</Link>
              <Link to="/tracks" className="nav-link text-sm">Tracks</Link>
              <Link to="/tools" className="nav-link text-sm">Tools</Link>
              <Link to="/media-kit" className="nav-link text-sm">Media Kit</Link>
              <Link to="/rules" className="nav-link text-sm">Rules</Link>
              <Link to="/mentors" className="nav-link text-sm text-blue-400">Mentors</Link>
              <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="nav-link text-sm">Contact</a>
            </div>

            {/* Desktop Register Button */}
            <div className="hidden lg:block">
              <a href="https://dorahacks.io/hackathon/hederahackafrica/detail" target="_blank" rel="noopener noreferrer" className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm hover:opacity-90 inline-block" style={{ backgroundColor: "#0350F3" }}>
                REGISTER NOW
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className={`lg:hidden p-2 ${isNavbarFloating ? "text-white" : "text-white"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-600 bg-black/90 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col space-y-4 pt-6 px-4">
                <Link to="/" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/tracks" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tracks</Link>
                <Link to="/tools" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Tools</Link>
                <Link to="/media-kit" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Media Kit</Link>
                <Link to="/rules" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Rules</Link>
                <Link to="/mentors" className="nav-link text-base block py-2 text-blue-400 transition-colors">Mentors</Link>
                <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="nav-link text-base block py-2 hover:text-blue-400 transition-colors">Contact</a>
                <a href="https://dorahacks.io/hackathon/hederahackafrica/detail" target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 font-medium transition-colors text-sm mt-4 hover:opacity-90 inline-block text-center" style={{ backgroundColor: "#0350F3" }}>
                  REGISTER NOW
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black py-20 relative overflow-hidden page-content-fade-in">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider" style={{ fontFamily: "Archivo, sans-serif" }}>
              <span className="text-blue-400">MENTORS</span> & <span className="text-green-400">JUDGES</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Meet the experts who will guide your journey and evaluate your innovations. Our mentors and judges bring decades of combined experience in blockchain, Web3, and emerging technologies.
          </p>

          {/* Back to Home Button */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
            {[
              { key: 'all', label: 'ALL', count: mentors.length },
              { key: 'mentor', label: 'MENTORS', count: mentors.length },
              { key: 'judge', label: 'JUDGES', count: 0 },
              { key: 'both', label: 'BOTH', count: 0 }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as 'all' | 'mentor' | 'judge' | 'both')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-16 bg-[#EFE8F7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 transform ${
                  hoveredCard === mentor.id ? 'scale-105 shadow-3xl -translate-y-2' : 'hover:scale-102 hover:-translate-y-1'
                }`}
                onMouseEnter={() => setHoveredCard(mentor.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header with Larger Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${getCategoryColor('mentor')}`}>
                    {getCategoryLabel('mentor')}
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Archivo, sans-serif" }}>
                      {mentor.fullName}
                    </h3>
                    <p className="text-blue-300 font-semibold text-sm">
                      {mentor.professionalTitle}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {mentor.organization}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 bg-white">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
                    {mentor.professionalSummary}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "PixelOperator8, monospace" }}>
                      EXPERTISE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.technicalSkills && mentor.technicalSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.technicalSkills && mentor.technicalSkills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                          +{mentor.technicalSkills.length - 3} more
                        </span>
                      )}
                      {!mentor.technicalSkills && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                          General Mentorship
                        </span>
                      )}
                    </div>
                  </div>



                  {/* Social Links */}
                  {mentor.linkedinUrl && (
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                      <a
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                      >
                        <span>View Profile</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No mentors found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Our mentors and judges are here to support your journey. Register now to start building with the best in the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://dorahacks.io/hackathon/hederahackafrica/detail"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-8 py-4 font-semibold transition-colors text-lg hover:opacity-90 inline-block"
              style={{ backgroundColor: "#0350F3" }}
            >
              REGISTER NOW
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

export default MentorsPage; 