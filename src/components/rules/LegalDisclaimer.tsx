import React from "react";

const LegalDisclaimer: React.FC = () => {
  return (
    <div className="p-8 mb-12 border-2 border-blue-500 bg-gray-900">
      <div className="flex items-center mb-6">
        <div className="w-6 h-6 bg-blue-500 mr-4"></div>
        <h3
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          IMPORTANT LEGAL NOTICE
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-gray-200">
        <p className="text-lg">
          <strong className="text-blue-400">
            NO PURCHASE OR PAYMENT NECESSARY TO ENTER OR WIN.
          </strong>{" "}
          A PURCHASE OR PAYMENT WILL NOT INCREASE YOUR CHANCES OF WINNING.
        </p>
        <p className="text-lg">
          <strong className="text-blue-400">
            SUBMISSION OF ANY ENTRY CONSTITUTES AGREEMENT TO THESE OFFICIAL RULES
          </strong>{" "}
          as a contract between entrant (and each individual member of entrant),
          the hackathon sponsor, and DoraHacks.
        </p>
      </div>
    </div>
  );
};

export default LegalDisclaimer; 