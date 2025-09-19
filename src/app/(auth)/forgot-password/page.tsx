"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/schemas";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);

    try {
      // Simular verificação de e-mail
      // TODO: Integrar com API real

      // E-mails válidos para demonstração
      const validEmails = ["admin@classea.com.br", "usuario@classea.com.br"];

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (validEmails.includes(data.email)) {
        toast.success("Link de recuperação enviado para seu e-mail");
        setEmailSent(true);
      } else {
        toast.error("E-mail não cadastrado no sistema");
      }
    } catch (error) {
      toast.error("Erro interno do servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-700">E-mail Enviado!</CardTitle>
          <CardDescription>
            Verificamos sua caixa de entrada e siga as instruções para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-700">
                <strong>Atenção:</strong> O link expira em 24 horas e pode ser usado apenas uma vez.
              </p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Não recebeu o e-mail? Verifique sua caixa de spam.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setEmailSent(false);
                  form.reset();
                }}
              >
                Tentar outro e-mail
              </Button>
            </div>

            <Link href="/login" className="block">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
        <CardDescription>
          Digite seu e-mail para receber um link de recuperação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seuemail@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar ao login
          </Link>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">E-mails de Teste:</p>
          <div className="text-xs space-y-1">
            <p><strong>Válidos:</strong> admin@classea.com.br, usuario@classea.com.br</p>
            <p><strong>Inválido:</strong> qualquer outro e-mail</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}