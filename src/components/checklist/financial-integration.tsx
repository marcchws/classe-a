'use client';

import { useState } from 'react';
import { DollarSign, CreditCard, AlertTriangle, CheckCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FinancialPendency, Divergence } from '@/types';

interface FinancialIntegrationProps {
  pendencies: FinancialPendency[];
  divergences: Divergence[];
  contractId?: string;
  vehicleId: string;
  clientName?: string;
  onPendencyUpdate: (pendencyId: string, updates: Partial<FinancialPendency>) => void;
  onSendToFinancial: (pendencyIds: string[], notes?: string) => void;
  className?: string;
}

export function FinancialIntegration({
  pendencies,
  divergences,
  contractId,
  vehicleId,
  clientName,
  onPendencyUpdate,
  onSendToFinancial,
  className
}: FinancialIntegrationProps) {
  const [selectedPendencies, setSelectedPendencies] = useState<string[]>([]);
  const [financialNotes, setFinancialNotes] = useState('');
  const [showSendDialog, setShowSendDialog] = useState(false);

  const getStatusColor = (status: FinancialPendency['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: FinancialPendency['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'rejected': return AlertTriangle;
      case 'paid': return CreditCard;
      default: return Clock;
    }
  };

  const getTypeLabel = (type: FinancialPendency['type']) => {
    switch (type) {
      case 'fuel_difference': return 'Diferença de Combustível';
      case 'missing_item': return 'Item Faltante';
      case 'damage_repair': return 'Reparo de Avaria';
      case 'extra_service': return 'Serviço Extra';
      case 'cleaning_fee': return 'Taxa de Limpeza';
      case 'other': return 'Outro';
      default: return type;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handlePendencyToggle = (pendencyId: string) => {
    setSelectedPendencies(prev =>
      prev.includes(pendencyId)
        ? prev.filter(id => id !== pendencyId)
        : [...prev, pendencyId]
    );
  };

  const handleSelectAll = () => {
    const approvablePendencies = pendencies
      .filter(p => p.status === 'pending' || p.status === 'approved')
      .map(p => p.id);

    setSelectedPendencies(approvablePendencies);
  };

  const handleDeselectAll = () => {
    setSelectedPendencies([]);
  };

  const handleSendToFinancial = () => {
    if (selectedPendencies.length === 0) {
      alert('Selecione pelo menos uma pendência para enviar');
      return;
    }

    onSendToFinancial(selectedPendencies, financialNotes);
    setSelectedPendencies([]);
    setFinancialNotes('');
    setShowSendDialog(false);
  };

  const pendingPendencies = pendencies.filter(p => p.status === 'pending');
  const approvedPendencies = pendencies.filter(p => p.status === 'approved');

  const totalPending = pendingPendencies.reduce((sum, p) => sum + p.amount, 0);
  const totalApproved = approvedPendencies.reduce((sum, p) => sum + p.amount, 0);
  const totalSelected = pendencies
    .filter(p => selectedPendencies.includes(p.id))
    .reduce((sum, p) => sum + p.amount, 0);

  const unresolved = divergences.filter(d => !d.resolved && d.financialImpact);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Resumo Financeiro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Resumo Financeiro</span>
          </CardTitle>
          <CardDescription>
            Resumo das pendências financeiras do checklist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-sm text-muted-foreground">Pendente</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalApproved)}
              </p>
              <p className="text-sm text-muted-foreground">Aprovado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalSelected)}
              </p>
              <p className="text-sm text-muted-foreground">Selecionado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {formatCurrency(totalPending + totalApproved)}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Divergências não resolvidas com impacto financeiro */}
      {unresolved.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Divergências Pendentes ({unresolved.length})</span>
            </CardTitle>
            <CardDescription className="text-orange-600">
              Divergências com impacto financeiro que ainda precisam ser resolvidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unresolved.map(divergence => (
                <div key={divergence.id} className="p-3 bg-white rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{divergence.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Severidade: {divergence.severity} •
                        Tipo: {divergence.type}
                      </p>
                      {divergence.estimatedCost && (
                        <p className="text-sm font-medium text-orange-600">
                          Custo estimado: {formatCurrency(divergence.estimatedCost)}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-orange-600">
                      Não Resolvida
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Pendências */}
      {pendencies.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Pendências Financeiras ({pendencies.length})</span>
                </CardTitle>
                <CardDescription>
                  Gerencie as cobranças identificadas no checklist
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={pendencies.length === 0}
                >
                  Selecionar Todas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAll}
                  disabled={selectedPendencies.length === 0}
                >
                  Limpar Seleção
                </Button>
                <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
                  <DialogTrigger asChild>
                    <Button
                      disabled={selectedPendencies.length === 0}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar p/ Financeiro
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enviar para Financeiro</DialogTitle>
                      <DialogDescription>
                        Confirme o envio das pendências selecionadas para o departamento financeiro
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Veículo:</p>
                            <p>{vehicleId}</p>
                          </div>
                          {contractId && (
                            <div>
                              <p className="font-medium">Contrato:</p>
                              <p>{contractId}</p>
                            </div>
                          )}
                          {clientName && (
                            <div>
                              <p className="font-medium">Cliente:</p>
                              <p>{clientName}</p>
                            </div>
                          )}
                          <div>
                            <p className="font-medium">Total:</p>
                            <p className="font-bold text-lg">{formatCurrency(totalSelected)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Observações para o Financeiro</Label>
                        <Textarea
                          placeholder="Adicione observações relevantes..."
                          value={financialNotes}
                          onChange={(e) => setFinancialNotes(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Pendências Selecionadas ({selectedPendencies.length})</Label>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {pendencies
                            .filter(p => selectedPendencies.includes(p.id))
                            .map(pendency => (
                              <div key={pendency.id} className="p-2 bg-muted rounded text-sm">
                                <div className="flex justify-between">
                                  <span>{getTypeLabel(pendency.type)}</span>
                                  <span className="font-medium">
                                    {formatCurrency(pendency.amount)}
                                  </span>
                                </div>
                                <p className="text-muted-foreground truncate">
                                  {pendency.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowSendDialog(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleSendToFinancial}>
                          <Send className="w-4 h-4 mr-2" />
                          Confirmar Envio
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendencies.map((pendency) => {
              const StatusIcon = getStatusIcon(pendency.status);
              const isSelected = selectedPendencies.includes(pendency.id);
              const canSelect = pendency.status === 'pending' || pendency.status === 'approved';

              return (
                <div
                  key={pendency.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected ? 'border-blue-300 bg-blue-50' : 'border-border bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {canSelect && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handlePendencyToggle(pendency.id)}
                          className="mt-1"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getStatusColor(pendency.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {pendency.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {getTypeLabel(pendency.type)}
                          </Badge>
                          <span className="font-bold text-lg">
                            {formatCurrency(pendency.amount)}
                          </span>
                        </div>

                        <p className="font-medium mb-1">{pendency.description}</p>

                        <div className="text-sm text-muted-foreground space-y-1">
                          {pendency.dueDate && (
                            <p>Vencimento: {formatDate(pendency.dueDate)}</p>
                          )}
                          {pendency.approvedBy && pendency.approvedAt && (
                            <p>
                              Aprovado por {pendency.approvedBy} em{' '}
                              {formatDate(pendency.approvedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {pendency.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onPendencyUpdate(pendency.id, {
                              status: 'approved',
                              approvedBy: 'Usuario Atual',
                              approvedAt: new Date()
                            })}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onPendencyUpdate(pendency.id, {
                              status: 'rejected'
                            })}
                          >
                            Rejeitar
                          </Button>
                        </>
                      )}
                      {pendency.status === 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onPendencyUpdate(pendency.id, {
                            status: 'paid'
                          })}
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          Marcar como Pago
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há pendências */}
      {pendencies.length === 0 && unresolved.length === 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-green-800 mb-2">
                Nenhuma Pendência Financeira
              </h3>
              <p className="text-green-600">
                Não foram identificadas cobranças adicionais neste checklist.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}