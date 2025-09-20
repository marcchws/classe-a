"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Settings } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { cn } from "@/lib/utils";
import {
  contratoSchema,
  type Contrato,
  type ConfiguracoesTaxas,
} from "../types";
import {
  useCalculosDiarias,
  useCalculoFinanceiro,
  useValidacaoContrato,
  useFormatacaoMoeda,
} from "../hooks/use-calculos-contrato";
import { ConfiguracoesTaxasDialog } from "./configuracoes-taxas-dialog";

interface ContratoFormProps {
  contrato?: Contrato;
  onSave: (contrato: Contrato) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContratoForm({
  contrato,
  onSave,
  onCancel,
  isLoading = false,
}: ContratoFormProps) {
  const [configuracoesTaxasOpen, setConfiguracoesTaxasOpen] = useState(false);
  const [configuracoesTaxas, setConfiguracoesTaxas] = useState<ConfiguracoesTaxas | undefined>();
  const { formatarMoeda } = useFormatacaoMoeda();

  const form = useForm<Contrato>({
    resolver: zodResolver(contratoSchema),
    defaultValues: contrato || {
      tipo: "LOCACAO",
      status: "RASCUNHO",
      enviarAssinaturaAutomatica: false,
      valorContrato: 0,
      servicosExtras: [],
      condutores: [],
    },
  });

  const watchedTipo = form.watch("tipo");
  const watchedDataInicio = form.watch("dataHoraInicio");
  const watchedDataFim = form.watch("dataHoraFim");
  const watchedValorBase = form.watch("valorContrato");
  const watchedServicosExtras = form.watch("servicosExtras") || [];

  // useFieldArray hooks podem ser implementados quando necessário
  // const {
  //   fields: servicosExtrasFields,
  //   append: appendServicoExtra,
  //   remove: removeServicoExtra,
  // } = useFieldArray({
  //   control: form.control,
  //   name: "servicosExtras",
  // });

  // const {
  //   fields: condutoresFields,
  //   append: appendCondutor,
  //   remove: removeCondutor,
  // } = useFieldArray({
  //   control: form.control,
  //   name: "condutores",
  // });

  // Cálculos automáticos
  const calculoDiarias = useCalculosDiarias({
    dataInicio: watchedDataInicio,
    dataFim: watchedDataFim,
    horasCorteisia: configuracoesTaxas?.horasCorteisiaDevolucao,
  });

  const calculoFinanceiro = useCalculoFinanceiro(
    watchedValorBase,
    watchedServicosExtras
  );

  const validacao = useValidacaoContrato(watchedTipo, form.getValues());

  // Atualizar diárias calculadas quando mudam as datas
  useEffect(() => {
    if (watchedTipo === "LOCACAO" && calculoDiarias.diarias > 0) {
      form.setValue("diariasCalculadas", calculoDiarias.diarias);
    }
  }, [watchedTipo, calculoDiarias.diarias, form]);

  const handleSave = (data: Contrato) => {
    if (!validacao.isValid) {
      return;
    }
    onSave(data);
  };

  const handleSaveConfiguracoesTaxas = (novasConfiguracoes: ConfiguracoesTaxas) => {
    setConfiguracoesTaxas(novasConfiguracoes);
    // Aqui você pode salvar no backend ou localStorage
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {contrato ? "Editar Contrato" : "Novo Contrato"}
            </h2>
            <p className="text-muted-foreground">
              Preencha as informações do contrato
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfiguracoesTaxasOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações de Taxas
            </Button>
          </div>
        </div>

        {/* Validação */}
        {!validacao.isValid && (
          <Alert variant="destructive">
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {validacao.erros.map((erro, index) => (
                  <li key={index}>{erro}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Contrato</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="LOCACAO">Locação</SelectItem>
                            <SelectItem value="SERVICO">Serviço (com condutor)</SelectItem>
                            <SelectItem value="EVENTO">Evento</SelectItem>
                            <SelectItem value="TERCEIRIZACAO">Terceirização</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clienteId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* Aqui você carregaria os clientes do backend */}
                            <SelectItem value="cliente1">Cliente Exemplo 1</SelectItem>
                            <SelectItem value="cliente2">Cliente Exemplo 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dataHoraInicio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data/Hora Início</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "dd/MM/yyyy HH:mm", { locale: ptBR })
                                ) : (
                                  <span>Selecione data e hora</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  const dateTime = new Date(date);
                                  dateTime.setHours(8, 0, 0, 0); // Hora padrão
                                  field.onChange(dateTime.toISOString());
                                }
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataHoraFim"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data/Hora Fim</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "dd/MM/yyyy HH:mm", { locale: ptBR })
                                ) : (
                                  <span>Selecione data e hora</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  const dateTime = new Date(date);
                                  dateTime.setHours(18, 0, 0, 0); // Hora padrão
                                  field.onChange(dateTime.toISOString());
                                }
                              }}
                              disabled={(date) => {
                                const inicio = new Date(watchedDataInicio);
                                return date < inicio;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Diárias calculadas para locação */}
                {watchedTipo === "LOCACAO" && watchedDataInicio && watchedDataFim && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      Diárias calculadas: {calculoDiarias.diarias}
                      {calculoDiarias.horasExtras > 0 && (
                        <span className="text-muted-foreground">
                          {" "}(+ {calculoDiarias.horasExtras.toFixed(1)}h extras)
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Campos específicos por tipo */}
            {watchedTipo === "LOCACAO" && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Locação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="temMotorista"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Locação com motorista
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("temMotorista") && (
                    <FormField
                      control={form.control}
                      name="motoristaId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motorista</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o motorista" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="motorista1">Motorista Exemplo 1</SelectItem>
                              <SelectItem value="motorista2">Motorista Exemplo 2</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {watchedTipo === "SERVICO" && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Serviço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tipoServico"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Serviço</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="TRANSFER">Transfer</SelectItem>
                              <SelectItem value="DISPOSICAO_HORAS">Disposição por horas</SelectItem>
                              <SelectItem value="PACOTE_5H">Pacote 5h</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passageiro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passageiro</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do passageiro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numeroVoo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Voo (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: TP123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="localAtendimento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Local de Atendimento</FormLabel>
                          <FormControl>
                            <Input placeholder="Endereço completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Valor do Contrato */}
            <Card>
              <CardHeader>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="valorContrato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Base do Contrato</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0,00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Resumo financeiro */}
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Valor base:</span>
                    <span>{formatarMoeda(calculoFinanceiro.valorBase)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Serviços extras:</span>
                    <span>{formatarMoeda(calculoFinanceiro.servicosExtras)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formatarMoeda(calculoFinanceiro.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assinatura Digital */}
            <Card>
              <CardHeader>
                <CardTitle>Assinatura Digital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="enviarAssinaturaAutomatica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enviar automaticamente para assinatura digital após cadastro
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("enviarAssinaturaAutomatica") && (
                  <FormField
                    control={form.control}
                    name="tipoEnvioAssinatura"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Como enviar?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="EMAIL" id="email" />
                              <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="WHATSAPP" id="whatsapp" />
                              <label htmlFor="whatsapp">WhatsApp</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="AMBOS" id="ambos" />
                              <label htmlFor="ambos">Ambos</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Observações gerais sobre o contrato..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading || !validacao.isValid}>
                {isLoading ? "Salvando..." : "Salvar Contrato"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Modal de Configurações */}
      <ConfiguracoesTaxasDialog
        open={configuracoesTaxasOpen}
        onOpenChange={setConfiguracoesTaxasOpen}
        configuracoes={configuracoesTaxas}
        onSave={handleSaveConfiguracoesTaxas}
      />
    </>
  );
}