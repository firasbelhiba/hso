import React from "react";
import RulesSection from "./RulesSection";

const SponsorAndAdministrator: React.FC = () => {
  return (
    <RulesSection number={2} title="SPONSOR AND ADMINISTRATOR" borderColor="border-green-500">
      <div className="space-y-6 text-sm">
        <div>
          <h4
            className="font-bold mb-4 text-green-400 text-xl"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            CO-FUNDERS AND CO-ORGANISERS:
          </h4>
          <ul className="space-y-3 pl-4 text-gray-200">
            <li className="border-l-2 border-blue-500 pl-4">
              <strong className="text-blue-400">Exponential Science Foundation</strong>
              <br />
              <span className="text-gray-300">
                71-75 Shelton Street, London WC2H 2JQ, United Kingdom
              </span>
            </li>
            <li className="border-l-2 border-blue-500 pl-4">
              <strong className="text-blue-400">The Hashgraph Association</strong>
              <br />
              <span className="text-gray-300">
                Zentrum Staldenbach 5, 8808 Pfäffikon SZ, Switzerland
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h4
            className="font-bold mb-4 text-green-400 text-xl"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            OPERATING PARTNER:
          </h4>
          <div className="border-l-2 border-orange-500 pl-4 text-gray-200">
            <strong className="text-orange-400">DAR Blockchain</strong>
            <br />
            <span className="text-gray-300">
              149 AVENUE DU MAINE, 75014 PARIS France
            </span>
          </div>
        </div>
      </div>
    </RulesSection>
  );
};

export default SponsorAndAdministrator; 