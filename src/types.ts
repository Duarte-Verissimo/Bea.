export interface IncomeData {
  grossIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  taxRate: number;
  socialContributions: number;
  vatRate: number;
  currency: string;
  country: string;
  clinic: string;
  contractPercentage: number;
}

// Definição de interface para os resultados do cálculo
export interface CalculationResult {
  grossIncome: number;
  netIncome: number;
  totalExpenses: number;
  taxAmount: number;
  socialContributionsAmount: number;
  vatAmount?: number;
  profitMargin?: number;
}
