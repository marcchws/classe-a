"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, Car } from "lucide-react";
import { veiculoSchema, Veiculo } from "@/lib/schemas";
import Link from "next/link";

export default function NovoVeiculoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - substituir por dados reais da API
  const categorias = [
    { id: "1", nome: "Sedan" },
    { id: "2", nome: "SUV" },
    { id: "3", nome: "Van" },
    { id: "4", nome: "Pickup" },
  ];

  const marcas = [
    { id: "1", nome: "Mercedes-Benz" },
    { id: "2", nome: "BMW" },
    { id: "3", nome: "Audi" },
    { id: "4", nome: "Volkswagen" },
  ];

  const modelos = [
    { id: "1", marcaId: "1", nome: "S-Class" },
    { id: "2", marcaId: "1", nome: "E-Class" },
    { id: "3", marcaId: "1", nome: "Sprinter" },
    { id: "4", marcaId: "2", nome: "X5" },
    { id: "5", marcaId: "2", nome: "X7" },
  ];

  const form = useForm<Veiculo>({
    resolver: zodResolver(veiculoSchema),
    defaultValues: {
      categoriaId: "",
      marcaId: "",
      modeloId: "",
      versao: "",
      tipoCombustivel: "GASOLINA",
      cor: "",
      capacidadePassageiros: 1,
      blindagem: {
        temBlindagem: false,
        parcelado: false,
      },
      transformacoesEspeciais: "",
      outrosAcessorios: [],
      entrada: 0,
      valorTotalCompra: 0,
      modalidadeCompra: "A_VISTA",
      kmAtual: 0,
      capacidadeTanque: 0,
      status: "DISPONIVEL",
    },
  });

  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [temBlindagem, setTemBlindagem] = useState(false);
  const [ehFinanciamento, setEhFinanciamento] = useState(false);
  const [blindagemParcelada, setBlindagemParcelada] = useState(false);

  const modelosFiltrados = modelos.filter(modelo => modelo.marcaId === marcaSelecionada);

  const onSubmit = async (data: Veiculo) => {
    setIsLoading(true);
    try {
      console.log("Dados do veículo:", data);
      // Aqui seria feita a chamada para a API
      // await criarVeiculo(data);
      router.push("/cadastros/frota/veiculos");
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Novo Veículo</h1>
          <p className="text-muted-foreground">
            Cadastre um novo veículo na frota
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Dados principais do veículo
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="categoriaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marcaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca *</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setMarcaSelecionada(value);
                      form.setValue("modeloId", "");
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {marcas.map((marca) => (
                          <SelectItem key={marca.id} value={marca.id}>
                            {marca.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modeloId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!marcaSelecionada}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modelosFiltrados.map((modelo) => (
                          <SelectItem key={modelo.id} value={modelo.id}>
                            {modelo.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="versao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versão *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: S 500 L" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipoCombustivel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Combustível *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GASOLINA">Gasolina</SelectItem>
                        <SelectItem value="ETANOL">Etanol</SelectItem>
                        <SelectItem value="DIESEL">Diesel</SelectItem>
                        <SelectItem value="HIBRIDO">Híbrido</SelectItem>
                        <SelectItem value="ELETRICO">Elétrico</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Preto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacidadePassageiros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade de Passageiros (PAX) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kmAtual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KM Atual *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacidadeTanque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade do Tanque (L) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Blindagem */}
          <Card>
            <CardHeader>
              <CardTitle>Blindagem</CardTitle>
              <CardDescription>
                Informações sobre blindagem do veículo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="temBlindagem"
                  checked={temBlindagem}
                  onCheckedChange={(checked) => {
                    setTemBlindagem(checked as boolean);
                    form.setValue("blindagem.temBlindagem", checked as boolean);
                    if (!checked) {
                      form.setValue("blindagem.valor", undefined);
                      form.setValue("blindagem.parcelado", false);
                      form.setValue("blindagem.numeroParcelas", undefined);
                      setBlindagemParcelada(false);
                    }
                  }}
                />
                <Label htmlFor="temBlindagem">Veículo é blindado</Label>
              </div>

              {temBlindagem && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="blindagem.valor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Blindagem *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="blindagemParcelada"
                      checked={blindagemParcelada}
                      onCheckedChange={(checked) => {
                        setBlindagemParcelada(checked as boolean);
                        form.setValue("blindagem.parcelado", checked as boolean);
                        if (!checked) {
                          form.setValue("blindagem.numeroParcelas", undefined);
                        }
                      }}
                    />
                    <Label htmlFor="blindagemParcelada">Pagamento parcelado</Label>
                  </div>

                  {blindagemParcelada && (
                    <FormField
                      control={form.control}
                      name="blindagem.numeroParcelas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Parcelas *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>
                Transformações especiais e acessórios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="transformacoesEspeciais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transformações Especiais</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva adaptações realizadas no veículo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Financeiras</CardTitle>
              <CardDescription>
                Dados de compra e financiamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="valorTotalCompra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Total de Compra *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor de Entrada *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="modalidadeCompra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modalidade de Compra *</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        setEhFinanciamento(value === "FINANCIAMENTO");
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A_VISTA">À Vista</SelectItem>
                          <SelectItem value="FINANCIAMENTO">Financiamento</SelectItem>
                          <SelectItem value="LEASING">Leasing</SelectItem>
                          <SelectItem value="CONSORCIO">Consórcio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {ehFinanciamento && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 p-4 border rounded-lg bg-muted/50">
                  <h3 className="col-span-full font-medium">Dados do Financiamento</h3>

                  <FormField
                    control={form.control}
                    name="financiamento.numeroParcelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Parcelas *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financiamento.taxaJuros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (%) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financiamento.valorTotalComJuros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total com Juros *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financiamento.parcelasPendentes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parcelas Pendentes *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/cadastros/frota/veiculos">
              <Button variant="outline" disabled={isLoading}>
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Salvando..." : "Salvar Veículo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}