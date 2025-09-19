"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  motoristaSchema,
  Motorista,
  Idioma,
  TipoDocumento,
} from "@/lib/schemas";

const idiomas: { value: Idioma; label: string }[] = [
  { value: "PORTUGUES", label: "Português" },
  { value: "INGLES", label: "Inglês" },
  { value: "ESPANHOL", label: "Espanhol" },
  { value: "FRANCES", label: "Francês" },
  { value: "ITALIANO", label: "Italiano" },
  { value: "ALEMAO", label: "Alemão" },
];

const tiposDocumento: { value: TipoDocumento; label: string }[] = [
  { value: "CNH", label: "CNH" },
  { value: "ANTECEDENTES", label: "Antecedentes Criminais" },
  { value: "CERTIFICADO_DIRECAO_EXECUTIVA", label: "Certificado de Direção Executiva" },
  { value: "CERTIFICADO_TRANSPORTE_PASSAGEIROS", label: "Certificado de Transporte de Passageiros" },
];

export default function NovoMotoristaPage() {
  const router = useRouter();
  const [documentosUpload, setDocumentosUpload] = useState<Array<{
    tipo: TipoDocumento;
    arquivo: File;
    nome: string;
  }>>([]);

  const form = useForm({
    resolver: zodResolver(motoristaSchema),
    defaultValues: {
      nomeCompleto: "",
      cpf: "",
      telefone: "",
      endereco: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      cnh: {
        numero: "",
        categoria: "B",
        dataValidade: "",
      },
      documentos: [],
      idiomasFluentes: ["PORTUGUES"],
      grupoPrioridade: "PREFERENCIAL",
      regiaoAtendimento: {
        cidade: "",
        bairros: [],
      },
    },
  });

  const onSubmit = (data: Motorista) => {
    console.log("Dados do motorista:", data);
    // Aqui implementaria a chamada à API
    // Após salvar com sucesso, redirecionar para a lista
    router.push('/cadastros/motoristas');
  };

  const handleDocumentoUpload = (tipo: TipoDocumento, event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      setDocumentosUpload(prev => [
        ...prev.filter(doc => doc.tipo !== tipo),
        { tipo, arquivo, nome: arquivo.name }
      ]);
    }
  };

  const removeDocumento = (tipo: TipoDocumento) => {
    setDocumentosUpload(prev => prev.filter(doc => doc.tipo !== tipo));
  };

  const getDocumentoUpload = (tipo: TipoDocumento) => {
    return documentosUpload.find(doc => doc.tipo === tipo);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Motorista</h1>
          <p className="text-muted-foreground">
            Cadastre um novo motorista na frota
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nomeCompleto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF *</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone *</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="endereco.logradouro"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Logradouro *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, Avenida, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número *</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.complemento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Apto 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.bairro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <FormControl>
                        <Input placeholder="SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP *</FormLabel>
                      <FormControl>
                        <Input placeholder="00000-000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* CNH */}
          <Card>
            <CardHeader>
              <CardTitle>Carteira Nacional de Habilitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="cnh.numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da CNH *</FormLabel>
                      <FormControl>
                        <Input placeholder="00000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cnh.categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="B">B - Até 8 passageiros</SelectItem>
                          <SelectItem value="D">D - Inclui vans</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cnh.dataValidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Validade *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos Obrigatórios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tiposDocumento.map((tipoDoc) => {
                const documentoUpload = getDocumentoUpload(tipoDoc.value);
                return (
                  <div key={tipoDoc.value} className="space-y-2">
                    <Label>{tipoDoc.label} *</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleDocumentoUpload(tipoDoc.value, e)}
                          className="hidden"
                          id={`upload-${tipoDoc.value}`}
                        />
                        <Label
                          htmlFor={`upload-${tipoDoc.value}`}
                          className="flex items-center gap-2 p-2 border border-dashed rounded-md cursor-pointer hover:bg-muted"
                        >
                          <Upload className="h-4 w-4" />
                          {documentoUpload ? documentoUpload.nome : "Clique para fazer upload"}
                        </Label>
                      </div>
                      {documentoUpload && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDocumento(tipoDoc.value)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Idiomas e Classificação */}
          <Card>
            <CardHeader>
              <CardTitle>Idiomas e Classificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="idiomasFluentes"
                render={() => (
                  <FormItem>
                    <FormLabel>Idiomas Fluentes *</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {idiomas.map((idioma) => (
                        <FormField
                          key={idioma.value}
                          control={form.control}
                          name="idiomasFluentes"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(idioma.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, idioma.value])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== idioma.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {idioma.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grupoPrioridade"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Grupo de Prioridade *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="PREFERENCIAL" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Preferencial (frequente)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="APOIO" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Apoio (reserva)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Região de Atendimento */}
          <Card>
            <CardHeader>
              <CardTitle>Região de Atendimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="regiaoAtendimento.cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade *</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade de residência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Bairros de Atendimento *</Label>
                <Textarea
                  placeholder="Digite os bairros separados por vírgula (ex: Centro, Vila Madalena, Jardins)"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Motorista
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}