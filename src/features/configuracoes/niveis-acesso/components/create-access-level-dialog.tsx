"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { accessLevelFormSchema, AccessLevelFormSchema } from "../schemas"
import { systemModules } from "../data/modules"

interface CreateAccessLevelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AccessLevelFormSchema) => void
}

export function CreateAccessLevelDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateAccessLevelDialogProps) {
  const [step, setStep] = useState<"basic" | "permissions">("basic")

  const form = useForm<AccessLevelFormSchema>({
    resolver: zodResolver(accessLevelFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      permissions: {},
    },
  })

  const handleSubmit = (data: AccessLevelFormSchema) => {
    onSubmit(data)
    form.reset()
    setStep("basic")
  }

  const handleCancel = () => {
    form.reset()
    setStep("basic")
    onOpenChange(false)
  }

  const selectAllPermissions = () => {
    const allPermissions: Record<string, {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
      export?: boolean;
    }> = {}
    systemModules.forEach(moduleItem => {
      moduleItem.permissions.forEach(permission => {
        allPermissions[permission.id] = {
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: permission.actions.export ? true : false,
        }
      })
    })
    form.setValue("permissions", allPermissions)
  }

  const selectModulePermissions = (moduleId: string) => {
    const moduleItem = systemModules.find(m => m.id === moduleId)
    if (!moduleItem) return

    const currentPermissions = form.getValues("permissions")
    const modulePermissions = { ...currentPermissions }

    moduleItem.permissions.forEach(permission => {
      modulePermissions[permission.id] = {
        view: true,
        create: true,
        edit: true,
        delete: true,
        export: permission.actions.export ? true : false,
      }
    })

    form.setValue("permissions", modulePermissions)
  }

  const clearAllPermissions = () => {
    form.setValue("permissions", {})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "basic" ? "Criar Novo Nível de Acesso" : "Configurar Permissões"}
          </DialogTitle>
          <DialogDescription>
            {step === "basic"
              ? "Preencha as informações básicas do nível de acesso"
              : "Selecione as permissões para cada módulo do sistema"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {step === "basic" ? (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Perfil*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Operador de Frota" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nome para diferenciação do tipo de perfil
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do Perfil</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Perfil para uso no gerenciamento de frotas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Informação adicional sobre o perfil de acesso (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status do Perfil</FormLabel>
                        <FormDescription>
                          O perfil será criado como ativo por padrão
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "active"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "active" : "inactive")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllPermissions}
                  >
                    Selecionar Todas
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAllPermissions}
                  >
                    Limpar Todas
                  </Button>
                </div>

                <div className="space-y-4">
                  {systemModules.map((module) => (
                    <Card key={module.id}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{module.name}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => selectModulePermissions(module.id)}
                          >
                            Selecionar Módulo
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {module.permissions.map((permission) => (
                          <div key={permission.id} className="space-y-3">
                            <div>
                              <h4 className="font-medium">{permission.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                            <div className="flex gap-4">
                              {Object.entries(permission.actions).map(([action, available]) => {
                                if (!available) return null

                                const actionLabels = {
                                  view: "Visualizar",
                                  create: "Criar",
                                  edit: "Editar",
                                  delete: "Excluir",
                                  export: "Exportar",
                                }

                                return (
                                  <FormField
                                    key={`${permission.id}.${action}`}
                                    control={form.control}
                                    name={`permissions.${permission.id}.${action}` as keyof AccessLevelFormSchema}
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel>
                                            {actionLabels[action as keyof typeof actionLabels]}
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              {step === "basic" ? (
                <Button type="button" onClick={() => setStep("permissions")}>
                  Próximo: Permissões
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep("basic")}>
                    Voltar
                  </Button>
                  <Button type="submit">Criar Nível de Acesso</Button>
                </div>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}