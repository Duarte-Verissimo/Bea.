import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HelpCircle, ArrowRight } from "lucide-react";
import {
  CalculationResult,
  CalculatorFormData,
  Material,
} from "../types/index";

interface CalculatorProps {
  onCalculationComplete?: (result: CalculationResult) => void;
}

// Lista de procedimentos odontológicos comuns
const PROCEDIMENTOS_DENTARIOS = [
  { id: "consulta", nome: "Consulta Inicial", valorMedio: 50 },
  { id: "limpeza", nome: "Limpeza Dentária", valorMedio: 60 },
  { id: "restauracao", nome: "Restauração", valorMedio: 70 },
  { id: "canal", nome: "Tratamento de Canal", valorMedio: 250 },
  { id: "extracao", nome: "Extração Simples", valorMedio: 80 },
  { id: "branqueamento", nome: "Branqueamento", valorMedio: 300 },
  { id: "implante", nome: "Implantologia", valorMedio: 900 },
  { id: "protese", nome: "Prótese Dentária", valorMedio: 500 },
  { id: "ortodontia", nome: "Ortodontia", valorMedio: 2000 },
  { id: "outro", nome: "Outro Procedimento", valorMedio: 0 },
];

// Interface para os procedimentos
interface Procedimento {
  id: string;
  nomeProcedimento: string;
  valorBruto: number;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculationComplete }) => {
  const [step, setStep] = useState(1);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([
    { id: "1", nomeProcedimento: "", valorBruto: 0 },
  ]);

  const materiaisTotal = materiais.reduce((sum, item) => sum + item.valor, 0);
  const procedimentosTotal = procedimentos.reduce(
    (sum, proc) => sum + proc.valorBruto,
    0
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    defaultValues: {
      percentagemContrato: 0,
      tipoServico: "consulta",
      valorBruto: 0,
      alimentacao: 0,
      deslocacao: 0,
      ssRate: 0,
      irsRate: 0,
    },
  });

  const formValues = watch();

  // Funções para gerenciar procedimentos
  const handleAddProcedimento = () => {
    const newId = Date.now().toString();
    setProcedimentos([
      ...procedimentos,
      { id: newId, nomeProcedimento: "", valorBruto: 0 },
    ]);
  };

  const handleRemoveProcedimento = (id: string) => {
    if (procedimentos.length <= 1) {
      return; // Manter pelo menos um procedimento
    }
    setProcedimentos(procedimentos.filter((proc) => proc.id !== id));
  };

  const handleProcedimentoChange = (
    id: string,
    field: keyof Procedimento,
    value: string | number
  ) => {
    setProcedimentos(
      procedimentos.map((proc) => {
        if (proc.id === id) {
          return { ...proc, [field]: value };
        }
        return proc;
      })
    );
  };

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      nome: "",
      valor: 0,
      quantidade: 1,
    };
    setMateriais([...materiais, newMaterial]);
  };

  const handleRemoveMaterial = (index: number) => {
    const novosMateriais = [...materiais];
    novosMateriais.splice(index, 1);
    setMateriais(novosMateriais);
  };

  const handleMaterialChange = (
    index: number,
    field: keyof Material,
    value: string | number
  ) => {
    const novosMateriais = [...materiais];
    novosMateriais[index] = { ...novosMateriais[index], [field]: value };
    setMateriais(novosMateriais);
  };

  const onSubmit: SubmitHandler<CalculatorFormData> = (data) => {
    // Calcular valores com chaves compatíveis com a interface CalculationResult
    const grossIncome = procedimentosTotal;
    const contractIncome = grossIncome * (data.percentagemContrato / 100);
    const socialContributionsAmount = contractIncome * (data.ssRate / 100);
    const taxAmount = contractIncome * (data.irsRate / 100);
    const discounts = socialContributionsAmount + taxAmount;
    const additionalCosts =
      Number(data.alimentacao) + Number(data.deslocacao) + materiaisTotal;
    const netIncome = contractIncome - discounts - additionalCosts;
    const totalExpenses =
      grossIncome - contractIncome + discounts + additionalCosts;
    const profitMargin = grossIncome > 0 ? (netIncome / grossIncome) * 100 : 0;
    const vatAmount = 0;

    const result: CalculationResult = {
      grossIncome,
      netIncome,
      totalExpenses,
      taxAmount,
      socialContributionsAmount,
      currency: "EUR",
      vatAmount,
      profitMargin,
    };

    setCalculationResult(result);

    if (onCalculationComplete) {
      onCalculationComplete(result);
    }

    // Avançar para o último passo (resultados)
    setStep(5);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const resetCalculator = () => {
    reset();
    setMateriais([]);
    setProcedimentos([
      { id: "1", nomeProcedimento: "Consulta Inicial", valorBruto: 50 },
    ]);
    setCalculationResult(null);
    setStep(1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-4 h-16">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div
              className={`
                rounded-full h-12 w-12 flex items-center justify-center font-semibold text-lg
                transition-all duration-300 ease-in-out
                ${
                  step > stepNumber
                    ? "bg-green-500 text-white shadow-md"
                    : step === stepNumber
                    ? "bg-blue-600 text-white ring-4 ring-blue-200 shadow-lg"
                    : "bg-slate-200 text-slate-500"
                }
              `}
              aria-label={`Etapa ${stepNumber} ${
                step > stepNumber
                  ? "concluída"
                  : step === stepNumber
                  ? "atual"
                  : "pendente"
              }`}
              role="status"
            >
              {step > stepNumber ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 5 && (
              <div
                className={`
                  flex-1 h-1.5 mx-2 rounded-full transition-all duration-300 ease-in-out
                  ${
                    step > stepNumber
                      ? "bg-green-500"
                      : step === stepNumber
                      ? "bg-gradient-to-r from-green-500 to-slate-200"
                      : "bg-slate-200"
                  }
                `}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Procedimento e valor bruto
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Procedimentos Dentários</h3>
            <p className="text-slate-600">
              Adicione os procedimentos dentários realizados e seus respectivos
              valores.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Lista de Procedimentos
                  </label>
                  <button
                    type="button"
                    onClick={handleAddProcedimento}
                    className="text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center rounded-md px-2 py-1"
                  >
                    <span className="mr-1">Adicionar Procedimento</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {procedimentos.map((procedimento) => (
                    <div
                      key={procedimento.id}
                      className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex-grow grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">
                            Nome do Procedimento
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ex: Limpeza, Restauração, Canal..."
                            value={procedimento.nomeProcedimento}
                            onChange={(e) =>
                              handleProcedimentoChange(
                                procedimento.id,
                                "nomeProcedimento",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">
                            Valor Cobrado (€)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500">
                              €
                            </span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-full p-2 pl-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                              value={
                                procedimento.valorBruto === 0
                                  ? ""
                                  : procedimento.valorBruto
                              }
                              onChange={(e) =>
                                handleProcedimentoChange(
                                  procedimento.id,
                                  "valorBruto",
                                  parseFloat(e.target.value || "0")
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveProcedimento(procedimento.id)
                        }
                        className="mt-[20px] self-start bg-blue-600 text-white hover:bg-blue-700 rounded-md p-1"
                        disabled={procedimentos.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">
                        Valor Total dos Procedimentos:
                      </span>
                      <span className="font-bold text-blue-800">
                        {formatCurrency(procedimentosTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
              >
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );

      case 2: // Percentagem do contrato
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Percentagem do Contrato</h3>
            <p className="text-slate-600">
              Indique a percentagem do valor do procedimento que você recebe
              segundo seu contrato com a clínica.
            </p>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Percentagem do Contrato (%)
                <div className="tooltip inline-block ml-1">
                  <HelpCircle className="h-4 w-4 text-slate-400 inline" />
                  <span className="tooltip-text">
                    Percentagem que recebe do valor total cobrado conforme seu
                    contrato com a clínica
                  </span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register("percentagemContrato", {
                    valueAsNumber: true,
                    required: "Percentagem do contrato é obrigatória",
                    min: {
                      value: 0,
                      message: "Percentagem não pode ser menor que 0",
                    },
                    max: {
                      value: 100,
                      message: "Percentagem não pode ser maior que 100",
                    },
                  })}
                  className="w-full p-2 pr-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50"
                />
                <span className="absolute right-3 top-2.5 text-slate-500">
                  %
                </span>
              </div>
              {errors.percentagemContrato && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.percentagemContrato.message}
                </p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Seu rendimento após aplicação da percentagem:
              </h4>
              <div className="text-blue-700 font-medium">
                {formatCurrency(
                  (procedimentosTotal * formValues.percentagemContrato) / 100
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
              >
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );

      case 3: // Custos adicionais
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Custos Adicionais</h3>
            <p className="text-slate-600">
              Informe os custos adicionais relacionados ao procedimento.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Materiais e Equipamentos
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center rounded-md px-2 py-1"
                  >
                    <span className="mr-1">Adicionar Material</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                {materiais.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <p className="text-slate-500">
                      Nenhum material adicionado. Clique em "Adicionar Material"
                      para incluir materiais descartáveis, instrumentos, etc.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {materiais.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex-grow">
                          <input
                            type="text"
                            className="mb-2 w-full p-2 text-black border border-gray-300 rounded-md"
                            placeholder="Nome do material (ex: luvas, brocas)"
                            value={material.nome}
                            onChange={(e) =>
                              handleMaterialChange(
                                index,
                                "nome",
                                e.target.value
                              )
                            }
                          />
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500">
                              €
                            </span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-full p-2 pl-8 text-black border border-gray-300 rounded-md"
                              placeholder="0.00"
                              value={material.valor === 0 ? "" : material.valor}
                              onChange={(e) =>
                                handleMaterialChange(
                                  index,
                                  "valor",
                                  parseFloat(e.target.value || "0")
                                )
                              }
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMaterial(index)}
                          className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md p-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}

                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-800">
                          Total de Materiais:
                        </span>
                        <span className="font-bold text-blue-800">
                          {formatCurrency(materiaisTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Custos de Alimentação (€)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500">
                      €
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register("alimentacao", {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Valor não pode ser negativo",
                        },
                      })}
                      className="w-full p-2 pl-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.alimentacao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.alimentacao.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Custos de Deslocação (€)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500">
                      €
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register("deslocacao", {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Valor não pode ser negativo",
                        },
                      })}
                      className="w-full p-2 pl-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.deslocacao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.deslocacao.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
              >
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );

      case 4: // Configurações fiscais
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Configurações Fiscais</h3>
            <p className="text-slate-600">
              Ajuste as taxas de impostos e contribuições sociais conforme sua
              situação fiscal.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Taxa de Segurança Social (%)
                  <div className="tooltip inline-block ml-1">
                    <HelpCircle className="h-4 w-4 text-slate-400 inline" />
                    <span className="tooltip-text">
                      Taxa de Segurança Social para trabalhadores independentes
                      (aproximadamente 21,4% em Portugal)
                    </span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...register("ssRate", {
                      valueAsNumber: true,
                      required: "Taxa de SS é obrigatória",
                      min: { value: 0, message: "Taxa não pode ser negativa" },
                      max: {
                        value: 100,
                        message: "Taxa não pode exceder 100%",
                      },
                    })}
                    className="w-full p-2 pr-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="21.4"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500">
                    %
                  </span>
                </div>
                {errors.ssRate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ssRate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Taxa de IRS (%)
                  <div className="tooltip inline-block ml-1">
                    <HelpCircle className="h-4 w-4 text-slate-400 inline" />
                    <span className="tooltip-text">
                      Taxa de IRS aplicável ao seu rendimento tributável. Pode
                      variar conforme o escalão de rendimentos.
                    </span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...register("irsRate", {
                      valueAsNumber: true,
                      required: "Taxa de IRS é obrigatória",
                      min: { value: 0, message: "Taxa não pode ser negativa" },
                      max: {
                        value: 100,
                        message: "Taxa não pode exceder 100%",
                      },
                    })}
                    className="w-full p-2 pr-8 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="25"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500">
                    %
                  </span>
                </div>
                {errors.irsRate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.irsRate.message}
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  Notas sobre impostos para dentistas em Portugal:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
                  <li>
                    Dentistas com recibos verdes pagam aproximadamente 21,4%
                    para a Segurança Social
                  </li>
                  <li>
                    A taxa de IRS pode variar conforme o seu escalão de
                    rendimentos
                  </li>
                  <li>
                    Caso esteja nos primeiros 12 meses de atividade, pode ter
                    isenção parcial de Segurança Social
                  </li>
                  <li>
                    Considere consultar um contabilista para otimização fiscal
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Calcular Rendimento
              </button>
            </div>
          </div>
        );

      case 5: // Resultados
        return calculationResult ? (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center">
              Resultado do Cálculo
            </h3>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between items-center py-2 border-b border-blue-200">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-blue-700 text-sm">Procedimento:</span>
                    <span className="font-medium">
                      {PROCEDIMENTOS_DENTARIOS.find(
                        (p) => p.id === formValues.tipoServico
                      )?.nome || formValues.tipoServico}
                    </span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-blue-700 text-sm">Valor Bruto:</span>
                    <span className="font-medium text-lg">
                      {formatCurrency(calculationResult.grossIncome)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-blue-200">
                  <span className="text-blue-700">
                    Valor Após Contrato ({formValues.percentagemContrato}%):
                  </span>
                  <span className="font-medium">
                    {formatCurrency(
                      calculationResult.grossIncome *
                        (formValues.percentagemContrato / 100)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-blue-200">
                  <span className="text-blue-700">
                    Desconto Segurança Social ({formValues.ssRate}%):
                  </span>
                  <span className="font-medium text-red-600">
                    -
                    {formatCurrency(
                      calculationResult.socialContributionsAmount
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-blue-200">
                  <span className="text-blue-700">
                    Desconto IRS ({formValues.irsRate}%):
                  </span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(calculationResult.taxAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-blue-200">
                  <span className="text-blue-700">Custos Adicionais:</span>
                  <span className="font-medium text-red-600">
                    -
                    {formatCurrency(
                      Number(formValues.alimentacao) +
                        Number(formValues.deslocacao) +
                        materiaisTotal
                    )}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <span className="text-lg font-bold text-blue-800">
                      Valor Líquido Final:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculationResult.netIncome)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-medium text-blue-800">
                    Detalhe dos Custos:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-700">
                          Materiais:
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(materiaisTotal)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-700">
                          Alimentação:
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(Number(formValues.alimentacao))}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-700">
                          Deslocação:
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(Number(formValues.deslocacao))}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-700">
                          Total de Impostos:
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(
                            calculationResult.taxAmount +
                              calculationResult.socialContributionsAmount
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
                <strong>Nota:</strong> Este cálculo é uma estimativa. Os valores
                reais podem variar de acordo com a sua situação fiscal
                específica e legislação em vigor.
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="button"
                onClick={resetCalculator}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Novo Cálculo
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Ajustar Valores
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-600">
              Erro ao calcular resultados. Por favor, tente novamente.
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Voltar ao início
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="calculator-container bg-white rounded-lg shadow-md p-6 min-h-[700px] flex flex-col overflow-hidden">
      <form
        className="calculator-form flex-grow overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="calculator-content space-y-6 h-full flex flex-col overflow-hidden">
          {renderStepIndicator()}
          <div className="flex-grow overflow-auto">{renderStepContent()}</div>
        </div>
      </form>
    </div>
  );
};

export default Calculator;
