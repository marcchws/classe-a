"use client";

import { useState } from "react";
import { Upload, X, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TipoDocumento, DocumentoMotorista } from "@/lib/schemas";

interface DocumentUploadProps {
  documentos: DocumentoMotorista[];
  onDocumentosChange: (documentos: DocumentoMotorista[]) => void;
  readonly?: boolean;
}

const tiposDocumento: { value: TipoDocumento; label: string; required: boolean }[] = [
  { value: "CNH", label: "CNH", required: true },
  { value: "ANTECEDENTES", label: "Antecedentes Criminais", required: true },
  { value: "CERTIFICADO_DIRECAO_EXECUTIVA", label: "Certificado de Direção Executiva", required: true },
  { value: "CERTIFICADO_TRANSPORTE_PASSAGEIROS", label: "Certificado de Transporte de Passageiros", required: false },
];

export function DocumentUpload({ documentos, onDocumentosChange, readonly = false }: DocumentUploadProps) {
  const [uploading, setUploading] = useState<TipoDocumento | null>(null);

  const handleFileUpload = async (tipo: TipoDocumento, file: File) => {
    setUploading(tipo);

    try {
      // Simular upload para API (implementar com seu serviço de upload)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tipo', tipo);

      // Mock upload - substituir por chamada real
      await new Promise(resolve => setTimeout(resolve, 1000));

      const novoDocumento: DocumentoMotorista = {
        tipo,
        url: URL.createObjectURL(file), // Em produção, seria a URL retornada pela API
        nome: file.name,
        dataUpload: new Date().toISOString(),
      };

      const documentosAtualizados = [
        ...documentos.filter(doc => doc.tipo !== tipo),
        novoDocumento
      ];

      onDocumentosChange(documentosAtualizados);
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setUploading(null);
    }
  };

  const removeDocumento = (tipo: TipoDocumento) => {
    const documentosAtualizados = documentos.filter(doc => doc.tipo !== tipo);
    onDocumentosChange(documentosAtualizados);
  };

  const getDocumento = (tipo: TipoDocumento) => {
    return documentos.find(doc => doc.tipo === tipo);
  };

  const getTipoStatus = (tipo: TipoDocumento, required: boolean) => {
    const documento = getDocumento(tipo);
    if (documento) {
      return <Badge variant="default">Enviado</Badge>;
    }
    if (required) {
      return <Badge variant="destructive">Obrigatório</Badge>;
    }
    return <Badge variant="outline">Opcional</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tiposDocumento.map((tipoDoc) => {
          const documento = getDocumento(tipoDoc.value);
          const isUploading = uploading === tipoDoc.value;

          return (
            <div key={tipoDoc.value} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">{tipoDoc.label}</Label>
                  <div className="mt-1">
                    {getTipoStatus(tipoDoc.value, tipoDoc.required)}
                  </div>
                </div>

                {documento && (
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{tipoDoc.label}</DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 overflow-auto">
                          {documento.url.includes('blob:') ? (
                            <iframe
                              src={documento.url}
                              className="w-full h-[60vh]"
                              title={documento.nome}
                            />
                          ) : (
                            <div className="text-center py-8">
                              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">
                                Documento: {documento.nome}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Enviado em: {new Date(documento.dataUpload).toLocaleDateString("pt-BR")}
                              </p>
                              <Button variant="outline" className="mt-4" asChild>
                                <a href={documento.url} target="_blank" rel="noopener noreferrer">
                                  Abrir em nova aba
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {!readonly && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDocumento(tipoDoc.value)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {!readonly && (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(tipoDoc.value, file);
                      }
                    }}
                    className="hidden"
                    id={`upload-${tipoDoc.value}`}
                    disabled={isUploading}
                  />

                  <Label
                    htmlFor={`upload-${tipoDoc.value}`}
                    className={`flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/50 p-4 rounded-md transition-colors ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {isUploading ? 'Enviando...' : documento ? 'Clique para substituir' : 'Clique para fazer upload'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, JPEG ou PNG (máx. 10MB)
                      </p>
                    </div>
                    {documento && (
                      <div className="text-xs text-muted-foreground text-center">
                        <p>Arquivo atual: {documento.nome}</p>
                        <p>Enviado: {new Date(documento.dataUpload).toLocaleDateString("pt-BR")}</p>
                      </div>
                    )}
                  </Label>
                </div>
              )}
            </div>
          );
        })}

        {/* Resumo dos documentos */}
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>
              Documentos enviados: {documentos.length} / {tiposDocumento.filter(t => t.required).length} obrigatórios
            </p>
            {documentos.length < tiposDocumento.filter(t => t.required).length && (
              <p className="text-destructive">
                Faltam {tiposDocumento.filter(t => t.required).length - documentos.length} documento(s) obrigatório(s)
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}