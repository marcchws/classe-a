"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parceiroSchema, Parceiro, TipoHistorico } from "@/lib/schemas";
import { Save, Handshake, MapPin, Phone, Mail, History, Plus, Trash2, AlertCircle } from "lucide-react";

interface ParceiroFormProps {
  onSubmit: (data: Parceiro) => void;
  initialData?: Partial<Parceiro>;
}

export function ParceiroForm({ onSubmit, initialData }: ParceiroFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [historicoRelacionamento, setHistoricoRelacionamento] = useState<Array<{
    tipo: TipoHistorico;
    data: string;
    descricao: string;
    indicado: string;
  }>>((initialData?.historicoRelacionamento || []).map(item => ({
    ...item,
    indicado: item.indicado || ""
  })));

  const form = useForm({
    resolver: zodResolver(parceiroSchema),
    defaultValues: {
      tipo: "PARCEIRO",
      status: "ATIVO",
      ...initialData,
    },
  });

  const handleSubmit = async (data: Parceiro) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      if (historicoRelacionamento.length > 0) {
        data.historicoRelacionamento = historicoRelacionamento;
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
      setSubmitError(error instanceof Error ? error.message : "Erro desconhecido ao salvar parceiro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const adicionarHistorico = () => {
    setHistoricoRelacionamento([
      ...historicoRelacionamento,
      { tipo: "RELACIONAMENTO", data: "", descricao: "", indicado: "" }
    ]);
  };

  const removerHistorico = (index: number) => {
    setHistoricoRelacionamento(historicoRelacionamento.filter((_, i) => i !== index));
  };

  const atualizarHistorico = (index: number, field: string, value: unknown) => {
    const novoHistorico = [...historicoRelacionamento];
    novoHistorico[index] = { ...novoHistorico[index], [field]: value };
    setHistoricoRelacionamento(novoHistorico);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5" />
              Dados do Parceiro
            </CardTitle>
            <CardDescription>
              Informações básicas do parceiro estratégico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="tipoParceiro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Parceiro</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de parceiro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AGENCIA_TURISMO">Agência de Turismo</SelectItem>
                      <SelectItem value="HOTEL">Hotel</SelectItem>
                      <SelectItem value="RESTAURANTE_LUXO">Restaurante de Luxo</SelectItem>
                      <SelectItem value="EMPRESA_EVENTOS">Empresa de Eventos</SelectItem>
                      <SelectItem value="LOCADORA_PARCEIRA">Locadora Parceira</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="razaoSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a razão social" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nomeFantasia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome fantasia"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contato Responsável
            </CardTitle>
            <CardDescription>
              Pessoa responsável principal do parceiro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contatoResponsavel.nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contatoResponsavel.telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contatoResponsavel.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="responsavel@parceiro.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contato Financeiro
            </CardTitle>
            <CardDescription>
              Pessoa responsável pelo financeiro do parceiro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contatoFinanceiro.nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável financeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contatoFinanceiro.telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contatoFinanceiro.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="financeiro@parceiro.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço do Parceiro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="enderecoCompleto.logradouro"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Logradouro</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua, Avenida, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enderecoCompleto.numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="enderecoCompleto.complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sala, Andar, etc."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enderecoCompleto.bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enderecoCompleto.cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="enderecoCompleto.cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enderecoCompleto.estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Histórico de Relacionamento
            </CardTitle>
            <CardDescription>
              Registro de indicações e relacionamentos (opcional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Registros de Relacionamento</h4>
              <Button type="button" variant="outline" size="sm" onClick={adicionarHistorico}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {historicoRelacionamento.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium">Registro {index + 1}</h5>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removerHistorico(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Select
                      value={item.tipo}
                      onValueChange={(value) =>
                        atualizarHistorico(index, "tipo", value as TipoHistorico)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INDICACAO">Indicação</SelectItem>
                        <SelectItem value="RELACIONAMENTO">Relacionamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Data</label>
                    <Input
                      type="date"
                      value={item.data}
                      onChange={(e) =>
                        atualizarHistorico(index, "data", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    placeholder="Descrição do relacionamento ou indicação"
                    value={item.descricao}
                    onChange={(e) =>
                      atualizarHistorico(index, "descricao", e.target.value)
                    }
                  />
                </div>

                {item.tipo === "INDICACAO" && (
                  <div>
                    <label className="text-sm font-medium">Cliente Indicado</label>
                    <Input
                      placeholder="Nome do cliente indicado"
                      value={item.indicado}
                      onChange={(e) =>
                        atualizarHistorico(index, "indicado", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {historicoRelacionamento.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum histórico de relacionamento adicionado
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Salvando..." : "Salvar Parceiro"}
          </Button>
        </div>
      </form>
    </Form>
  );
}