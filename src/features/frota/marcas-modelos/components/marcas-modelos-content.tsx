"use client"

import * as React from "react"
import { Plus, Download, Upload, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { MarcaForm } from "./marca-form"
import { ModeloForm } from "./modelo-form"
import { marcaModeloService } from "../services/marca-modelo-service"
import type {
  MarcaVeiculoListItem,
  ModeloVeiculoListItem,
  MarcaVeiculoFormData,
  ModeloVeiculoFormData,
  BuscaMarcaModelo
} from "../types"

export function MarcasModelosContent() {
  const [activeTab, setActiveTab] = React.useState("marcas")
  const [marcas, setMarcas] = React.useState<MarcaVeiculoListItem[]>([])
  const [modelos, setModelos] = React.useState<ModeloVeiculoListItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreateMarcaOpen, setIsCreateMarcaOpen] = React.useState(false)
  const [isCreateModeloOpen, setIsCreateModeloOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [filtros, setFiltros] = React.useState<BuscaMarcaModelo>({
    pagina: 1,
    limite: 10,
  })

  const carregarMarcas = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const resultado = await marcaModeloService.listarMarcas(filtros)
      setMarcas(resultado.dados)
    } catch (error) {
      console.error("Erro ao carregar marcas:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filtros])

  const carregarModelos = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const resultado = await marcaModeloService.listarModelos(filtros)
      setModelos(resultado.dados)
    } catch (error) {
      console.error("Erro ao carregar modelos:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filtros])

  const carregarMarcasAtivas = React.useCallback(async () => {
    try {
      const marcasAtivas = await marcaModeloService.listarMarcasAtivas()
      return marcasAtivas
    } catch (error) {
      console.error("Erro ao carregar marcas ativas:", error)
      return []
    }
  }, [])

  const handleCreateMarca = async (dados: MarcaVeiculoFormData) => {
    setIsSubmitting(true)
    try {
      await marcaModeloService.criarMarca(dados)
      setIsCreateMarcaOpen(false)
      await carregarMarcas()
    } catch (error) {
      console.error("Erro ao criar marca:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateModelo = async (dados: ModeloVeiculoFormData) => {
    setIsSubmitting(true)
    try {
      await marcaModeloService.criarModelo(dados)
      setIsCreateModeloOpen(false)
      await carregarModelos()
    } catch (error) {
      console.error("Erro ao criar modelo:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExport = async () => {
    try {
      const blob = await marcaModeloService.exportarCSV()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `marcas-modelos-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao exportar:", error)
      alert("Erro ao exportar dados. Tente novamente.")
    }
  }

  React.useEffect(() => {
    if (activeTab === "marcas") {
      carregarMarcas()
    } else {
      carregarModelos()
    }
  }, [activeTab, carregarMarcas, carregarModelos])

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marcas e Modelos</h1>
          <p className="text-muted-foreground">
            Gerencie as marcas e modelos de veículos da frota
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar CSV
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Tabs para Marcas e Modelos */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="marcas">Marcas</TabsTrigger>
          <TabsTrigger value="modelos">Modelos</TabsTrigger>
        </TabsList>

        {/* Tab Marcas */}
        <TabsContent value="marcas" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar marcas..."
                  value={filtros.termo || ""}
                  onChange={(e) => setFiltros({ ...filtros, termo: e.target.value })}
                  className="pl-10"
                />
              </div>
              <Select
                value={filtros.status || "TODOS"}
                onValueChange={(value) => {
                  const normalizedValue = value === "TODOS" ? undefined : value;
                  setFiltros({ ...filtros, status: normalizedValue as "ATIVO" | "INATIVO" | undefined });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isCreateMarcaOpen} onOpenChange={setIsCreateMarcaOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Marca
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Nova Marca</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar uma nova marca de veículo.
                  </DialogDescription>
                </DialogHeader>
                <MarcaForm
                  onSubmit={handleCreateMarca}
                  onCancel={() => setIsCreateMarcaOpen(false)}
                  isLoading={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Marcas - Simplificada para demo */}
          <div className="grid gap-4">
            {isLoading ? (
              <p className="text-center py-8">Carregando marcas...</p>
            ) : marcas.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhuma marca encontrada.</p>
            ) : (
              marcas.map((marca) => (
                <div key={marca.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{marca.nome}</h3>
                  <p className="text-sm text-muted-foreground">{marca.observacao}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      marca.status === "ATIVO" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {marca.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Tab Modelos */}
        <TabsContent value="modelos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar modelos..."
                  value={filtros.termo || ""}
                  onChange={(e) => setFiltros({ ...filtros, termo: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <Dialog open={isCreateModeloOpen} onOpenChange={setIsCreateModeloOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Modelo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Novo Modelo</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar um novo modelo de veículo.
                  </DialogDescription>
                </DialogHeader>
                <ModeloForm
                  marcas={marcas}
                  onSubmit={handleCreateModelo}
                  onCancel={() => setIsCreateModeloOpen(false)}
                  isLoading={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Modelos - Simplificada para demo */}
          <div className="grid gap-4">
            {isLoading ? (
              <p className="text-center py-8">Carregando modelos...</p>
            ) : modelos.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhum modelo encontrado.</p>
            ) : (
              modelos.map((modelo) => (
                <div key={modelo.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{modelo.nome}</h3>
                  <p className="text-sm text-muted-foreground">{modelo.observacao}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      modelo.status === "ATIVO" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {modelo.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}