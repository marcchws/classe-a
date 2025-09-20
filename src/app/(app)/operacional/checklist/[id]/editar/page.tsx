'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChecklistType, ChecklistQuestion, ChecklistSection, ChecklistTemplate } from '@/types';
import Link from 'next/link';
import { QuestionBuilder } from '@/components/checklist/question-builder';
import { ChecklistPreview } from '@/components/checklist/checklist-preview';
import { Badge } from '@/components/ui/badge';

// Mock data - será substituído por dados reais da API
const mockTemplate: ChecklistTemplate = {
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
    }
  ],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-02-01'),
  createdBy: 'Admin',
  updatedBy: 'Admin'
};

export default function EditarChecklistTemplatePage() {
  const params = useParams();
  const templateId = params.id as string;

  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    type: '' as ChecklistType | '',
  });

  const [sections, setSections] = useState<Omit<ChecklistSection, 'id' | 'templateId' | 'createdAt' | 'updatedAt'>[]>([]);
  const [questions, setQuestions] = useState<Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>[]>([]);
  const [activeTab, setActiveTab] = useState('config');
  const [loading, setLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState(1);

  useEffect(() => {
    // Simular carregamento dos dados
    setTimeout(() => {
      // Converter o template mock para o formato esperado
      setTemplateData({
        name: mockTemplate.name,
        description: mockTemplate.description,
        type: mockTemplate.type
      });

      setSections(mockTemplate.sections.map(section => ({
        name: section.name,
        description: section.description,
        order: section.order
      })));

      setQuestions(mockTemplate.questions.map(question => ({
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
      })));

      setCurrentVersion(mockTemplate.version);
      setLoading(false);
    }, 1000);
  }, [templateId]);

  const handleAddSection = () => {
    const newSection = {
      name: `Nova Seção ${sections.length + 1}`,
      description: '',
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length === 1) return;

    const removedSectionOrder = sections[index].order;
    const newSections = sections.filter((_, i) => i !== index);

    // Remover perguntas da seção removida
    const newQuestions = questions.filter(q => q.sectionId !== removedSectionOrder.toString());

    setSections(newSections);
    setQuestions(newQuestions);
  };

  const handleUpdateSection = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleAddQuestion = (sectionId: string) => {
    const newQuestion: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'> = {
      type: 'texto',
      label: 'Nova Pergunta',
      placeholder: '',
      description: '',
      required: false,
      options: [],
      validations: [],
      conditionalLogic: [],
      sectionId,
      order: questions.filter(q => q.sectionId === sectionId).length + 1,
      defaultValue: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (questionIndex: number, updatedQuestion: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    const newQuestions = questions.filter((_, i) => i !== questionIndex);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    if (!templateData.name || !templateData.description || !templateData.type) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const templateToSave = {
      ...templateData,
      sections,
      questions,
      version: currentVersion + 1
    };

    console.log('Salvando template atualizado:', templateToSave);
    // Implementar salvamento
  };

  const canSave = templateData.name && templateData.description && templateData.type;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/operacional/checklist">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/operacional/checklist">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Template de Checklist</h1>
            <p className="text-muted-foreground mt-2 flex items-center space-x-2">
              <span>Editando template</span>
              <Badge variant="outline">v{currentVersion}</Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setActiveTab('preview')}
            disabled={!canSave}
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="config">Configuração</TabsTrigger>
          <TabsTrigger value="sections">Seções</TabsTrigger>
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="preview" disabled={!canSave}>Prévia</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Edite as informações principais do template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Template *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Checklist de Saída - Veículo Executivo"
                    value={templateData.name}
                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Checklist *</Label>
                  <Select
                    value={templateData.type}
                    onValueChange={(value: ChecklistType) => setTemplateData({ ...templateData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saida">Saída</SelectItem>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="ambos">Ambos (Saída e Entrada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo e uso deste template"
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Seções do Checklist</CardTitle>
                  <CardDescription>
                    Organize as perguntas em seções para melhor estruturação
                  </CardDescription>
                </div>
                <Button onClick={handleAddSection} size="sm">
                  Adicionar Seção
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Seção {index + 1}</Badge>
                    </div>
                    {sections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSection(index)}
                        className="text-destructive"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>Nome da Seção</Label>
                      <Input
                        value={section.name}
                        onChange={(e) => handleUpdateSection(index, 'name', e.target.value)}
                        placeholder="Nome da seção"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Descrição</Label>
                      <Input
                        value={section.description || ''}
                        onChange={(e) => handleUpdateSection(index, 'description', e.target.value)}
                        placeholder="Descrição opcional"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <QuestionBuilder
            sections={sections}
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onRemoveQuestion={handleRemoveQuestion}
          />
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <ChecklistPreview
            templateData={{
              ...templateData,
              sections,
              questions
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}