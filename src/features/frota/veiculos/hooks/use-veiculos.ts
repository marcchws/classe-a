"use client"

import * as React from "react"
import { veiculoService } from "../services/veiculo-service"
import { categoriaService } from "../../categorias/services/categoria-service"
import { marcaModeloService } from "../../marcas-modelos/services/marca-modelo-service"
import type {
  Veiculo,
  VeiculoFormData,
  VeiculoListItem,
  BuscaVeiculo,
} from "../types"
import type { CategoriaVeiculo } from "../../categorias/types"
import type { MarcaVeiculo, ModeloVeiculo } from "../../marcas-modelos/types"

export function useVeiculos() {
  const [veiculos, setVeiculos] = React.useState<VeiculoListItem[]>([])
  const [categorias, setCategorias] = React.useState<CategoriaVeiculo[]>([])
  const [marcas, setMarcas] = React.useState<MarcaVeiculo[]>([])
  const [modelos, setModelos] = React.useState<ModeloVeiculo[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [filtros, setFiltros] = React.useState<BuscaVeiculo>({
    pagina: 1,
    limite: 10,
  })
  const [totalPaginas, setTotalPaginas] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  const listarVeiculos = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const resultado = await veiculoService.listar(filtros)
      setVeiculos(resultado.dados)
      setTotalPaginas(resultado.totalPaginas)
      setTotal(resultado.total)
    } catch (error) {
      console.error("Erro ao listar veículos:", error)
      setVeiculos([])
    } finally {
      setIsLoading(false)
    }
  }, [filtros])

  const carregarDependencias = React.useCallback(async () => {
    try {
      const [resultadoCategorias, resultadoMarcas, resultadoModelos] = await Promise.all([
        categoriaService.listar({ limite: 100 }),
        marcaModeloService.listarMarcas({ limite: 100 }),
        marcaModeloService.listarModelos({ pagina: 1, limite: 100 })
      ])

      setCategorias(resultadoCategorias.dados.filter(c => c.status === "ATIVO"))
      setMarcas(resultadoMarcas.dados.filter(m => m.status === "ATIVO"))
      setModelos(resultadoModelos.dados.filter(m => m.status === "ATIVO"))
    } catch (error) {
      console.error("Erro ao carregar dependências:", error)
    }
  }, [])

  const buscarVeiculoPorId = React.useCallback(async (id: string): Promise<Veiculo | null> => {
    try {
      return await veiculoService.buscarPorId(id)
    } catch (error) {
      console.error("Erro ao buscar veículo:", error)
      return null
    }
  }, [])

  const criarVeiculo = React.useCallback(async (dados: VeiculoFormData): Promise<Veiculo> => {
    const novoVeiculo = await veiculoService.criar(dados)
    await listarVeiculos() // Recarregar lista
    return novoVeiculo
  }, [listarVeiculos])

  const atualizarVeiculo = React.useCallback(async (
    id: string,
    dados: Partial<VeiculoFormData>
  ): Promise<Veiculo> => {
    const veiculoAtualizado = await veiculoService.atualizar(id, dados)
    await listarVeiculos() // Recarregar lista
    return veiculoAtualizado
  }, [listarVeiculos])

  const excluirVeiculo = React.useCallback(async (id: string): Promise<void> => {
    await veiculoService.excluir(id)
    await listarVeiculos() // Recarregar lista
  }, [listarVeiculos])

  const atualizarKm = React.useCallback(async (id: string, novoKm: number): Promise<void> => {
    await veiculoService.atualizarKm(id, novoKm)
    await listarVeiculos() // Recarregar lista
  }, [listarVeiculos])

  const exportarCSV = React.useCallback(async (): Promise<void> => {
    try {
      const blob = await veiculoService.exportarCSV()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `veiculos-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao exportar CSV:", error)
      throw error
    }
  }, [])

  const obterEstatisticas = React.useCallback(async () => {
    try {
      return await veiculoService.obterEstatisticas()
    } catch (error) {
      console.error("Erro ao obter estatísticas:", error)
      return {
        total: 0,
        disponiveis: 0,
        alugados: 0,
        manutencao: 0,
        indisponiveis: 0,
        proximasManutencoes: 0
      }
    }
  }, [])

  const atualizarFiltros = React.useCallback((novosFiltros: Partial<BuscaVeiculo>) => {
    setFiltros(prev => ({ ...prev, ...novosFiltros, pagina: 1 }))
  }, [])

  const mudarPagina = React.useCallback((novaPagina: number) => {
    setFiltros(prev => ({ ...prev, pagina: novaPagina }))
  }, [])

  const obterModelosPorMarca = React.useCallback((marcaId: string) => {
    return modelos.filter(modelo => modelo.marcaId === marcaId)
  }, [modelos])

  // Carregar dados iniciais
  React.useEffect(() => {
    carregarDependencias()
  }, [carregarDependencias])

  // Carregar veículos quando os filtros mudarem
  React.useEffect(() => {
    listarVeiculos()
  }, [listarVeiculos])

  return {
    // Estados
    veiculos,
    categorias,
    marcas,
    modelos,
    isLoading,
    filtros,
    totalPaginas,
    total,

    // Ações
    listarVeiculos,
    buscarVeiculoPorId,
    criarVeiculo,
    atualizarVeiculo,
    excluirVeiculo,
    atualizarKm,
    exportarCSV,
    obterEstatisticas,
    atualizarFiltros,
    mudarPagina,
    obterModelosPorMarca,
  }
}