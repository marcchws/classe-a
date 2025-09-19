"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, CheckCircle, AlertCircle, FileText } from "lucide-react";

interface ClienteImportado {
  tipo: string;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  endereco: string;
}

interface ImportacaoCsvProps {
  onImportComplete?: (resultados: ClienteImportado[]) => void;
}

export function ImportacaoCsv({ onImportComplete }: ImportacaoCsvProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [importando, setImportando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [resultado, setResultado] = useState<{
    sucesso: number;
    erro: number;
    erros: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setArquivo(file);
      setResultado(null);
    } else {
      alert("Por favor, selecione um arquivo CSV válido.");
    }
  };

  const downloadModelo = () => {
    // Modelo CSV para clientes
    const csvContent = `tipo,nome,documento,telefone,email,endereco
PESSOA_FISICA,João Silva,123.456.789-00,(11) 99999-9999,joao@email.com,"Rua das Flores, 123, Centro, São Paulo, SP, 01234-567"
PESSOA_JURIDICA,Empresa ABC Ltda,12.345.678/0001-90,(11) 3333-3333,contato@empresaabc.com,"Av. Paulista, 1000, Bela Vista, São Paulo, SP, 01310-100"
PARCEIRO,Hotel Premium,98.765.432/0001-10,(11) 4444-4444,comercial@hotelpremium.com,"Rua Augusta, 500, Consolação, São Paulo, SP, 01305-000"`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "modelo_clientes.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const processarCsv = async () => {
    if (!arquivo) return;

    setImportando(true);
    setProgresso(0);

    try {
      const text = await arquivo.text();
      const linhas = text.split("\n").filter(linha => linha.trim());
      const cabecalho = linhas[0].split(",");

      // Validar cabeçalho esperado
      const cabecalhoEsperado = ["tipo", "nome", "documento", "telefone", "email", "endereco"];
      const cabecalhoValido = cabecalhoEsperado.every(col => cabecalho.includes(col));

      if (!cabecalhoValido) {
        throw new Error("Cabeçalho do CSV não corresponde ao modelo esperado.");
      }

      const dados = linhas.slice(1);
      const resultados = [];
      const erros = [];
      let sucesso = 0;

      for (let i = 0; i < dados.length; i++) {
        const linha = dados[i].split(",");

        if (linha.length !== cabecalho.length) {
          erros.push(`Linha ${i + 2}: Número incorreto de colunas`);
          continue;
        }

        const cliente = {
          tipo: linha[0]?.trim(),
          nome: linha[1]?.trim(),
          documento: linha[2]?.trim(),
          telefone: linha[3]?.trim(),
          email: linha[4]?.trim(),
          endereco: linha[5]?.trim(),
        };

        // Validações básicas
        if (!cliente.tipo || !["PESSOA_FISICA", "PESSOA_JURIDICA", "PARCEIRO"].includes(cliente.tipo)) {
          erros.push(`Linha ${i + 2}: Tipo de cliente inválido`);
          continue;
        }

        if (!cliente.nome) {
          erros.push(`Linha ${i + 2}: Nome é obrigatório`);
          continue;
        }

        if (!cliente.documento) {
          erros.push(`Linha ${i + 2}: Documento é obrigatório`);
          continue;
        }

        if (!cliente.telefone) {
          erros.push(`Linha ${i + 2}: Telefone é obrigatório`);
          continue;
        }

        if (!cliente.email || !cliente.email.includes("@")) {
          erros.push(`Linha ${i + 2}: E-mail inválido`);
          continue;
        }

        // Simular processamento
        await new Promise(resolve => setTimeout(resolve, 50));

        resultados.push(cliente);
        sucesso++;
        setProgresso(((i + 1) / dados.length) * 100);
      }

      const resultadoFinal = {
        sucesso,
        erro: erros.length,
        erros: erros.slice(0, 10), // Mostrar apenas os primeiros 10 erros
      };

      setResultado(resultadoFinal);

      if (onImportComplete) {
        onImportComplete(resultados);
      }

    } catch (error) {
      console.error("Erro ao processar CSV:", error);
      setResultado({
        sucesso: 0,
        erro: 1,
        erros: [error instanceof Error ? error.message : "Erro desconhecido"]
      });
    } finally {
      setImportando(false);
      setProgresso(100);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importação de Clientes via CSV
        </CardTitle>
        <CardDescription>
          Importe informações de clientes através de arquivo CSV
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={downloadModelo}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Baixar Modelo
          </Button>
          <p className="text-sm text-muted-foreground">
            Baixe o modelo do arquivo CSV para garantir o formato correto
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              disabled={importando}
            />
          </div>

          {arquivo && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Arquivo selecionado: {arquivo.name} ({(arquivo.size / 1024).toFixed(2)} KB)
              </AlertDescription>
            </Alert>
          )}

          {arquivo && !importando && !resultado && (
            <Button onClick={processarCsv} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Iniciar Importação
            </Button>
          )}

          {importando && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm">Processando arquivo...</span>
              </div>
              <Progress value={progresso} className="w-full" />
              <p className="text-xs text-muted-foreground">
                {progresso.toFixed(0)}% concluído
              </p>
            </div>
          )}

          {resultado && (
            <div className="space-y-3">
              <Alert className={resultado.erro > 0 ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}>
                {resultado.erro > 0 ?
                  <AlertCircle className="h-4 w-4 text-orange-600" /> :
                  <CheckCircle className="h-4 w-4 text-green-600" />
                }
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">
                      Importação concluída
                    </p>
                    <p className="text-sm">
                      ✅ {resultado.sucesso} cliente(s) importado(s) com sucesso
                    </p>
                    {resultado.erro > 0 && (
                      <p className="text-sm">
                        ⚠️ {resultado.erro} registro(s) com erro
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>

              {resultado.erros.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Erros Encontrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {resultado.erros.map((erro, index) => (
                        <p key={index} className="text-xs text-red-600">
                          {erro}
                        </p>
                      ))}
                      {resultado.erro > resultado.erros.length && (
                        <p className="text-xs text-muted-foreground">
                          + {resultado.erro - resultado.erros.length} erro(s) adicional(is)
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                variant="outline"
                onClick={() => {
                  setArquivo(null);
                  setResultado(null);
                  setProgresso(0);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="w-full"
              >
                Importar Novo Arquivo
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}