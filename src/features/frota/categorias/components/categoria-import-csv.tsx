"use client"

import * as React from "react"
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { categoriaService } from "../services/categoria-service"
import type { ImportacaoCategoriaResult } from "../types"

interface CategoriaImportCSVProps {
  onImportSuccess: () => void
}

export function CategoriaImportCSV({ onImportSuccess }: CategoriaImportCSVProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [arquivo, setArquivo] = React.useState<File | null>(null)
  const [isImporting, setIsImporting] = React.useState(false)
  const [progresso, setProgresso] = React.useState(0)
  const [resultado, setResultado] = React.useState<ImportacaoCategoriaResult | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      setArquivo(file)
      setResultado(null)
    } else {
      alert("Por favor, selecione um arquivo CSV válido.")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleImport = async () => {
    if (!arquivo) return

    setIsImporting(true)
    setProgresso(0)

    try {
      // Simular progresso
      const interval = setInterval(() => {
        setProgresso((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const resultado = await categoriaService.importarCSV(arquivo)

      clearInterval(interval)
      setProgresso(100)
      setResultado(resultado)

      if (resultado.sucesso.length > 0) {
        onImportSuccess()
      }
    } catch (error) {
      console.error("Erro na importação:", error)
      setResultado({
        sucesso: [],
        erros: [{ linha: 0, erro: "Erro interno do sistema" }]
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleDownloadModelo = async () => {
    try {
      const blob = await categoriaService.obterModeloCSV()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "modelo-categorias.csv"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao baixar modelo:", error)
    }
  }

  const resetDialog = () => {
    setArquivo(null)
    setResultado(null)
    setProgresso(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        resetDialog()
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importar CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Categorias via CSV</DialogTitle>
          <DialogDescription>
            Importe múltiplas categorias de uma vez usando um arquivo CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Botão para baixar modelo */}
          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadModelo}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Baixar Modelo CSV
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Baixe o modelo para ver o formato esperado
            </p>
          </div>

          {/* Seleção de arquivo */}
          <div className="space-y-2">
            <Label htmlFor="csv-file">Arquivo CSV</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isImporting}
            />
          </div>

          {/* Progresso da importação */}
          {isImporting && (
            <div className="space-y-2">
              <Label>Progresso da Importação</Label>
              <Progress value={progresso} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {progresso < 100 ? "Processando arquivo..." : "Importação concluída!"}
              </p>
            </div>
          )}

          {/* Resultado da importação */}
          {resultado && (
            <div className="space-y-2">
              {resultado.sucesso.length > 0 && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {resultado.sucesso.length} categoria(s) importada(s) com sucesso.
                  </AlertDescription>
                </Alert>
              )}

              {resultado.erros.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {resultado.erros.length} erro(s) encontrado(s):
                    <ul className="mt-2 list-disc list-inside">
                      {resultado.erros.slice(0, 3).map((erro, index) => (
                        <li key={index} className="text-sm">
                          Linha {erro.linha}: {erro.erro}
                        </li>
                      ))}
                      {resultado.erros.length > 3 && (
                        <li className="text-sm">
                          ... e mais {resultado.erros.length - 3} erro(s)
                        </li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isImporting}
            >
              {resultado ? "Fechar" : "Cancelar"}
            </Button>
            {!resultado && (
              <Button
                onClick={handleImport}
                disabled={!arquivo || isImporting}
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                {isImporting ? "Importando..." : "Importar"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}