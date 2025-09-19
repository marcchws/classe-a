"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Edit, Trash2, Car, Shield, DollarSign, Wrench, CheckCircle } from "lucide-react";
import { StatusVeiculo, TipoCombustivel, ModalidadeCompra } from "@/lib/schemas";
import Link from "next/link";

export default function DetalhesVeiculoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock data - substituir por dados reais da API baseado no params.id
  const veiculo = {
    id: params.id,
    codigo: "VEI001",
    categoria: { nome: "Sedan" },
    marca: { nome: "Mercedes-Benz" },
    modelo: { nome: "S-Class" },
    versao: "S 500 L",
    placa: "ABC-1234",
    cor: "Preto",
    capacidadePassageiros: 4,
    tipoCombustivel: "GASOLINA" as TipoCombustivel,
    blindagem: {
      temBlindagem: true,
      valor: 150000,
      parcelado: true,
      numeroParcelas: 12,
    },
    transformacoesEspeciais: "Vidros fumê adicionais, sistema de som premium",
    outrosAcessorios: ["GPS", "Câmera de ré", "Sensor de estacionamento"],
    entrada: 200000,
    valorTotalCompra: 800000,
    modalidadeCompra: "FINANCIAMENTO" as ModalidadeCompra,
    financiamento: {
      numeroParcelas: 48,
      taxaJuros: 1.2,
      valorTotalComJuros: 900000,
      parcelasPagas: 24,
      parcelasPendentes: 24,
    },
    kmAtual: 45000,
    capacidadeTanque: 80,
    detalhesManutencao: [
      {
        id: "1",
        itemManutencaoId: "1",
        proximaManutencaoKm: 50000,
        proximaManutencaoData: "2024-06-15",
        descricao: "Troca de óleo e filtros",
      },
      {
        id: "2",
        itemManutencaoId: "2",
        proximaManutencaoData: "2024-12-15",
        descricao: "Revisão completa",
      },
    ],
    status: "DISPONIVEL" as StatusVeiculo,
    dataCadastro: "2024-01-15",
  };

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

  const getModalidadeLabel = (modalidade: ModalidadeCompra) => {
    switch (modalidade) {
      case "A_VISTA":
        return "À Vista";
      case "FINANCIAMENTO":
        return "Financiamento";
      case "LEASING":
        return "Leasing";
      case "CONSORCIO":
        return "Consórcio";
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Aqui seria feita a chamada para a API
      // await deletarVeiculo(params.id);
      console.log("Excluindo veículo:", params.id);
      router.push("/cadastros/frota/veiculos");
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/cadastros/frota/veiculos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {veiculo.marca.nome} {veiculo.modelo.nome}
              </h1>
              <Badge variant="outline" className="text-sm">
                {veiculo.codigo}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {veiculo.versao} • {veiculo.categoria.nome}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {getStatusIcon(veiculo.status)}
            <Badge className={`${getStatusColor(veiculo.status)}`}>
              {getStatusLabel(veiculo.status)}
            </Badge>
          </div>
          <Link href={`/cadastros/frota/veiculos/${params.id}/editar`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Excluindo..." : "Confirmar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Placa</h4>
                <p className="font-medium">{veiculo.placa || "Não informada"}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Cor</h4>
                <p className="font-medium">{veiculo.cor}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Combustível</h4>
                <p className="font-medium">{getCombustivelLabel(veiculo.tipoCombustivel)}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Passageiros (PAX)</h4>
                <p className="font-medium">{veiculo.capacidadePassageiros}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">KM Atual</h4>
                <p className="font-medium">{veiculo.kmAtual.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Capacidade do Tanque</h4>
                <p className="font-medium">{veiculo.capacidadeTanque}L</p>
              </div>
            </div>

            {veiculo.transformacoesEspeciais && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Transformações Especiais</h4>
                  <p className="text-sm">{veiculo.transformacoesEspeciais}</p>
                </div>
              </>
            )}

            {veiculo.outrosAcessorios && veiculo.outrosAcessorios.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Outros Acessórios</h4>
                  <div className="flex flex-wrap gap-2">
                    {veiculo.outrosAcessorios.map((acessorio, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {acessorio}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Status e Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Veículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getStatusIcon(veiculo.status)}
                <Badge className={`${getStatusColor(veiculo.status)}`}>
                  {getStatusLabel(veiculo.status)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Status atual do veículo
              </p>
            </div>

            <Separator />

            {veiculo.blindagem.temBlindagem && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-amber-600" />
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Blindado
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Valor: R$ {veiculo.blindagem.valor?.toLocaleString()}
                </p>
              </div>
            )}

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Cadastrado em</p>
              <p className="font-medium">
                {new Date(veiculo.dataCadastro).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações Financeiras */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Informações Financeiras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Valor Total de Compra</h4>
                <p className="font-medium text-lg">R$ {veiculo.valorTotalCompra.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Entrada</h4>
                <p className="font-medium">R$ {veiculo.entrada.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Modalidade de Compra</h4>
                <p className="font-medium">{getModalidadeLabel(veiculo.modalidadeCompra)}</p>
              </div>
            </div>

            {veiculo.financiamento && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">Dados do Financiamento</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h5 className="font-medium text-xs text-muted-foreground">Total de Parcelas</h5>
                      <p className="font-medium">{veiculo.financiamento.numeroParcelas}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-xs text-muted-foreground">Taxa de Juros</h5>
                      <p className="font-medium">{veiculo.financiamento.taxaJuros}% a.m.</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-xs text-muted-foreground">Parcelas Pagas</h5>
                      <p className="font-medium text-green-600">{veiculo.financiamento.parcelasPagas}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-xs text-muted-foreground">Parcelas Pendentes</h5>
                      <p className="font-medium text-orange-600">{veiculo.financiamento.parcelasPendentes}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-xs text-muted-foreground">Valor Total com Juros</h5>
                    <p className="font-medium text-lg">R$ {veiculo.financiamento.valorTotalComJuros.toLocaleString()}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Manutenção Preventiva */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Manutenção Preventiva
            </CardTitle>
          </CardHeader>
          <CardContent>
            {veiculo.detalhesManutencao && veiculo.detalhesManutencao.length > 0 ? (
              <div className="space-y-3">
                {veiculo.detalhesManutencao.map((manutencao) => (
                  <div key={manutencao.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">{manutencao.descricao}</h4>
                    <div className="text-xs text-muted-foreground mt-1">
                      {manutencao.proximaManutencaoKm && (
                        <p>Próxima em: {manutencao.proximaManutencaoKm.toLocaleString()} km</p>
                      )}
                      {manutencao.proximaManutencaoData && (
                        <p>Próxima em: {new Date(manutencao.proximaManutencaoData).toLocaleDateString("pt-BR")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma manutenção preventiva programada
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}