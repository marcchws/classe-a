import { useState, useEffect } from "react";
import { fornecedorService } from "../services/fornecedor-service";
import type {
  FornecedorTableItem,
  FornecedorFilters,
  BuscaFornecedor,
  Fornecedor,
} from "@/types/fornecedor";

export function useFornecedores(filtros: FornecedorFilters = {}) {
  const [fornecedores, setFornecedores] = useState<FornecedorTableItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarFornecedores = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const busca: BuscaFornecedor = {
        termo: filtros.termo,
        tipo: filtros.tipo,
        status: filtros.status,
        campoAtuacao: filtros.campoAtuacao as "MECANICA" | "FUNILARIA" | "PINTURA" | "HIGIENIZACAO_LIMPEZA" | "SEGURADORA" | "ELETRICA" | "AR_CONDICIONADO" | "PNEUS_RODAS" | "VIDRACARIA" | "OUTROS" | undefined,
        pagina: 1,
        limite: 100, // Carregar todos para filtros locais
      };

      const resultado = await fornecedorService.buscarFornecedores(busca);
      setFornecedores(resultado.fornecedores);
      setTotal(resultado.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar fornecedores");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarFornecedores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const refetch = () => {
    carregarFornecedores();
  };

  return {
    fornecedores,
    total,
    isLoading,
    error,
    refetch,
  };
}

export function useFornecedorById(id: string) {
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resultado = await fornecedorService.buscarFornecedorPorId(id);
        setFornecedor(resultado);

        if (!resultado) {
          setError("Fornecedor não encontrado");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar fornecedor");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      carregarFornecedor();
    }
  }, [id]);

  return {
    fornecedor,
    isLoading,
    error,
  };
}

export function useFornecedorActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const excluirFornecedor = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const sucesso = await fornecedorService.excluirFornecedor(id);
      if (!sucesso) {
        throw new Error("Não foi possível excluir o fornecedor");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir fornecedor");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const alterarStatus = async (id: string, status: "ATIVO" | "INATIVO") => {
    try {
      setIsLoading(true);
      setError(null);

      const sucesso = await fornecedorService.alterarStatusFornecedor(id, status);
      if (!sucesso) {
        throw new Error("Não foi possível alterar o status do fornecedor");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao alterar status");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    excluirFornecedor,
    alterarStatus,
    isLoading,
    error,
  };
}

export function useFornecedorEstatisticas() {
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    veiculos: 0,
    servicos: 0,
    ativos: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resultado = await fornecedorService.obterEstatisticas();
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