import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="text-center py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Sabe quanto recebe ao final do dia?
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Calcule facilmente os seus rendimentos como médico dentista. Saiba
        exatamente quanto vai receber após impostos e contribuições.
      </p>
    </div>
  );
};

export default HeroSection;
