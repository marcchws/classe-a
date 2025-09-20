"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ContratosTable } from "@/features/operacional/contratos/components/contratos-table";
import { ContratosFilters } from "@/features/operacional/contratos/components/contratos-filters";
import { usePDFGenerator } from "@/features/operacional/contratos/utils/pdf-generator";
import { 
  useContratos, 
  useContratoActions, 
  useContratoEstatisticas 
} from "@/features/operacional/contratos/hooks/use-contratos";
import type { ContratoFilters } from "@/features/operacional/contratos/types";

export default function ContratosPage() {
  const [filters, setFilters] = useState<ContratoFilters>({});
  const { generatePDF } = usePDFGenerator();
  const router = useRouter();
  
  // Hooks para gerenciamento de contratos
  const { contratos, isLoading, refetch } = useContratos(filters);
  const { excluirContrato, enviarParaAssinatura } = useContratoActions();
  const { estatisticas } = useContratoEstatisticas();

  // Os contratos já vêm filtrados do hook useContratos
  const contratosFiltrados = contratos;

  const handleView = (id: string) => {
    router.push(`/operacional/contratos/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/operacional/contratos/${id}/editar`);
  };

  const handleDelete = async (id: string) => {
    try {
      const sucesso = await excluirContrato(id);
      if (sucesso) {
        alert("Contrato excluído com sucesso!");
        refetch(); // Recarregar a lista
      } else {
        alert("Erro ao excluir contrato");
      }
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      alert("Erro ao excluir contrato");
    }
  };

  const handleSendSignature = async (id: string) => {
    try {
      const sucesso = await enviarParaAssinatura(id);
      if (sucesso) {
        alert("Contrato enviado para assinatura!");
        refetch(); // Recarregar a lista
      } else {
        alert("Erro ao enviar para assinatura");
      }
    } catch (error) {
      console.error("Erro ao enviar para assinatura:", error);
      alert("Erro ao enviar para assinatura");
    }
  };

  const handleGeneratePDF = async (id: string) => {
    try {
      // Buscar dados completos do contrato usando o service
      const { contratoService } = await import("@/features/operacional/contratos/services/contrato-service");
      const contratoCompleto = await contratoService.buscarContratoPorId(id);
      
      if (!contratoCompleto) {
        alert("Contrato não encontrado");
        return;
      }

      const result = await generatePDF(contratoCompleto);

      if (!result.success) {
        alert(`Erro ao gerar PDF: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF");
    }
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os contratos de locação, serviços e eventos
          </p>
        </div>
        <Link href="/operacional/contratos/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Contrato
          </Button>
        </Link>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.total}</div>
            <p className="text-xs text-muted-foreground">
              {contratosFiltrados.length} filtrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.ativos}</div>
            <p className="text-xs text-muted-foreground">
              Contratos em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.pendentes}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando assinatura
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.rascunhos}</div>
            <p className="text-xs text-muted-foreground">
              Não finalizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <ContratosFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Tabela de contratos */}
      <Card>
        <CardHeader>
          <CardTitle>
            Contratos ({contratosFiltrados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContratosTable
            contratos={contratosFiltrados}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSendSignature={handleSendSignature}
            onGeneratePDF={handleGeneratePDF}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}