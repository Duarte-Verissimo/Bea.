import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";
import LandingPage from "./pages/LandingPage";
import { CalculationResult } from "./types/index";
import "./App.css";
import Header from "./components/Header";
import Novidades from "./pages/Novidades";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/novidades"
          element={
            <ProtectedRoute>
              <Novidades />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
