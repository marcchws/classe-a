'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Eye, AlertTriangle, Car, FileText, Calendar, MoreHorizontal, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChecklistExecution } from '@/types';
import Link from 'next/link';

// Mock data - dados de execuções de checklist
const mockExecutions: ChecklistExecution[] = [
  {
    id: '1',
    templateId: '1',
    templateVersion: 2,
    contractId: 'CONT-001',
    vehicleId: 'VEH-001',
    driverId: 'DRV-001',
    type: 'saida',
    status: 'concluido',
    responses: {
      '1': ['crlv', 'seguro'],
      '2': 45230,
      '3': 'alto'
    },
    photos: [],
    documents: [],
    observations: 'Veículo em perfeitas condições',
    executedBy: 'João Silva',
    startedAt: new Date('2024-01-15T08:30:00'),
    completedAt: new Date('2024-01-15T09:15:00'),
    createdAt: new Date('2024-01-15T08:30:00'),
    updatedAt: new Date('2024-01-15T09:15:00'),
    vehicleState: {
      exterior: { scratches: false, dents: false, paintDamage: false },
      interior: { cleanliness: 'excellent', damage: false },
      mechanical: { engineRunning: true, lightsWorking: true, tiresCondition: 'good' },
      glass: { windshield: true, sideWindows: true, rearWindow: true }
    },
    fuelLevel: {
      currentLevel: 85,
      tankCapacity: 60,
      costPerLiter: 5.89
    },
    mileage: 45230,
    deliveredItems: [
      { id: '1', name: 'Estepe', category: 'mandatory', delivered: true },
      { id: '2', name: 'Triângulo', category: 'mandatory', delivered: true },
      { id: '3', name: 'Manual', category: 'mandatory', delivered: true }
    ],
    extraServices: [
      { id: '1', name: 'Lavagem', category: 'cleaning', contracted: true, completed: true, paid: true, cost: 25.00 }
    ],
    divergences: [],
    financialPendencies: []
  },
  {
    id: '2',
    templateId: '2',
    templateVersion: 1,
    contractId: 'CONT-001',
    vehicleId: 'VEH-001',
    type: 'entrada',
    status: 'concluido',
    responses: {
      '1': 'Pequeno risco na porta direita',
      '2': []
    },
    photos: [],
    documents: [],
    observations: 'Pequenos danos identificados',
    executedBy: 'Maria Santos',
    startedAt: new Date('2024-01-20T16:00:00'),
    completedAt: new Date('2024-01-20T16:45:00'),
    createdAt: new Date('2024-01-20T16:00:00'),
    updatedAt: new Date('2024-01-20T16:45:00'),
    vehicleState: {
      exterior: { scratches: true, dents: false, paintDamage: false, description: 'Risco na porta direita' },
      interior: { cleanliness: 'good', damage: false },
      mechanical: { engineRunning: true, lightsWorking: true, tiresCondition: 'good' },
      glass: { windshield: true, sideWindows: true, rearWindow: true }
    },
    fuelLevel: {
      currentLevel: 65,
      tankCapacity: 60,
      previousLevel: 85,
      calculatedDifference: 12,
      costPerLiter: 5.89,
      totalCost: 70.68
    },
    mileage: 45480,
    deliveredItems: [
      { id: '1', name: 'Estepe', category: 'mandatory', delivered: true, returned: true, condition: 'good' },
      { id: '2', name: 'Triângulo', category: 'mandatory', delivered: true, returned: true, condition: 'good' },
      { id: '3', name: 'Manual', category: 'mandatory', delivered: true, returned: false, condition: 'missing' }
    ],
    extraServices: [],
    divergences: [
      {
        id: '1',
        type: 'damage',
        severity: 'low',
        description: 'Risco na porta direita do veículo',
        detectedAt: new Date('2024-01-20T16:30:00'),
        resolved: false,
        financialImpact: true,
        estimatedCost: 150.00
      },
      {
        id: '2',
        type: 'missing_item',
        severity: 'medium',
        description: 'Manual do proprietário não devolvido',
        detectedAt: new Date('2024-01-20T16:35:00'),
        resolved: false,
        financialImpact: true,
        estimatedCost: 45.00
      }
    ],
    financialPendencies: [
      {
        id: '1',
        type: 'fuel_difference',
        description: 'Diferença de combustível (12 litros)',
        amount: 70.68,
        status: 'pending'
      },
      {
        id: '2',
        type: 'damage_repair',
        description: 'Reparo do risco na porta direita',
        amount: 150.00,
        status: 'pending'
      },
      {
        id: '3',
        type: 'missing_item',
        description: 'Reposição do manual do proprietário',
        amount: 45.00,
        status: 'pending'
      }
    ]
  },
  {
    id: '3',
    templateId: '1',
    templateVersion: 2,
    vehicleId: 'VEH-002',
    type: 'saida',
    status: 'em-andamento',
    responses: {},
    photos: [],
    documents: [],
    observations: '',
    executedBy: 'Carlos Oliveira',
    startedAt: new Date('2024-01-21T10:00:00'),
    createdAt: new Date('2024-01-21T10:00:00'),
    updatedAt: new Date('2024-01-21T10:00:00'),
    vehicleState: {
      exterior: { scratches: false, dents: false, paintDamage: false },
      interior: { cleanliness: 'excellent', damage: false },
      mechanical: { engineRunning: true, lightsWorking: true, tiresCondition: 'excellent' },
      glass: { windshield: true, sideWindows: true, rearWindow: true }
    },
    fuelLevel: {
      currentLevel: 0,
      tankCapacity: 65
    },
    mileage: 0,
    deliveredItems: [],
    extraServices: [],
    divergences: [],
    financialPendencies: []
  }
];

const statusMap = {
  iniciado: { label: 'Iniciado', variant: 'outline' as const, icon: Clock },
  'em-andamento': { label: 'Em Andamento', variant: 'default' as const, icon: Clock },
  concluido: { label: 'Concluído', variant: 'default' as const, icon: CheckCircle },
  cancelado: { label: 'Cancelado', variant: 'destructive' as const, icon: XCircle }
};

const typeMap = {
  saida: { label: 'Saída', variant: 'destructive' as const },
  entrada: { label: 'Entrada', variant: 'default' as const },
  ambos: { label: 'Ambos', variant: 'secondary' as const }
};

export default function ChecklistExecutionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredExecutions = mockExecutions.filter(execution => {
    const matchesSearch = execution.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.contractId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.executedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || execution.status === statusFilter;
    const matchesType = typeFilter === 'all' || execution.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getDivergenceCount = (execution: ChecklistExecution) => {
    return execution.divergences.length;
  };

  const getPendencyAmount = (execution: ChecklistExecution) => {
    return execution.financialPendencies.reduce((total, pendency) => total + pendency.amount, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Execuções de Checklist</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie checklists de saída e entrada de veículos
          </p>
        </div>
        <Link href="/operacional/checklist/execucoes/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Execução
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Execuções</CardTitle>
          <CardDescription>
            Lista de todas as execuções de checklist realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por veículo, contrato ou funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="iniciado">Iniciado</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
                <SelectItem value="entrada">Entrada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Veículo/Contrato</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Executado por</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Divergências</TableHead>
                  <TableHead>Valor Pendente</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExecutions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhuma execução encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExecutions.map((execution) => {
                    const StatusIcon = statusMap[execution.status].icon;
                    const divergenceCount = getDivergenceCount(execution);
                    const pendencyAmount = getPendencyAmount(execution);

                    return (
                      <TableRow key={execution.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium flex items-center">
                              <Car className="w-4 h-4 mr-2 text-muted-foreground" />
                              {execution.vehicleId}
                            </div>
                            {execution.contractId && (
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <FileText className="w-3 h-3 mr-1" />
                                {execution.contractId}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={typeMap[execution.type].variant}>
                            {typeMap[execution.type].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusMap[execution.status].variant} className="flex items-center w-fit">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusMap[execution.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{execution.executedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <div>
                              <div>{formatDateTime(execution.startedAt)}</div>
                              {execution.completedAt && (
                                <div className="text-xs text-muted-foreground">
                                  Finalizado: {formatDateTime(execution.completedAt)}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {divergenceCount > 0 ? (
                            <Badge variant="destructive" className="flex items-center w-fit">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {divergenceCount}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center w-fit">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Nenhuma
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {pendencyAmount > 0 ? (
                            <span className="font-medium text-destructive">
                              {formatCurrency(pendencyAmount)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/operacional/checklist/execucoes/${execution.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Visualizar
                                </Link>
                              </DropdownMenuItem>
                              {execution.status !== 'concluido' && execution.status !== 'cancelado' && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/operacional/checklist/execucoes/${execution.id}/editar`}>
                                      <FileText className="w-4 h-4 mr-2" />
                                      Continuar
                                    </Link>
                                  </DropdownMenuItem>
                                </>
                              )}
                              {execution.type === 'saida' && execution.status === 'concluido' && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/operacional/checklist/execucoes/nova-entrada?vehicleId=${execution.vehicleId}&contractId=${execution.contractId}`}>
                                      <Plus className="w-4 h-4 mr-2" />
                                      Criar Entrada
                                    </Link>
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}