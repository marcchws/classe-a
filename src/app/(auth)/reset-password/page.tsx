"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/schemas";
import { Eye, EyeOff, Key, Shuffle } from "lucide-react";

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Função para gerar senha automática
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    const length = 12;
    let password = "";

    // Garantir pelo menos uma letra maiúscula, minúscula, número e caractere especial
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
    password += "@$!%*?&"[Math.floor(Math.random() * 7)];

    // Preencher o resto aleatoriamente
    for (let i = 4; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Embaralhar a senha
    password = password.split("").sort(() => 0.5 - Math.random()).join("");

    form.setValue("password", password);
    form.setValue("confirmPassword", password);

    toast.success("Senha gerada automaticamente!");
  };

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);

    try {
      // Verificar se o token é válido (simulação)
      if (!token || token === "expired") {
        toast.error("Link expirado. Solicite um novo link de recuperação");
        return;
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Senha alterada com sucesso!");

      // Simular login automático após redefinição
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

    } catch (error) {
      toast.error("Erro interno do servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se o token é válido
  if (!token) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <Key className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">Link Inválido</CardTitle>
          <CardDescription>
            O link de recuperação é inválido ou não foi fornecido.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Button onClick={() => window.location.href = "/forgot-password"}>
              Solicitar Novo Link
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (token === "expired") {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <Key className="h-6 w-6 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-yellow-800">Link Expirado</CardTitle>
          <CardDescription>
            Este link de recuperação expirou. Os links são válidos por apenas 24 horas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Button onClick={() => window.location.href = "/forgot-password"}>
              Solicitar Novo Link
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Key className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Nova Senha</CardTitle>
        <CardDescription>
          Defina uma nova senha segura para sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Nova Senha</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={generatePassword}
                      className="h-auto p-0 text-xs text-primary hover:text-primary/80"
                    >
                      <Shuffle className="h-3 w-3 mr-1" />
                      Gerar automaticamente
                    </Button>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 8 caracteres com letras, números e símbolos"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite novamente a senha"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Requisitos da senha:</strong> Mínimo 8 caracteres com letras maiúsculas,
                minúsculas, números e caracteres especiais (@$!%*?&).
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Alterando senha..." : "Alterar Senha"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-primary">
            <strong>Para testar:</strong> Use o link com qualquer token válido (ex: ?token=valid123)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}