'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { ChecklistQuestion, ChecklistSection, QuestionType, ValidationRule, QuestionOption } from '@/types';

const questionTypeOptions = [
  { value: 'texto', label: 'Texto', description: 'Campo de texto livre' },
  { value: 'numero', label: 'Número', description: 'Campo numérico' },
  { value: 'data', label: 'Data', description: 'Seletor de data' },
  { value: 'hora', label: 'Hora', description: 'Seletor de hora' },
  { value: 'data-hora', label: 'Data e Hora', description: 'Seletor de data e hora' },
  { value: 'dropdown', label: 'Lista Suspensa', description: 'Seleção única em lista' },
  { value: 'checkbox', label: 'Caixas de Seleção', description: 'Múltipla seleção' },
  { value: 'radio', label: 'Botões de Opção', description: 'Seleção única entre opções' },
  { value: 'upload', label: 'Upload de Arquivo', description: 'Envio de arquivo/foto' },
  { value: 'calculo', label: 'Cálculo Automático', description: 'Campo calculado automaticamente' },
  { value: 'observacao', label: 'Observação', description: 'Campo de texto longo' }
];

const validationTypeOptions = [
  { value: 'obrigatorio', label: 'Campo Obrigatório', needsValue: false },
  { value: 'formato-email', label: 'Formato de E-mail', needsValue: false },
  { value: 'formato-telefone', label: 'Formato de Telefone', needsValue: false },
  { value: 'formato-cpf', label: 'Formato de CPF', needsValue: false },
  { value: 'formato-cnpj', label: 'Formato de CNPJ', needsValue: false },
  { value: 'valor-minimo', label: 'Valor Mínimo', needsValue: true },
  { value: 'valor-maximo', label: 'Valor Máximo', needsValue: true },
  { value: 'tamanho-minimo', label: 'Tamanho Mínimo', needsValue: true },
  { value: 'tamanho-maximo', label: 'Tamanho Máximo', needsValue: true },
  { value: 'arquivo-tipo', label: 'Tipo de Arquivo', needsValue: true },
  { value: 'arquivo-tamanho', label: 'Tamanho do Arquivo (MB)', needsValue: true }
];

interface QuestionBuilderProps {
  sections: Omit<ChecklistSection, 'id' | 'templateId' | 'createdAt' | 'updatedAt'>[];
  questions: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>[];
  onAddQuestion: (sectionId: string) => void;
  onUpdateQuestion: (questionIndex: number, updatedQuestion: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onRemoveQuestion: (questionIndex: number) => void;
}

export function QuestionBuilder({
  sections,
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion
}: QuestionBuilderProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleQuestionExpanded = (index: number) => {
    setExpandedQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const updateQuestion = (questionIndex: number, field: string, value: string | number | boolean | ValidationRule[] | QuestionOption[]) => {
    const question = questions[questionIndex];
    const updatedQuestion = { ...question, [field]: value };
    onUpdateQuestion(questionIndex, updatedQuestion);
  };

  const addValidation = (questionIndex: number) => {
    const question = questions[questionIndex];
    const newValidation: ValidationRule = {
      id: `validation_${Date.now()}`,
      type: 'obrigatorio',
      message: 'Este campo é obrigatório'
    };
    const updatedValidations = [...question.validations, newValidation];
    updateQuestion(questionIndex, 'validations', updatedValidations);
  };

  const updateValidation = (questionIndex: number, validationIndex: number, field: string, value: string | number) => {
    const question = questions[questionIndex];
    const updatedValidations = [...question.validations];
    updatedValidations[validationIndex] = { ...updatedValidations[validationIndex], [field]: value };
    updateQuestion(questionIndex, 'validations', updatedValidations);
  };

  const removeValidation = (questionIndex: number, validationIndex: number) => {
    const question = questions[questionIndex];
    const updatedValidations = question.validations.filter((_, i) => i !== validationIndex);
    updateQuestion(questionIndex, 'validations', updatedValidations);
  };

  const addOption = (questionIndex: number) => {
    const question = questions[questionIndex];
    const newOption: QuestionOption = {
      id: `option_${Date.now()}`,
      label: `Opção ${(question.options?.length || 0) + 1}`,
      value: `opcao_${(question.options?.length || 0) + 1}`,
      order: (question.options?.length || 0) + 1
    };
    const updatedOptions = [...(question.options || []), newOption];
    updateQuestion(questionIndex, 'options', updatedOptions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, field: string, value: string | number) => {
    const question = questions[questionIndex];
    const updatedOptions = [...(question.options || [])];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], [field]: value };
    updateQuestion(questionIndex, 'options', updatedOptions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const question = questions[questionIndex];
    const updatedOptions = (question.options || []).filter((_, i) => i !== optionIndex);
    updateQuestion(questionIndex, 'options', updatedOptions);
  };

  const needsOptions = (type: QuestionType) => {
    return ['dropdown', 'checkbox', 'radio'].includes(type);
  };

  const getQuestionsForSection = (sectionOrder: number) => {
    return questions
      .map((question, index) => ({ ...question, originalIndex: index }))
      .filter(question => question.sectionId === sectionOrder.toString());
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => {
        const sectionQuestions = getQuestionsForSection(section.order);

        return (
          <Card key={sectionIndex}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="outline">Seção {section.order}</Badge>
                    <span>{section.name}</span>
                  </CardTitle>
                  {section.description && (
                    <CardDescription>{section.description}</CardDescription>
                  )}
                </div>
                <Button
                  onClick={() => onAddQuestion(section.order.toString())}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pergunta
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectionQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma pergunta adicionada a esta seção
                </div>
              ) : (
                sectionQuestions.map((question) => {
                  const isExpanded = expandedQuestions.includes(question.originalIndex);

                  return (
                    <Collapsible
                      key={question.originalIndex}
                      open={isExpanded}
                      onOpenChange={() => toggleQuestionExpanded(question.originalIndex)}
                    >
                      <Card>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary">
                                    {questionTypeOptions.find(t => t.value === question.type)?.label}
                                  </Badge>
                                  {question.required && (
                                    <Badge variant="destructive" className="text-xs">
                                      Obrigatório
                                    </Badge>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{question.label}</div>
                                  {question.description && (
                                    <div className="text-sm text-muted-foreground">
                                      {question.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {isExpanded ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveQuestion(question.originalIndex);
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-4">
                            <Separator />

                            {/* Configurações básicas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Tipo da Pergunta</Label>
                                <Select
                                  value={question.type}
                                  onValueChange={(value: QuestionType) =>
                                    updateQuestion(question.originalIndex, 'type', value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {questionTypeOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        <div>
                                          <div className="font-medium">{option.label}</div>
                                          <div className="text-xs text-muted-foreground">
                                            {option.description}
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Texto da Pergunta</Label>
                                <Input
                                  value={question.label}
                                  onChange={(e) =>
                                    updateQuestion(question.originalIndex, 'label', e.target.value)
                                  }
                                  placeholder="Digite a pergunta"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Placeholder</Label>
                                <Input
                                  value={question.placeholder || ''}
                                  onChange={(e) =>
                                    updateQuestion(question.originalIndex, 'placeholder', e.target.value)
                                  }
                                  placeholder="Texto de exemplo"
                                />
                              </div>
                              <div className="flex items-center space-x-2 pt-7">
                                <Checkbox
                                  id={`required-${question.originalIndex}`}
                                  checked={question.required}
                                  onCheckedChange={(checked) =>
                                    updateQuestion(question.originalIndex, 'required', checked)
                                  }
                                />
                                <Label htmlFor={`required-${question.originalIndex}`}>
                                  Campo obrigatório
                                </Label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Descrição/Ajuda</Label>
                              <Textarea
                                value={question.description || ''}
                                onChange={(e) =>
                                  updateQuestion(question.originalIndex, 'description', e.target.value)
                                }
                                placeholder="Texto de ajuda para o usuário"
                                rows={2}
                              />
                            </div>

                            {/* Opções para campos de seleção */}
                            {needsOptions(question.type) && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label>Opções</Label>
                                  <Button
                                    onClick={() => addOption(question.originalIndex)}
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar Opção
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {(question.options || []).map((option, optionIndex) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                      <Input
                                        value={option.label}
                                        onChange={(e) =>
                                          updateOption(question.originalIndex, optionIndex, 'label', e.target.value)
                                        }
                                        placeholder="Texto da opção"
                                        className="flex-1"
                                      />
                                      <Input
                                        value={option.value.toString()}
                                        onChange={(e) =>
                                          updateOption(question.originalIndex, optionIndex, 'value', e.target.value)
                                        }
                                        placeholder="Valor"
                                        className="w-32"
                                      />
                                      <Button
                                        onClick={() => removeOption(question.originalIndex, optionIndex)}
                                        size="sm"
                                        variant="ghost"
                                        className="text-destructive"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Fórmula de cálculo para campos calculados */}
                            {question.type === 'calculo' && (
                              <div className="space-y-2">
                                <Label>Fórmula de Cálculo</Label>
                                <Input
                                  value={question.calculationFormula || ''}
                                  onChange={(e) =>
                                    updateQuestion(question.originalIndex, 'calculationFormula', e.target.value)
                                  }
                                  placeholder="Ex: {campo1} + {campo2} * 0.1"
                                />
                                <div className="text-xs text-muted-foreground">
                                  Use {`{nomeDoOutroCampo}`} para referenciar outros campos
                                </div>
                              </div>
                            )}

                            {/* Validações */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label>Validações</Label>
                                <Button
                                  onClick={() => addValidation(question.originalIndex)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Adicionar Validação
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {question.validations.map((validation, validationIndex) => (
                                  <div key={validation.id} className="flex items-center space-x-2">
                                    <Select
                                      value={validation.type}
                                      onValueChange={(value) =>
                                        updateValidation(question.originalIndex, validationIndex, 'type', value)
                                      }
                                    >
                                      <SelectTrigger className="w-48">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {validationTypeOptions.map(option => (
                                          <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    {validationTypeOptions.find(v => v.value === validation.type)?.needsValue && (
                                      <Input
                                        value={validation.value?.toString() || ''}
                                        onChange={(e) =>
                                          updateValidation(question.originalIndex, validationIndex, 'value', e.target.value)
                                        }
                                        placeholder="Valor"
                                        className="w-24"
                                      />
                                    )}
                                    <Input
                                      value={validation.message}
                                      onChange={(e) =>
                                        updateValidation(question.originalIndex, validationIndex, 'message', e.target.value)
                                      }
                                      placeholder="Mensagem de erro"
                                      className="flex-1"
                                    />
                                    <Button
                                      onClick={() => removeValidation(question.originalIndex, validationIndex)}
                                      size="sm"
                                      variant="ghost"
                                      className="text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}