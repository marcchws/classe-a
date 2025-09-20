'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChecklistType, ChecklistQuestion, ChecklistSection } from '@/types';
import Link from 'next/link';
import { QuestionBuilder } from '@/components/checklist/question-builder';
import { ChecklistPreview } from '@/components/checklist/checklist-preview';

export default function NovoChecklistTemplatePage() {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    type: '' as ChecklistType | '',
  });

  const [sections, setSections] = useState<Omit<ChecklistSection, 'id' | 'templateId' | 'createdAt' | 'updatedAt'>[]>([
    { name: 'Seção Geral', description: 'Perguntas gerais do checklist', order: 1 }
  ]);

  const [questions, setQuestions] = useState<Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>[]>([]);

  const [activeTab, setActiveTab] = useState('config');

  const handleAddSection = () => {
    const newSection = {
      name: `Nova Seção ${sections.length + 1}`,
      description: '',
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length === 1) return; // Manter pelo menos uma seção

    const removedSectionOrder = sections[index].order;
    const newSections = sections.filter((_, i) => i !== index);

    // Remover perguntas da seção removida e atualizar referências
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
      questions
    };

    console.log('Salvando template:', templateToSave);
    // Implementar salvamento
  };

  const canSave = templateData.name && templateData.description && templateData.type;

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
            <h1 className="text-3xl font-bold tracking-tight">Novo Template de Checklist</h1>
            <p className="text-muted-foreground mt-2">
              Crie um novo template personalizado para checklist de veículos
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
            Salvar Template
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
                Configure as informações principais do template
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
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Seção
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline">Seção {index + 1}</Badge>
                    </div>
                    {sections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSection(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
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