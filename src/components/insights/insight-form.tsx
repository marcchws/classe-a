"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, Calendar, Building2, Users } from "lucide-react"

interface InsightFormProps {
  insight?: {
    titulo: string;
    descricao: string;
    publicoAlvo: string;
    setor?: string;
    imagem?: string;
    video?: string;
    linkExterno?: string;
    dataInicio: string;
    dataTermino?: string;
  }
  trigger?: React.ReactNode
  onSubmit: (data: {
    titulo: string;
    descricao: string;
    publicoAlvo: string;
    setor: string;
    imagem: string;
    video: string;
    linkExterno: string;
    dataInicio: string;
    dataTermino: string;
  }) => void
}

export function InsightForm({ insight, trigger, onSubmit }: InsightFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    titulo: insight?.titulo || "",
    descricao: insight?.descricao || "",
    publicoAlvo: insight?.publicoAlvo || "Empresa toda",
    setor: insight?.setor || "",
    imagem: insight?.imagem || "",
    video: insight?.video || "",
    linkExterno: insight?.linkExterno || "",
    dataInicio: insight?.dataInicio || "",
    dataTermino: insight?.dataTermino || "",
  })

  const setores = [
    "Operacional",
    "Financeiro",
    "Administrativo",
    "Manutenção",
    "Comercial",
    "Recursos Humanos",
    "TI",
    "Jurídico"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setIsOpen(false)
    if (!insight) {
      setFormData({
        titulo: "",
        descricao: "",
        publicoAlvo: "Empresa toda",
        setor: "",
        imagem: "",
        video: "",
        linkExterno: "",
        dataInicio: "",
        dataTermino: "",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Insight
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {insight ? "Editar Insight" : "Novo Insight"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Digite o título do insight"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
                placeholder="Digite a descrição detalhada do insight"
                rows={4}
                required
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Público-alvo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.publicoAlvo}
                onValueChange={(value) => handleChange("publicoAlvo", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Empresa toda" id="empresa-toda" />
                  <Label htmlFor="empresa-toda" className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>Empresa toda</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Setor" id="setor" />
                  <Label htmlFor="setor" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Setor específico</span>
                  </Label>
                </div>
              </RadioGroup>

              {formData.publicoAlvo === "Setor" && (
                <div className="space-y-2">
                  <Label htmlFor="setor-select">Selecionar Setor *</Label>
                  <Select
                    value={formData.setor}
                    onValueChange={(value) => handleChange("setor", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores.map((setor) => (
                        <SelectItem key={setor} value={setor}>
                          {setor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Mídia e Links (Opcionais)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imagem">URL da Imagem</Label>
                <Input
                  id="imagem"
                  value={formData.imagem}
                  onChange={(e) => handleChange("imagem", e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">URL do Vídeo</Label>
                <Input
                  id="video"
                  value={formData.video}
                  onChange={(e) => handleChange("video", e.target.value)}
                  placeholder="https://exemplo.com/video.mp4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkExterno">Link Externo</Label>
                <Input
                  id="linkExterno"
                  value={formData.linkExterno}
                  onChange={(e) => handleChange("linkExterno", e.target.value)}
                  placeholder="https://exemplo.com/material-complementar"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Período de Exibição</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data/Hora Início *</Label>
                  <Input
                    id="dataInicio"
                    type="datetime-local"
                    value={formData.dataInicio}
                    onChange={(e) => handleChange("dataInicio", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataTermino">Data/Hora Término</Label>
                  <Input
                    id="dataTermino"
                    type="datetime-local"
                    value={formData.dataTermino}
                    onChange={(e) => handleChange("dataTermino", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se não definido, o insight expirará em 30 dias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {insight ? "Salvar Alterações" : "Criar Insight"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}