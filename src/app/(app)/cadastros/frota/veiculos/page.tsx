"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, Upload, Car, Shield, Wrench, CheckCircle } from "lucide-react";
import { StatusVeiculo, TipoCombustivel } from "@/lib/schemas";
import Link from "next/link";

export default function VeiculosPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusVeiculo | "all">("all");
  const [filtroBlindagem, setFiltroBlindagem] = useState<"all" | "true" | "false">("all");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("all");

  // Mock data - substituir por dados reais da API
  const veiculos = [
    {
      id: "1",
      codigo: "VEI001",
      categoria: { nome: "Sedan" },
      marca: { nome: "Mercedes-Benz" },
      modelo: { nome: "S-Class" },
      versao: "S 500 L",
      placa: "ABC-1234",
      cor: "Preto",
      capacidadePassageiros: 4,
      tipoCombustivel: "GASOLINA" as TipoCombustivel,
      blindagem: { temBlindagem: true, valor: 150000 },
      kmAtual: 45000,
      valorTotalCompra: 800000,
      status: "DISPONIVEL" as StatusVeiculo,
      dataCadastro: "2024-01-15",
    },
    {
      id: "2",
      codigo: "VEI002",
      categoria: { nome: "SUV" },
      marca: { nome: "BMW" },
      modelo: { nome: "X5" },
      versao: "xDrive40i",
      placa: "DEF-5678",
      cor: "Branco",
      capacidadePassageiros: 7,
      tipoCombustivel: "GASOLINA" as TipoCombustivel,
      blindagem: { temBlindagem: true, valor: 120000 },
      kmAtual: 32000,
      valorTotalCompra: 650000,
      status: "ALUGADO" as StatusVeiculo,
      dataCadastro: "2024-02-10",
    },
    {
      id: "3",
      codigo: "VEI003",
      categoria: { nome: "Van" },
      marca: { nome: "Mercedes-Benz" },
      modelo: { nome: "Sprinter" },
      versao: "415 CDI",
      placa: "GHI-9012",
      cor: "Prata",
      capacidadePassageiros: 19,
      tipoCombustivel: "DIESEL" as TipoCombustivel,
      blindagem: { temBlindagem: false },
      kmAtual: 78000,
      valorTotalCompra: 280000,
      status: "MANUTENCAO" as StatusVeiculo,
      dataCadastro: "2024-01-20",
    },
  ];

  const categorias = [
    { id: "1", nome: "Sedan" },
    { id: "2", nome: "SUV" },
    { id: "3", nome: "Van" },
    { id: "4", nome: "Pickup" },
  ];

  const veiculosFiltrados = veiculos.filter((veiculo) => {
    const matchTermo = termoBusca === "" ||
      veiculo.placa?.toLowerCase().includes(termoBusca.toLowerCase()) ||
      veiculo.marca.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      veiculo.modelo.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      veiculo.codigo.toLowerCase().includes(termoBusca.toLowerCase());

    const matchStatus = filtroStatus === "all" || veiculo.status === filtroStatus;
    const matchBlindagem = filtroBlindagem === "all" ||
      (filtroBlindagem === "true" && veiculo.blindagem.temBlindagem) ||
      (filtroBlindagem === "false" && !veiculo.blindagem.temBlindagem);
    const matchCategoria = filtroCategoria === "all" || veiculo.categoria.nome === filtroCategoria;

    return matchTermo && matchStatus && matchBlindagem && matchCategoria;
  });

  const getStatusIcon = (status: StatusVeiculo) => {
    switch (status) {
      case "DISPONIVEL":
        return <CheckCircle className="h-4 w-4" />;
      case "ALUGADO":
        return <Car className="h-4 w-4" />;
      case "MANUTENCAO":
        return <Wrench className="h-4 w-4" />;
      case "INDISPONIVEL":
        return <Car className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: StatusVeiculo) => {
    switch (status) {
      case "DISPONIVEL":
        return "Disponível";
      case "ALUGADO":
        return "Alugado";
      case "MANUTENCAO":
        return "Manutenção";
      case "INDISPONIVEL":
        return "Indisponível";
    }
  };

  const getStatusColor = (status: StatusVeiculo) => {
    switch (status) {
      case "DISPONIVEL":
        return "bg-green-100 text-green-800";
      case "ALUGADO":
        return "bg-blue-100 text-blue-800";
      case "MANUTENCAO":
        return "bg-yellow-100 text-yellow-800";
      case "INDISPONIVEL":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCombustivelLabel = (combustivel: TipoCombustivel) => {
    switch (combustivel) {
      case "GASOLINA":
        return "Gasolina";
      case "ETANOL":
        return "Etanol";
      case "DIESEL":
        return "Diesel";
      case "HIBRIDO":
        return "Híbrido";
      case "ELETRICO":
        return "Elétrico";
    }
  };

  const exportarVeiculos = () => {
    const dadosExportacao = veiculosFiltrados.map(veiculo => ({
      Código: veiculo.codigo,
      Categoria: veiculo.categoria.nome,
      Marca: veiculo.marca.nome,
      Modelo: veiculo.modelo.nome,
      Versão: veiculo.versao,
      Placa: veiculo.placa || "",
      Cor: veiculo.cor,
      Passageiros: veiculo.capacidadePassageiros,
      Combustível: getCombustivelLabel(veiculo.tipoCombustivel),
      Blindado: veiculo.blindagem.temBlindagem ? "Sim" : "Não",
      "KM Atual": veiculo.kmAtual,
      "Valor Total": veiculo.valorTotalCompra,
      Status: getStatusLabel(veiculo.status),
      "Data de Cadastro": veiculo.dataCadastro
    }));

    const csvHeaders = Object.keys(dadosExportacao[0] || {}).join(",");
    const csvRows = dadosExportacao.map(row =>
      Object.values(row).map(value => `"${value}"`).join(",")
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `veiculos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
          <p className="text-muted-foreground">
            Gerencie a frota de veículos blindados e convencionais
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportarVeiculos}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Link href="/cadastros/frota/veiculos/importar">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar CSV
            </Button>
          </Link>
          <Link href="/cadastros/frota/veiculos/novo">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Veículo
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <CardDescription>
            Encontre veículos por placa, marca, modelo ou código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por placa, marca, modelo ou código..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.nome}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusVeiculo | "all")}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                <SelectItem value="ALUGADO">Alugado</SelectItem>
                <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                <SelectItem value="INDISPONIVEL">Indisponível</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroBlindagem} onValueChange={setFiltroBlindagem}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Blindagem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Blindados</SelectItem>
                <SelectItem value="false">Convencionais</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Veículos</CardTitle>
          <CardDescription>
            {veiculosFiltrados.length} veículo(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {veiculosFiltrados.map((veiculo) => (
              <div
                key={veiculo.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline" className="text-xs">
                      {veiculo.codigo}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {veiculo.marca.nome} {veiculo.modelo.nome} {veiculo.versao}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Placa: {veiculo.placa || "Não informada"}</span>
                      <span>Cor: {veiculo.cor}</span>
                      <span>PAX: {veiculo.capacidadePassageiros}</span>
                      <span>KM: {veiculo.kmAtual.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {veiculo.categoria.nome}
                  </Badge>
                  {veiculo.blindagem.temBlindagem && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Blindado
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    {getStatusIcon(veiculo.status)}
                    <Badge className={`text-xs ${getStatusColor(veiculo.status)}`}>
                      {getStatusLabel(veiculo.status)}
                    </Badge>
                  </div>
                  <Link href={`/cadastros/frota/veiculos/${veiculo.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {veiculosFiltrados.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum veículo encontrado com os filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}