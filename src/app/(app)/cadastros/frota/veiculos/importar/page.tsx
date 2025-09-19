"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Upload, Download, FileText, AlertTriangle, CheckCircle, X } from "lucide-react";
import Link from "next/link";

interface ImportResult {
  linha: number;
  dados: Record<string, string>;
  erro?: string;
  sucesso: boolean;
}

export default function ImportarVeiculosPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [importando, setImportando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [resultados, setResultados] = useState<ImportResult[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const modeloCSV = `categoria,marca,modelo,versao,combustivel,cor,pax,placa,km_atual,capacidade_tanque,blindado,valor_blindagem,valor_total,entrada,modalidade
Sedan,Mercedes-Benz,S-Class,S 500 L,GASOLINA,Preto,4,ABC-1234,45000,80,true,150000,800000,200000,FINANCIAMENTO
SUV,BMW,X5,xDrive40i,GASOLINA,Branco,7,DEF-5678,32000,75,true,120000,650000,150000,A_VISTA
Van,Mercedes-Benz,Sprinter,415 CDI,DIESEL,Prata,19,GHI-9012,78000,90,false,,280000,280000,A_VISTA`;

  const baixarModelo = () => {
    const blob = new Blob([modeloCSV], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "modelo_importacao_veiculos.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArquivo(file);
      setResultados([]);
      setMostrarResultados(false);
    }
  };

  const processarCSV = (csvText: string): Record<string, string>[] => {
    const linhas = csvText.split('\n').filter(linha => linha.trim());
    const headers = linhas[0].split(',').map(h => h.trim());
    const dados = [];

    for (let i = 1; i < linhas.length; i++) {
      const valores = linhas[i].split(',').map(v => v.trim());
      const objeto: Record<string, string> = {};

      headers.forEach((header, index) => {
        objeto[header] = valores[index] || '';
      });

      dados.push(objeto);
    }

    return dados;
  };

  const validarDados = (dados: Record<string, string>): string | null => {
    const camposObrigatorios = ['categoria', 'marca', 'modelo', 'versao', 'combustivel', 'cor', 'pax', 'km_atual', 'capacidade_tanque', 'valor_total', 'entrada', 'modalidade'];

    for (const campo of camposObrigatorios) {
      if (!dados[campo] || dados[campo].toString().trim() === '') {
        return `Campo obrigatório '${campo}' está vazio`;
      }
    }

    // Validações específicas
    if (isNaN(Number(dados.pax)) || Number(dados.pax) < 1) {
      return "PAX deve ser um número positivo";
    }

    if (isNaN(Number(dados.km_atual)) || Number(dados.km_atual) < 0) {
      return "KM atual deve ser um número não negativo";
    }

    if (isNaN(Number(dados.capacidade_tanque)) || Number(dados.capacidade_tanque) <= 0) {
      return "Capacidade do tanque deve ser um número positivo";
    }

    if (isNaN(Number(dados.valor_total)) || Number(dados.valor_total) <= 0) {
      return "Valor total deve ser um número positivo";
    }

    if (isNaN(Number(dados.entrada)) || Number(dados.entrada) < 0) {
      return "Entrada deve ser um número não negativo";
    }

    if (Number(dados.entrada) > Number(dados.valor_total)) {
      return "Entrada não pode ser maior que o valor total";
    }

    const combustiveisValidos = ['GASOLINA', 'ETANOL', 'DIESEL', 'HIBRIDO', 'ELETRICO'];
    if (!combustiveisValidos.includes(dados.combustivel.toUpperCase())) {
      return `Combustível deve ser um dos valores: ${combustiveisValidos.join(', ')}`;
    }

    const modalidadesValidas = ['A_VISTA', 'FINANCIAMENTO', 'LEASING', 'CONSORCIO'];
    if (!modalidadesValidas.includes(dados.modalidade.toUpperCase())) {
      return `Modalidade deve ser um dos valores: ${modalidadesValidas.join(', ')}`;
    }

    if (dados.blindado?.toLowerCase() === 'true' && (!dados.valor_blindagem || isNaN(Number(dados.valor_blindagem)))) {
      return "Valor da blindagem é obrigatório quando o veículo é blindado";
    }

    if (dados.placa && dados.placa.length > 0) {
      const placaRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
      if (!placaRegex.test(dados.placa.toUpperCase())) {
        return "Placa deve estar no formato ABC-1234 ou ABC1D23";
      }
    }

    return null;
  };

  const processarImportacao = async () => {
    if (!arquivo) return;

    setImportando(true);
    setProgresso(0);
    setResultados([]);

    try {
      const csvText = await arquivo.text();
      const dadosCSV = processarCSV(csvText);
      const resultadosImportacao: ImportResult[] = [];

      for (let i = 0; i < dadosCSV.length; i++) {
        const linha = i + 2; // +2 porque começamos da linha 2 (header é linha 1)
        const dados = dadosCSV[i];

        // Simular processamento
        await new Promise(resolve => setTimeout(resolve, 100));

        const erro = validarDados(dados);

        if (erro) {
          resultadosImportacao.push({
            linha,
            dados,
            erro,
            sucesso: false,
          });
        } else {
          // Aqui seria feita a chamada para a API para criar o veículo
          console.log("Criando veículo:", dados);

          resultadosImportacao.push({
            linha,
            dados,
            sucesso: true,
          });
        }

        setProgresso(((i + 1) / dadosCSV.length) * 100);
      }

      setResultados(resultadosImportacao);
      setMostrarResultados(true);
    } catch (error) {
      console.error("Erro ao processar arquivo:", error);
    } finally {
      setImportando(false);
    }
  };

  const sucessos = resultados.filter(r => r.sucesso).length;
  const erros = resultados.filter(r => !r.sucesso).length;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/cadastros/frota/veiculos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Importar Veículos</h1>
          <p className="text-muted-foreground">
            Importe veículos em lote através de arquivo CSV
          </p>
        </div>
      </div>

      {!mostrarResultados ? (
        <>
          {/* Instruções e Modelo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Modelo de Importação
            </CardTitle>
              <CardDescription>
                Baixe o modelo de arquivo CSV para importação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Importante:</strong> O arquivo deve estar no formato CSV com separador de vírgula (,) e codificação UTF-8.
                  Certifique-se de que os dados estão corretos antes de importar.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h4 className="font-medium">Campos obrigatórios:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <span>• categoria</span>
                  <span>• marca</span>
                  <span>• modelo</span>
                  <span>• versao</span>
                  <span>• combustivel</span>
                  <span>• cor</span>
                  <span>• pax (passageiros)</span>
                  <span>• km_atual</span>
                  <span>• capacidade_tanque</span>
                  <span>• valor_total</span>
                  <span>• entrada</span>
                  <span>• modalidade</span>
                </div>

                <h4 className="font-medium mt-4">Campos opcionais:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <span>• placa</span>
                  <span>• blindado (true/false)</span>
                  <span>• valor_blindagem</span>
                </div>
              </div>

              <Button onClick={baixarModelo} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar Modelo CSV
              </Button>
            </CardContent>
          </Card>

          {/* Upload do Arquivo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload do Arquivo
              </CardTitle>
              <CardDescription>
                Selecione o arquivo CSV para importação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="arquivo">Arquivo CSV</Label>
                <Input
                  id="arquivo"
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="mt-1"
                />
              </div>

              {arquivo && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium">Arquivo selecionado:</h4>
                  <p className="text-sm text-muted-foreground">{arquivo.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Tamanho: {(arquivo.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}

              {importando && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Processando...</span>
                    <span className="text-sm">{Math.round(progresso)}%</span>
                  </div>
                  <Progress value={progresso} className="w-full" />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={processarImportacao}
                  disabled={!arquivo || importando}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {importando ? "Importando..." : "Iniciar Importação"}
                </Button>
                {arquivo && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setArquivo(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Resultados da Importação */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {sucessos > 0 && erros === 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : erros > 0 ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <X className="h-5 w-5 text-red-600" />
              )}
              Resultados da Importação
            </CardTitle>
            <CardDescription>
              {sucessos} veículo(s) importado(s) com sucesso • {erros} erro(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sucessos > 0 && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {sucessos} veículo(s) foram importados com sucesso.
                </AlertDescription>
              </Alert>
            )}

            {erros > 0 && (
              <>
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    {erros} linha(s) com erro foram encontradas. Verifique os detalhes abaixo.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Linha</TableHead>
                        <TableHead>Veículo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Erro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resultados.map((resultado, index) => (
                        <TableRow key={index}>
                          <TableCell>{resultado.linha}</TableCell>
                          <TableCell>
                            {resultado.dados.marca} {resultado.dados.modelo} {resultado.dados.versao}
                          </TableCell>
                          <TableCell>
                            {resultado.sucesso ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Sucesso
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600">
                                <X className="h-4 w-4" />
                                Erro
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {resultado.erro && (
                              <span className="text-red-600 text-sm">{resultado.erro}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={() => router.push("/cadastros/frota/veiculos")}>
                Ir para Lista de Veículos
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarResultados(false);
                  setResultados([]);
                  setArquivo(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                Nova Importação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}