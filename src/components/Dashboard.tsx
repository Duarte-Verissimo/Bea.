import React from "react";
import { CalculationResult } from "../types";
import { ArrowLeft, Download } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import StackedList from "./StackedList";

// Registrar componentes do Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface DashboardProps {
  calculationResult: CalculationResult;
  onNewCalculation: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  calculationResult,
  onNewCalculation,
}) => {
  const {
    grossIncome,
    netIncome,
    totalExpenses,
    taxAmount,
    socialContributionsAmount,
    additionalCostItems,
    contractPercentage = 0,
    contractIncome,
  } = calculationResult as CalculationResult & {
    contractPercentage?: number;
    contractIncome?: number;
  };

  // Se contractIncome não existir, calcular com base na percentagem do contrato
  const computedContractIncome =
    contractIncome !== undefined
      ? contractIncome
      : grossIncome * (contractPercentage / 100);

  const totalDiscounts = taxAmount + socialContributionsAmount;

  // Calculamos o valor dos custos adicionais e definimos se os custos adicionais existem
  const additionalCosts = totalExpenses - grossIncome - totalDiscounts;
  const hasAdditionalCosts = Math.round(additionalCosts * 100) / 100 > 0;
  const additionalCostsList = additionalCostItems || [];
  const hasAdditionalCostItems = additionalCostsList.length > 0;

  // Debug - apenas para verificar o que está a chegar
  console.log("Custos adicionais:", additionalCostItems);
  console.log("additionalCostsList:", additionalCostsList);
  console.log("hasAdditionalCostItems:", hasAdditionalCostItems);

  // Função para formatação de moeda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  // Função para calcular percentagens
  const calculatePercentage = (part: number, total: number): number => {
    if (total === 0) return 0;
    return (part / total) * 100;
  };

  // Calcular a margem de lucro
  const margemLucro = grossIncome === 0 ? 0 : (netIncome / grossIncome) * 100;

  // Dados para o gráfico de pizza (repartição do rendimento bruto)
  const pieData = {
    labels: ["Valor Líquido", "Deduções Totais"],
    datasets: [
      {
        data: [netIncome, grossIncome - netIncome],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de barras
  const barData = {
    labels: ["Valor Bruto", "Total Despesas", "Valor Líquido Final"],
    datasets: [
      {
        label: "Valor",
        data: [grossIncome, totalExpenses, netIncome],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pt-6 h-full flex flex-col overflow-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800">
          Resultado da Análise
        </h3>
        <button
          onClick={onNewCalculation}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          aria-label="Refazer cálculo"
        >
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
          Refazer Cálculo
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-black">
              Resumo Financeiro
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-black">Valor Bruto:</span>
                <span className="font-medium text-black">
                  {formatCurrency(grossIncome)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-black">Valor do Contrato:</span>
                  <span className="font-medium text-black">
                    {formatCurrency(computedContractIncome)}
                  </span>
                </div>

                {hasAdditionalCostItems && (
                  <div className="pb-2 border-b border-slate-200">
                    <StackedList
                      title="Custos Adicionais"
                      items={additionalCostsList}
                      formatCurrency={formatCurrency}
                      totalAmount={additionalCostsList.reduce(
                        (total, item) => total + item.amount,
                        0
                      )}
                    />
                  </div>
                )}

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-black">
                    Desconto para a Segurança Social:
                  </span>
                  <span className="font-medium text-black">
                    {formatCurrency(socialContributionsAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-black">Desconto para o IRS:</span>
                  <span className="font-medium text-black">
                    {formatCurrency(taxAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-black">Total de Descontos:</span>
                  <span className="font-medium text-black">
                    {formatCurrency(totalDiscounts)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-black font-semibold">
                    Valor Líquido Final:
                  </span>
                  <span
                    className={`font-bold text-xl ${
                      netIncome < 0
                        ? "text-red-600"
                        : netIncome === 0
                        ? "text-black"
                        : "text-green-600"
                    }`}
                  >
                    {formatCurrency(netIncome)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-black">
              Distribuição do Rendimento
            </h4>
            <div className="h-48 md:h-64">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-black">
              Comparação de Valores
            </h4>
            <div className="h-48 md:h-64">
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-black">
              Indicadores Financeiros
            </h4>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-black">Margem de Lucro:</span>
                  <span className="font-medium text-black">
                    {margemLucro.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(margemLucro, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-black">Impostos e Contribuições:</span>
                  <span className="font-medium text-black">
                    {calculatePercentage(totalDiscounts, grossIncome).toFixed(
                      2
                    )}
                    % do valor bruto
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        calculatePercentage(totalDiscounts, grossIncome),
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-black">Custos Adicionais:</span>
                  <span className="font-medium text-black">
                    {calculatePercentage(totalExpenses, grossIncome).toFixed(2)}
                    % do valor bruto
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        calculatePercentage(totalExpenses, grossIncome),
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
        <strong>Nota:</strong> Este cálculo é uma estimativa. Os valores reais
        podem variar de acordo com a sua situação fiscal específica e legislação
        em vigor.
      </div>
    </div>
  );
};

export default Dashboard;
