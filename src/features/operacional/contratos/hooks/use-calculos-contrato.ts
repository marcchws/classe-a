"use client";

import { useMemo } from "react";
import type {
  CalculoDiariasParams,
  CalculoCombustivel,
  CalculoFinanceiroContrato,
  ServicoExtra,
} from "../types";

export function useCalculosDiarias(params: CalculoDiariasParams) {
  return useMemo(() => {
    if (!params.dataInicio || !params.dataFim) {
      return { diarias: 0, horasExtras: 0 };
    }

    const inicio = new Date(params.dataInicio);
    const fim = new Date(params.dataFim);
    const diferencaMs = fim.getTime() - inicio.getTime();
    const horasTotais = diferencaMs / (1000 * 60 * 60);

    const horasCorteisia = params.horasCorteisia || 3;
    const diasCompletos = Math.floor(horasTotais / 24);
    const horasResiduais = horasTotais % 24;

    let diarias = diasCompletos;
    let horasExtras = 0;

    // Se as horas residuais ultrapassam a cortesia, conta como +1 diária
    if (horasResiduais > horasCorteisia) {
      diarias += 1;
    } else if (horasResiduais > 0) {
      horasExtras = horasResiduais;
    }

    return { diarias, horasExtras };
  }, [params.dataInicio, params.dataFim, params.horasCorteisia]);
}

export function useCalculoCombustivel(calculo?: CalculoCombustivel) {
  return useMemo(() => {
    if (!calculo ||
        calculo.marcacaoRetirada === undefined ||
        calculo.marcacaoDevolucao === undefined ||
        !calculo.capacidadeTanque ||
        !calculo.valorGasolinaPorLitro) {
      return { litrosConsumidos: 0, valorBase: 0, valorComTaxa: 0 };
    }

    // Cálculo baseado na marcação em oitavos
    const oitavosConsumidos = calculo.marcacaoRetirada - calculo.marcacaoDevolucao;
    const litrosConsumidos = (calculo.capacidadeTanque / 8) * oitavosConsumidos;
    const valorBase = litrosConsumidos * calculo.valorGasolinaPorLitro;
    const taxa = calculo.taxaPercentual || 0;
    const valorComTaxa = valorBase * (1 + taxa / 100);

    return {
      litrosConsumidos: Math.max(0, litrosConsumidos),
      valorBase: Math.max(0, valorBase),
      valorComTaxa: Math.max(0, valorComTaxa),
    };
  }, [calculo]);
}

export function useCalculoFinanceiro(
  valorBase: number,
  servicosExtras: ServicoExtra[] = [],
  combustivel?: CalculoCombustivel,
  descontos: number = 0,
  repasse?: number
): CalculoFinanceiroContrato {
  const calculoCombustivel = useCalculoCombustivel(combustivel);

  return useMemo(() => {
    const valorServicosExtras = servicosExtras.reduce(
      (total, servico) => total + (servico.valor * servico.quantidade),
      0
    );

    const valorCombustivel = calculoCombustivel.valorComTaxa;

    const taxas = 0; // Pode ser implementado futuramente
    const total = valorBase + valorServicosExtras + valorCombustivel + taxas - descontos;

    return {
      valorBase,
      servicosExtras: valorServicosExtras,
      combustivel: valorCombustivel,
      taxas,
      descontos,
      total: Math.max(0, total),
      repasse,
    };
  }, [valorBase, servicosExtras, calculoCombustivel.valorComTaxa, descontos, repasse]);
}

// Hook para validar se o contrato pode ser criado
export function useValidacaoContrato(tipo: string, dados: Record<string, unknown>) {
  return useMemo(() => {
    const erros: string[] = [];

    // Validações gerais
    if (!dados.clienteId) {
      erros.push("Cliente é obrigatório");
    }

    if (!dados.dataHoraInicio || !dados.dataHoraFim) {
      erros.push("Data e hora de início e fim são obrigatórias");
    }

    if (dados.dataHoraInicio && dados.dataHoraFim) {
      const inicio = new Date(dados.dataHoraInicio as string);
      const fim = new Date(dados.dataHoraFim as string);
      if (fim <= inicio) {
        erros.push("Data de fim deve ser posterior à data de início");
      }
    }

    // Validações específicas por tipo
    switch (tipo) {
      case "LOCACAO":
        if (!dados.veiculoId && !dados.veiculoTerceirizado) {
          erros.push("Veículo é obrigatório para locação");
        }
        if (dados.temMotorista && !dados.motoristaId) {
          erros.push("Motorista é obrigatório quando locação tem motorista");
        }
        break;

      case "SERVICO":
        if (!dados.motoristaId) {
          erros.push("Motorista é obrigatório para contratos de serviço");
        }
        if (!dados.passageiro) {
          erros.push("Nome do passageiro é obrigatório");
        }
        if (!dados.localAtendimento) {
          erros.push("Local de atendimento é obrigatório");
        }
        break;

      case "EVENTO":
        if (!dados.motoristaId) {
          erros.push("Motorista é obrigatório para contratos de evento");
        }
        if (!dados.localEvento) {
          erros.push("Local do evento é obrigatório");
        }
        break;

      case "TERCEIRIZACAO":
        if (!(dados.veiculoTerceirizado as { fornecedorId?: string })?.fornecedorId) {
          erros.push("Fornecedor é obrigatório para terceirização");
        }
        if (!(dados.veiculoTerceirizado as { placa?: string })?.placa) {
          erros.push("Placa do veículo terceirizado é obrigatória");
        }
        break;
    }

    return {
      isValid: erros.length === 0,
      erros,
    };
  }, [tipo, dados]);
}

// Hook para formatar valores monetários
export function useFormatacaoMoeda() {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarPorcentagem = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(valor / 100);
  };

  return { formatarMoeda, formatarPorcentagem };
}