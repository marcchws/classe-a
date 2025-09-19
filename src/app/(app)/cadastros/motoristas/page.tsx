"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusMotorista, CategoriaCnh, GrupoPrioridade } from "@/lib/schemas";

// Mock data - substituir por chamada real à API
const motoristas = [
  {
    id: "1",
    nomeCompleto: "João Silva Santos",
    cpf: "123.456.789-00",
    telefone: "(11) 99999-9999",
    cnh: { categoria: "B" as CategoriaCnh },
    grupoPrioridade: "PREFERENCIAL" as GrupoPrioridade,
    regiaoAtendimento: { cidade: "São Paulo" },
    status: "ATIVO" as StatusMotorista,
    dataCadastro: "2024-01-15",
  },
  {
    id: "2",
    nomeCompleto: "Maria Oliveira Costa",
    cpf: "987.654.321-00",
    telefone: "(11) 88888-8888",
    cnh: { categoria: "D" as CategoriaCnh },
    grupoPrioridade: "APOIO" as GrupoPrioridade,
    regiaoAtendimento: { cidade: "São Paulo" },
    status: "ATIVO" as StatusMotorista,
    dataCadastro: "2024-02-20",
  },
];

export default function MotoristasPage() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusMotorista | "TODOS">("TODOS");
  const [filtroCategoria, setFiltroCategoria] = useState<CategoriaCnh | "TODAS">("TODAS");
  const [filtroGrupo, setFiltroGrupo] = useState<GrupoPrioridade | "TODOS">("TODOS");

  const motoristasFiltrados = motoristas.filter((motorista) => {
    const matchBusca = motorista.nomeCompleto.toLowerCase().includes(busca.toLowerCase()) ||
                     motorista.cpf.includes(busca);
    const matchStatus = filtroStatus === "TODOS" || motorista.status === filtroStatus;
    const matchCategoria = filtroCategoria === "TODAS" || motorista.cnh.categoria === filtroCategoria;
    const matchGrupo = filtroGrupo === "TODOS" || motorista.grupoPrioridade === filtroGrupo;

    return matchBusca && matchStatus && matchCategoria && matchGrupo;
  });

  const getStatusBadge = (status: StatusMotorista) => {
    const variant = status === "ATIVO" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getGrupoBadge = (grupo: GrupoPrioridade) => {
    const variant = grupo === "PREFERENCIAL" ? "default" : "outline";
    return <Badge variant={variant}>{grupo}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Motoristas</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro de motoristas da frota
          </p>
        </div>
        <Button onClick={() => router.push('/cadastros/motoristas/novo')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Motorista
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Nome ou CPF..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusMotorista | "TODOS")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria CNH</label>
              <Select value={filtroCategoria} onValueChange={(value) => setFiltroCategoria(value as CategoriaCnh | "TODAS")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODAS">Todas</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Grupo</label>
              <Select value={filtroGrupo} onValueChange={(value) => setFiltroGrupo(value as GrupoPrioridade | "TODOS")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="PREFERENCIAL">Preferencial</SelectItem>
                  <SelectItem value="APOIO">Apoio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>CNH</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {motoristasFiltrados.map((motorista) => (
                <TableRow key={motorista.id}>
                  <TableCell className="font-medium">
                    {motorista.nomeCompleto}
                  </TableCell>
                  <TableCell>{motorista.cpf}</TableCell>
                  <TableCell>{motorista.telefone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{motorista.cnh.categoria}</Badge>
                  </TableCell>
                  <TableCell>{getGrupoBadge(motorista.grupoPrioridade)}</TableCell>
                  <TableCell>{motorista.regiaoAtendimento.cidade}</TableCell>
                  <TableCell>{getStatusBadge(motorista.status)}</TableCell>
                  <TableCell>
                    {new Date(motorista.dataCadastro).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/cadastros/motoristas/${motorista.id}`)}>
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/cadastros/motoristas/${motorista.id}`)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/cadastros/motoristas/${motorista.id}`)}>
                          Histórico
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            if (confirm('Tem certeza que deseja inativar este motorista?')) {
                              // Aqui implementaria a chamada à API para inativar
                              console.log('Inativando motorista:', motorista.id);
                            }
                          }}
                        >
                          Inativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {motoristasFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum motorista encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}