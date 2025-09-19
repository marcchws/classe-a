"use client"

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { modeloVeiculoSchema } from "@/lib/schemas"
import type { ModeloVeiculoFormData, ModeloVeiculo, MarcaVeiculo } from "../types"

interface ModeloFormProps {
  modelo?: ModeloVeiculo
  marcas: MarcaVeiculo[]
  onSubmit: (dados: ModeloVeiculoFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ModeloForm({
  modelo,
  marcas,
  onSubmit,
  onCancel,
  isLoading = false,
}: ModeloFormProps) {
  const form = useForm<ModeloVeiculoFormData>({
    resolver: zodResolver(modeloVeiculoSchema.omit({ id: true, dataCadastro: true })),
    defaultValues: {
      marcaId: modelo?.marcaId || "",
      nome: modelo?.nome || "",
      observacao: modelo?.observacao || "",
      status: modelo?.status || "ATIVO",
      itensManutencao: modelo?.itensManutencao || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itensManutencao",
  })

  const handleSubmit = async (dados: ModeloVeiculoFormData) => {
    try {
      await onSubmit(dados)
      if (!modelo) {
        form.reset()
      }
    } catch (error) {
      console.error("Erro ao salvar modelo:", error)
    }
  }

  const adicionarItemManutencao = () => {
    append({
      nome: "",
      tipo: "QUILOMETRAGEM",
      valor: 1,
      descricao: "",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="marcaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {marcas.map((marca) => (
                    <SelectItem key={marca.id} value={marca.id!}>
                      {marca.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Marca à qual este modelo pertence
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Modelo *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Corolla, X3, C-Class..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Nome que identifica o modelo do veículo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações sobre o modelo..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Informações adicionais sobre o modelo
              </FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Status atual do modelo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Itens de Manutenção */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Itens de Manutenção</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={adicionarItemManutencao}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum item de manutenção adicionado. Clique em &quot;Adicionar Item&quot; para começar.
              </p>
            )}

            {fields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-sm font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`itensManutencao.${index}.nome`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Item *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Troca de óleo, Revisão completa..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`itensManutencao.${index}.tipo`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="QUILOMETRAGEM">Por Quilometragem</SelectItem>
                            <SelectItem value="TEMPO">Por Tempo (meses)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`itensManutencao.${index}.valor`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Valor * {form.watch(`itensManutencao.${index}.tipo`) === "QUILOMETRAGEM" ? "(KM)" : "(Meses)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder={form.watch(`itensManutencao.${index}.tipo`) === "QUILOMETRAGEM" ? "Ex: 10000" : "Ex: 12"}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`itensManutencao.${index}.descricao`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Descrição opcional..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : modelo ? "Atualizar" : "Criar Modelo"}
          </Button>
        </div>
      </form>
    </Form>
  )
}