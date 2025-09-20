'use client';

import { useState } from 'react';
import { ArrowLeft, Car, FileText, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChecklistType, ChecklistTemplate } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data - templates disponíveis
const availableTemplates: ChecklistTemplate[] = [
  {
    id: '1',
    name: 'Checklist de Saída - Veículo Executivo',
    description: 'Template padrão para inspeção de veículos executivos na saída',
    type: 'saida',
    version: 2,
    status: 'ativo',
    sections: [],
    questions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'Admin',
    updatedBy: 'Admin'
  },
  {
    id: '2',
    name: 'Checklist de Entrada - Veículo Blindado',
    description: 'Template para inspeção de veículos blindados na devolução',
    type: 'entrada',
    version: 1,
    status: 'ativo',
    sections: [],
    questions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'Admin',
    updatedBy: 'Admin'
  },
  {
    id: '4',
    name: 'Checklist Universal - Saída/Entrada',
    description: 'Template que pode ser usado tanto para saída quanto para entrada',
    type: 'ambos',
    version: 1,
    status: 'ativo',
    sections: [],
    questions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'Admin',
    updatedBy: 'Admin'
  }
];

// Mock data - veículos disponíveis
const availableVehicles = [
  { id: 'VEH-001', plate: 'ABC-1234', model: 'BMW X5 Blindado', category: 'Executivo' },
  { id: 'VEH-002', plate: 'XYZ-5678', model: 'Mercedes S-Class', category: 'Executivo' },
  { id: 'VEH-003', plate: 'DEF-9012', model: 'Toyota Hilux', category: 'Utilitário' }
];

// Mock data - contratos ativos
const activeContracts = [
  { id: 'CONT-001', client: 'Empresa ABC Ltda', driver: 'João Silva', startDate: '2024-01-15' },
  { id: 'CONT-002', client: 'Corporação XYZ S.A.', driver: 'Maria Santos', startDate: '2024-01-18' },
  { id: 'CONT-003', client: 'Indústria DEF', driver: 'Carlos Oliveira', startDate: '2024-01-20' }
];

// Mock data - motoristas
const availableDrivers = [
  { id: 'DRV-001', name: 'João Silva', cnh: '12345678901' },
  { id: 'DRV-002', name: 'Maria Santos', cnh: '10987654321' },
  { id: 'DRV-003', name: 'Carlos Oliveira', cnh: '11223344556' }
];

export default function NovaExecucaoChecklistPage() {
  const router = useRouter();
  const [executionData, setExecutionData] = useState({
    templateId: '',
    vehicleId: '',
    contractId: '',
    driverId: '',
    type: '' as ChecklistType | ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState<ChecklistTemplate | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof availableVehicles[0] | null>(null);
  const [selectedContract, setSelectedContract] = useState<typeof activeContracts[0] | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<typeof availableDrivers[0] | null>(null);

  const handleTemplateChange = (templateId: string) => {
    const template = availableTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    setExecutionData(prev => ({
      ...prev,
      templateId,
      type: template?.type === 'ambos' ? prev.type : (template?.type || '')
    }));
  };

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = availableVehicles.find(v => v.id === vehicleId);
    setSelectedVehicle(vehicle || null);
    setExecutionData(prev => ({ ...prev, vehicleId }));
  };

  const handleContractChange = (contractId: string) => {
    const contract = activeContracts.find(c => c.id === contractId);
    setSelectedContract(contract || null);
    setExecutionData(prev => ({ ...prev, contractId }));
  };

  const handleDriverChange = (driverId: string) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    setSelectedDriver(driver || null);
    setExecutionData(prev => ({ ...prev, driverId }));
  };

  const handleStart = () => {
    if (!executionData.templateId || !executionData.vehicleId || !executionData.type) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    // Simular criação da execução
    const newExecutionId = `EXEC-${Date.now()}`;
    console.log('Iniciando nova execução:', {
      id: newExecutionId,
      ...executionData
    });

    // Redirecionar para o formulário de execução
    router.push(`/operacional/checklist/execucoes/${newExecutionId}/executar`);
  };

  const canStart = executionData.templateId && executionData.vehicleId && executionData.type;

  const getAvailableTemplates = () => {
    if (!executionData.type) return availableTemplates;
    return availableTemplates.filter(template =>
      template.type === executionData.type || template.type === 'ambos'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/operacional/checklist/execucoes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nova Execução de Checklist</h1>
            <p className="text-muted-foreground mt-2">
              Configure os dados para iniciar um novo checklist de veículo
            </p>
          </div>
        </div>
        <Button onClick={handleStart} disabled={!canStart}>
          <Calendar className="w-4 h-4 mr-2" />
          Iniciar Checklist
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Seleção de Tipo e Template */}
        <Card>
          <CardHeader>
            <CardTitle>Template de Checklist</CardTitle>
            <CardDescription>
              Selecione o tipo de checklist e o template a ser utilizado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Checklist *</Label>
              <Select
                value={executionData.type}
                onValueChange={(value: ChecklistType) => setExecutionData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saida">Saída de Veículo</SelectItem>
                  <SelectItem value="entrada">Entrada de Veículo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template *</Label>
              <Select
                value={executionData.templateId}
                onValueChange={handleTemplateChange}
                disabled={!executionData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o template" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTemplates().map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          v{template.version} - {template.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium">{selectedTemplate.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedTemplate.description}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Versão {selectedTemplate.version} • Status: {selectedTemplate.status}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seleção de Veículo */}
        <Card>
          <CardHeader>
            <CardTitle>Veículo</CardTitle>
            <CardDescription>
              Selecione o veículo que será inspecionado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Veículo *</Label>
              <Select
                value={executionData.vehicleId}
                onValueChange={handleVehicleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  {availableVehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{vehicle.plate}</div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle.model} • {vehicle.category}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedVehicle && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Car className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{selectedVehicle.plate}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedVehicle.model}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Categoria: {selectedVehicle.category}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seleção de Contrato (Opcional) */}
        <Card>
          <CardHeader>
            <CardTitle>Contrato</CardTitle>
            <CardDescription>
              Vincule a um contrato existente (opcional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contract">Contrato</Label>
              <Select
                value={executionData.contractId}
                onValueChange={handleContractChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o contrato (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {activeContracts.map(contract => (
                    <SelectItem key={contract.id} value={contract.id}>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{contract.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {contract.client} • {contract.driver}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedContract && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{selectedContract.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedContract.client}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Motorista: {selectedContract.driver} • Início: {selectedContract.startDate}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seleção de Motorista (Opcional) */}
        <Card>
          <CardHeader>
            <CardTitle>Motorista</CardTitle>
            <CardDescription>
              Selecione o motorista responsável (opcional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driver">Motorista</Label>
              <Select
                value={executionData.driverId}
                onValueChange={handleDriverChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motorista (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers.map(driver => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-xs text-muted-foreground">
                            CNH: {driver.cnh}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDriver && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{selectedDriver.name}</div>
                    <div className="text-sm text-muted-foreground">
                      CNH: {selectedDriver.cnh}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {canStart && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Pronto para iniciar!
              </h3>
              <p className="text-green-600 mb-4">
                Todos os campos obrigatórios foram preenchidos. Clique em &quot;Iniciar Checklist&quot; para começar.
              </p>
              <Button onClick={handleStart} size="lg" className="bg-green-600 hover:bg-green-700">
                <Calendar className="w-5 h-5 mr-2" />
                Iniciar Checklist Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}