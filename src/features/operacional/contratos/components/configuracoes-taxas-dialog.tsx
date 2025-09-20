"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { configuracoesTaxasSchema, type ConfiguracoesTaxas } from "../types";

interface ConfiguracoesTaxasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configuracoes?: ConfiguracoesTaxas;
  onSave: (configuracoes: ConfiguracoesTaxas) => void;
}

export function ConfiguracoesTaxasDialog({
  open,
  onOpenChange,
  configuracoes,
  onSave,
}: ConfiguracoesTaxasDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ConfiguracoesTaxas>({
    resolver: zodResolver(configuracoesTaxasSchema),
    defaultValues: configuracoes || {
      tabelaLavagem: [
        { categoria: "Sedan", valor: 25 },
        { categoria: "SUV", valor: 35 },
        { categoria: "Van", valor: 45 },
      ],
      gasolina: {
        valorPorLitro: 5.5,
        taxaPercentual: 10,
      },
      cadeirinhasInfantis: [
        { tipo: "Cadeirinha 0-4 anos", valorDiario: 15 },
        { tipo: "Assento elevado 4-10 anos", valorDiario: 10 },
      ],
      kmPadraoPorDia: 100,
      valorKmAdicional: 0.8,
      horasCorteisiaDevolucao: 3,
    },
  });

  const {
    fields: tabelaLavagemFields,
    append: appendTabelaLavagem,
    remove: removeTabelaLavagem,
  } = useFieldArray({
    control: form.control,
    name: "tabelaLavagem",
  });

  const {
    fields: cadeirinhasFields,
    append: appendCadeirinha,
    remove: removeCadeirinha,
  } = useFieldArray({
    control: form.control,
    name: "cadeirinhasInfantis",
  });

  const handleSave = async (data: ConfiguracoesTaxas) => {
    setIsLoading(true);
    try {
      await onSave(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurações de Taxas Padronizadas</DialogTitle>
          <DialogDescription>
            Configure os valores padrões que serão utilizados nos contratos
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* Tabela de Lavagem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Tabela de Lavagem de Automóveis
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendTabelaLavagem({ categoria: "", valor: 0 })}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tabelaLavagemFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`tabelaLavagem.${index}.categoria`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Sedan, SUV, Van" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`tabelaLavagem.${index}.valor`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormLabel>Valor (R$)</FormLabel>
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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-8"
                      onClick={() => removeTabelaLavagem(index)}
                      disabled={tabelaLavagemFields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Configurações de Gasolina */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Gasolina</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gasolina.valorPorLitro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor por Litro (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="5,50"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gasolina.taxaPercentual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa Percentual (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          placeholder="10"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Cadeirinhas Infantis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Cadeirinhas Infantis
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCadeirinha({ tipo: "", valorDiario: 0 })}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cadeirinhasFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`cadeirinhasInfantis.${index}.tipo`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Tipo de Cadeirinha</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Cadeirinha 0-4 anos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`cadeirinhasInfantis.${index}.valorDiario`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormLabel>Valor/Dia (R$)</FormLabel>
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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-8"
                      onClick={() => removeCadeirinha(index)}
                      disabled={cadeirinhasFields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Outras Configurações */}
            <Card>
              <CardHeader>
                <CardTitle>Outras Configurações</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="kmPadraoPorDia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KM Padrão por Dia</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="100"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valorKmAdicional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor por KM Adicional (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0,80"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horasCorteisiaDevolucao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas Cortesia Devolução</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="3"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}