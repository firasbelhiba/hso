import React from "react";
import RulesSection from "./RulesSection";

const SubmissionModifications: React.FC = () => {
  return (
    <RulesSection number={6} title="SUBMISSION MODIFICATIONS" borderColor="border-pink-500">
      {/* Draft Submissions */}
      <div>
        <h4
          className="font-bold mb-4 text-pink-400 text-xl"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          DRAFT SUBMISSIONS:
        </h4>
        <div className="bg-gray-800 p-6 border border-pink-500 space-y-4">
          <div className="border-l-4 border-pink-500 pl-4">
            <h5
              className="font-bold text-pink-300 mb-3 text-lg"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              SAVE DRAFTS BEFORE DEADLINE:
            </h5>
            <p className="text-gray-200 leading-relaxed mb-4">
              Prior to the end of the Submission Period, you may save draft versions
              of your submission on DoraHacks to your portfolio before submitting
              the Submission materials to the Hackathon for evaluation.
            </p>

            <div className="bg-red-900/30 p-4 border border-red-500">
              <h6
                className="font-bold text-red-300 mb-2"
                style={{ fontFamily: "PixelOperator8, monospace" }}
              >
                DEADLINE LOCK:
              </h6>
              <p className="text-gray-200 text-sm">
                Once the Submission Period has ended, you may NOT make any changes
                or alterations to your Submission, but you may continue to update
                the Project in your DoraHacks portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modifications After Submission Period */}
      <div>
        <h4
          className="font-bold mb-4 text-pink-400 text-xl"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          MODIFICATIONS AFTER SUBMISSION PERIOD:
        </h4>
        <div className="bg-gray-800 p-6 border border-pink-500 space-y-4">
          <div className="border-l-4 border-pink-500 pl-4">
            <h5
              className="font-bold text-pink-300 mb-3 text-lg"
              style={{ fontFamily: "PixelOperator8, monospace" }}
            >
              PERMITTED MODIFICATIONS:
            </h5>

            <div className="space-y-4">
              <p className="text-gray-200 leading-relaxed">
                The Sponsor and DoraHacks may permit you to modify part of your
                Submission after the Submission Period for the purpose of:
              </p>

              <div className="bg-orange-900/30 p-4 border border-orange-500">
                <h6
                  className="font-bold text-orange-300 mb-3"
                  style={{ fontFamily: "PixelOperator8, monospace" }}
                >
                  ALLOWED CHANGES:
                </h6>
                <ul className="space-y-2 text-gray-200">
                  <li>
                    • <strong className="text-orange-300">Adding, removing, or replacing</strong>{" "}
                    material that potentially infringes a third party mark or right
                  </li>
                  <li>
                    • <strong className="text-orange-300">Removing</strong> personally
                    identifiable information
                  </li>
                  <li>
                    • <strong className="text-orange-300">Replacing</strong> otherwise
                    inappropriate material
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/30 p-4 border border-green-500">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <h6
                    className="font-bold text-green-300"
                    style={{ fontFamily: "PixelOperator8, monospace" }}
                  >
                    REQUIREMENT:
                  </h6>
                </div>
                <p className="text-gray-200 text-sm">
                  The modified Submission must remain{" "}
                  <strong className="text-green-300">substantively the same</strong> as the
                  original Submission with the only modification being what the
                  Sponsor and DoraHacks permits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RulesSection>
  );
};

export default SubmissionModifications; 