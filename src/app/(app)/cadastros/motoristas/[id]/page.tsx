"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, History, Ban, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  StatusMotorista,
  CategoriaCnh,
  GrupoPrioridade,
  Idioma,
  TipoNota,
  NotaInterna,
  BloqueioCliente,
  HistoricoServico,
} from "@/lib/schemas";

// Mock data - substituir por chamada real à API
const motorista = {
  id: "1",
  nomeCompleto: "João Silva Santos",
  cpf: "123.456.789-00",
  telefone: "(11) 99999-9999",
  endereco: {
    logradouro: "Rua das Flores, 123",
    numero: "123",
    complemento: "Apto 101",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  },
  cnh: {
    numero: "12345678901",
    categoria: "B" as CategoriaCnh,
    dataValidade: "2025-12-31",
  },
  idiomasFluentes: ["PORTUGUES", "INGLES"] as Idioma[],
  grupoPrioridade: "PREFERENCIAL" as GrupoPrioridade,
  regiaoAtendimento: {
    cidade: "São Paulo",
    bairros: ["Vila Madalena", "Pinheiros", "Jardins"],
  },
  status: "ATIVO" as StatusMotorista,
  dataCadastro: "2024-01-15",
  categoriaServico: ["ATE_8_PASSAGEIROS", "BILINGUE"],
};

const notasInternas: NotaInterna[] = [
  {
    tipo: "ELOGIO",
    data: "2024-03-15",
    descricao: "Cliente elogiou a pontualidade e cortesia do motorista.",
    autorNome: "Maria Silva",
    clienteRelacionado: "Empresa ABC Ltda",
  },
  {
    tipo: "OBSERVACAO",
    data: "2024-02-20",
    descricao: "Motorista demonstrou conhecimento avançado de rotas alternativas.",
    autorNome: "Carlos Santos",
  },
];

const bloqueiosCliente: BloqueioCliente[] = [
  {
    clienteId: "cliente-1",
    clienteNome: "XYZ Corporação",
    motivo: "Cliente solicitou troca de motorista por questões pessoais",
    dataBloqueio: "2024-02-10",
    bloqueadoPorNome: "Ana Costa",
  },
];

const historicoServicos: HistoricoServico[] = [
  {
    contratoId: "contrato-1",
    clienteNome: "Empresa ABC Ltda",
    dataServico: "2024-03-20",
    valorRecebido: 350.00,
    avaliacaoCliente: 5,
    observacoes: "Serviço executado com excelência",
  },
  {
    contratoId: "contrato-2",
    clienteNome: "Construtora DEF",
    dataServico: "2024-03-18",
    valorRecebido: 280.00,
    avaliacaoCliente: 4,
  },
];

export default function DetalhesMotoristaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [novaNota, setNovaNota] = useState({
    tipo: "OBSERVACAO" as TipoNota,
    descricao: "",
    clienteRelacionado: "",
  });
  const [novoBloqueio, setNovoBloqueio] = useState({
    clienteNome: "",
    motivo: "",
  });

  // Usar o ID do motorista (params.id) quando necessário
  console.log('ID do motorista:', params.id);

  const getStatusBadge = (status: StatusMotorista) => {
    const variant = status === "ATIVO" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getGrupoBadge = (grupo: GrupoPrioridade) => {
    const variant = grupo === "PREFERENCIAL" ? "default" : "outline";
    return <Badge variant={variant}>{grupo}</Badge>;
  };

  const getTipoNotaBadge = (tipo: TipoNota) => {
    const variants = {
      ELOGIO: "default",
      RECLAMACAO: "destructive",
      OBSERVACAO: "secondary",
    } as const;
    return <Badge variant={variants[tipo]}>{tipo}</Badge>;
  };

  const getAvaliacaoStars = (avaliacao?: number) => {
    if (!avaliacao) return "N/A";
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < avaliacao ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{motorista.nomeCompleto}</h1>
            <p className="text-muted-foreground">
              CPF: {motorista.cpf} • Cadastrado em {new Date(motorista.dataCadastro).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            <Edit className="mr-2 h-4 w-4" />
            {editMode ? "Cancelar" : "Editar"}
          </Button>
          {editMode && (
            <Button onClick={() => {
              // Aqui implementaria a chamada à API para salvar as alterações
              console.log('Salvando alterações do motorista:', motorista.id);
              setEditMode(false);
            }}>
              Salvar Alterações
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="dados" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Serviços</TabsTrigger>
          <TabsTrigger value="notas">Notas Internas</TabsTrigger>
          <TabsTrigger value="bloqueios">Bloqueios</TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    {editMode ? (
                      <Input defaultValue={motorista.nomeCompleto} />
                    ) : (
                      <p className="font-medium">{motorista.nomeCompleto}</p>
                    )}
                  </div>
                  <div>
                    <Label>CPF</Label>
                    <p className="font-medium">{motorista.cpf}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    {editMode ? (
                      <Input defaultValue={motorista.telefone} />
                    ) : (
                      <p className="font-medium">{motorista.telefone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div>{getStatusBadge(motorista.status)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CNH */}
            <Card>
              <CardHeader>
                <CardTitle>Carteira Nacional de Habilitação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número</Label>
                    <p className="font-medium">{motorista.cnh.numero}</p>
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <div>
                      <Badge variant="outline">{motorista.cnh.categoria}</Badge>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label>Data de Validade</Label>
                    {editMode ? (
                      <Input type="date" defaultValue={motorista.cnh.dataValidade} />
                    ) : (
                      <p className="font-medium">
                        {new Date(motorista.cnh.dataValidade).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle>Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Input placeholder="Logradouro" defaultValue={motorista.endereco.logradouro} className="col-span-2" />
                      <Input placeholder="Número" defaultValue={motorista.endereco.numero} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Complemento" defaultValue={motorista.endereco.complemento} />
                      <Input placeholder="Bairro" defaultValue={motorista.endereco.bairro} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Input placeholder="Cidade" defaultValue={motorista.endereco.cidade} />
                      <Input placeholder="Estado" defaultValue={motorista.endereco.estado} />
                      <Input placeholder="CEP" defaultValue={motorista.endereco.cep} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>{motorista.endereco.logradouro}, {motorista.endereco.numero}</p>
                    {motorista.endereco.complemento && <p>{motorista.endereco.complemento}</p>}
                    <p>{motorista.endereco.bairro}</p>
                    <p>{motorista.endereco.cidade} - {motorista.endereco.estado}</p>
                    <p>CEP: {motorista.endereco.cep}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Classificação */}
            <Card>
              <CardHeader>
                <CardTitle>Classificação e Competências</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Idiomas Fluentes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {motorista.idiomasFluentes.map((idioma) => (
                      <Badge key={idioma} variant="outline">{idioma}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Grupo de Prioridade</Label>
                  <div className="mt-2">{getGrupoBadge(motorista.grupoPrioridade)}</div>
                </div>
                <div>
                  <Label>Categoria de Serviço</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {motorista.categoriaServico?.map((categoria) => (
                      <Badge key={categoria} variant="secondary">{categoria}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Região de Atendimento</Label>
                  <p className="font-medium">{motorista.regiaoAtendimento.cidade}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {motorista.regiaoAtendimento.bairros.map((bairro) => (
                      <Badge key={bairro} variant="outline" className="text-xs">{bairro}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico de Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor Recebido</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoServicos.map((servico, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(servico.dataServico).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="font-medium">{servico.clienteNome}</TableCell>
                      <TableCell>
                        R$ {servico.valorRecebido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getAvaliacaoStars(servico.avaliacaoCliente)}
                        </div>
                      </TableCell>
                      <TableCell>{servico.observacoes || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notas">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notas Internas</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Adicionar Nota
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Nota Interna</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Nota</Label>
                      <Select
                        value={novaNota.tipo}
                        onValueChange={(value) => setNovaNota(prev => ({ ...prev, tipo: value as TipoNota }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ELOGIO">Elogio</SelectItem>
                          <SelectItem value="RECLAMACAO">Reclamação</SelectItem>
                          <SelectItem value="OBSERVACAO">Observação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Cliente Relacionado (opcional)</Label>
                      <Input
                        placeholder="Nome do cliente"
                        value={novaNota.clienteRelacionado}
                        onChange={(e) => setNovaNota(prev => ({ ...prev, clienteRelacionado: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        placeholder="Descreva a nota..."
                        value={novaNota.descricao}
                        onChange={(e) => setNovaNota(prev => ({ ...prev, descricao: e.target.value }))}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        // Aqui implementaria a chamada à API para salvar a nota
                        console.log('Salvando nota:', novaNota);
                        setNovaNota({
                          tipo: "OBSERVACAO",
                          descricao: "",
                          clienteRelacionado: "",
                        });
                      }}
                    >
                      Salvar Nota
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {notasInternas.map((nota, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getTipoNotaBadge(nota.tipo)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(nota.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p>{nota.descricao}</p>
                        {nota.clienteRelacionado && (
                          <p className="text-sm text-muted-foreground">
                            Cliente: {nota.clienteRelacionado}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Por: {nota.autorNome}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bloqueios">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Bloqueios por Cliente</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Ban className="mr-2 h-4 w-4" />
                    Bloquear Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bloquear Motorista para Cliente</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Cliente</Label>
                      <Input
                        placeholder="Nome do cliente"
                        value={novoBloqueio.clienteNome}
                        onChange={(e) => setNovoBloqueio(prev => ({ ...prev, clienteNome: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Motivo do Bloqueio</Label>
                      <Textarea
                        placeholder="Descreva o motivo do bloqueio..."
                        value={novoBloqueio.motivo}
                        onChange={(e) => setNovoBloqueio(prev => ({ ...prev, motivo: e.target.value }))}
                      />
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        // Aqui implementaria a chamada à API para bloquear o cliente
                        console.log('Bloqueando cliente:', novoBloqueio);
                        setNovoBloqueio({
                          clienteNome: "",
                          motivo: "",
                        });
                      }}
                    >
                      Confirmar Bloqueio
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {bloqueiosCliente.length > 0 ? (
              <div className="space-y-4">
                {bloqueiosCliente.map((bloqueio, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">Bloqueado</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(bloqueio.dataBloqueio).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p className="font-medium">{bloqueio.clienteNome}</p>
                          <p className="text-sm">{bloqueio.motivo}</p>
                          <p className="text-sm text-muted-foreground">
                            Bloqueado por: {bloqueio.bloqueadoPorNome}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (confirm('Tem certeza que deseja remover este bloqueio?')) {
                              // Aqui implementaria a chamada à API para remover o bloqueio
                              console.log('Removendo bloqueio:', bloqueio.clienteId);
                            }
                          }}
                        >
                          Remover Bloqueio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum bloqueio ativo para este motorista.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}