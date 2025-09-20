# Documento de Implementação: Sistema de Gestão Classe A

**Objetivo:** Estruturar o desenvolvimento do sistema de gestão para a Classe A Locadora, garantindo que os módulos sejam construídos em uma ordem lógica, com dependências claras, para facilitar o desenvolvimento, testes e integração contínua.

---

## Arquitetura e Estrutura de Pastas

A arquitetura seguirá o padrão de feature-driven development dentro de um projeto Next.js, organizando o código por funcionalidades para promover escalabilidade e manutenibilidade.

```
src/
├── app/                  # Rotas e páginas principais (Next.js App Router)
│   ├── (auth)/           # Rotas de autenticação (login, etc.)
│   ├── (app)/            # Rotas protegidas da aplicação principal
│   │   ├── dashboard/
│   │   ├── cadastros/
│   │   │   ├── clientes/
│   │   │   ├── motoristas/
│   │   │   └── ...
│   │   ├── operacional/
│   │   │   ├── contratos/
│   │   │   └── ...
│   │   └── ...
│   └── layout.tsx
│   └── page.tsx
├── components/           # Componentes de UI reutilizáveis
│   ├── ui/               # Componentes base (Button, Input, Card, etc.)
│   ├── layout/           # Componentes de layout (Header, Sidebar, etc.)
│   └── ...
├── features/             # Lógica de negócio e componentes por funcionalidade
│   ├── autenticacao/
│   ├── cadastros-essenciais/
│   │   ├── clientes/
│   │   ├── veiculos/
│   │   └── ...
│   ├── operacional/
│   ├── financeiro/
│   ├── relatorios/
│   └── app-motorista/
├── lib/                  # Funções utilitárias, hooks, e integrações
│   ├── api.ts            # Funções para chamadas de API
│   ├── hooks.ts          # Hooks customizados
│   ├── utils.ts          # Funções utilitárias gerais
│   └── zod.ts            # Esquemas de validação Zod
├── services/             # Lógica de serviço (backend-for-frontend)
├── store/                # Gerenciamento de estado global (Zustand, Redux, etc.)
└── types/                # Definições de tipos e interfaces globais
    └── index.ts
```

---

## Regras de Manutenção e Atualização

### **OBRIGATÓRIO: Atualização da Navegação**

**IMPORTANTE:** Sempre que uma nova funcionalidade for implementada, é **OBRIGATÓRIO** atualizar:

1. **Sidebar de Navegação** (`src/components/app-sidebar.tsx`)
   - Adicionar o novo item no menu apropriado
   - Manter a organização por categorias
   - Incluir ícone e descrição adequados

2. **Página Inicial** (`src/app/page.tsx`)
   - Adicionar a funcionalidade na categoria correta
   - Incluir nas ações rápidas se for uma funcionalidade muito utilizada
   - Atualizar o status (ready/new/wip)
   - Manter a busca funcionando

**Motivo:** Garantir que o sistema sempre mantenha navegação funcional e que novas funcionalidades sejam facilmente acessíveis aos usuários.

---

## Fases de Desenvolvimento

### Fase 1: Fundação e Estrutura Base ✅ **CONCLUÍDA**
*   **Foco:** Configurar o alicerce do sistema, incluindo segurança, acesso e as entidades de dados mais básicas.
*   **Funcionalidades:**
    1.  **Autenticação:** Login e Recuperação de Senha (`@.context/Login e Recuperação de Senha.md`) ✅
    2.  **Gestão de Acesso:** ✅
        *   Criação de Níveis de Acesso (`@.context/Criação de Níveis de Acesso.md`) ✅
        *   Criação de Usuários (`@.context/Criação de usuários.md`) ✅
    3.  **Estrutura de UI:** Implementar o layout principal da aplicação (menu lateral, cabeçalho) e componentes de UI básicos. ✅
    4.  **Onboarding:** Estrutura inicial do Tutorial/Onboarding (`@.context/Tutorial Onboarding.md`) ✅
    5.  **Insights:** Gerenciamento de Insights na tela inicial (`@.context/Gerenciamento de Insights.md`) ✅

### Fase 2: Módulos de Cadastros Essenciais ✅ **CONCLUÍDA**
*   **Foco:** Implementar os CRUDs das entidades que são a base para todas as outras operações.
*   **Funcionalidades:**
    1.  **Clientes:** Cadastro de Clientes (PF, PJ, Parceiro) (`@.context/Cadastro de Clientes.md`) ✅
    2.  **Motoristas:** Cadastro de Motorista (`@.context/Cadastro de Motorista.md`) ✅
    3.  **Fornecedores:** Cadastro de Fornecedores (`@.context/Cadastro de Fornecedores.md`) ✅
    4.  **Frota (Veículos):** ✅
        *   Categorias de Veículos (`@.context/Categorias de Veículos.md`) ✅
        *   Marca/Modelo de Veículos (`@.context/Marca Modelo de Veículos.md`) ✅
        *   Cadastro de Veículo (`@.context/Cadastro de Veículo.md`) ✅

### Fase 3: Módulo Central de Operações ✅ **CONCLUÍDA**
*   **Foco:** Desenvolver a funcionalidade principal que conecta clientes, veículos e motoristas.
*   **Funcionalidades:**
    1.  **Contratos:** Cadastro de Contratos (Locação, Serviço, etc.) (`@.context/Cadastro de Contratos.md`) ✅
    2.  **Checklist:** ✅ **IMPLEMENTADO COMPLETAMENTE**
        *   Cadastro de Checklist (Templates) (`@.context/Cadastro de Checklist.md`) ✅
        *   Gestão de Checklist (Execução na Entrada/Saída) (`@.context/Gestão de Checklist.md`) ✅
        *   Upload de fotos e documentos ✅
        *   Cálculo automático de combustível ✅
        *   Gestão de divergências e pendências financeiras ✅
    3.  **Alocação e Agendamento:**
        *   Agenda (`@.context/Agenda.md`)
        *   Escalação de Motorista (`@.context/Escalação de Motorista.md`)
    4.  **Manutenção:** Gestão de Manutenção (`@.context/Gestão de Manutenção.md`)

### Fase 4: Módulos Financeiros
*   **Foco:** Automatizar os processos financeiros que derivam dos contratos e operações.
*   **Funcionalidades:**
    1.  **Contas a Pagar:** (`@.context/Contas a Pagar.md`)
    2.  **Contas a Receber:** (`@.context/Contas a Receber.md`)
    3.  **Caixa de Investimento:** (`@.context/Caixa Investimento.md`)

### Fase 5: Painéis, Dashboards e Relatórios
*   **Foco:** Criar as telas de visualização de dados e inteligência de negócio.
*   **Funcionalidades:**
    1.  **Painel Operacional:** Painel de Gestão de Frotas (`@.context/Painel de Gestão de Frotas.md`)
    2.  **Dashboards:** Dashboard de Frotas (`@.context/Dashboard de Frotas.md`)
    3.  **Relatórios:**
        *   Relatório de Visão Geral (`@.context/Relatório de Visão Geral.md`)
        *   Relatório de Ocupação (`@.context/Relatório de Ocupação.md`)
        *   Relatório de Hist. de Atividades dos Funcionários (`@.context/Relatório de Hist. de Atividades dos Funcionários.md`)

### Fase 6: Aplicativo do Motorista
*   **Foco:** Desenvolver a interface mobile para os motoristas. Pode ser iniciada em paralelo com as fases 3-4, uma vez que as APIs e estruturas de dados estejam definidas.
*   **Funcionalidades:**
    1.  **Core do App:** Início, Ver Cadastro, Visualizar Contratos, Exclusão de Dados (`@.context/App Motorista - Inicio.md`, `@.context/App Motorista - Ver Cadastro.md`, `@.context/App Motorista - Visualizar Contratos.md`, `@.context/App Motorista - Exclusão dos Dados.md`)
    2.  **Operacional do App:**
        *   Agenda do Motorista (`@.context/App Motorista - Agenda.md`)
        *   Iniciar/Finalizar Atendimento (`@.context/App Motorista - Iniciar Atendimento.md`)
    3.  **Financeiro do App:**
        *   Valor a Receber (`@.context/App Motorista - Valor a Receber.md`)
        *   Contas em Aberto (`@.context/App Motorista - Contas em Aberto.md`)

---

## Status Atual do Projeto

### ✅ **Fases Concluídas:**
- **Fase 1:** Fundação e Estrutura Base
- **Fase 2:** Módulos de Cadastros Essenciais  
- **Fase 3:** Módulo Central de Operações (incluindo Gestão de Checklist)

### 🔄 **Próximas Fases:**
- **Fase 4:** Módulos Financeiros
- **Fase 5:** Painéis, Dashboards e Relatórios
- **Fase 6:** Aplicativo do Motorista

### 📋 **Checklist de Manutenção:**
- [ ] Sidebar atualizada com todas as funcionalidades
- [ ] Página inicial organizada por categorias
- [ ] Ações rápidas para funcionalidades mais usadas
- [ ] Busca funcionando em todas as funcionalidades
- [ ] Lint sem erros críticos
- [ ] Build compilando corretamente
- [ ] Navegação testada e funcional