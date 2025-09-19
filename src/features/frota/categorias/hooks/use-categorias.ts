"use client"

import * as React from "react"
import { categoriaService } from "../services/categoria-service"
import type {
  CategoriaVeiculo,
  CategoriaVeiculoFormData,
  CategoriaVeiculoListItem,
  BuscaCategoriaVeiculo,
} from "../types"

export function useCategorias() {
  const [categorias, setCategorias] = React.useState<CategoriaVeiculoListItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [filtros, setFiltros] = React.useState<BuscaCategoriaVeiculo>({
    pagina: 1,
    limite: 10,
  })
  const [totalPaginas, setTotalPaginas] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  const listarCategorias = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const resultado = await categoriaService.listar(filtros)
      setCategorias(resultado.dados)
      setTotalPaginas(resultado.totalPaginas)
      setTotal(resultado.total)
    } catch (error) {
      console.error("Erro ao listar categorias:", error)
      setCategorias([])
    } finally {
      setIsLoading(false)
    }
  }, [filtros])

  const buscarCategoriaPorId = React.useCallback(async (id: string): Promise<CategoriaVeiculo | null> => {
    try {
      return await categoriaService.buscarPorId(id)
    } catch (error) {
      console.error("Erro ao buscar categoria:", error)
      return null
    }
  }, [])

  const criarCategoria = React.useCallback(async (dados: CategoriaVeiculoFormData): Promise<CategoriaVeiculo> => {
    const novaCategoria = await categoriaService.criar(dados)
    await listarCategorias() // Recarregar lista
    return novaCategoria
  }, [listarCategorias])

  const atualizarCategoria = React.useCallback(async (
    id: string,
    dados: Partial<CategoriaVeiculoFormData>
  ): Promise<CategoriaVeiculo> => {
    const categoriaAtualizada = await categoriaService.atualizar(id, dados)
    await listarCategorias() // Recarregar lista
    return categoriaAtualizada
  }, [listarCategorias])

  const excluirCategoria = React.useCallback(async (id: string): Promise<void> => {
    await categoriaService.excluir(id)
    await listarCategorias() // Recarregar lista
  }, [listarCategorias])

  const exportarCSV = React.useCallback(async (): Promise<void> => {
    try {
      const blob = await categoriaService.exportarCSV()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `categorias-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao exportar CSV:", error)
      throw error
    }
  }, [])

  const atualizarFiltros = React.useCallback((novosFiltros: Partial<BuscaCategoriaVeiculo>) => {
    setFiltros(prev => ({ ...prev, ...novosFiltros, pagina: 1 }))
  }, [])

  const mudarPagina = React.useCallback((novaPagina: number) => {
    setFiltros(prev => ({ ...prev, pagina: novaPagina }))
  }, [])

  // Carregar categorias quando os filtros mudarem
  React.useEffect(() => {
    listarCategorias()
  }, [listarCategorias])

  return {
    // Estados
    categorias,
    isLoading,
    filtros,
    totalPaginas,
    total,

    // Ações
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria,
    exportarCSV,
    atualizarFiltros,
    mudarPagina,
  }
}