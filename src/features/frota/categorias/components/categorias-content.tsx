"use client"

import * as React from "react"
import { Plus, Download, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoriaTable } from "./categoria-table"
import { CategoriaForm } from "./categoria-form"
import { CategoriaImportCSV } from "./categoria-import-csv"
import { useCategorias } from "../hooks/use-categorias"
import type { CategoriaVeiculoListItem, CategoriaVeiculoFormData } from "../types"

export function CategoriasContent() {
  const {
    categorias,
    isLoading,
    filtros,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria,
    exportarCSV,
    atualizarFiltros,
    listarCategorias,
  } = useCategorias()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [categoriaEditando, setCategoriaEditando] = React.useState<CategoriaVeiculoListItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleCreateSubmit = async (dados: CategoriaVeiculoFormData) => {
    setIsSubmitting(true)
    try {
      await criarCategoria(dados)
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (dados: CategoriaVeiculoFormData) => {
    if (!categoriaEditando?.id) return

    setIsSubmitting(true)
    try {
      await atualizarCategoria(categoriaEditando.id, dados)
      setIsEditDialogOpen(false)
      setCategoriaEditando(null)
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (categoria: CategoriaVeiculoListItem) => {
    setCategoriaEditando(categoria)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (categoria: CategoriaVeiculoListItem) => {
    if (!categoria.id) return

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir a categoria "${categoria.nome}"?\n\nEsta ação não pode ser desfeita.`
    )

    if (confirmar) {
      try {
        await excluirCategoria(categoria.id)
      } catch (error) {
        console.error("Erro ao excluir categoria:", error)
        alert("Erro ao excluir categoria. Tente novamente.")
      }
    }
  }

  const handleExport = async () => {
    try {
      await exportarCSV()
    } catch (error) {
      console.error("Erro ao exportar:", error)
      alert("Erro ao exportar dados. Tente novamente.")
    }
  }

  const handleImportSuccess = () => {
    listarCategorias()
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho com ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categorias de Veículos</h1>
          <p className="text-muted-foreground">
            Gerencie as categorias dos veículos da frota
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoriaImportCSV onImportSuccess={handleImportSuccess} />
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Nova Categoria</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar uma nova categoria de veículo.
                </DialogDescription>
              </DialogHeader>
              <CategoriaForm
                onSubmit={handleCreateSubmit}
                onCancel={() => setIsCreateDialogOpen(false)}
                isLoading={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou descrição..."
            value={filtros.termo || ""}
            onChange={(e) => atualizarFiltros({ termo: e.target.value })}
            className="pl-10"
          />
        </div>
        <Select
          value={filtros.status || "TODOS"}
          onValueChange={(value) => {
            const normalizedValue = value === "TODOS" ? undefined : value;
            atualizarFiltros({ status: normalizedValue as "ATIVO" | "INATIVO" | undefined });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos os status</SelectItem>
            <SelectItem value="ATIVO">Ativo</SelectItem>
            <SelectItem value="INATIVO">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <CategoriaTable
        dados={categorias}
        filtro={filtros.termo || ""}
        onFiltroChange={(valor) => atualizarFiltros({ termo: valor })}
        onEditar={handleEdit}
        onExcluir={handleDelete}
        isLoading={isLoading}
      />

      {/* Dialog de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open)
        if (!open) {
          setCategoriaEditando(null)
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Altere os dados da categoria &quot;{categoriaEditando?.nome}&quot;.
            </DialogDescription>
          </DialogHeader>
          {categoriaEditando && (
            <CategoriaForm
              categoria={categoriaEditando}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setCategoriaEditando(null)
              }}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}