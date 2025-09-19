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

## Fases de Desenvolvimento

### Fase 1: Fundação e Estrutura Base
*   **Foco:** Configurar o alicerce do sistema, incluindo segurança, acesso e as entidades de dados mais básicas.
*   **Funcionalidades:**
    1.  **Autenticação:** Login e Recuperação de Senha.
    2.  **Gestão de Acesso:** Criação de Usuários e Níveis de Acesso.
    3.  **Estrutura de UI:** Implementar o layout principal da aplicação (menu lateral, cabeçalho) e componentes de UI básicos (botões, inputs, tabelas).
    4.  **Onboarding:** Estrutura inicial do Tutorial/Onboarding.

### Fase 2: Módulos de Cadastros Essenciais
*   **Foco:** Implementar os CRUDs das entidades que são a base para todas as outras operações.
*   **Funcionalidades:**
    1.  Cadastro de Clientes (PF, PJ, Parceiro).
    2.  Cadastro de Motoristas.
    3.  Cadastro de Fornecedores.
    4.  Módulos de Frota:
        *   Categorias de Veículos.
        *   Marcas/Modelos de Veículos.
        *   Cadastro de Veículos.

### Fase 3: Módulo Central de Operações
*   **Foco:** Desenvolver a funcionalidade principal que conecta clientes, veículos e motoristas.
*   **Funcionalidades:**
    1.  **Cadastro de Contratos:** Implementar o fluxo completo de criação de contratos (Locação, Serviço, etc.), integrando com os cadastros da Fase 2.
    2.  **Gestão de Checklist:**
        *   Criação de Templates de Checklist.
        *   Vinculação e execução de checklists nos contratos.
    3.  **Alocação e Agendamento:**
        *   Agenda Geral.
        *   Escalação de Motorista para os serviços.

### Fase 4: Módulos Financeiros
*   **Foco:** Automatizar os processos financeiros que derivam dos contratos e operações.
*   **Funcionalidades:**
    1.  **Contas a Pagar:** Geração de pagamentos para motoristas, fornecedores, manutenções.
    2.  **Contas a Receber:** Geração de faturas e cobranças para clientes.
    3.  **Caixa de Investimento:** Gestão de movimentações de compra/venda de ativos.

### Fase 5: Painéis, Dashboards e Relatórios
*   **Foco:** Criar as telas de visualização de dados e inteligência de negócio.
*   **Funcionalidades:**
    1.  Painel de Gestão de Frotas (Linha do tempo).
    2.  Dashboard de Frotas.
    3.  Relatório de Ocupação.
    4.  Relatório de Visão Geral (Diretoria).
    5.  Relatório de Atividades dos Funcionários.

### Fase 6: Aplicativo do Motorista
*   **Foco:** Desenvolver a interface mobile para os motoristas. Pode ser iniciada em paralelo com as fases 3-4, uma vez que as APIs e estruturas de dados estejam definidas.
*   **Funcionalidades:**
    1.  Autenticação e Visualização de Cadastro.
    2.  Agenda de Serviços (com aceite).
    3.  Fluxo de Iniciar/Finalizar Atendimento.
    4.  Consulta de Valores a Receber.
