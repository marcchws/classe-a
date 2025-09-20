export type ChecklistType = 'saida' | 'entrada' | 'ambos';

export type QuestionType =
  | 'texto'
  | 'numero'
  | 'data'
  | 'hora'
  | 'data-hora'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'upload'
  | 'calculo'
  | 'observacao';

export type ValidationType =
  | 'obrigatorio'
  | 'formato-email'
  | 'formato-telefone'
  | 'formato-cpf'
  | 'formato-cnpj'
  | 'valor-minimo'
  | 'valor-maximo'
  | 'tamanho-minimo'
  | 'tamanho-maximo'
  | 'arquivo-tipo'
  | 'arquivo-tamanho';

export interface ValidationRule {
  id: string;
  type: ValidationType;
  value?: string | number;
  message: string;
}

export interface ConditionalLogic {
  id: string;
  targetQuestionId: string;
  condition: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
  value: string | number | boolean;
  action: 'show' | 'hide' | 'require' | 'clear';
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string | number;
  order: number;
}

export interface ChecklistQuestion {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: QuestionOption[];
  validations: ValidationRule[];
  conditionalLogic: ConditionalLogic[];
  sectionId: string;
  order: number;
  calculationFormula?: string; // Para campos de cálculo
  defaultValue?: string | number | boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistSection {
  id: string;
  name: string;
  description?: string;
  order: number;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  type: ChecklistType;
  version: number;
  status: 'ativo' | 'inativo' | 'rascunho';
  sections: ChecklistSection[];
  questions: ChecklistQuestion[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface CreateChecklistTemplateData {
  name: string;
  description: string;
  type: ChecklistType;
  sections: Omit<ChecklistSection, 'id' | 'templateId' | 'createdAt' | 'updatedAt'>[];
  questions: Omit<ChecklistQuestion, 'id' | 'createdAt' | 'updatedAt'>[];
}

export interface UpdateChecklistTemplateData extends Partial<CreateChecklistTemplateData> {
  status?: 'ativo' | 'inativo' | 'rascunho';
}

// Para preview do checklist
export interface ChecklistPreviewData {
  template: ChecklistTemplate;
  responses: Record<string, string | number | boolean | string[]>;
}

// Para execução do checklist (será usado na Gestão de Checklist)
export interface ChecklistExecution {
  id: string;
  templateId: string;
  templateVersion: number;
  contractId?: string;
  vehicleId?: string;
  driverId?: string;
  type: ChecklistType;
  status: 'iniciado' | 'em-andamento' | 'concluido' | 'cancelado';
  responses: Record<string, string | number | boolean | string[]>;
  photos: string[];
  documents: string[];
  observations: string;
  executedBy: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}