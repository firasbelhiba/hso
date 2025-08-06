import React from "react";
import RulesSection from "./RulesSection";

const HowToEnter: React.FC = () => {
  return (
    <RulesSection number={4} title="HOW TO ENTER" borderColor="border-cyan-500">
      {/* Registration Steps */}
      <div>
        <h4
          className="font-bold mb-4 text-cyan-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          REGISTRATION STEPS:
        </h4>
        <div className="bg-gray-800 p-6 border border-cyan-500 space-y-4">
          <p className="text-gray-200">
            <strong className="text-cyan-400">Visit:</strong>{" "}
            <a
              href="https://hedera-hackathon.hashgraph.swiss/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              https://hedera-hackathon.hashgraph.swiss/
            </a>{" "}
            (Hackathon Website)
          </p>

          <div className="space-y-3">
            <p className="text-gray-200">
              <strong className="text-cyan-400">1. Register:</strong> Click the
              "Register" button on the Hackathon Website
            </p>
            <p className="text-gray-200">
              <strong className="text-cyan-400">2. Account:</strong> Sign up for a
              free DoraHacks account or log in with existing account
            </p>
            <p className="text-gray-200">
              <strong className="text-cyan-400">3. Access:</strong> Obtain access
              to Hedera tools and complete your Project
            </p>
            <p className="text-gray-200">
              <strong className="text-cyan-400">4. Submit:</strong> Complete all
              required fields on "Enter a Submission" page during Submission Period
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-900/30 border-l-4 border-blue-500">
            <p className="text-sm text-blue-200">
              <strong className="text-blue-400">Note:</strong> Entry constitutes
              consent for Sponsor and DoraHacks to collect and maintain personal
              information for hackathon operation and publicity.
            </p>
          </div>
        </div>
      </div>

      {/* Project Requirements */}
      <div>
        <h4
          className="font-bold mb-3"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          PROJECT REQUIREMENTS:
        </h4>

        {/* What to Create */}
        <div className="bg-black/50 p-4 border border-orange-400 mb-4">
          <h5
            className="font-bold text-yellow-400 mb-2"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            WHAT TO CREATE:
          </h5>
          <p>
            Create a working prototype/MVP that uses Hedera Infrastructure across
            these tracks:
          </p>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              • <strong>1. Onchain Finance & Real-World Assets</strong>
            </li>
            <li>• <strong>2. DLT for Operations</strong></li>
            <li>• <strong>3. AI & DePIN</strong></li>
            <li>• <strong>4. Immersive Experiences</strong></li>
          </ul>
        </div>

        {/* Technical Requirements Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/50 p-4 border border-yellow-400">
            <h5
              className="font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              FUNCTIONALITY:
            </h5>
            <p className="text-xs">
              Project must be capable of successful installation, running
              consistently on intended platform, and function as depicted in
              video/description.
            </p>
          </div>

          <div className="bg-black/50 p-4 border border-yellow-400">
            <h5
              className="font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              PLATFORMS:
            </h5>
            <p className="text-xs">
              Submitted Project must run on the platform for which it is intended
              and specified in Submission Requirements.
            </p>
          </div>

          <div className="bg-black/50 p-4 border border-yellow-400">
            <h5
              className="font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              PITCH DECK:
            </h5>
            <p className="text-xs">
              Must clearly outline: Problem, Solution, Product, Market Size,
              Target Customer, Value Proposition, and Ask.
            </p>
          </div>

          <div className="bg-black/50 p-4 border border-yellow-400">
            <h5
              className="font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              NEW & EXISTING:
            </h5>
            <p className="text-xs">
              Projects must be newly created OR significantly updated after
              Hackathon start. Explain updates made during Submission Period.
            </p>
          </div>
        </div>

        {/* Third Party Integrations */}
        <div className="bg-red-900/30 p-4 border border-red-400 mt-4">
          <h5
            className="font-bold text-red-400 mb-2"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            ⚠️ THIRD PARTY INTEGRATIONS:
          </h5>
          <p className="text-xs">
            If Project integrates any third-party SDK, APIs, and/or data, Entrant
            must be authorized to use them in accordance with terms, conditions, or
            licensing requirements.
          </p>
        </div>
      </div>
    </RulesSection>
  );
};

export default HowToEnter; 