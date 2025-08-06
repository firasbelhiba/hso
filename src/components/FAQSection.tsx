import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is the Hedera Africa Hackathon?",
    answer:
      "A continent-wide event running from March to November 2025, focused on Web3 innovation using Hedera Hashgraph. It targets over 10,000 participants, a $1M+ prize pool, and real-world challenges in finance, operations, gaming/NFTs, and AI/DePIN.",
  },
  {
    id: 2,
    question: "Who can participate?",
    answer:
      "Open to developers, students, entrepreneurs, and innovators globally, with a focus on Africa. Teams must have 2–7 members; solo submissions are not preferred.",
  },
  {
    id: 3,
    question: "Is it online or in-person?",
    answer:
      "Hybrid format: fully online for global participants, with in-person hacking stations in 20+ African locations. Submissions via DoraHacks.",
  },
  {
    id: 4,
    question: "What are the hackathon tracks?",
    answer:
      "• On-Chain Finance & Real-World Assets\n\n• DLT for Operations\n\n• Immersive expériences\n\n• AI and DePIN",
  },
  {
    id: 5,
    question: "What is the prize pool?",
    answer: (
      <div>
        <p className="text-gray-300 mb-6">
          Total Prize Pool:{" "}
          <span className="text-green-400 font-bold">$1,000,000</span>
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-gray-800/20 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600/20">
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold"></th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  Winner
                </th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  Prize Allocation
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Hackathon Winners Section */}
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-200 font-medium" rowSpan={5}>
                  Hackathon Winners
                </td>
                <td className="px-4 py-3 text-gray-300">1st Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $100,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">2nd Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $70,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">3rd Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $60,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">4th Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $40,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">5th Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $30,000
                </td>
              </tr>

              {/* Exceptional Performers Section */}
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-200 font-medium">
                  Pot for exceptional performers
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-amber-400 font-semibold">
                  $60,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table by Tracks */}
        <div className="overflow-x-auto mt-8 mb-6">
          <table className="w-full border-collapse bg-gray-800/20 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600/20">
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold"></th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  Onchain Finance and Real-World
                </th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  DLT for Operations
                </th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  AI and DePIN
                </th>
                <th className="px-4 py-3 text-left border-b-2 border-blue-500 text-blue-300 font-semibold">
                  Immersive experience
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">1st Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $50,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $50,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $50,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $50,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">2nd Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $35,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $35,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $35,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $35,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">3rd Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $30,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $30,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $30,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $30,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">4th Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $25,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $25,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $25,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $25,000
                </td>
              </tr>
              <tr className="border-b border-gray-600/30">
                <td className="px-4 py-3 text-gray-300">5th Place</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $20,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $20,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $20,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $20,000
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-300 font-semibold">Total</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $160,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $160,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $160,000
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  $160,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    question: "How can I stay updated or get support?",
    answer:
      "Join Discord (https://discord.gg/Js38FZh3XD), Telegram (https://t.me/HederaHackathons), or visit the website. Support is available via Discord and DoraHacks forums.",
  },
];

const PixelArrow: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <img
    src="/button.png"
    alt="Toggle FAQ"
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
);

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="pt-20 pb-8 px-4 bg-[#171717]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider"
            style={{ fontFamily: "Archivo, sans-serif" }}
          >
            FAQ
          </h2>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about the hackathon
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="faq-item">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200 focus:outline-none focus:bg-gray-750"
                >
                  <span className="text-white text-lg font-medium pr-4">
                    {item.question}
                  </span>
                  <PixelArrow isOpen={openItems.includes(item.id)} />
                </button>

                <div
                  className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(item.id)
                      ? "max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-gray-300 leading-relaxed">
                        {typeof item.answer === "string" ? (
                          <div className="whitespace-pre-line">
                            {item.answer}
                          </div>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {idx !== faqData.length - 1 && (
                <div
                  className="w-full my-10"
                  style={{
                    height: "2px",
                    backgroundImage:
                      "repeating-linear-gradient(to right, #6B7280 0 20px, transparent 20px 40px)",
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
