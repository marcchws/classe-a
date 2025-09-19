"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { FornecedorTable } from "@/features/cadastros-essenciais/fornecedores/components/fornecedor-table";
import { FornecedorFiltersComponent } from "@/features/cadastros-essenciais/fornecedores/components/fornecedor-filters";
import { useFornecedorActions } from "@/features/cadastros-essenciais/fornecedores/hooks/use-fornecedores";
import type { FornecedorTableItem, FornecedorFilters } from "@/types/fornecedor";
import { useRouter } from "next/navigation";

// Mock data para demonstração
const mockFornecedores: FornecedorTableItem[] = [
  {
    id: "1",
    tipo: "VEICULO",
    razaoSocial: "Locadora Premium LTDA",
    nomeFantasia: "Premium Cars",
    cnpj: "12.345.678/0001-90",
    contatoResponsavel: {
      nome: "João Silva",
      telefone: "(11) 99999-9999",
      email: "joao@premiumcars.com",
    },
    status: "ATIVO",
    dataCadastro: "2024-01-15",
  },
  {
    id: "2",
    tipo: "SERVICO",
    razaoSocial: "Oficina Master ME",
    nomeFantasia: "Master Auto",
    cnpj: "98.765.432/0001-10",
    contatoResponsavel: {
      nome: "Maria Santos",
      telefone: "(11) 88888-8888",
      email: "maria@masterauto.com",
    },
    status: "ATIVO",
    dataCadastro: "2024-02-20",
  },
  {
    id: "3",
    tipo: "SERVICO",
    razaoSocial: "Clean Pro Higienização",
    cnpj: "11.222.333/0001-44",
    contatoResponsavel: {
      nome: "Carlos Oliveira",
      telefone: "(11) 77777-7777",
      email: "carlos@cleanpro.com",
    },
    status: "INATIVO",
    dataCadastro: "2024-01-10",
  },
];

export default function FornecedoresPage() {
  const router = useRouter();
  const { excluirFornecedor, isLoading: isDeleting } = useFornecedorActions();
  const [fornecedores, setFornecedores] = useState<FornecedorTableItem[]>([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState<FornecedorTableItem[]>([]);
  const [filters, setFilters] = useState<FornecedorFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento dos dados
  useEffect(() => {
    const loadFornecedores = async () => {
      setIsLoading(true);
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFornecedores(mockFornecedores);
      setFilteredFornecedores(mockFornecedores);
      setIsLoading(false);
    };

    loadFornecedores();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...fornecedores];

    if (filters.termo) {
      const termo = filters.termo.toLowerCase();
      filtered = filtered.filter(fornecedor =>
        fornecedor.razaoSocial.toLowerCase().includes(termo) ||
        fornecedor.nomeFantasia?.toLowerCase().includes(termo) ||
        fornecedor.cnpj.includes(termo) ||
        fornecedor.contatoResponsavel.nome.toLowerCase().includes(termo)
      );
    }

    if (filters.tipo) {
      filtered = filtered.filter(fornecedor => fornecedor.tipo === filters.tipo);
    }

    if (filters.status) {
      filtered = filtered.filter(fornecedor => fornecedor.status === filters.status);
    }

    setFilteredFornecedores(filtered);
  }, [filters, fornecedores]);

  const handleFiltersChange = (newFilters: FornecedorFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleEdit = (id: string) => {
    router.push(`/cadastros/fornecedores/${id}/editar`);
  };

  const handleView = (id: string) => {
    router.push(`/cadastros/fornecedores/${id}`);
  };

  const handleDelete = async (id: string) => {
    // Encontrar o fornecedor para mostrar informações na confirmação
    const fornecedor = fornecedores.find(f => f.id === id);
    if (!fornecedor) return;

    // Diálogo de confirmação
    const confirmMessage = `Tem certeza que deseja excluir o fornecedor "${fornecedor.razaoSocial}"?\n\nEsta ação não pode ser desfeita.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const sucesso = await excluirFornecedor(id);
      
      if (sucesso) {
        // Remover o fornecedor da lista local
        setFornecedores(prev => prev.filter(f => f.id !== id));
        setFilteredFornecedores(prev => prev.filter(f => f.id !== id));
        
        // Mostrar mensagem de sucesso (você pode usar um toast aqui)
        alert("Fornecedor excluído com sucesso!");
      } else {
        alert("Erro ao excluir fornecedor. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      alert("Erro ao excluir fornecedor. Tente novamente.");
    }
  };

  const handleNew = () => {
    router.push("/cadastros/fornecedores/novo");
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie fornecedores de veículos e serviços
          </p>
        </div>
        <Button onClick={handleNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Fornecedor
        </Button>
      </div>

      {/* Filtros */}
      <FornecedorFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fornecedores.length}</div>
            <p className="text-xs text-muted-foreground">fornecedores cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.filter(f => f.tipo === "VEICULO").length}
            </div>
            <p className="text-xs text-muted-foreground">fornecedores de veículos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.filter(f => f.tipo === "SERVICO").length}
            </div>
            <p className="text-xs text-muted-foreground">fornecedores de serviços</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.filter(f => f.status === "ATIVO").length}
            </div>
            <p className="text-xs text-muted-foreground">fornecedores ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>
            Fornecedores Cadastrados ({filteredFornecedores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FornecedorTable
            fornecedores={filteredFornecedores}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            isLoading={isLoading || isDeleting}
          />
        </CardContent>
      </Card>
    </div>
  );
}