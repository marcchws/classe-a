"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Car, Shield, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export function FleetOverview() {
  // Mock data - substituir por dados reais da API
  const fleetData = {
    totalVehicles: 45,
    available: 32,
    rented: 10,
    maintenance: 3,
    categories: [
      { name: "Sedan Blindado", count: 15, available: 12, percentage: 80 },
      { name: "SUV Blindado", count: 12, available: 8, percentage: 67 },
      { name: "Van Executiva", count: 10, available: 7, percentage: 70 },
      { name: "Pickup", count: 8, available: 5, percentage: 63 },
    ],
    maintenanceAlerts: [
      { vehicle: "Mercedes S-Class (ABC-1234)", type: "Revisão 50.000km", daysLeft: 3 },
      { vehicle: "BMW X5 (DEF-5678)", type: "Troca de óleo", daysLeft: 7 },
      { vehicle: "Sprinter Van (GHI-9012)", type: "Manutenção preventiva", daysLeft: 14 },
    ],
  };

  const availabilityPercentage = (fleetData.available / fleetData.totalVehicles) * 100;

  return (
    <div className="space-y-4">
      {/* Status Geral da Frota */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Status da Frota
            </CardTitle>
            <CardDescription>
              Visão geral da disponibilidade dos veículos
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/cadastros/frota/veiculos">
              <Eye className="h-4 w-4 mr-2" />
              Ver frota
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disponibilidade Geral</span>
              <span className="text-sm text-muted-foreground">
                {fleetData.available}/{fleetData.totalVehicles} veículos
              </span>
            </div>
            <Progress value={availabilityPercentage} className="w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{fleetData.available}</div>
                <div className="text-xs text-muted-foreground">Disponíveis</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{fleetData.rented}</div>
                <div className="text-xs text-muted-foreground">Alugados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{fleetData.maintenance}</div>
                <div className="text-xs text-muted-foreground">Manutenção</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Por Categoria
          </CardTitle>
          <CardDescription>
            Disponibilidade por tipo de veículo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fleetData.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.available}/{category.count}
                  </span>
                </div>
                <Progress value={category.percentage} className="w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Manutenção */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Manutenções Programadas
          </CardTitle>
          <CardDescription>
            Próximas manutenções preventivas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fleetData.maintenanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{alert.vehicle}</div>
                  <div className="text-xs text-muted-foreground">{alert.type}</div>
                </div>
                <Badge
                  variant={alert.daysLeft <= 3 ? "destructive" : alert.daysLeft <= 7 ? "default" : "secondary"}
                  className="text-xs"
                >
                  {alert.daysLeft} dias
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}