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
import { z } from "zod"
import type { MarcaVeiculoFormData, MarcaVeiculo } from "../types"

// Schema específico para o formulário
const marcaFormSchema = z.object({
  nome: z.string().min(1, "Nome da marca eh obrigatorio"),
  observacao: z.string().optional(),
  status: z.enum(["ATIVO", "INATIVO"]),
});

type MarcaFormData = z.infer<typeof marcaFormSchema>;

interface MarcaFormProps {
  marca?: MarcaVeiculo
  onSubmit: (dados: MarcaFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function MarcaForm({
  marca,
  onSubmit,
  onCancel,
  isLoading = false,
}: MarcaFormProps) {
  const form = useForm<MarcaFormData>({
    resolver: zodResolver(marcaFormSchema),
    defaultValues: {
      nome: marca?.nome || "",
      observacao: marca?.observacao || "",
      status: marca?.status || "ATIVO",
    },
  })

  const handleSubmit = async (dados: MarcaFormData) => {
    try {
      await onSubmit(dados)
      if (!marca) {
        form.reset()
      }
    } catch (error) {
      console.error("Erro ao salvar marca:", error)
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
              <FormLabel>Nome da Marca *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Toyota, BMW, Mercedes-Benz..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Nome que identifica a marca do veículo
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
                  placeholder="Observações sobre a marca..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Informações adicionais sobre a marca
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
                Status atual da marca
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
            {isLoading ? "Salvando..." : marca ? "Atualizar" : "Criar Marca"}
          </Button>
        </div>
      </form>
    </Form>
  )
}