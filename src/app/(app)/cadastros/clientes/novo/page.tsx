"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Building, Handshake } from "lucide-react";
import { TipoCliente } from "@/lib/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PessoaFisicaForm } from "@/components/clientes/pessoa-fisica-form";
import { PessoaJuridicaForm } from "@/components/clientes/pessoa-juridica-form";
import { ParceiroForm } from "@/components/clientes/parceiro-form";

export default function NovoClientePage() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente | "">("");
  const router = useRouter();

  const handleSubmit = async (data: unknown) => {
    try {
      // Aqui seria feita a chamada para a API
      console.log("Dados do cliente:", data);

      // Simular sucesso
      alert("Cliente cadastrado com sucesso!");
      router.push("/cadastros/clientes");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  const getTipoIcon = (tipo: TipoCliente) => {
    switch (tipo) {
      case "PESSOA_FISICA":
        return <Users className="h-5 w-5" />;
      case "PESSOA_JURIDICA":
        return <Building className="h-5 w-5" />;
      case "PARCEIRO":
        return <Handshake className="h-5 w-5" />;
    }
  };

  const renderForm = () => {
    switch (tipoCliente) {
      case "PESSOA_FISICA":
        return <PessoaFisicaForm onSubmit={handleSubmit} />;
      case "PESSOA_JURIDICA":
        return <PessoaJuridicaForm onSubmit={handleSubmit} />;
      case "PARCEIRO":
        return <ParceiroForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Cadastre um novo cliente, pessoa jurídica ou parceiro
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tipo de Cliente</CardTitle>
          <CardDescription>
            Selecione o tipo de cliente que deseja cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                tipoCliente === "PESSOA_FISICA" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setTipoCliente("PESSOA_FISICA")}
            >
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Pessoa Física</h3>
                  <p className="text-sm text-muted-foreground">
                    Cliente individual
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                tipoCliente === "PESSOA_JURIDICA" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setTipoCliente("PESSOA_JURIDICA")}
            >
              <div className="flex items-center gap-3">
                <Building className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Pessoa Jurídica</h3>
                  <p className="text-sm text-muted-foreground">
                    Empresa ou organização
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                tipoCliente === "PARCEIRO" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setTipoCliente("PARCEIRO")}
            >
              <div className="flex items-center gap-3">
                <Handshake className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Parceiro</h3>
                  <p className="text-sm text-muted-foreground">
                    Parceiro estratégico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {tipoCliente && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                {getTipoIcon(tipoCliente)}
                <h3 className="text-lg font-medium">
                  Cadastro de {tipoCliente === "PESSOA_FISICA" ? "Pessoa Física" :
                              tipoCliente === "PESSOA_JURIDICA" ? "Pessoa Jurídica" : "Parceiro"}
                </h3>
              </div>
              {renderForm()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}