export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  vatRates: number[];
  incomeTaxRates: number[];
  socialContributionRates: number[];
}

export const countries: Country[] = [
  {
    code: "PT",
    name: "Portugal",
    currency: "EUR",
    currencySymbol: "€",
    vatRates: [23, 13, 6],
    incomeTaxRates: [14.5, 25, 35, 45],
    socialContributionRates: [11, 21.4],
  },
  {
    code: "BR",
    name: "Brasil",
    currency: "BRL",
    currencySymbol: "R$",
    vatRates: [17, 12, 7],
    incomeTaxRates: [7.5, 15, 22.5, 27.5],
    socialContributionRates: [11, 20],
  },
  {
    code: "ES",
    name: "Espanha",
    currency: "EUR",
    currencySymbol: "€",
    vatRates: [21, 10, 4],
    incomeTaxRates: [19, 24, 30, 37, 45],
    socialContributionRates: [6.35, 29.9],
  },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code);
};
