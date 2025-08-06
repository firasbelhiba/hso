import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Users, Trophy, HelpCircle } from "lucide-react";
import Footer from "../components/Footer";
import {
  LegalDisclaimer,
  DatesAndTiming,
  SponsorAndAdministrator,
  Eligibility,
  HowToEnter,
  SubmissionRequirements,
  SubmissionModifications,
  FAQSection,
} from "../components/rules";

const RulesPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = React.useState(false);
  const [openFAQSections, setOpenFAQSections] = React.useState<Set<string>>(
    new Set()
  );
  const [openFAQItems, setOpenFAQItems] = React.useState<Set<string>>(
    new Set()
  );

  // Floating navbar scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarFloating(scrollTop > 100);
    };

    // Call handleScroll immediately to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFAQSection = (sectionId: string) => {
    setOpenFAQSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleFAQItem = (itemId: string) => {
    setOpenFAQItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const faqSections = [
    {
      id: "registration",
      title: "Registration and Teams",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
      items: [
        {
          id: "reg-1",
          question: "How do I register?",
          answer:
            "Pre-register on DoraHacks during June–July 2025. All team members must register individually. Submissions open August 1 till September 30.",
        },
        {
          id: "reg-2",
          question:
            "Do I need to complete the Hedera certification before registering?",
          answer:
            "No. Certification is mandatory during the hackathon phase, but must be completed by September 30 for submission eligibility.",
        },
        {
          id: "reg-3",
          question: "How do I create or join a team?",
          answer:
            "Use Discord or Telegram for matchmaking. From August 1, create a BUIDL on DoraHacks and add 1–6 teammates.",
        },
        {
          id: "reg-4",
          question: "What if I don't have a team?",
          answer:
            "Use Discord matchmaking channels to connect with others based on skills and interests.",
        },
        {
          id: "reg-5",
          question: "How many members can a team have?",
          answer: "Teams must have 2–7 members to be eligible.",
        },
        {
          id: "reg-6",
          question: "Can I participate solo?",
          answer:
            "Solo submissions are not preferred. Teams of at least 2 are required.",
        },
        {
          id: "reg-7",
          question: "Can I participate from outside Africa?",
          answer:
            "Yes, global participation is welcome online. In-person stations are Africa-focused.",
        },
        {
          id: "reg-8",
          question: "What if I'm new to Web3 or Hedera?",
          answer:
            "No experience needed. The free Hedera certification course starts from basics. Non-technical roles are also valuable.",
        },
        {
          id: "reg-9",
          question: "What is the wallet address field in certification?",
          answer:
            "It refers to your Hedera wallet (e.g., HashPack or Blade). You can skip it during registration and create it during the course.",
        },
      ],
    },
    {
      id: "submission",
      title: "Submission and Judging",
      icon: <Trophy className="w-6 h-6" />,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30",
      items: [
        {
          id: "sub-1",
          question: "When and how do I submit my project/idea?",
          answer:
            "Submissions open August 1 and close September 30 on DoraHacks. Create a BUIDL, add your team, and describe your idea.",
        },
        {
          id: "sub-2",
          question: "What are the submission requirements?",
          answer:
            "Teams of 2–7, completed certification, use of Hedera services, alignment with a track, and addressing real-world challenges. Submit code, demo, and pitch.",
        },
        {
          id: "sub-3",
          question: "How are projects judged?",
          answer:
            "Based on Hedera alignment, relevance, and team performance. Includes technical review, preliminary round, and final live pitches.",
        },
        {
          id: "sub-4",
          question: "What happens after the hackathon?",
          answer:
            "Top projects receive mentorship, funding, and integration support.",
        },
      ],
    },
    {
      id: "other",
      title: "Other Questions",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
      items: [
        {
          id: "other-1",
          question: "Is there a detailed schedule?",
          answer:
            "Yes: Preparation (March–May), Promotion (April–July), Hacking (August–September), Judging (October–November). Details on Discord/Telegram.",
        },
        {
          id: "other-2",
          question: "How can my organization become a partner/sponsor?",
          answer:
            "Contact via Discord or email. Sponsorship tiers range from Bronze ($10K) to Diamond ($300K), with branding and quest benefits.",
        },
        {
          id: "other-3",
          question: "What if I missed workshops?",
          answer: "Recordings are available on YouTube and Discord.",
        },
        {
          id: "other-4",
          question: "Can I host a local hacking station?",
          answer:
            "Yes, contact us on Discord for micro-grants and support for events with 100+ participants.",
        },
        {
          id: "other-5",
          question: "I'm familiar with Ethereum—can I join?",
          answer:
            "Yes, Hedera is EVM-compatible. Solidity skills apply. Certification bridges knowledge gaps.",
        },
        {
          id: "other-6",
          question: 'I get a "not found" error when registering—what do I do?',
          answer:
            "Use the correct DoraHacks link. If issues persist, contact support on Discord.",
        },
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen w-full ${isNavbarFloating ? "pt-20" : ""}`}
      style={{ backgroundColor: "#EFE8F7" }}
    >
      {/* Navigation Bar */}
      <nav
        className={`${
          isNavbarFloating
            ? "fixed bg-black/90 backdrop-blur-md shadow-lg"
            : "absolute bg-black"
        } top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
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
              <Link to="/" className="nav-link text-sm">
                Home
              </Link>
              <Link to="/tracks" className="nav-link text-sm">
                Tracks
              </Link>
              <Link to="/tools" className="nav-link text-sm">
                Tools
              </Link>
              <Link to="/media-kit" className="nav-link text-sm">
                Media Kit
              </Link>
              <Link to="/rules" className="nav-link text-sm text-blue-400">
                Rules
              </Link>

              <a
                href="https://linktr.ee/HederaAfricahackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-sm"
              >
                Contact
              </a>
            </div>

            {/* Desktop Register Button */}
            <div className="hidden lg:block">
              <a
                href="https://dorahacks.io/hackathon/hederahackafrica/detail"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-3 xl:px-4 py-1.5 font-medium transition-colors text-sm hover:opacity-90 inline-block"
                style={{ backgroundColor: "#0350F3" }}
              >
                REGISTER NOW
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 ${
                isNavbarFloating ? "text-white" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-600 bg-black/90 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col space-y-4 pt-6 px-4">
                <Link
                  to="/"
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/tracks"
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                >
                  Tracks
                </Link>
                <Link
                  to="/tools"
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                >
                  Tools
                </Link>
                <Link
                  to="/media-kit"
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                >
                  Media Kit
                </Link>
                <Link
                  to="/rules"
                  className="nav-link text-base block py-2 text-blue-400 transition-colors"
                >
                  Rules
                </Link>

                <a
                  href="https://linktr.ee/HederaAfricahackathon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-base block py-2 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="https://dorahacks.io/hackathon/hederahackafrica/detail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-4 py-2 font-medium transition-colors text-sm mt-4 hover:opacity-90 inline-block text-center"
                  style={{ backgroundColor: "#0350F3" }}
                >
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
            <h1
              className="text-4xl md:text-6xl font-bold text-white tracking-wider"
              style={{ fontFamily: "Archivo, sans-serif" }}
            >
              HACKATHON <span className="text-blue-400">RULES</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Everything you need to know about participating in Africa's largest
            Web3 hackathon. From registration to submission, we've got you
            covered.
          </p>

          {/* Terminal-style decoration */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-4 max-w-xl mx-auto font-mono text-left">
            <div className="flex items-center mb-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 ml-3 text-xs">
                ~/hackathon-rules
              </span>
            </div>
            <div className="text-green-400 text-xs">
              <span className="text-blue-400">$</span> cat rules.md
              <br />
              <span className="text-gray-400">
                ✓ Loading hackathon guidelines...
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full bg-black py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Official Rules Section */}
          <div className="max-w-4xl mx-auto">
            <LegalDisclaimer />
            <DatesAndTiming />
            <SponsorAndAdministrator />
            <Eligibility />
            <HowToEnter />
            <SubmissionRequirements />
            <SubmissionModifications />
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <FAQSection
        faqSections={faqSections}
        openFAQSections={openFAQSections}
        openFAQItems={openFAQItems}
        toggleFAQSection={toggleFAQSection}
        toggleFAQItem={toggleFAQItem}
      />

      {/* Contact Support */}
      <section className="bg-black p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Still Have Questions?
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join our community channels for real-time support and connect with
          fellow participants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://discord.com/invite/9bwrpTK6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-6 py-3 font-semibold transition-colors inline-block text-center hover:opacity-90"
            style={{ backgroundColor: "#0350F3" }}
          >
            Join Discord
          </a>
          <a
            href="https://t.me/HederaHackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 font-semibold transition-colors inline-block text-center"
          >
            Join Telegram
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Hackathon?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Now that you know the rules, it's time to register and start
            building the future of Web3 in Africa.
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

export default RulesPage;
