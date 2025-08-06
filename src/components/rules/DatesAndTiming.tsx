import React from "react";
import RulesSection from "./RulesSection";

const DatesAndTiming: React.FC = () => {
  return (
    <RulesSection number={1} title="DATES AND TIMING" borderColor="border-blue-500">
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div className="bg-gray-900 p-6 border-l-4 border-blue-500 hover:bg-gray-800 transition-colors">
          <h4
            className="font-bold mb-3 text-blue-400 text-lg"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            SUBMISSION PERIOD
          </h4>
          <p className="text-gray-200 leading-relaxed">
            Friday, August 1, 2025 (9:00 am GMT) – Tuesday, September 30, 2025
            (11:45 pm GMT)
          </p>
        </div>
        <div className="bg-gray-900 p-6 border-l-4 border-orange-500 hover:bg-gray-800 transition-colors">
          <h4
            className="font-bold mb-3 text-orange-400 text-lg"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            JUDGING PERIOD
          </h4>
          <p className="text-gray-200 leading-relaxed">
            Wednesday, October 1, 2025 (12:00 am GMT) – Sunday, November 2,
            2025 (11:45 pm GMT)
          </p>
        </div>
        <div className="bg-gray-900 p-6 border-l-4 border-purple-500 hover:bg-gray-800 transition-colors">
          <h4
            className="font-bold mb-3 text-purple-400 text-lg"
            style={{ fontFamily: "PixelOperator8, monospace" }}
          >
            WINNERS ANNOUNCED
          </h4>
          <p className="text-gray-200 leading-relaxed">
            On or around Monday, November 3, 2025 (12:15 pm GMT)
          </p>
        </div>
      </div>
    </RulesSection>
  );
};

export default DatesAndTiming; 