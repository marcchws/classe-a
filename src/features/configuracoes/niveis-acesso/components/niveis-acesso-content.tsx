"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AccessLevel } from "../types"
import { AccessLevelFormSchema } from "../schemas"
import { CreateAccessLevelDialog } from "./create-access-level-dialog"
import { pageConfig } from "@/lib/page-config"

export function NiveisAcessoContent() {
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>(pageConfig.configuracoes.accessLevels)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredAccessLevels = accessLevels.filter(level =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusToggle = (id: string) => {
    setAccessLevels(levels =>
      levels.map(level =>
        level.id === id
          ? { ...level, status: level.status === "active" ? "inactive" : "active" }
          : level
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este nível de acesso?")) {
      setAccessLevels(levels => levels.filter(level => level.id !== id))
    }
  }

  const handleCreateAccessLevel = (data: AccessLevelFormSchema) => {
    const newAccessLevel: AccessLevel = {
      id: String(Date.now()),
      name: data.name,
      description: data.description,
      status: data.status || "active",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setAccessLevels(levels => [...levels, newAccessLevel])
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Shield className="h-6 w-6" />
            Níveis de Acesso
          </h1>
          <p className="text-muted-foreground">
            Gerencie os níveis de acesso e permissões do sistema
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Nível de Acesso
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pesquisar Níveis de Acesso</CardTitle>
          <CardDescription>
            Encontre níveis de acesso por nome ou descrição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Níveis de Acesso Cadastrados</CardTitle>
          <CardDescription>
            {filteredAccessLevels.length} nível(is) de acesso encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccessLevels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhum nível de acesso encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAccessLevels.map((level) => (
                    <TableRow key={level.id}>
                      <TableCell className="font-mono text-sm">{level.id}</TableCell>
                      <TableCell className="font-medium">{level.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {level.description || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={level.status === "active" ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleStatusToggle(level.id)}
                        >
                          {level.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {level.createdAt.toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(level.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateAccessLevelDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateAccessLevel}
      />
    </div>
  )
}