import { IncomeData, CalculationResult } from "../types/calculationTypes";
import { getCountryByCode } from "../data/countries";

export const calculateNetIncome = (data: IncomeData): CalculationResult => {
  const {
    grossIncome,
    fixedExpenses,
    variableExpenses,
    taxRate,
    socialContributions,
    vatRate,
    currency,
    country,
    contractPercentage,
  } = data;

  // Calcular o rendimento bruto após aplicar a percentagem do contrato
  const adjustedGrossIncome = grossIncome * (contractPercentage / 100);

  // Calcular o total de despesas
  const totalExpenses = fixedExpenses + variableExpenses;

  // Calcular o valor do IVA/ICMS
  const vatAmount = (adjustedGrossIncome * vatRate) / 100;

  // Calcular o rendimento tributável (após despesas)
  const taxableIncome = adjustedGrossIncome - totalExpenses;

  // Calcular o imposto de renda
  const taxAmount = (taxableIncome * taxRate) / 100;

  // Calcular as contribuições sociais
  const socialContributionsAmount = (taxableIncome * socialContributions) / 100;

  // Calcular o rendimento líquido
  const netIncome = taxableIncome - taxAmount - socialContributionsAmount;

  // Calcular a margem de lucro (rendimento líquido / rendimento bruto)
  const profitMargin = (netIncome / adjustedGrossIncome) * 100;

  return {
    grossIncome,
    netIncome,
    taxAmount,
    socialContributionsAmount,
    vatAmount,
    totalExpenses,
    profitMargin,
    currency,
    country,
    fixedExpenses,
    variableExpenses,
    contractPercentage,
  };
};

export const formatCurrency = (value: number, currency: string): string => {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: currency || "EUR",
  }).format(value);
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};
