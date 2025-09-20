"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Car, UserPlus, Wrench, DollarSign, FileText, Eye, ClipboardList, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface Activity {
  id: string;
  type: "contract" | "maintenance" | "customer" | "payment" | "vehicle" | "checklist" | "divergence";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
  status?: "success" | "warning" | "error" | "info";
}

export function RecentActivities() {
  // Mock data - substituir por dados reais da API
  const activities: Activity[] = [
    {
      id: "1",
      type: "contract",
      title: "Novo contrato criado",
      description: "Contrato #CT-2024-0156 para Mercedes S-Class blindado",
      timestamp: "há 15 minutos",
      user: "João Silva",
      amount: 8500,
      status: "success",
    },
    {
      id: "2",
      type: "maintenance",
      title: "Manutenção programada",
      description: "BMW X5 (ABC-1234) agendada para revisão dos 50.000km",
      timestamp: "há 1 hora",
      user: "Sistema",
      status: "warning",
    },
    {
      id: "3",
      type: "customer",
      title: "Novo cliente cadastrado",
      description: "Empresa Tech Solutions Ltda - PJ Premium",
      timestamp: "há 2 horas",
      user: "Maria Santos",
      status: "info",
    },
    {
      id: "4",
      type: "payment",
      title: "Pagamento recebido",
      description: "Contrato #CT-2024-0145 - Parcela 2/12",
      timestamp: "há 3 horas",
      amount: 12000,
      status: "success",
    },
    {
      id: "5",
      type: "checklist",
      title: "Checklist de entrada concluído",
      description: "BMW X5 (ABC-1234) - 2 divergências identificadas",
      timestamp: "há 4 horas",
      user: "Maria Santos",
      status: "warning",
    },
    {
      id: "6",
      type: "divergence",
      title: "Divergência resolvida",
      description: "Risco na porta direita - Cobrança de R$ 150 aprovada",
      timestamp: "há 5 horas",
      user: "João Silva",
      amount: 150,
      status: "success",
    },
    {
      id: "7",
      type: "vehicle",
      title: "Veículo retornado",
      description: "Sprinter Van (XYZ-9876) finalizada limpeza e inspeção",
      timestamp: "há 6 horas",
      user: "Carlos Oliveira",
      status: "info",
    },
    {
      id: "8",
      type: "maintenance",
      title: "Manutenção concluída",
      description: "Mercedes S500 (DEF-5678) - Troca de óleo e filtros",
      timestamp: "há 8 horas",
      status: "success",
    },
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4" />;
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      case "customer":
        return <UserPlus className="h-4 w-4" />;
      case "payment":
        return <DollarSign className="h-4 w-4" />;
      case "vehicle":
        return <Car className="h-4 w-4" />;
      case "checklist":
        return <ClipboardList className="h-4 w-4" />;
      case "divergence":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: Activity["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>
            Últimas movimentações do sistema
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/relatorios/atividades-funcionarios">
            <Eye className="h-4 w-4 mr-2" />
            Ver todas
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <div className="flex items-center gap-2">
                    {activity.amount && (
                      <Badge variant="outline" className="text-xs">
                        R$ {activity.amount.toLocaleString()}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                {activity.user && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" alt={activity.user} />
                      <AvatarFallback className="text-xs">
                        {activity.user.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {activity.user}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}