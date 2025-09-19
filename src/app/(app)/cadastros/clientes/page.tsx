"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, Upload, Users, Building, Handshake } from "lucide-react";
import { TipoCliente, StatusCliente } from "@/lib/schemas";
import Link from "next/link";

export default function ClientesPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoCliente | "all">("all");
  const [filtroStatus, setFiltroStatus] = useState<StatusCliente | "all">("all");

  // Mock data - substituir por dados reais da API
  const clientes = [
    {
      id: "1",
      codigo: "CLI001",
      tipo: "PESSOA_FISICA" as TipoCliente,
      nome: "João Silva",
      documento: "123.456.789-00",
      telefone: "(11) 99999-9999",
      email: "joao@email.com",
      status: "ATIVO" as StatusCliente,
      dataCadastro: "2024-01-15",
    },
    {
      id: "2",
      codigo: "CLI002",
      tipo: "PESSOA_JURIDICA" as TipoCliente,
      nome: "Empresa ABC Ltda",
      documento: "12.345.678/0001-90",
      telefone: "(11) 3333-3333",
      email: "contato@empresaabc.com",
      status: "ATIVO" as StatusCliente,
      dataCadastro: "2024-01-20",
    },
    {
      id: "3",
      codigo: "CLI003",
      tipo: "PARCEIRO" as TipoCliente,
      nome: "Hotel Premium",
      documento: "98.765.432/0001-10",
      telefone: "(11) 4444-4444",
      email: "comercial@hotelpremium.com",
      status: "ATIVO" as StatusCliente,
      dataCadastro: "2024-02-01",
    },
  ];

  const clientesFiltrados = clientes.filter((cliente) => {
    const matchTermo = termoBusca === "" ||
      cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      cliente.documento.includes(termoBusca) ||
      cliente.codigo.includes(termoBusca);

    const matchTipo = filtroTipo === "all" || cliente.tipo === filtroTipo;
    const matchStatus = filtroStatus === "all" || cliente.status === filtroStatus;

    return matchTermo && matchTipo && matchStatus;
  });

  const getTipoIcon = (tipo: TipoCliente) => {
    switch (tipo) {
      case "PESSOA_FISICA":
        return <Users className="h-4 w-4" />;
      case "PESSOA_JURIDICA":
        return <Building className="h-4 w-4" />;
      case "PARCEIRO":
        return <Handshake className="h-4 w-4" />;
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

  const exportarClientes = () => {
    // Preparar dados para exportação
    const dadosExportacao = clientesFiltrados.map(cliente => ({
      Código: cliente.codigo,
      Tipo: getTipoLabel(cliente.tipo),
      Nome: cliente.nome,
      Documento: cliente.documento,
      Telefone: cliente.telefone,
      Email: cliente.email,
      Status: cliente.status,
      "Data de Cadastro": cliente.dataCadastro
    }));

    // Converter para CSV
    const csvHeaders = Object.keys(dadosExportacao[0] || {}).join(",");
    const csvRows = dadosExportacao.map(row =>
      Object.values(row).map(value => `"${value}"`).join(",")
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    // Criar e baixar arquivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `clientes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie clientes, parceiros e pessoas físicas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportarClientes}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Link href="/cadastros/clientes/importar">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar CSV
            </Button>
          </Link>
          <Link href="/cadastros/clientes/novo">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <CardDescription>
            Encontre clientes por nome, documento ou código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, documento ou código..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroTipo} onValueChange={(value) => setFiltroTipo(value as TipoCliente | "all")}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="PESSOA_FISICA">Pessoa Física</SelectItem>
                <SelectItem value="PESSOA_JURIDICA">Pessoa Jurídica</SelectItem>
                <SelectItem value="PARCEIRO">Parceiro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusCliente | "all")}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
                <SelectItem value="INADIMPLENTE">Inadimplente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            {clientesFiltrados.length} cliente(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getTipoIcon(cliente.tipo)}
                    <Badge variant="outline" className="text-xs">
                      {cliente.codigo}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">{cliente.nome}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{cliente.documento}</span>
                      <span>{cliente.telefone}</span>
                      <span>{cliente.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {getTipoLabel(cliente.tipo)}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(cliente.status)}`}>
                    {cliente.status}
                  </Badge>
                  <Link href={`/cadastros/clientes/${cliente.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {clientesFiltrados.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum cliente encontrado com os filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}