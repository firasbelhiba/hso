import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  items: FAQItem[];
}

interface FAQSectionProps {
  faqSections: FAQSectionData[];
  openFAQSections: Set<string>;
  openFAQItems: Set<string>;
  toggleFAQSection: (sectionId: string) => void;
  toggleFAQItem: (itemId: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqSections,
  openFAQSections,
  openFAQItems,
  toggleFAQSection,
  toggleFAQItem,
}) => {
  return (
    <section
      className="mt-16 mb-16 w-full py-16"
      style={{ backgroundColor: "#EFE8F7" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-8 w-full">
          {faqSections.map((section) => (
            <div key={section.id} className="bg-gray-900 shadow-lg">
              {/* Section Header */}
              <button
                onClick={() => toggleFAQSection(section.id)}
                className="w-full px-8 py-6 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors border-b-2 border-blue-500"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded">
                    {section.icon}
                  </div>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "PixelOperator8, monospace" }}
                  >
                    {section.title}
                  </h3>
                </div>
                <div className="text-blue-400">
                  {openFAQSections.has(section.id) ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </button>

              {/* Section Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQSections.has(section.id)
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 py-6 space-y-6 bg-gray-900">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-700 last:border-b-0 pb-6 last:pb-0"
                    >
                      <button
                        onClick={() => toggleFAQItem(item.id)}
                        className="w-full text-left flex items-center justify-between py-3 hover:text-blue-400 transition-colors"
                      >
                        <h4
                          className="font-semibold text-gray-200 text-lg"
                          style={{ fontFamily: "PixelOperator8, monospace" }}
                        >
                          {item.question}
                        </h4>
                        <div className="text-blue-400">
                          {openFAQItems.has(item.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFAQItems.has(item.id)
                            ? "max-h-[500px] opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="text-gray-300 leading-relaxed pl-6 bg-gray-800 p-4">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
