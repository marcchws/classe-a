"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FornecedorForm } from "@/features/cadastros-essenciais/fornecedores/components/fornecedor-form";
import type { Fornecedor, FornecedorFormData } from "@/types/fornecedor";

interface EditarFornecedorPageProps {
  params: {
    id: string;
  };
}

// Mock data para demonstração
const mockFornecedor: Fornecedor = {
  tipo: "VEICULO",
  razaoSocial: "Locadora Premium LTDA",
  nomeFantasia: "Premium Cars",
  cnpj: "12.345.678/0001-90",
  contatoResponsavel: {
    nome: "João Silva",
    telefone: "(11) 99999-9999",
    email: "joao@premiumcars.com",
  },
  contatoFinanceiro: {
    nome: "Ana Silva",
    telefone: "(11) 88888-8888",
    email: "ana@premiumcars.com",
  },
  enderecoCompleto: {
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Sala 101",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  },
  valorRepasseNegociado: 150.00,
  status: "ATIVO",
  dataCadastro: "2024-01-15",
};

export default function EditarFornecedorPage({ params }: EditarFornecedorPageProps) {
  const router = useRouter();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadFornecedor = async () => {
      setIsLoading(true);
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFornecedor(mockFornecedor);
      setIsLoading(false);
    };

    loadFornecedor();
  }, [params.id]);

  const handleSubmit = async (data: FornecedorFormData) => {
    try {
      setIsSaving(true);
      console.log("Dados do formulário:", data);

      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirecionar para a visualização do fornecedor
      router.push(`/cadastros/fornecedores/${params.id}`);
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/cadastros/fornecedores/${params.id}`);
  };

  const handleBack = () => {
    router.push(`/cadastros/fornecedores/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mt-2" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-96 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!fornecedor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fornecedor não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Fornecedor</h1>
          <p className="text-muted-foreground">
            Atualize as informações do fornecedor {fornecedor.razaoSocial}
          </p>
        </div>
      </div>

      <FornecedorForm
        fornecedor={fornecedor}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSaving}
      />
    </div>
  );
}