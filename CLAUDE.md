# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Classe A Locadora management system - a comprehensive SaaS platform for managing armored and executive vehicle rental operations. The company has 21+ years of experience and authorization from the Brazilian Army for armored vehicle rentals.

**Business Context:**
- Client: Classe A Locadora (premium armored vehicle rental company)
- Goal: Replace manual processes (spreadsheets/clipboards) with complete digital automation
- Target: 100% elimination of manual processes, 80% faster contract creation, 90% automated payments

## Tech Stack

- **Framework:** Next.js 15.5.3 with App Router and Turbopack
- **Runtime:** React 19.1.0
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS v4 with CSS variables
- **Components:** shadcn/ui (New York style)
- **Icons:** Lucide React
- **Path Aliases:** `@/*` maps to `./src/*`

## Development Commands

```bash
# Development (with Turbopack)
npm run dev

# Production build (with Turbopack)
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Architecture

The project follows **feature-driven development** within Next.js App Router, organized for scalability and maintainability:

### Core Directory Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── (auth)/            # Authentication routes (login, etc.)
│   └── (app)/             # Protected application routes
│       ├── dashboard/     # Main dashboard
│       ├── cadastros/     # Registration modules
│       │   ├── clientes/  # Clients (PF, PJ, Partners)
│       │   ├── motoristas/ # Drivers
│       │   ├── fornecedores/ # Suppliers
│       │   └── frota/     # Fleet management
│       ├── operacional/   # Operations
│       │   ├── contratos/ # Contracts (main business logic)
│       │   ├── checklist/ # Vehicle inspection checklists
│       │   └── agenda/    # Scheduling and allocation
│       ├── financeiro/    # Financial management
│       │   ├── contas-pagar/    # Accounts payable
│       │   ├── contas-receber/  # Accounts receivable
│       │   └── caixa-investimento/ # Investment cash flow
│       └── relatorios/    # Reports and analytics
├── components/            # Reusable UI components
│   ├── ui/               # Base components (shadcn/ui)
│   └── layout/           # Layout components (Header, Sidebar)
├── features/             # Business logic by feature
│   ├── autenticacao/     # Authentication logic
│   ├── cadastros-essenciais/ # Registration features
│   ├── operacional/      # Operations features
│   ├── financeiro/       # Financial features
│   ├── relatorios/       # Reporting features
│   └── app-motorista/    # Driver mobile app features
├── lib/                  # Utilities and integrations
│   ├── api.ts           # API functions
│   ├── hooks.ts         # Custom hooks
│   ├── utils.ts         # General utilities
│   └── zod.ts           # Validation schemas
├── services/            # Backend-for-frontend logic
├── store/               # Global state management
└── types/               # Global type definitions
```

### Development Phases

The implementation follows a 6-phase approach as defined in `IMPLEMENTATION_PLAN.md`:

1. **Foundation** - Authentication, access control, basic UI structure
2. **Essential Registrations** - Clients, drivers, suppliers, fleet management
3. **Core Operations** - Contracts (main business logic), checklists, scheduling
4. **Financial** - Accounts payable/receivable, investment management
5. **Analytics** - Dashboards, reports, business intelligence
6. **Driver Mobile App** - Mobile interface for drivers

### Key Business Entities

- **Contratos (Contracts)** - Central entity connecting clients, vehicles, and drivers
- **Clientes** - Three types: Pessoa Física (PF), Pessoa Jurídica (PJ), Parceiro (Partner)
- **Motoristas** - Drivers with scheduling and payment tracking
- **Veículos** - Fleet vehicles (armored and conventional)
- **Checklist** - Vehicle inspection templates and executions

### Component Guidelines

- Use shadcn/ui components with "New York" style
- Follow Tailwind CSS v4 patterns with CSS variables
- Component aliases are configured: `@/components`, `@/lib/utils`, `@/components/ui`
- Multiple UI registries available for extended components

### Path Resolution

- `@/*` resolves to `./src/*`
- Components: `@/components`
- Utils: `@/lib/utils`
- UI: `@/components/ui`
- Lib: `@/lib`
- Hooks: `@/hooks`

## Key Integration Points

- **Fleet Management** - Categories, brands/models, individual vehicles
- **Contract Flow** - Client selection → Vehicle allocation → Driver assignment → Checklist execution
- **Financial Automation** - Contract-driven invoice generation and payment tracking
- **Mobile Integration** - Driver app for service acceptance and completion
- **Reporting** - Real-time operational visibility and business intelligence

When working on features, always consider the interdependencies between modules, especially how contracts integrate with clients, vehicles, drivers, and financial processes.