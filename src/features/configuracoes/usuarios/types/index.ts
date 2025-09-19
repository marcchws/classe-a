export interface User {
  id: string
  name: string
  document: {
    type: 'CPF' | 'PASSAPORTE' | 'CNH'
    number: string
  }
  department: string
  position: string
  hireDate?: Date
  phone: string
  birthDate?: Date
  benefits?: Benefit[]
  salary: number
  commission?: Commission
  promotionHistory?: Promotion[]
  commissionHistory?: CommissionHistory[]
  vacationHistory?: VacationRecord[]
  professionalHistory?: ProfessionalExperience[]
  address: Address
  email: string
  password?: string
  profilePicture?: string
  status: 'active' | 'inactive'
  accessLevel?: string
  attachments?: Attachment[]
  createdAt: Date
  updatedAt: Date
}

export interface Benefit {
  id: string
  name: string
  value: number
  status: 'active' | 'inactive'
  recurrence: {
    day: number
    month: number
  }
}

export interface Commission {
  type: 'percentage' | 'fixed'
  value: number
  frequency: 'monthly' | 'quarterly' | 'biannual' | 'annual'
}

export interface Promotion {
  date: Date
  previousSalary: number
  newSalary: number
  previousPosition: string
  newPosition: string
}

export interface CommissionHistory {
  date: Date
  previousValue: number
  newValue: number
  type: 'percentage' | 'fixed'
}

export interface VacationRecord {
  startDate: Date
  endDate: Date
  days: number
}

export interface ProfessionalExperience {
  company: string
  position: string
  startDate: Date
  endDate?: Date
  observations?: string
}

export interface Address {
  zipCode: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
}

export interface Attachment {
  id: string
  name: string
  type: 'document' | 'proof_of_residence' | 'other'
  url: string
  uploadedAt: Date
}

export interface Department {
  id: string
  name: string
  description?: string
}

export interface Position {
  id: string
  name: string
  description?: string
  departmentId: string
}

export interface UserFormData {
  name: string
  document: {
    type: 'CPF' | 'PASSAPORTE' | 'CNH'
    number: string
  }
  department: string
  position: string
  hireDate?: Date
  phone: string
  birthDate?: Date
  salary: number
  commission?: Commission
  address: Address
  email: string
  password: string
  status: 'active' | 'inactive'
  accessLevel?: string
}