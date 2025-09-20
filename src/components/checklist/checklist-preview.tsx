'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Clock, Upload, Calculator } from 'lucide-react';
import { ChecklistQuestion, ChecklistSection } from '@/types';

interface ChecklistPreviewProps {
  templateData: {
    name: string;
    description: string;
    type: string;
    sections: Omit<ChecklistSection, 'id' | 'templateId' | 'createdAt' | 'updatedAt'>[];
    questions: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>[];
  };
}

export function ChecklistPreview({ templateData }: ChecklistPreviewProps) {
  const [responses, setResponses] = useState<Record<string, string | number | boolean | string[]>>({});

  const updateResponse = (questionIndex: number, value: string | number | boolean | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const renderQuestionInput = (question: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>, questionIndex: number) => {
    const responseValue = responses[questionIndex];
    const value = typeof responseValue === 'string' ? responseValue : 
                  typeof responseValue === 'number' ? responseValue.toString() : 
                  Array.isArray(responseValue) ? responseValue.join(', ') : '';

    switch (question.type) {
      case 'texto':
        return (
          <Input
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => updateResponse(questionIndex, e.target.value)}
          />
        );

      case 'numero':
        return (
          <Input
            type="number"
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => updateResponse(questionIndex, parseFloat(e.target.value) || 0)}
          />
        );

      case 'data':
        return (
          <div className="relative">
            <Input
              type="date"
              value={value}
              onChange={(e) => updateResponse(questionIndex, e.target.value)}
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        );

      case 'hora':
        return (
          <div className="relative">
            <Input
              type="time"
              value={value}
              onChange={(e) => updateResponse(questionIndex, e.target.value)}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        );

      case 'data-hora':
        return (
          <Input
            type="datetime-local"
            value={value}
            onChange={(e) => updateResponse(questionIndex, e.target.value)}
          />
        );

      case 'dropdown':
        return (
          <Select value={value} onValueChange={(val) => updateResponse(questionIndex, val)}>
            <SelectTrigger>
              <SelectValue placeholder={question.placeholder || 'Selecione uma opção'} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => updateResponse(questionIndex, val)}
          >
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`${questionIndex}-${option.id}`} />
                <Label htmlFor={`${questionIndex}-${option.id}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        const checkboxValues = Array.isArray(responseValue) ? responseValue : [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`${questionIndex}-${option.id}`}
                  checked={checkboxValues.includes(option.value.toString())}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateResponse(questionIndex, [...checkboxValues, option.value.toString()]);
                    } else {
                      updateResponse(questionIndex, checkboxValues.filter((v: string) => v !== option.value.toString()));
                    }
                  }}
                />
                <Label htmlFor={`${questionIndex}-${option.id}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        );

      case 'upload':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Clique para fazer upload ou arraste arquivos aqui
            </div>
          </div>
        );

      case 'calculo':
        return (
          <div className="relative">
            <Input
              value={value || 'Calculado automaticamente'}
              disabled
              className="bg-muted"
            />
            <Calculator className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        );

      case 'observacao':
        return (
          <Textarea
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => updateResponse(questionIndex, e.target.value)}
            rows={4}
          />
        );

      default:
        return (
          <Input
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => updateResponse(questionIndex, e.target.value)}
          />
        );
    }
  };

  const getQuestionsForSection = (sectionOrder: number) => {
    return templateData.questions
      .map((question, index) => ({ ...question, originalIndex: index }))
      .filter(question => question.sectionId === sectionOrder.toString())
      .sort((a, b) => a.order - b.order);
  };

  if (!templateData.name || !templateData.description || !templateData.type) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-lg font-medium mb-2">Prévia não disponível</div>
            <div>Complete as informações básicas do template para visualizar a prévia</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{templateData.name}</span>
              <Badge variant="outline">
                {templateData.type === 'saida' && 'Saída'}
                {templateData.type === 'entrada' && 'Entrada'}
                {templateData.type === 'ambos' && 'Saída/Entrada'}
              </Badge>
            </CardTitle>
            <CardDescription>{templateData.description}</CardDescription>
          </div>
          <Badge variant="secondary">Prévia</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {templateData.sections
          .sort((a, b) => a.order - b.order)
          .map((section, sectionIndex) => {
            const sectionQuestions = getQuestionsForSection(section.order);

            if (sectionQuestions.length === 0) {
              return null;
            }

            return (
              <div key={sectionIndex} className="space-y-4">
                {sectionIndex > 0 && <Separator className="my-6" />}

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Badge variant="outline">Seção {section.order}</Badge>
                    <span>{section.name}</span>
                  </h3>
                  {section.description && (
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  )}
                </div>

                <div className="grid gap-6">
                  {sectionQuestions.map((question) => (
                    <div key={question.originalIndex} className="space-y-3">
                      <Label className="text-base">
                        {question.label}
                        {question.required && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </Label>

                      {question.description && (
                        <p className="text-sm text-muted-foreground -mt-1">
                          {question.description}
                        </p>
                      )}

                      {renderQuestionInput(question, question.originalIndex)}

                      {question.validations.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {question.validations.map((validation, vIndex) => (
                            <div key={vIndex}>• {validation.message}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        {templateData.questions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-lg font-medium mb-2">Nenhuma pergunta adicionada</div>
            <div>Adicione perguntas nas seções para visualizar o checklist</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}