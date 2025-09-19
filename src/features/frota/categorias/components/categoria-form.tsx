"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { categoriaVeiculoSchema } from "@/lib/schemas"
import type { CategoriaVeiculoFormData, CategoriaVeiculo } from "../types"

interface CategoriaFormProps {
  categoria?: CategoriaVeiculo
  onSubmit: (dados: CategoriaVeiculoFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function CategoriaForm({
  categoria,
  onSubmit,
  onCancel,
  isLoading = false,
}: CategoriaFormProps) {
  const form = useForm<CategoriaVeiculoFormData>({
    resolver: zodResolver(categoriaVeiculoSchema.omit({ id: true, dataCadastro: true })),
    defaultValues: {
      nome: categoria?.nome || "",
      descricao: categoria?.descricao || "",
      status: categoria?.status || "ATIVO",
    },
  })

  const handleSubmit = async (dados: CategoriaVeiculoFormData) => {
    try {
      await onSubmit(dados)
      if (!categoria) {
        form.reset()
      }
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Categoria *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Sedan, SUV, Van..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Nome que identifica a categoria de veículo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição detalhada da categoria..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Descrição detalhada sobre a categoria de veículo
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
                Status atual da categoria
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            {isLoading ? "Salvando..." : categoria ? "Atualizar" : "Criar Categoria"}
          </Button>
        </div>
      </form>
    </Form>
  )
}