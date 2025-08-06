import React from "react";
import RulesSection from "./RulesSection";

const Eligibility: React.FC = () => {
  return (
    <RulesSection number={3} title="ELIGIBILITY" borderColor="border-red-500">
      {/* Who Can Participate */}
      <div className="mb-8">
        <div className="bg-green-900/20 border-l-4 border-green-500 p-6 mb-6">
          <h4
            className="font-bold mb-4 text-green-400 text-xl flex items-center"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            <span className="w-6 h-6 bg-green-500 rounded mr-3 flex items-center justify-center text-white text-sm">
              ✓
            </span>
            WHO CAN PARTICIPATE:
          </h4>
          <div className="text-gray-200 space-y-3">
            <p>
              • <strong className="text-green-400">Individuals</strong> who are at
              least the age of majority where they reside
            </p>
            <p>
              • <strong className="text-green-400">Teams</strong> of eligible
              individuals
            </p>
            <p>
              • <strong className="text-green-400">Organizations</strong>{" "}
              (including corporations, nonprofits, LLCs, partnerships, and other
              legal entities)
            </p>
          </div>
          <div className="mt-4 bg-blue-900/30 border border-blue-500 p-4">
            <p className="text-sm text-blue-200">
              <strong className="text-blue-400">Note:</strong> An individual may
              join multiple teams/organizations and enter individually.
              Teams/Organizations must appoint one Representative to act on their
              behalf.
            </p>
          </div>
        </div>
      </div>

      {/* Who Cannot Participate */}
      <div>
        <div className="bg-red-900/20 border-l-4 border-red-500 p-6">
          <h4
            className="font-bold mb-4 text-red-400 text-xl flex items-center"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            <span className="w-6 h-6 bg-red-500 rounded mr-3 flex items-center justify-center text-white text-sm">
              ✗
            </span>
            WHO CANNOT PARTICIPATE:
          </h4>
          <div className="text-gray-200 space-y-3">
            <p>
              • <strong className="text-red-400">Residents/Organizations</strong>{" "}
              in prohibited countries (including Israel, Russia, Crimea, Cuba,
              Iran, North Korea, and other OFAC-designated countries)
            </p>
            <p>
              • <strong className="text-red-400">Promotion Entities</strong> and
              their employees, representatives, agents, and immediate
              family/household members
            </p>
            <p>
              • <strong className="text-red-400">Judges</strong> and their
              employers/family/household members
            </p>
            <p>
              • <strong className="text-red-400">Affiliates</strong> of any
              prohibited organization
            </p>
            <p>
              • <strong className="text-red-400">Anyone</strong> whose
              participation would create a conflict of interest
            </p>
          </div>
          <div className="mt-4 bg-gray-800 border border-gray-600 p-4">
            <p className="text-xs text-gray-300">
              <strong className="text-gray-100">Definitions:</strong> Immediate
              family includes spouse, children, parents, siblings (including
              step-relations). Household members share residence for 3+ months/year.
              Agents act on behalf of Promotion Entities through contractual
              relationships.
            </p>
          </div>
        </div>
      </div>
    </RulesSection>
  );
};

export default Eligibility; 