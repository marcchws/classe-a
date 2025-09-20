'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Copy, Trash2, MoreHorizontal } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChecklistTemplate } from '@/types';
import Link from 'next/link';
import { ChecklistPreview } from '@/components/checklist/checklist-preview';

// Mock data - será substituído por dados reais da API
const initialMockTemplates: ChecklistTemplate[] = [
  {
    id: '1',
    name: 'Checklist de Saída - Veículo Executivo',
    description: 'Template padrão para inspeção de veículos executivos na saída',
    type: 'saida',
    version: 2,
    status: 'ativo',
    sections: [
      {
        id: '1',
        name: 'Documentação',
        description: 'Verificação de documentos obrigatórios',
        order: 1,
        templateId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Estado do Veículo',
        description: 'Inspeção física do veículo',
        order: 2,
        templateId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    questions: [
      {
        id: '1',
        type: 'checkbox',
        label: 'Documentos presentes no veículo',
        placeholder: '',
        description: 'Marque todos os documentos que estão presentes',
        required: true,
        options: [
          { id: '1', label: 'CRLV', value: 'crlv', order: 1 },
          { id: '2', label: 'Seguro obrigatório', value: 'seguro', order: 2 },
          { id: '3', label: 'Manual do proprietário', value: 'manual', order: 3 }
        ],
        validations: [],
        conditionalLogic: [],
        sectionId: '1',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        type: 'numero',
        label: 'Quilometragem atual',
        placeholder: 'Digite a quilometragem',
        description: 'Quilometragem exibida no painel do veículo',
        required: true,
        options: [],
        validations: [
          {
            id: '1',
            type: 'valor-minimo',
            value: 0,
            message: 'Quilometragem deve ser maior que zero'
          }
        ],
        conditionalLogic: [],
        sectionId: '2',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        type: 'radio',
        label: 'Nível de combustível',
        placeholder: '',
        description: 'Selecione o nível atual de combustível',
        required: true,
        options: [
          { id: '1', label: 'Vazio (0-10%)', value: 'vazio', order: 1 },
          { id: '2', label: 'Baixo (10-25%)', value: 'baixo', order: 2 },
          { id: '3', label: 'Médio (25-75%)', value: 'medio', order: 3 },
          { id: '4', label: 'Alto (75-100%)', value: 'alto', order: 4 }
        ],
        validations: [],
        conditionalLogic: [],
        sectionId: '2',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
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
    sections: [
      {
        id: '1',
        name: 'Verificação de Retorno',
        description: 'Inspeção na devolução do veículo',
        order: 1,
        templateId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    questions: [
      {
        id: '1',
        type: 'texto',
        label: 'Observações gerais',
        placeholder: 'Digite observações sobre o estado do veículo',
        description: 'Descreva qualquer problema ou observação importante',
        required: false,
        options: [],
        validations: [],
        conditionalLogic: [],
        sectionId: '1',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        type: 'upload',
        label: 'Fotos de avarias',
        placeholder: '',
        description: 'Envie fotos de possíveis avarias encontradas',
        required: false,
        options: [],
        validations: [],
        conditionalLogic: [],
        sectionId: '1',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'Admin',
    updatedBy: 'Admin'
  },
  {
    id: '3',
    name: 'Checklist Completo - Manutenção',
    description: 'Template para inspeção completa durante manutenção',
    type: 'ambos',
    version: 3,
    status: 'rascunho',
    sections: [
      {
        id: '1',
        name: 'Manutenção Preventiva',
        description: 'Itens de verificação preventiva',
        order: 1,
        templateId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    questions: [
      {
        id: '1',
        type: 'data',
        label: 'Data da última manutenção',
        placeholder: '',
        description: 'Quando foi realizada a última manutenção',
        required: true,
        options: [],
        validations: [],
        conditionalLogic: [],
        sectionId: '1',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-10'),
    createdBy: 'Admin',
    updatedBy: 'Admin'
  }
];

const statusMap = {
  ativo: { label: 'Ativo', variant: 'default' as const },
  inativo: { label: 'Inativo', variant: 'secondary' as const },
  rascunho: { label: 'Rascunho', variant: 'outline' as const }
};

const typeMap = {
  saida: { label: 'Saída', variant: 'destructive' as const },
  entrada: { label: 'Entrada', variant: 'default' as const },
  ambos: { label: 'Ambos', variant: 'secondary' as const }
};

export default function ChecklistTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<ChecklistTemplate | null>(null);

  const filteredTemplates = initialMockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesType = typeFilter === 'all' || template.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDuplicate = (templateId: string) => {
    const template = initialMockTemplates.find(t => t.id === templateId);
    if (template) {
      // Criar um novo template baseado no existente
      const newTemplate: ChecklistTemplate = {
        ...template,
        id: `${Date.now()}`, // Novo ID
        name: `${template.name} (Cópia)`,
        version: 1,
        status: 'rascunho',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Simular adição do novo template
      console.log('Template duplicado:', newTemplate);
      alert(`Template "${template.name}" duplicado com sucesso!`);

      // Em uma implementação real, você faria:
      // await duplicateTemplate(templateId);
      // router.refresh(); // ou atualizar o estado
    }
  };

  const handleDelete = (templateId: string) => {
    const template = initialMockTemplates.find(t => t.id === templateId);
    if (template) {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir o template "${template.name}"?\n\nEsta ação não pode ser desfeita.`
      );

      if (confirmDelete) {
        // Simular exclusão
        console.log('Template excluído:', templateId);
        alert(`Template "${template.name}" excluído com sucesso!`);

        // Em uma implementação real, você faria:
        // await deleteTemplate(templateId);
        // router.refresh(); // ou atualizar o estado
      }
    }
  };

  const handlePreview = (templateId: string) => {
    const template = initialMockTemplates.find(t => t.id === templateId);
    if (template) {
      // Abrir modal ou navegar para prévia
      setPreviewTemplate(template);
      setShowPreviewModal(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates de Checklist</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie templates de checklist para inspeção de veículos
          </p>
        </div>
        <Link href="/operacional/checklist/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Template
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>
            Lista de todos os templates de checklist cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar templates..."
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
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
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
                <SelectItem value="ambos">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Última Atualização</TableHead>
                  <TableHead>Criado por</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum template encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={typeMap[template.type].variant}>
                          {typeMap[template.type].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusMap[template.status].variant}>
                          {statusMap[template.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>v{template.version}</TableCell>
                      <TableCell>
                        {template.updatedAt.toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{template.createdBy}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handlePreview(template.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/operacional/checklist/${template.id}/editar`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(template.id)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(template.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Prévia */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prévia do Template</DialogTitle>
            <DialogDescription>
              Visualização de como o checklist será apresentado aos usuários
            </DialogDescription>
          </DialogHeader>
          {previewTemplate && (
            <ChecklistPreview
              templateData={{
                name: previewTemplate.name,
                description: previewTemplate.description,
                type: previewTemplate.type,
                sections: previewTemplate.sections.map(section => ({
                  name: section.name,
                  description: section.description,
                  order: section.order
                })),
                questions: previewTemplate.questions.map(question => ({
                  type: question.type,
                  label: question.label,
                  placeholder: question.placeholder,
                  description: question.description,
                  required: question.required,
                  options: question.options,
                  validations: question.validations,
                  conditionalLogic: question.conditionalLogic,
                  sectionId: question.sectionId,
                  order: question.order,
                  calculationFormula: question.calculationFormula,
                  defaultValue: question.defaultValue
                }))
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}