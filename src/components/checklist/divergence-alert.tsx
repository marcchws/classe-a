'use client';

import { useState } from 'react';
import { AlertTriangle, X, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Divergence, FinancialPendency } from '@/types';

interface DivergenceAlertProps {
  divergences: Divergence[];
  financialPendencies: FinancialPendency[];
  onDivergenceUpdate: (divergenceId: string, updates: Partial<Divergence>) => void;
  onPendencyUpdate: (pendencyId: string, updates: Partial<FinancialPendency>) => void;
  onCreatePendency: (divergenceId: string, pendency: Omit<FinancialPendency, 'id'>) => void;
  className?: string;
}

export function DivergenceAlert({
  divergences,
  financialPendencies,
  onDivergenceUpdate,
  onPendencyUpdate,
  onCreatePendency,
  className
}: DivergenceAlertProps) {
  const [selectedDivergence, setSelectedDivergence] = useState<Divergence | null>(null);
  const [resolutionData, setResolutionData] = useState({
    resolution: '',
    createPendency: false,
    pendencyAmount: 0,
    pendencyType: '' as FinancialPendency['type'] | '',
    pendencyDescription: ''
  });

  const getSeverityColor = (severity: Divergence['severity']) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'critical': return 'bg-red-200 text-red-900 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: Divergence['severity']) => {
    switch (severity) {
      case 'low': return AlertCircle;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
      case 'critical': return X;
      default: return AlertCircle;
    }
  };

  const getTypeLabel = (type: Divergence['type']) => {
    switch (type) {
      case 'missing_item': return 'Item Faltante';
      case 'damage': return 'Avaria';
      case 'fuel_difference': return 'Diferença de Combustível';
      case 'service_not_completed': return 'Serviço Não Concluído';
      case 'other': return 'Outro';
      default: return type;
    }
  };

  const getPendencyStatusColor = (status: FinancialPendency['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleResolveDivergence = () => {
    if (!selectedDivergence || !resolutionData.resolution) {
      alert('Preencha a resolução da divergência');
      return;
    }

    // Atualizar divergência
    onDivergenceUpdate(selectedDivergence.id, {
      resolved: true,
      resolution: resolutionData.resolution,
      approvedBy: 'Usuario Atual' // Em produção, pegar do contexto de auth
    });

    // Criar pendência financeira se necessário
    if (resolutionData.createPendency && resolutionData.pendencyAmount > 0) {
      const newPendency: Omit<FinancialPendency, 'id'> = {
        type: resolutionData.pendencyType as FinancialPendency['type'],
        description: resolutionData.pendencyDescription || selectedDivergence.description,
        amount: resolutionData.pendencyAmount,
        status: 'pending',
        divergenceId: selectedDivergence.id,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      };
      onCreatePendency(selectedDivergence.id, newPendency);
    }

    // Limpar formulário
    setSelectedDivergence(null);
    setResolutionData({
      resolution: '',
      createPendency: false,
      pendencyAmount: 0,
      pendencyType: '',
      pendencyDescription: ''
    });
  };

  const unresolved = divergences.filter(d => !d.resolved);
  const resolved = divergences.filter(d => d.resolved);
  const pendingPendencies = financialPendencies.filter(p => p.status === 'pending');

  if (unresolved.length === 0 && pendingPendencies.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Nenhuma divergência detectada</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Divergências não resolvidas */}
      {unresolved.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Divergências Detectadas ({unresolved.length})</span>
            </CardTitle>
            <CardDescription className="text-red-600">
              As seguintes divergências foram identificadas e precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {unresolved.map((divergence) => {
              const SeverityIcon = getSeverityIcon(divergence.severity);

              return (
                <div
                  key={divergence.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(divergence.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <SeverityIcon className="w-4 h-4" />
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(divergence.type)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {divergence.severity.toUpperCase()}
                        </Badge>
                        {divergence.financialImpact && (
                          <Badge variant="outline" className="text-xs flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            Impacto Financeiro
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">{divergence.description}</p>
                      {divergence.estimatedCost && (
                        <p className="text-xs">
                          Custo estimado: {formatCurrency(divergence.estimatedCost)}
                        </p>
                      )}
                      <p className="text-xs mt-2">
                        Detectado em: {new Date(divergence.detectedAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedDivergence(divergence)}
                        >
                          Resolver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Resolver Divergência</DialogTitle>
                          <DialogDescription>
                            Registre como esta divergência foi resolvida
                          </DialogDescription>
                        </DialogHeader>

                        {selectedDivergence?.id === divergence.id && (
                          <div className="space-y-4">
                            <div className="p-4 bg-muted rounded-lg">
                              <p className="font-medium">{selectedDivergence.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Tipo: {getTypeLabel(selectedDivergence.type)} •
                                Severidade: {selectedDivergence.severity}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Resolução *</Label>
                              <Textarea
                                placeholder="Descreva como a divergência foi resolvida..."
                                value={resolutionData.resolution}
                                onChange={(e) => setResolutionData(prev => ({
                                  ...prev,
                                  resolution: e.target.value
                                }))}
                                rows={3}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="createPendency"
                                checked={resolutionData.createPendency}
                                onChange={(e) => setResolutionData(prev => ({
                                  ...prev,
                                  createPendency: e.target.checked
                                }))}
                              />
                              <Label htmlFor="createPendency">
                                Criar pendência financeira
                              </Label>
                            </div>

                            {resolutionData.createPendency && (
                              <div className="space-y-4 border rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Tipo de Pendência</Label>
                                    <Select
                                      value={resolutionData.pendencyType}
                                      onValueChange={(value: FinancialPendency['type']) =>
                                        setResolutionData(prev => ({ ...prev, pendencyType: value }))
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="fuel_difference">Diferença de Combustível</SelectItem>
                                        <SelectItem value="missing_item">Item Faltante</SelectItem>
                                        <SelectItem value="damage_repair">Reparo de Avaria</SelectItem>
                                        <SelectItem value="extra_service">Serviço Extra</SelectItem>
                                        <SelectItem value="cleaning_fee">Taxa de Limpeza</SelectItem>
                                        <SelectItem value="other">Outro</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Valor (R$)</Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={resolutionData.pendencyAmount}
                                      onChange={(e) => setResolutionData(prev => ({
                                        ...prev,
                                        pendencyAmount: parseFloat(e.target.value) || 0
                                      }))}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Descrição da Pendência</Label>
                                  <Input
                                    placeholder="Descrição da cobrança..."
                                    value={resolutionData.pendencyDescription}
                                    onChange={(e) => setResolutionData(prev => ({
                                      ...prev,
                                      pendencyDescription: e.target.value
                                    }))}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedDivergence(null)}
                              >
                                Cancelar
                              </Button>
                              <Button onClick={handleResolveDivergence}>
                                Resolver Divergência
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Pendências financeiras */}
      {pendingPendencies.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <DollarSign className="w-5 h-5" />
              <span>Pendências Financeiras ({pendingPendencies.length})</span>
            </CardTitle>
            <CardDescription className="text-orange-600">
              Total: {formatCurrency(pendingPendencies.reduce((sum, p) => sum + p.amount, 0))}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingPendencies.map((pendency) => (
              <div
                key={pendency.id}
                className="p-4 rounded-lg border bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getPendencyStatusColor(pendency.status)}>
                        {pendency.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">
                        {formatCurrency(pendency.amount)}
                      </span>
                    </div>
                    <p className="text-sm">{pendency.description}</p>
                    {pendency.dueDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Vencimento: {new Date(pendency.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onPendencyUpdate(pendency.id, { status: 'approved' })}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onPendencyUpdate(pendency.id, { status: 'rejected' })}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Divergências resolvidas */}
      {resolved.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Divergências Resolvidas ({resolved.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resolved.map((divergence) => (
              <div
                key={divergence.id}
                className="p-3 rounded-lg border border-green-200 bg-white"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{divergence.description}</span>
                </div>
                {divergence.resolution && (
                  <p className="text-xs text-muted-foreground">
                    Resolução: {divergence.resolution}
                  </p>
                )}
                {divergence.approvedBy && (
                  <p className="text-xs text-muted-foreground">
                    Aprovado por: {divergence.approvedBy}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}