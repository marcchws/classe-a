"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContratoForm } from "@/features/operacional/contratos/components/contrato-form";
import type { Contrato } from "@/features/operacional/contratos/types";

export default function NovoContratoPage() {
  const router = useRouter();

  const handleSave = async (contrato: Contrato) => {
    try {
      // Aqui você faria a chamada para a API para salvar o contrato
      console.log("Salvando contrato:", contrato);

      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirecionar para a lista de contratos
      router.push("/operacional/contratos");
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      // Aqui você pode mostrar uma notificação de erro
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="border-l pl-4">
          <h1 className="text-2xl font-bold">Novo Contrato</h1>
          <p className="text-muted-foreground">
            Crie um novo contrato de locação, serviço ou evento
          </p>
        </div>
      </div>

      {/* Formulário */}
      <ContratoForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}