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

export interface CalculationResult {
  grossIncome: number;
  netIncome: number;
  totalExpenses: number;
  taxAmount: number;
  socialContributionsAmount: number;
  vatAmount: number;
  profitMargin: number;
  currency: string;
  contractIncome: number;
  contractPercentage: number;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: "fixed" | "variable";
  date: string;
}

export interface CountryTaxInfo {
  name: string;
  code: string;
  currency: string;
  currencySymbol: string;
  vatRates: number[];
  incomeTaxRates: number[];
  socialContributionRates: number[];
}

export interface CalculatorFormData {
  percentagemContrato: number;
  tipoServico: string;
  valorBruto: number;
  alimentacao: number;
  deslocacao: number;
  ssRate: number;
  irsRate: number;
  materiais?: Material[];
}

export interface Material {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
}

export interface HeroSectionProps {
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}
