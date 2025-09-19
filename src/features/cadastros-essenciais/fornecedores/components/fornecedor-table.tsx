"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import type { FornecedorTableItem } from "@/types/fornecedor";

interface FornecedorTableProps {
  fornecedores: FornecedorTableItem[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function FornecedorTable({
  fornecedores,
  onEdit,
  onView,
  onDelete,
  isLoading = false,
}: FornecedorTableProps) {
  const getTipoLabel = (tipo: string) => {
    return tipo === "VEICULO" ? "Veículo" : "Serviço";
  };

  const getStatusVariant = (status: string) => {
    return status === "ATIVO" ? "default" : "secondary";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead className="w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (fornecedores.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Razão Social</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data Cadastro</TableHead>
            <TableHead className="w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fornecedores.map((fornecedor) => (
            <TableRow key={fornecedor.id}>
              <TableCell>
                <Badge variant="outline">
                  {getTipoLabel(fornecedor.tipo)}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{fornecedor.razaoSocial}</div>
                  {fornecedor.nomeFantasia && (
                    <div className="text-sm text-muted-foreground">
                      {fornecedor.nomeFantasia}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {formatCNPJ(fornecedor.cnpj)}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{fornecedor.contatoResponsavel.nome}</div>
                  <div className="text-sm text-muted-foreground">
                    {fornecedor.contatoResponsavel.telefone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(fornecedor.status)}>
                  {fornecedor.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(fornecedor.dataCadastro)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(fornecedor.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(fornecedor.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(fornecedor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}