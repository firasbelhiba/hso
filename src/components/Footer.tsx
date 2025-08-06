import React from 'react';
import { MessageCircle, Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-white pt-8 sm:pt-10 md:pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 sm:gap-7 md:gap-8 mb-6 sm:mb-7 md:mb-8">
          {/* Logo and Description Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            {/* Hedera Africa Hackathon Logo Image */}
            <div className="mb-4">
              <img
                src="/Group 86.png"
                alt="Hedera Africa Hackathon Logo"
                className="h-10 w-auto"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-full sm:max-w-xs">
              Building the future of Web3 in Africa on Hedera's sustainable, enterprise-grade public network.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://discord.com/invite/9bwrpTK6" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/hedera_hackathons/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/Hedera_Hacks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/people/Hedera-Hackathons/61575845920561/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/hedera-hackathons/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hackathon@hashgraph-association.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Explore Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tracks" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">›</span>
                  Tracks
                </Link>
              </li>
              <li>
                <Link to="/media-kit" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">›</span>
                  Media Kit
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">›</span>
                  Rules
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">›</span>
                  Contact
                </a>
              </li>

              <li>
                <a 
                  href="/#faq" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('faq');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  <span className="mr-2">›</span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://hashgraphdev.com/?code=darblockchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">›</span>
                  Education & Certification
                </a>
              </li>

            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-4 sm:mb-6 break-words">
              <a href="https://linktr.ee/HederaAfricahackathon" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </p>


          </div>
        </div>
      </div>
      {/* Full-width bottom bar */}
      <div className="w-full" style={{ backgroundColor: '#95E000' }}>
        <div className="px-4 py-2 text-sm font-medium text-gray-900 text-center">
          All Rights Reserved® 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;