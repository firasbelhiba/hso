import React from "react";

interface RulesSectionProps {
  number: number;
  title: string;
  borderColor: string;
  children: React.ReactNode;
}

const RulesSection: React.FC<RulesSectionProps> = ({
  number,
  title,
  borderColor,
  children,
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-8">
        <div
          className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-bold mr-4"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          {number}
        </div>
        <h3
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "PixelOperator8, monospace" }}
        >
          {title}
        </h3>
      </div>
      <div className={`bg-gray-900 p-8 border-l-4 ${borderColor}`}>
        <div className="space-y-6 text-sm text-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default RulesSection; 