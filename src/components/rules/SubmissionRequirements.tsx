import React from "react";
import RulesSection from "./RulesSection";

const SubmissionRequirements: React.FC = () => {
  return (
    <RulesSection number={5} title="SUBMISSION REQUIREMENTS" borderColor="border-purple-500">
      {/* Main Requirements */}
      <div>
        <h4
          className="font-bold mb-4 text-purple-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          MANDATORY SUBMISSION COMPONENTS:
        </h4>
        <div className="bg-gray-800 p-6 border border-purple-500 space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h5 className="font-bold text-purple-300 mb-2 text-lg">
              PROJECT COMPONENT:
            </h5>
            <p className="text-gray-200 leading-relaxed">
              Include a Project built with required developer tools and meeting
              Project Requirements above.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h5 className="font-bold text-purple-300 mb-2 text-lg">
              TEXT DESCRIPTION:
            </h5>
            <p className="text-gray-200 leading-relaxed mb-3">
              Explain features and functionality of your Project including:
            </p>
            <ul className="space-y-2 text-gray-200">
              <li>• <strong className="text-purple-300">Policy description</strong></li>
              <li>• <strong className="text-purple-300">Workflow description</strong></li>
              <li>• <strong className="text-purple-300">[Optional]</strong> Comparative analysis to similar methodologies</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h5 className="font-bold text-purple-300 mb-2 text-lg">
              DEMONSTRATION VIDEO:
            </h5>
            <ul className="space-y-2 text-gray-200">
              <li>• <strong className="text-purple-300">Duration:</strong> Less than 3 minutes</li>
              <li>• <strong className="text-purple-300">Content:</strong> Show Project functioning on target device</li>
              <li>• <strong className="text-purple-300">Include:</strong> Solution relevance description</li>
              <li>• <strong className="text-purple-300">Platform:</strong> YouTube, Vimeo, Facebook Video, or Youku (publicly visible)</li>
              <li>• <strong className="text-purple-300">Link:</strong> Provide link on Hackathon Website submission form</li>
              <li>• <strong className="text-purple-300">Copyright:</strong> No third-party trademarks or copyrighted material without permission</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Requirements Grid */}
      <div>
        <h4
          className="font-bold mb-4 text-purple-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          ADDITIONAL REQUIREMENTS:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 border border-green-500">
            <h5
              className="font-bold text-green-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              SUBMISSION OWNERSHIP:
            </h5>
            <p className="text-gray-200 text-sm">
              Must be original work of Entrant, solely owned by Entrant, and not
              violate IP rights of any other person or entity.
            </p>
          </div>

          <div className="bg-gray-800 p-4 border border-blue-500">
            <h5
              className="font-bold text-blue-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              TESTING ACCESS:
            </h5>
            <p className="text-gray-200 text-sm">
              Provide access via website link, functioning demo, or test build.
              Include login credentials if private. Free access required until
              Judging Period ends.
            </p>
          </div>

          <div className="bg-gray-800 p-4 border border-yellow-500">
            <h5
              className="font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              LANGUAGE:
            </h5>
            <p className="text-gray-200 text-sm">
              All materials must be in English or include English translation for
              video, description, testing instructions, and other materials.
            </p>
          </div>

          <div className="bg-gray-800 p-4 border border-pink-500">
            <h5
              className="font-bold text-pink-400 mb-2"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              TEAM REPRESENTATION:
            </h5>
            <p className="text-gray-200 text-sm">
              Teams/organizations must appoint one authorized Representative to
              submit on their behalf. Representative must meet eligibility
              requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Multiple Submissions & Prize Limitation */}
      <div>
        <h4
          className="font-bold mb-4 text-purple-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          MULTIPLE SUBMISSIONS & PRIZE LIMITATION:
        </h4>
        <div className="bg-purple-900/30 p-4 border border-purple-500">
          <p className="text-gray-200 leading-relaxed mb-3">
            <strong className="text-purple-300">Multiple Entries:</strong> Entrants
            may submit multiple Submissions if each is unique and substantially
            different.
          </p>
          <div className="bg-red-900/40 p-3 border-l-4 border-red-500">
            <p className="text-sm text-red-200">
              <strong className="text-red-300">Prize Limitation:</strong> No
              Entrant (individuals, teams, or organizations) may be awarded more
              than one prize across all categories. Only highest-ranking Submission
              will be eligible for a prize; others may receive honorable mentions
              without monetary rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div>
        <h4
          className="font-bold mb-4 text-purple-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          INTELLECTUAL PROPERTY REQUIREMENTS:
        </h4>
        <div className="bg-indigo-900/30 p-4 border border-indigo-500">
          <div className="space-y-3">
            <p className="text-gray-200">
              <strong className="text-indigo-300">Your Submission must:</strong>
            </p>
            <ul className="space-y-2 text-gray-200">
              <li>• Be your (or Team/Organization's) original work product</li>
              <li>• Be solely owned by you with no other entity having rights</li>
              <li>• Not violate IP rights (copyright, trademark, patent, contract, privacy) of others</li>
            </ul>

            <div className="bg-green-900/40 p-3 border-l-4 border-green-500 mt-3">
              <p className="text-sm text-green-200">
                <strong className="text-green-300">Permitted:</strong> Third-party
                technical assistance (if you own all rights), open source
                software/hardware (with proper license compliance).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Support Warning */}
      <div>
        <h4
          className="font-bold mb-4 text-purple-400 text-lg"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          FINANCIAL OR PREFERENTIAL SUPPORT:
        </h4>
        <div className="bg-red-900/30 p-4 border border-red-500">
          <div className="space-y-3">
            <p className="font-bold text-red-300 mb-2">PROHIBITED PROJECTS:</p>
            <p className="text-gray-200 leading-relaxed">
              Projects must NOT have been developed with financial or preferential
              support from Sponsor or Administrator, including:
            </p>
            <ul className="space-y-2 text-gray-200">
              <li>• Projects that received funding/investment for development</li>
              <li>• Projects developed under contract</li>
              <li>• Projects that received commercial license</li>
            </ul>
            <p className="text-sm text-red-300">
              <strong>Note:</strong> Sponsor may disqualify projects that create
              real or apparent conflict of interest.
            </p>
          </div>
        </div>
      </div>
    </RulesSection>
  );
};

export default SubmissionRequirements; 