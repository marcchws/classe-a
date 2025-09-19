"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  campoAtuacaoEnum,
} from "@/lib/schemas";
import type { Fornecedor, FornecedorFormData } from "@/types/fornecedor";

// Tipo específico para o formulário
type FornecedorFormType = {
  tipo: "VEICULO" | "SERVICO";
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  contatoResponsavel: {
    nome: string;
    telefone: string;
    email: string;
  };
  contatoFinanceiro: {
    nome: string;
    telefone: string;
    email: string;
  };
  enderecoCompleto: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  status: "ATIVO" | "INATIVO";
  // Campos específicos para VEICULO
  veiculosUtilizados?: unknown[];
  valorRepasseNegociado?: number;
  // Campos específicos para SERVICO
  campoAtuacao?: string[];
  servicosPrestados?: unknown[];
  equipe?: unknown[];
};

interface FornecedorFormProps {
  fornecedor?: Fornecedor;
  onSubmit: (data: FornecedorFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function FornecedorForm({
  fornecedor,
  onSubmit,
  onCancel,
  isLoading = false,
}: FornecedorFormProps) {
  const [tipoSelecionado, setTipoSelecionado] = useState<"VEICULO" | "SERVICO">(
    fornecedor?.tipo || "VEICULO"
  );

  const form = useForm<FornecedorFormType>({
    defaultValues: fornecedor || {
      tipo: "VEICULO",
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      contatoResponsavel: {
        nome: "",
        telefone: "",
        email: "",
      },
      contatoFinanceiro: {
        nome: "",
        telefone: "",
        email: "",
      },
      enderecoCompleto: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      status: "ATIVO",
    },
  });

  const handleTipoChange = (tipo: "VEICULO" | "SERVICO") => {
    setTipoSelecionado(tipo);
    form.setValue("tipo", tipo);

    // Reset campos específicos do tipo anterior
    if (tipo === "VEICULO") {
      form.unregister("campoAtuacao");
      form.unregister("servicosPrestados");
      form.unregister("equipe");
    } else {
      form.unregister("veiculosUtilizados");
      form.unregister("valorRepasseNegociado");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {fornecedor ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Tipo de Fornecedor */}
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Fornecedor *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => handleTipoChange(value as "VEICULO" | "SERVICO")}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="VEICULO" id="veiculo" />
                          <Label htmlFor="veiculo">Veículo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="SERVICO" id="servico" />
                          <Label htmlFor="servico">Serviço</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Dados da Empresa */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados da Empresa</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="razaoSocial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="00.000.000/0000-00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ATIVO">Ativo</SelectItem>
                            <SelectItem value="INATIVO">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Contatos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contatos</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contato Responsável */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Responsável</h4>

                    <FormField
                      control={form.control}
                      name="contatoResponsavel.nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contatoResponsavel.telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contato Financeiro */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Financeiro</h4>

                    <FormField
                      control={form.control}
                      name="contatoFinanceiro.nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contatoFinanceiro.telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço Completo</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="enderecoCompleto.logradouro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logradouro *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="enderecoCompleto.numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enderecoCompleto.complemento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enderecoCompleto.cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Estado *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>CEP *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="00000-000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Campos específicos por tipo */}
              {tipoSelecionado === "VEICULO" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Específicas - Veículos</h3>

                  <FormField
                    control={form.control}
                    name="valorRepasseNegociado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor de Repasse Negociado</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {tipoSelecionado === "SERVICO" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Específicas - Serviços</h3>

                  <FormField
                    control={form.control}
                    name="campoAtuacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campo de Atuação *</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {campoAtuacaoEnum.options.map((campo) => (
                            <div key={campo} className="flex items-center space-x-2">
                              <Checkbox
                                id={campo}
                                checked={field.value?.includes(campo)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, campo]);
                                  } else {
                                    field.onChange(current.filter((c) => c !== campo));
                                  }
                                }}
                              />
                              <Label htmlFor={campo} className="text-sm">
                                {campo.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Botões */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : fornecedor ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}