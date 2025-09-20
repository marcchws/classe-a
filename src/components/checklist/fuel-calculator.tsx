'use client';

import { useState, useEffect } from 'react';
import { Fuel, Calculator, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FuelData } from '@/types';

interface FuelCalculatorProps {
  fuelData: FuelData;
  onFuelDataChange: (data: FuelData) => void;
  isEntryChecklist?: boolean;
  exitFuelLevel?: number;
  className?: string;
}

export function FuelCalculator({
  fuelData,
  onFuelDataChange,
  isEntryChecklist = false,
  exitFuelLevel,
  className
}: FuelCalculatorProps) {
  const [errors, setErrors] = useState<string[]>([]);

  // Preço médio do combustível - em produção viria de uma API ou configuração
  const defaultFuelPrice = 5.89;

  const validateAndCalculate = () => {
    const newErrors: string[] = [];

    // Validações básicas
    if (fuelData.currentLevel < 0 || fuelData.currentLevel > 100) {
      newErrors.push('Nível de combustível deve estar entre 0% e 100%');
    }

    if (fuelData.tankCapacity <= 0) {
      newErrors.push('Capacidade do tanque deve ser maior que zero');
    }

    // Se é checklist de entrada e temos o nível de saída
    if (isEntryChecklist && exitFuelLevel !== undefined) {
      if (fuelData.currentLevel > exitFuelLevel) {
        newErrors.push('Nível de entrada não pode ser maior que o nível de saída');
      }

      // Calcular diferença automática
      const litersUsed = ((exitFuelLevel - fuelData.currentLevel) / 100) * fuelData.tankCapacity;
      const fuelCost = litersUsed * (fuelData.costPerLiter || defaultFuelPrice);

      const updatedData: FuelData = {
        ...fuelData,
        previousLevel: exitFuelLevel,
        calculatedDifference: litersUsed,
        costPerLiter: fuelData.costPerLiter || defaultFuelPrice,
        totalCost: fuelCost
      };

      // Só atualizar se houver mudança
      if (JSON.stringify(updatedData) !== JSON.stringify(fuelData)) {
        onFuelDataChange(updatedData);
      }
    } else {
      // Se não é checklist de entrada, limpar campos de comparação
      if (fuelData.previousLevel !== undefined || fuelData.calculatedDifference !== undefined) {
        const updatedData: FuelData = {
          ...fuelData,
          previousLevel: undefined,
          calculatedDifference: undefined,
          totalCost: undefined
        };
        onFuelDataChange(updatedData);
      }
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validateAndCalculate();
  }, [fuelData, exitFuelLevel]);

  const handleLevelChange = (value: string) => {
    const level = parseFloat(value) || 0;
    onFuelDataChange({
      ...fuelData,
      currentLevel: Math.max(0, Math.min(100, level))
    });
  };

  const handleCapacityChange = (value: string) => {
    const capacity = parseFloat(value) || 0;
    onFuelDataChange({
      ...fuelData,
      tankCapacity: Math.max(0, capacity)
    });
  };

  const handlePriceChange = (value: string) => {
    const price = parseFloat(value) || defaultFuelPrice;
    onFuelDataChange({
      ...fuelData,
      costPerLiter: price
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatLiters = (value: number) => {
    return `${value.toFixed(2)}L`;
  };

  const getFuelLevelColor = (level: number) => {
    if (level >= 75) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getFuelLevelBadge = (level: number) => {
    if (level >= 75) return { label: 'Alto', variant: 'default' as const };
    if (level >= 50) return { label: 'Médio', variant: 'secondary' as const };
    if (level >= 25) return { label: 'Baixo', variant: 'outline' as const };
    return { label: 'Crítico', variant: 'destructive' as const };
  };

  const currentLiters = (fuelData.currentLevel / 100) * fuelData.tankCapacity;
  const badge = getFuelLevelBadge(fuelData.currentLevel);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fuel className="w-5 h-5" />
            <span>Controle de Combustível</span>
            {isEntryChecklist && (
              <Badge variant="outline">Checklist de Entrada</Badge>
            )}
          </CardTitle>
          <CardDescription>
            {isEntryChecklist
              ? 'Registre o nível atual e compare com a saída'
              : 'Registre o nível atual de combustível do veículo'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Erros de validação */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Atenção
                </span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Campos de entrada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentLevel">Nível Atual (%)</Label>
              <Input
                id="currentLevel"
                type="number"
                min="0"
                max="100"
                step="1"
                value={fuelData.currentLevel}
                onChange={(e) => handleLevelChange(e.target.value)}
                placeholder="Ex: 75"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tankCapacity">Capacidade do Tanque (L)</Label>
              <Input
                id="tankCapacity"
                type="number"
                min="0"
                step="0.1"
                value={fuelData.tankCapacity}
                onChange={(e) => handleCapacityChange(e.target.value)}
                placeholder="Ex: 60"
              />
            </div>

            {isEntryChecklist && (
              <div className="space-y-2">
                <Label htmlFor="fuelPrice">Preço por Litro (R$)</Label>
                <Input
                  id="fuelPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={fuelData.costPerLiter || defaultFuelPrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="Ex: 5,89"
                />
              </div>
            )}
          </div>

          {/* Nível atual */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Nível Atual</span>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Percentual:</span>
                <span className={`font-medium ${getFuelLevelColor(fuelData.currentLevel)}`}>
                  {fuelData.currentLevel}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Volume:</span>
                <span className="font-medium">
                  {formatLiters(currentLiters)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    fuelData.currentLevel >= 75 ? 'bg-green-500' :
                    fuelData.currentLevel >= 50 ? 'bg-yellow-500' :
                    fuelData.currentLevel >= 25 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${fuelData.currentLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Comparação para checklist de entrada */}
          {isEntryChecklist && exitFuelLevel !== undefined && fuelData.calculatedDifference !== undefined && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span className="font-medium">Cálculo de Diferença</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Saída</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Nível:</span>
                        <span className="font-medium">{exitFuelLevel}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Volume:</span>
                        <span className="font-medium">
                          {formatLiters((exitFuelLevel / 100) * fuelData.tankCapacity)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Entrada</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Nível:</span>
                        <span className="font-medium">{fuelData.currentLevel}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Volume:</span>
                        <span className="font-medium">
                          {formatLiters(currentLiters)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultado do cálculo */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Combustível Utilizado:</span>
                      <span className="font-bold text-lg">
                        {formatLiters(fuelData.calculatedDifference)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Preço por Litro:</span>
                      <span className="font-medium">
                        {formatCurrency(fuelData.costPerLiter || defaultFuelPrice)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Valor Total:</span>
                      <span className="font-bold text-xl text-red-600">
                        {formatCurrency(fuelData.totalCost || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {fuelData.calculatedDifference > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">
                        Cobrança de Combustível
                      </span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      O cliente será cobrado pelo combustível utilizado.
                      Uma pendência financeira será criada automaticamente.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}