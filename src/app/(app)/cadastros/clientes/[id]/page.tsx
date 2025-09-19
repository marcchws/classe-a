"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Trash2, Users, Building, Handshake, Phone, MapPin, DollarSign, History } from "lucide-react";
import { Cliente, TipoCliente, StatusCliente, PessoaFisica } from "@/lib/schemas";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function DetalhesClientePage() {
  const params = useParams();
  const router = useRouter();
  const clienteId = params.id as string;
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - substituir por chamada real da API
    const mockCliente: Cliente = {
      tipo: "PESSOA_JURIDICA",
      razaoSocial: "Empresa ABC Ltda",
      nomeFantasia: "ABC Company",
      cnpj: "12.345.678/0001-90",
      segmentoAtuacao: "Tecnologia",
      contatoResponsavel: {
        nome: "João Silva",
        telefone: "(11) 99999-9999",
        email: "joao@empresaabc.com"
      },
      contatoFinanceiro: {
        nome: "Maria Santos",
        telefone: "(11) 88888-8888",
        email: "financeiro@empresaabc.com"
      },
      enderecoCompleto: {
        logradouro: "Rua das Empresas",
        numero: "123",
        complemento: "Sala 456",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567"
      },
      status: "ATIVO",
      tarifarioEspecial: {
        percentualBase: 15,
        percentuaisPontuais: [
          {
            percentual: 10,
            descricao: "Desconto especial para contratos longos",
            data: "2024-01-15"
          }
        ]
      }
    };

    // Simular loading
    setTimeout(() => {
      setCliente(mockCliente);
      setLoading(false);
    }, 500);
  }, [clienteId]);

  const getTipoIcon = (tipo: TipoCliente) => {
    switch (tipo) {
      case "PESSOA_FISICA":
        return <Users className="h-5 w-5" />;
      case "PESSOA_JURIDICA":
        return <Building className="h-5 w-5" />;
      case "PARCEIRO":
        return <Handshake className="h-5 w-5" />;
    }
  };

  const getTipoLabel = (tipo: TipoCliente) => {
    switch (tipo) {
      case "PESSOA_FISICA":
        return "Pessoa Física";
      case "PESSOA_JURIDICA":
        return "Pessoa Jurídica";
      case "PARCEIRO":
        return "Parceiro";
    }
  };

  const getStatusColor = (status: StatusCliente) => {
    switch (status) {
      case "ATIVO":
        return "bg-green-100 text-green-800";
      case "INATIVO":
        return "bg-gray-100 text-gray-800";
      case "INADIMPLENTE":
        return "bg-red-100 text-red-800";
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        // Aqui seria feita a chamada para a API
        alert("Cliente excluído com sucesso!");
        router.push("/cadastros/clientes");
      } catch {
        alert("Erro ao excluir cliente. Tente novamente.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados do cliente...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Cliente não encontrado</h2>
          <p className="text-muted-foreground mb-4">
            O cliente solicitado não foi encontrado.
          </p>
          <Link href="/cadastros/clientes">
            <Button>Voltar para lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/cadastros/clientes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            {cliente && getTipoIcon(cliente.tipo as TipoCliente)}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {cliente ? (
                  cliente.tipo === "PESSOA_FISICA" ? (cliente as PessoaFisica).nomeCompleto :
                  cliente.tipo === "PESSOA_JURIDICA" ? cliente.razaoSocial :
                  cliente.tipo === "PARCEIRO" ? cliente.razaoSocial : "Cliente"
                ) : "Carregando..."}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {cliente ? getTipoLabel(cliente.tipo as TipoCliente) : "Carregando..."}
                </Badge>
                <Badge className={`text-xs ${cliente ? getStatusColor(cliente.status) : "bg-gray-100 text-gray-800"}`}>
                  {cliente ? cliente.status : "Carregando..."}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dados-gerais" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
          <TabsTrigger value="contatos">Contatos</TabsTrigger>
          <TabsTrigger value="endereco">Endereço</TabsTrigger>
          {cliente && cliente.tipo === "PESSOA_JURIDICA" && cliente.tarifarioEspecial && (
            <TabsTrigger value="tarifario">Tarifário</TabsTrigger>
          )}
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-gerais">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Dados principais do cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cliente && cliente.tipo === "PESSOA_JURIDICA" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Razão Social</label>
                      <p className="text-sm">{cliente?.razaoSocial}</p>
                    </div>
                    {cliente?.nomeFantasia && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nome Fantasia</label>
                        <p className="text-sm">{cliente?.nomeFantasia}</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
                      <p className="text-sm">{cliente?.cnpj}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Segmento de Atuação</label>
                      <p className="text-sm">{cliente?.segmentoAtuacao}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contatos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cliente && cliente.tipo === "PESSOA_JURIDICA" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contato Responsável
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome</label>
                      <p className="text-sm">{cliente?.contatoResponsavel?.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                      <p className="text-sm">{cliente?.contatoResponsavel?.telefone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                      <p className="text-sm">{cliente?.contatoResponsavel?.email}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Contato Financeiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome</label>
                      <p className="text-sm">{cliente?.contatoFinanceiro?.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                      <p className="text-sm">{cliente?.contatoFinanceiro?.telefone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                      <p className="text-sm">{cliente?.contatoFinanceiro?.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="endereco">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cliente && cliente.tipo === "PESSOA_JURIDICA" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Logradouro</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.logradouro}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.numero}</p>
                  </div>
                  {cliente?.enderecoCompleto?.complemento && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Complemento</label>
                      <p className="text-sm">{cliente?.enderecoCompleto?.complemento}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.bairro}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cidade</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.cidade}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Estado</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.estado}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CEP</label>
                    <p className="text-sm">{cliente?.enderecoCompleto?.cep}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {cliente && cliente.tipo === "PESSOA_JURIDICA" && cliente.tarifarioEspecial && (
          <TabsContent value="tarifario">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Tarifário Especial
                </CardTitle>
                <CardDescription>
                  Condições comerciais diferenciadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Percentual Base</label>
                  <p className="text-lg font-medium">{cliente?.tarifarioEspecial?.percentualBase}%</p>
                </div>
                {cliente?.tarifarioEspecial?.percentuaisPontuais &&
                 cliente?.tarifarioEspecial?.percentuaisPontuais.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">
                      Percentuais Pontuais
                    </label>
                    <div className="space-y-3">
                      {cliente?.tarifarioEspecial?.percentuaisPontuais.map((item: { percentual: number; descricao: string; data: string }, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.percentual}%</span>
                            <span className="text-sm text-muted-foreground">{item.data}</span>
                          </div>
                          <p className="text-sm">{item.descricao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </CardTitle>
              <CardDescription>
                Registro de atividades e interações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum histórico disponível ainda.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}