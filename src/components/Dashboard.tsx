import React from "react";
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Receipt,
  AlertCircle,
} from "lucide-react";
import { CalculationResult } from "../types/calculationTypes";
import { formatCurrency } from "../utils/calculations";

interface DashboardProps {
  calculationResult: CalculationResult;
  onNewCalculation: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  calculationResult,
  onNewCalculation,
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <button onClick={onNewCalculation} className="btn-primary mt-2 md:mt-0">
          Novo Cálculo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Wallet className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Rendimento Líquido</p>
            <p className="text-xl font-bold text-slate-800">
              {formatCurrency(
                calculationResult.netIncome,
                calculationResult.currency
              )}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Rendimento Bruto</p>
            <p className="text-xl font-bold text-slate-800">
              {formatCurrency(
                calculationResult.grossIncome,
                calculationResult.currency
              )}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <Receipt className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total de Despesas</p>
            <p className="text-xl font-bold text-slate-800">
              {formatCurrency(
                calculationResult.totalExpenses,
                calculationResult.currency
              )}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <BarChart3 className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Impostos Totais</p>
            <p className="text-xl font-bold text-slate-800">
              {formatCurrency(
                calculationResult.taxAmount +
                  calculationResult.socialContributionsAmount,
                calculationResult.currency
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resumo Financeiro</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Rendimento Bruto:</span>
              <span className="font-medium">
                {formatCurrency(
                  calculationResult.grossIncome,
                  calculationResult.currency
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total de Despesas:</span>
              <span className="font-medium text-red-600">
                -
                {formatCurrency(
                  calculationResult.totalExpenses,
                  calculationResult.currency
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Rendimento Tributável:</span>
              <span className="font-medium">
                {formatCurrency(
                  calculationResult.grossIncome -
                    calculationResult.totalExpenses,
                  calculationResult.currency
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Imposto de Renda:</span>
              <span className="font-medium text-red-600">
                -
                {formatCurrency(
                  calculationResult.taxAmount,
                  calculationResult.currency
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Contribuições Sociais:</span>
              <span className="font-medium text-red-600">
                -
                {formatCurrency(
                  calculationResult.socialContributionsAmount,
                  calculationResult.currency
                )}
              </span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-slate-800 font-semibold">
                Rendimento Líquido:
              </span>
              <span className="font-bold text-green-600">
                {formatCurrency(
                  calculationResult.netIncome,
                  calculationResult.currency
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Dicas Financeiras</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                Considere agrupar despesas similares para melhor controle
                financeiro.
              </p>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                Mantenha registros detalhados de todas as despesas para otimizar
                deduções fiscais.
              </p>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                Consulte um contador especializado para estratégias fiscais
                específicas para a sua situação.
              </p>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                Avalie mensalmente seus gastos variáveis para identificar
                oportunidades de economia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
