"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Gauge } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { VeiculoListItem } from "../types"

interface VeiculoTableProps {
  dados: VeiculoListItem[]
  filtro: string
  onFiltroChange: (valor: string) => void
  onEditar: (veiculo: VeiculoListItem) => void
  onExcluir: (veiculo: VeiculoListItem) => void
  onAtualizarKm: (veiculo: VeiculoListItem) => void
  isLoading?: boolean
}

export function VeiculoTable({
  dados,
  filtro,
  onFiltroChange,
  onEditar,
  onExcluir,
  onAtualizarKm,
  isLoading = false,
}: VeiculoTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const obterVariantStatus = (status: string) => {
    switch (status) {
      case "DISPONIVEL":
        return "default"
      case "ALUGADO":
        return "secondary"
      case "MANUTENCAO":
        return "destructive"
      case "INDISPONIVEL":
        return "outline"
      default:
        return "outline"
    }
  }

  const obterCorStatus = (status: string) => {
    switch (status) {
      case "DISPONIVEL":
        return "text-green-600"
      case "ALUGADO":
        return "text-blue-600"
      case "MANUTENCAO":
        return "text-red-600"
      case "INDISPONIVEL":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const columns: ColumnDef<VeiculoListItem>[] = [
    {
      accessorKey: "placa",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Placa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-mono font-medium">
          {row.getValue("placa") || "Sem placa"}
        </div>
      ),
    },
    {
      accessorKey: "marcaNome",
      header: "Marca/Modelo",
      cell: ({ row }) => {
        const veiculo = row.original
        return (
          <div>
            <div className="font-medium">{veiculo.marcaNome} {veiculo.modeloNome}</div>
            <div className="text-sm text-muted-foreground">{veiculo.versao}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "categoriaNome",
      header: "Categoria",
      cell: ({ row }) => (
        <div>{row.getValue("categoriaNome")}</div>
      ),
    },
    {
      accessorKey: "tipoCombustivel",
      header: "Combustível",
      cell: ({ row }) => {
        const tipo = row.getValue("tipoCombustivel") as string
        return <div className="capitalize">{tipo.toLowerCase()}</div>
      },
    },
    {
      accessorKey: "capacidadePassageiros",
      header: "PAX",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("capacidadePassageiros")}</div>
      ),
    },
    {
      accessorKey: "kmAtual",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            KM Atual
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const km = row.getValue("kmAtual") as number
        return (
          <div className="text-right">
            {new Intl.NumberFormat("pt-BR").format(km)} km
          </div>
        )
      },
    },
    {
      id: "blindagem",
      header: "Blindado",
      cell: ({ row }) => {
        const veiculo = row.original
        return (
          <div className="text-center">
            {veiculo.blindagem.temBlindagem ? (
              <Badge variant="secondary">Sim</Badge>
            ) : (
              <Badge variant="outline">Não</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={obterVariantStatus(status)} className={obterCorStatus(status)}>
            {status.replace("_", " ")}
          </Badge>
        )
      },
    },
    {
      accessorKey: "valorTotalCompra",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const valor = row.getValue("valorTotalCompra") as number
        return (
          <div className="text-right font-medium">
            {formatarMoeda(valor)}
          </div>
        )
      },
    },
    {
      id: "proximaManutencao",
      header: "Próxima Manutenção",
      cell: ({ row }) => {
        const veiculo = row.original
        if (!veiculo.proximaManutencao) return <div className="text-center">-</div>

        const dataManutencao = new Date(veiculo.proximaManutencao)
        const hoje = new Date()
        const diasRestantes = Math.ceil((dataManutencao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

        return (
          <div className="text-center">
            <div className="text-sm">{dataManutencao.toLocaleDateString("pt-BR")}</div>
            <div className={`text-xs ${diasRestantes <= 7 ? "text-red-600" : diasRestantes <= 30 ? "text-yellow-600" : "text-green-600"}`}>
              {diasRestantes > 0 ? `${diasRestantes} dias` : "Vencida"}
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const veiculo = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(veiculo.id || "")}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAtualizarKm(veiculo)}>
                <Gauge className="mr-2 h-4 w-4" />
                Atualizar KM
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditar(veiculo)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onExcluir(veiculo)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: dados,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar veículos..."
          value={filtro}
          onChange={(event) => onFiltroChange(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? "Carregando..." : "Nenhum veículo encontrado."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredRowModel().rows.length} veículo(s) encontrado(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}