"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { ImportacaoCsv } from "@/components/clientes/importacao-csv";

export default function ImportarClientesPage() {
  const handleImportComplete = (resultados: Array<{
    tipo: string;
    nome: string;
    documento: string;
    telefone: string;
    email: string;
    endereco: string;
  }>) => {
    console.log("Clientes importados:", resultados);
    // Aqui você faria a chamada para a API para salvar os dados
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/cadastros/clientes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Importar Clientes</h1>
          <p className="text-muted-foreground">
            Importe informações de clientes via arquivo CSV
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImportacaoCsv onImportComplete={handleImportComplete} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileSpreadsheet className="h-4 w-4" />
                Instruções
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-1">1. Baixe o modelo</h4>
                <p className="text-muted-foreground">
                  Clique no botão &quot;Baixar Modelo&quot; para obter o arquivo CSV com o formato correto.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">2. Preencha os dados</h4>
                <p className="text-muted-foreground">
                  Complete o arquivo com as informações dos clientes, mantendo o formato das colunas.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">3. Faça o upload</h4>
                <p className="text-muted-foreground">
                  Selecione o arquivo preenchido e clique em &quot;Iniciar Importação&quot;.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Campos obrigatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Tipo de Cliente</li>
                <li>• Nome/Razão Social</li>
                <li>• Documento (CPF/CNPJ)</li>
                <li>• Telefone</li>
                <li>• E-mail</li>
                <li>• Endereço</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Validações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• O tipo de cliente deve ser válido (PESSOA_FISICA, PESSOA_JURIDICA, PARCEIRO)</p>
              <p>• CPF deve seguir o formato brasileiro (000.000.000-00)</p>
              <p>• CNPJ deve seguir o formato brasileiro (00.000.000/0000-00)</p>
              <p>• E-mail deve ter formato válido</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}