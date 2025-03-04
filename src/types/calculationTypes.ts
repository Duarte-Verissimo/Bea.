import { CalculationResult as BaseCalculationResult } from "./index";

export interface IncomeData {
  grossIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  taxRate: number;
  socialContributions: number;
  vatRate: number;
  currency: string;
  country: string;
}

export interface CalculationResult extends BaseCalculationResult {
  netIncome: number;
  grossIncome: number;
  totalExpenses: number;
  taxAmount: number;
  socialContributionsAmount: number;
  currency: string;
  vatAmount: number;
  profitMargin: number;
}
