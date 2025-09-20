"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Clock,
  User,
  Car,
  MapPin,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Settings
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useFormatacaoMoeda } from "../hooks/use-calculos-contrato";
import type { Contrato, TipoContrato, StatusContrato } from "../types";

interface ContratoDetailsProps {
  contrato: Contrato;
  onEdit?: () => void;
  onGeneratePDF?: () => Promise<void>;
  onSendSignature?: () => void;
}

const tipoContratoLabels: Record<TipoContrato, string> = {
  LOCACAO: "Locação",
  SERVICO: "Serviço",
  EVENTO: "Evento",
  TERCEIRIZACAO: "Terceirização",
};

const statusContratoLabels: Record<StatusContrato, string> = {
  RASCUNHO: "Rascunho",
  PENDENTE_ASSINATURA: "Pendente Assinatura",
  ATIVO: "Ativo",
  ENCERRADO: "Encerrado",
};

const statusContratoVariants: Record<StatusContrato, "default" | "secondary" | "destructive" | "outline"> = {
  RASCUNHO: "outline",
  PENDENTE_ASSINATURA: "secondary",
  ATIVO: "default",
  ENCERRADO: "destructive",
};

export function ContratoDetails({
  contrato,
  onEdit,
  onGeneratePDF,
  onSendSignature,
}: ContratoDetailsProps) {
  const { formatarMoeda } = useFormatacaoMoeda();

  const calcularDuracao = () => {
    const inicio = new Date(contrato.dataHoraInicio);
    const fim = new Date(contrato.dataHoraFim);
    const diffMs = fim.getTime() - inicio.getTime();
    const diffHoras = Math.round(diffMs / (1000 * 60 * 60));
    const dias = Math.floor(diffHoras / 24);
    const horas = diffHoras % 24;

    if (dias > 0) {
      return `${dias} dia${dias > 1 ? 's' : ''} ${horas > 0 ? `e ${horas}h` : ''}`;
    }
    return `${horas} hora${horas > 1 ? 's' : ''}`;
  };

  const calcularValorTotal = () => {
    const valorBase = contrato.valorContrato;
    const valorServicos = contrato.servicosExtras?.reduce(
      (total, servico) => total + (servico.valor * servico.quantidade),
      0
    ) || 0;

    return valorBase + valorServicos;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              Contrato #{contrato.id?.slice(-6) || 'NOVO'}
            </h1>
            <Badge variant={statusContratoVariants[contrato.status]}>
              {statusContratoLabels[contrato.status]}
            </Badge>
            <Badge variant="outline">
              {tipoContratoLabels[contrato.tipo]}
            </Badge>
          </div>
          {contrato.dataCriacao && (
            <p className="text-sm text-muted-foreground">
              Criado em {format(new Date(contrato.dataCriacao), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Settings className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
          {onGeneratePDF && (
            <Button variant="outline" onClick={onGeneratePDF}>
              <FileText className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          )}
          {contrato.status === "RASCUNHO" && onSendSignature && (
            <Button onClick={onSendSignature}>
              <Mail className="h-4 w-4 mr-2" />
              Enviar para Assinatura
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Informações do Contrato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data/Hora Início</label>
                  <p className="font-medium">
                    {format(new Date(contrato.dataHoraInicio), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data/Hora Fim</label>
                  <p className="font-medium">
                    {format(new Date(contrato.dataHoraFim), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duração</label>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {calcularDuracao()}
                </p>
              </div>
              {contrato.tipo === "LOCACAO" && contrato.diariasCalculadas && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Diárias Calculadas</label>
                  <p className="font-medium">{contrato.diariasCalculadas}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações do Locatário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Locatário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome</label>
                <p className="font-medium">{contrato.locatario.nome}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Documento</label>
                  <p className="font-medium">{contrato.locatario.documento}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {contrato.locatario.telefone}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {contrato.locatario.email}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Veículo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Veículo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contrato.tipo === "TERCEIRIZACAO" && contrato.veiculoTerceirizado ? (
                <div className="space-y-3">
                  <Badge variant="outline">Terceirizado</Badge>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Placa</label>
                      <p className="font-medium">{contrato.veiculoTerceirizado.placa}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Modelo</label>
                      <p className="font-medium">{contrato.veiculoTerceirizado.modelo}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Valor Repasse</label>
                    <p className="font-medium">{formatarMoeda(contrato.veiculoTerceirizado.valorRepasse)}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Veículo ID</label>
                  <p className="font-medium">{contrato.veiculoId || "Não especificado"}</p>
                  <p className="text-sm text-muted-foreground">
                    (Informações detalhadas serão carregadas do cadastro de veículos)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campos específicos por tipo */}
          {contrato.tipo === "SERVICO" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informações do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Serviço</label>
                    <p className="font-medium">{contrato.tipoServico}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Passageiro</label>
                    <p className="font-medium">{contrato.passageiro}</p>
                  </div>
                </div>
                {contrato.numeroVoo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número do Voo</label>
                    <p className="font-medium">{contrato.numeroVoo}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Local de Atendimento</label>
                  <p className="font-medium">{contrato.localAtendimento}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {contrato.tipo === "EVENTO" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informações do Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Local do Evento</label>
                  <p className="font-medium">{contrato.localEvento}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                    <p className="font-medium">{contrato.responsavelEvento}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Convidados</label>
                    <p className="font-medium">{contrato.numeroConvidados}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Serviços Extras */}
          {contrato.servicosExtras && contrato.servicosExtras.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Serviços Extras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contrato.servicosExtras.map((servico, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{servico.descricao}</p>
                        {servico.observacoes && (
                          <p className="text-sm text-muted-foreground">{servico.observacoes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatarMoeda(servico.valor)}</p>
                        {servico.quantidade > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {servico.quantidade}x = {formatarMoeda(servico.valor * servico.quantidade)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          {contrato.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{contrato.observacoes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Resumo Financeiro */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Valor base:</span>
                  <span className="text-sm font-medium">{formatarMoeda(contrato.valorContrato)}</span>
                </div>

                {contrato.servicosExtras && contrato.servicosExtras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Serviços extras:</span>
                    <span className="text-sm font-medium">
                      {formatarMoeda(contrato.servicosExtras.reduce(
                        (total, servico) => total + (servico.valor * servico.quantidade),
                        0
                      ))}
                    </span>
                  </div>
                )}

                {contrato.tipo === "TERCEIRIZACAO" && contrato.veiculoTerceirizado && (
                  <div className="flex justify-between">
                    <span className="text-sm">Repasse:</span>
                    <span className="text-sm font-medium">
                      {formatarMoeda(contrato.veiculoTerceirizado.valorRepasse)}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total:</span>
                <span>{formatarMoeda(calcularValorTotal())}</span>
              </div>
            </CardContent>
          </Card>

          {/* Assinatura Digital */}
          <Card>
            <CardHeader>
              <CardTitle>Assinatura Digital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Envio Automático</label>
                <p className="font-medium">
                  {contrato.enviarAssinaturaAutomatica ? "Sim" : "Não"}
                </p>
              </div>
              {contrato.tipoEnvioAssinatura && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Meio de Envio</label>
                  <p className="font-medium">{contrato.tipoEnvioAssinatura}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}