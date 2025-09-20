"use client";

import { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash2, FileText, Send } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useFormatacaoMoeda } from "../hooks/use-calculos-contrato";
import type { ContratoTableItem, TipoContrato, StatusContrato } from "../types";

interface ContratosTableProps {
  contratos: ContratoTableItem[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSendSignature: (id: string) => void;
  onGeneratePDF?: (id: string) => void;
  isLoading?: boolean;
}

const tipoContratoLabels: Record<TipoContrato, string> = {
  LOCACAO: "Locação",
  SERVICO: "Serviço",
  EVENTO: "Evento",
  TERCEIRIZACAO: "Terceirização",
};

const statusContratoLabels: Record<StatusContrato, string> = {
  RASCUNHO: "Rascunho",
  PENDENTE_ASSINATURA: "Pendente Assinatura",
  ATIVO: "Ativo",
  ENCERRADO: "Encerrado",
};

const statusContratoVariants: Record<StatusContrato, "default" | "secondary" | "destructive" | "outline"> = {
  RASCUNHO: "outline",
  PENDENTE_ASSINATURA: "secondary",
  ATIVO: "default",
  ENCERRADO: "destructive",
};

const tipoContratoVariants: Record<TipoContrato, "default" | "secondary" | "destructive" | "outline"> = {
  LOCACAO: "default",
  SERVICO: "secondary",
  EVENTO: "outline",
  TERCEIRIZACAO: "destructive",
};

export function ContratosTable({
  contratos,
  onView,
  onEdit,
  onDelete,
  onSendSignature,
  onGeneratePDF,
  isLoading = false,
}: ContratosTableProps) {
  const { formatarMoeda } = useFormatacaoMoeda();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    onDelete(id);
    setDeletingId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (contratos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum contrato encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contrato</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Veículo/Motorista</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contratos.map((contrato) => (
            <TableRow key={contrato.id}>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={tipoContratoVariants[contrato.tipo]}>
                      {tipoContratoLabels[contrato.tipo]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      #{contrato.id.slice(-6)}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{contrato.locatarioNome}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{contrato.clienteNome}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{contrato.veiculoInfo}</div>
                  {contrato.motoristaInfo && (
                    <div className="text-xs text-muted-foreground">
                      {contrato.motoristaInfo}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">
                    {format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: ptBR })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    até {format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: ptBR })}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{formatarMoeda(contrato.valor)}</div>
              </TableCell>
              <TableCell>
                <Badge variant={statusContratoVariants[contrato.status]}>
                  {statusContratoLabels[contrato.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(contrato.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(contrato.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    {contrato.status === "RASCUNHO" && (
                      <DropdownMenuItem onClick={() => onSendSignature(contrato.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar para Assinatura
                      </DropdownMenuItem>
                    )}
                    {onGeneratePDF && (
                      <DropdownMenuItem onClick={() => onGeneratePDF(contrato.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Gerar PDF
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(contrato.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deletingId === contrato.id}
                          >
                            {deletingId === contrato.id ? "Excluindo..." : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}