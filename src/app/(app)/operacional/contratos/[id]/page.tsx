"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContratoDetails } from "@/features/operacional/contratos/components/contrato-details";
import { usePDFGenerator } from "@/features/operacional/contratos/utils/pdf-generator";
import type { Contrato } from "@/features/operacional/contratos/types";

// Mock data - substitua pela chamada real da API
const mockContrato: Contrato = {
  id: "contrato-001",
  tipo: "LOCACAO",
  clienteId: "cliente-001",
  locatario: {
    nome: "João Silva",
    documento: "123.456.789-00",
    telefone: "(11) 99999-9999",
    email: "joao@email.com",
  },
  veiculoId: "veiculo-001",
  condutores: [],
  dataHoraInicio: "2024-01-15T08:00:00Z",
  dataHoraFim: "2024-01-20T18:00:00Z",
  servicosExtras: [
    {
      id: "servico-1",
      tipo: "LAVAGEM",
      descricao: "Lavagem completa",
      valor: 50,
      quantidade: 1,
    },
    {
      id: "servico-2",
      tipo: "LEVA_E_TRAZ",
      descricao: "Entrega e recolhimento",
      valor: 100,
      quantidade: 1,
    },
  ],
  termos: [],
  valorContrato: 2500,
  status: "ATIVO",
  enviarAssinaturaAutomatica: true,
  tipoEnvioAssinatura: "EMAIL",
  dataCriacao: "2024-01-10T10:00:00Z",
  dataAtualizacao: "2024-01-10T10:00:00Z",
  // Campos específicos de locação
  temMotorista: true,
  motoristaId: "motorista-001",
  diariasCalculadas: 5,
  observacoes: "Cliente VIP, atenção especial com o veículo.",
};

export default function ContratoViewPage() {
  const router = useRouter();
  const params = useParams();
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generatePDF } = usePDFGenerator();

  const contratoId = params.id as string;

  useEffect(() => {
    const loadContrato = async () => {
      try {
        setIsLoading(true);

        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Aqui você faria a chamada real para a API
        // const response = await fetch(`/api/contratos/${contratoId}`);
        // const data = await response.json();

        if (contratoId === "contrato-001") {
          setContrato(mockContrato);
        } else {
          setError("Contrato não encontrado");
        }
      } catch (err) {
        console.error("Erro ao carregar contrato:", err);
        setError("Erro ao carregar contrato");
      } finally {
        setIsLoading(false);
      }
    };

    if (contratoId) {
      loadContrato();
    }
  }, [contratoId]);

  const handleEdit = () => {
    router.push(`/operacional/contratos/${contratoId}/editar`);
  };

  const handleGeneratePDF = async () => {
    if (!contrato) return;

    try {
      const result = await generatePDF(contrato);

      if (!result.success) {
        alert(`Erro ao gerar PDF: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF");
    }
  };

  const handleSendSignature = async () => {
    try {
      // Implementar envio para assinatura
      console.log("Enviando para assinatura:", contratoId);

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aqui você implementaria o envio real para assinatura
      alert("Contrato enviado para assinatura!");
    } catch (error) {
      console.error("Erro ao enviar para assinatura:", error);
      alert("Erro ao enviar para assinatura");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Carregando contrato...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Erro</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/operacional/contratos")}
            >
              Voltar para Contratos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!contrato) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Contrato não encontrado</h2>
            <p className="text-muted-foreground">
              O contrato solicitado não foi encontrado.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/operacional/contratos")}
            >
              Voltar para Contratos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="border-l pl-4">
          <h1 className="text-xl font-semibold">Visualizar Contrato</h1>
          <p className="text-muted-foreground">
            Detalhes completos do contrato
          </p>
        </div>
      </div>

      {/* Detalhes do contrato */}
      <ContratoDetails
        contrato={contrato}
        onEdit={handleEdit}
        onGeneratePDF={handleGeneratePDF}
        onSendSignature={handleSendSignature}
      />
    </div>
  );
}