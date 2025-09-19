"use client";

import { useRouter } from "next/navigation";
import { FornecedorForm } from "@/features/cadastros-essenciais/fornecedores/components/fornecedor-form";
import type { FornecedorFormData } from "@/types/fornecedor";

export default function NovoFornecedorPage() {
  const router = useRouter();

  const handleSubmit = async (data: FornecedorFormData) => {
    try {
      console.log("Dados do formulário:", data);

      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirecionar para a lista de fornecedores
      router.push("/cadastros/fornecedores");
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error);
    }
  };

  const handleCancel = () => {
    router.push("/cadastros/fornecedores");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Fornecedor</h1>
        <p className="text-muted-foreground">
          Cadastre um novo fornecedor de veículos ou serviços
        </p>
      </div>

      <FornecedorForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}