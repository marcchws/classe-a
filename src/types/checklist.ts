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
  vehicleId: string;
  driverId?: string;
  type: ChecklistType;
  status: 'iniciado' | 'em-andamento' | 'concluido' | 'cancelado';
  responses: Record<string, string | number | boolean | string[]>;
  photos: ChecklistPhoto[];
  documents: ChecklistDocument[];
  observations: string;
  executedBy: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Campos específicos para gestão de checklist
  vehicleState: VehicleState;
  fuelLevel: FuelData;
  mileage: number;
  deliveredItems: DeliveredItem[];
  extraServices: ExtraService[];
  divergences: Divergence[];
  financialPendencies: FinancialPendency[];
}

export interface ChecklistPhoto {
  id: string;
  url: string;
  filename: string;
  description?: string;
  category: 'exterior' | 'interior' | 'damage' | 'documents' | 'general';
  questionId?: string;
  uploadedAt: Date;
}

export interface ChecklistDocument {
  id: string;
  url: string;
  filename: string;
  type: 'pdf' | 'image' | 'other';
  description?: string;
  questionId?: string;
  uploadedAt: Date;
}

export interface VehicleState {
  exterior: {
    scratches: boolean;
    dents: boolean;
    paintDamage: boolean;
    description?: string;
  };
  interior: {
    cleanliness: 'excellent' | 'good' | 'fair' | 'poor';
    damage: boolean;
    description?: string;
  };
  mechanical: {
    engineRunning: boolean;
    lightsWorking: boolean;
    tiresCondition: 'excellent' | 'good' | 'fair' | 'poor';
    description?: string;
  };
  glass: {
    windshield: boolean;
    sideWindows: boolean;
    rearWindow: boolean;
    description?: string;
  };
}

export interface FuelData {
  currentLevel: number; // Percentual 0-100
  tankCapacity: number; // Litros
  previousLevel?: number; // Para comparação entrada vs saída
  calculatedDifference?: number; // Diferença em litros
  costPerLiter?: number; // Preço por litro
  totalCost?: number; // Custo total da diferença
}

export interface DeliveredItem {
  id: string;
  name: string;
  category: 'mandatory' | 'optional' | 'extra';
  delivered: boolean;
  returned?: boolean;
  condition?: 'excellent' | 'good' | 'damaged' | 'missing';
  description?: string;
}

export interface ExtraService {
  id: string;
  name: string;
  category: 'cleaning' | 'childSeat' | 'gps' | 'insurance' | 'other';
  contracted: boolean;
  completed: boolean;
  paid: boolean;
  cost: number;
  description?: string;
}

export interface Divergence {
  id: string;
  type: 'missing_item' | 'damage' | 'fuel_difference' | 'service_not_completed' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  questionId?: string;
  detectedAt: Date;
  resolved: boolean;
  resolution?: string;
  approvedBy?: string;
  financialImpact: boolean;
  estimatedCost?: number;
}

export interface FinancialPendency {
  id: string;
  type: 'fuel_difference' | 'missing_item' | 'damage_repair' | 'extra_service' | 'cleaning_fee' | 'other';
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  divergenceId?: string;
  approvedBy?: string;
  approvedAt?: Date;
  dueDate?: Date;
}

// Para criação de nova execução de checklist
export interface CreateChecklistExecutionData {
  templateId: string;
  vehicleId: string;
  contractId?: string;
  driverId?: string;
  type: ChecklistType;
}

// Para comparação entre checklist de saída e entrada
export interface ChecklistComparison {
  exitChecklist?: ChecklistExecution;
  entryChecklist?: ChecklistExecution;
  divergences: Divergence[];
  fuelDifference: {
    exitLevel: number;
    entryLevel: number;
    difference: number;
    cost: number;
  };
  missingItems: DeliveredItem[];
  damageReport: {
    newDamages: string[];
    resolvedIssues: string[];
  };
}