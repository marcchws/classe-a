import { useState, useEffect, useCallback } from "react";
import { contratoService } from "../services/contrato-service";
import type {
  ContratoTableItem,
  ContratoFilters,
  BuscaContrato,
  Contrato,
} from "../types";

export function useContratos(filtros: ContratoFilters = {}) {
  const [contratos, setContratos] = useState<ContratoTableItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarContratos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const busca: BuscaContrato = {
        termo: filtros.termo,
        tipo: filtros.tipo,
        status: filtros.status,
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        pagina: 1,
        limite: 100, // Carregar todos para filtros locais
      };

      const resultado = await contratoService.buscarContratos(busca);
      setContratos(resultado.contratos);
      setTotal(resultado.total);
      setTotalPaginas(resultado.totalPaginas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar contratos");
    } finally {
      setIsLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarContratos();
  }, [carregarContratos]);

  const refetch = useCallback(() => {
    carregarContratos();
  }, [carregarContratos]);

  return {
    contratos,
    total,
    totalPaginas,
    isLoading,
    error,
    refetch,
  };
}

export function useContratoById(id: string) {
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarContrato = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resultado = await contratoService.buscarContratoPorId(id);
        setContrato(resultado);

        if (!resultado) {
          setError("Contrato não encontrado");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar contrato");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      carregarContrato();
    }
  }, [id]);

  return {
    contrato,
    isLoading,
    error,
  };
}

export function useContratoActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const excluirContrato = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const sucesso = await contratoService.excluirContrato(id);
      if (!sucesso) {
        throw new Error("Não foi possível excluir o contrato");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir contrato");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const enviarParaAssinatura = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const sucesso = await contratoService.enviarParaAssinatura(id);
      if (!sucesso) {
        throw new Error("Não foi possível enviar o contrato para assinatura");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar para assinatura");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const criarContrato = useCallback(async (dados: Omit<Contrato, "id" | "dataCriacao">) => {
    try {
      setIsLoading(true);
      setError(null);

      const novoContrato = await contratoService.criarContrato(dados);
      return novoContrato;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar contrato");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const atualizarContrato = useCallback(async (id: string, dados: Partial<Contrato>) => {
    try {
      setIsLoading(true);
      setError(null);

      const contratoAtualizado = await contratoService.atualizarContrato(id, dados);
      return contratoAtualizado;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar contrato");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    excluirContrato,
    enviarParaAssinatura,
    criarContrato,
    atualizarContrato,
    isLoading,
    error,
  };
}

export function useContratoEstatisticas() {
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    ativos: 0,
    pendentes: 0,
    rascunhos: 0,
    encerrados: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resultado = await contratoService.obterEstatisticas();
        setEstatisticas(resultado);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar estatísticas");
      } finally {
        setIsLoading(false);
      }
    };

    carregarEstatisticas();
  }, []);

  return {
    estatisticas,
    isLoading,
    error,
  };
}
