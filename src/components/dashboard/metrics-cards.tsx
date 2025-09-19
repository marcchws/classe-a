"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, DollarSign, Wrench, TrendingUp, AlertTriangle } from "lucide-react";

export function MetricsCards() {
  // Mock data - substituir por dados reais da API
  const metrics = {
    totalVeiculos: 45,
    veiculosDisponiveis: 32,
    veiculosAlugados: 10,
    veiculosManutencao: 3,
    clientesAtivos: 128,
    novosClientesEstesMes: 12,
    receitaMes: 450000,
    receitaTendencia: 8.5,
    contratosPendentes: 5,
    motoristasAtivos: 35,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Frota Total */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Frota Total</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalVeiculos}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.veiculosDisponiveis} disponíveis
          </p>
          <div className="mt-2 flex gap-1">
            <Badge variant="secondary" className="text-xs">
              {metrics.veiculosAlugados} alugados
            </Badge>
            {metrics.veiculosManutencao > 0 && (
              <Badge variant="outline" className="text-xs text-yellow-600">
                {metrics.veiculosManutencao} manutenção
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Clientes Ativos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.clientesAtivos}</div>
          <p className="text-xs text-muted-foreground">
            +{metrics.novosClientesEstesMes} este mês
          </p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +9.4% vs mês anterior
          </div>
        </CardContent>
      </Card>

      {/* Receita do Mês */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {metrics.receitaMes.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Meta: R$ 500.000
          </p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.receitaTendencia}% vs mês anterior
          </div>
        </CardContent>
      </Card>

      {/* Operações */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Operações</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.motoristasAtivos}</div>
          <p className="text-xs text-muted-foreground">
            Motoristas ativos
          </p>
          {metrics.contratosPendentes > 0 && (
            <div className="mt-2 flex items-center text-xs text-orange-600">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {metrics.contratosPendentes} contratos pendentes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}