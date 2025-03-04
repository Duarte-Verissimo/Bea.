import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";
import CalculationResults from "./components/CalculationResults";
/*import HeroSection from "./components/HeroSection";*/
import { CalculationResult } from "./types/index";
import "./App.css";

function App() {
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const handleCalculationComplete = (result: CalculationResult) => {
    console.log("Cálculo completo:", result);
    setCalculationResult(result);
    // Aqui podemos adicionar lógica adicional quando o cálculo for concluído
    // Por exemplo, salvar no localStorage, enviar para uma API, etc.
  };

  const handleNewCalculation = () => {
    setCalculationResult(null);
  };

  // Log para debug
  useEffect(() => {
    console.log("Estado atual:", {
      hasResult: !!calculationResult,
      result: calculationResult,
    });
  }, [calculationResult]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-[#eff0f3]">
        <main className="flex-1 w-full">
          <div className="mt-12 mx-auto w-full max-w-4xl">
            {!calculationResult ? (
              <Calculator onCalculationComplete={handleCalculationComplete} />
            ) : (
              <CalculationResults
                result={{
                  ...calculationResult,
                  taxAmount: calculationResult.taxAmount || 0,
                  socialContributionsAmount:
                    calculationResult.socialContributionsAmount || 0,
                  vatAmount: calculationResult.vatAmount || 0,
                  profitMargin: calculationResult.profitMargin || 0,
                }}
                onRecalculate={handleNewCalculation}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
