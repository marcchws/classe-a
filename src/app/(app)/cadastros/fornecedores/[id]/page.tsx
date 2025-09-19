"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft } from "lucide-react";
import type { Fornecedor } from "@/types/fornecedor";

interface FornecedorDetailPageProps {
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
    logradouro: "Rua das Flores, 123",
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

export default function FornecedorDetailPage({ params }: FornecedorDetailPageProps) {
  const router = useRouter();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleEdit = () => {
    router.push(`/cadastros/fornecedores/${params.id}/editar`);
  };

  const handleBack = () => {
    router.push("/cadastros/fornecedores");
  };

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </CardContent>
            </Card>
          ))}
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
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {fornecedor.razaoSocial}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">
                {getTipoLabel(fornecedor.tipo)}
              </Badge>
              <Badge variant={getStatusVariant(fornecedor.status)}>
                {fornecedor.status}
              </Badge>
              {fornecedor.nomeFantasia && (
                <span className="text-muted-foreground">
                  {fornecedor.nomeFantasia}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button onClick={handleEdit} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Editar
        </Button>
      </div>

      {/* Informações principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
              <p className="font-mono">{formatCNPJ(fornecedor.cnpj)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Cadastro</label>
              <p>{formatDate(fornecedor.dataCadastro || "")}</p>
            </div>
            {fornecedor.tipo === "VEICULO" && fornecedor.valorRepasseNegociado && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Valor de Repasse</label>
                <p>{formatCurrency(fornecedor.valorRepasseNegociado)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contato Responsável */}
        <Card>
          <CardHeader>
            <CardTitle>Contato Responsável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p>{fornecedor.contatoResponsavel.nome}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <p>{fornecedor.contatoResponsavel.telefone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">E-mail</label>
              <p>{fornecedor.contatoResponsavel.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contato Financeiro */}
        <Card>
          <CardHeader>
            <CardTitle>Contato Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p>{fornecedor.contatoFinanceiro.nome}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <p>{fornecedor.contatoFinanceiro.telefone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">E-mail</label>
              <p>{fornecedor.contatoFinanceiro.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Logradouro</label>
              <p>{fornecedor.enderecoCompleto.logradouro}, {fornecedor.enderecoCompleto.numero}</p>
              {fornecedor.enderecoCompleto.complemento && (
                <p className="text-sm text-muted-foreground">{fornecedor.enderecoCompleto.complemento}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Bairro</label>
              <p>{fornecedor.enderecoCompleto.bairro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Cidade/Estado</label>
              <p>{fornecedor.enderecoCompleto.cidade} - {fornecedor.enderecoCompleto.estado}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">CEP</label>
              <p>{fornecedor.enderecoCompleto.cep}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações específicas por tipo */}
      {fornecedor.tipo === "SERVICO" && "campoAtuacao" in fornecedor && (
        <Card>
          <CardHeader>
            <CardTitle>Campos de Atuação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {fornecedor.campoAtuacao.map((campo) => (
                <Badge key={campo} variant="secondary">
                  {campo.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}