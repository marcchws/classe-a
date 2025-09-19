export interface Permission {
  id: string
  name: string
  description: string
  module: string
  actions: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
    export?: boolean
  }
}

export interface AccessLevel {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  permissions: Permission[]
  createdAt: Date
  updatedAt: Date
}

export interface Module {
  id: string
  name: string
  description: string
  permissions: Omit<Permission, 'module'>[]
}

export interface AccessLevelFormData {
  name: string
  description?: string
  status: 'active' | 'inactive'
  permissions: Record<string, {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
    export?: boolean
  }>
}