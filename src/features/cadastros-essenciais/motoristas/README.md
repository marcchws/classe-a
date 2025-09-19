# Módulo de Cadastro de Motoristas

Este módulo implementa o sistema completo de gestão de motoristas para a Classe A Locadora, incluindo CRUD, validações, upload de documentos, histórico de serviços e sistema de bloqueios.

## Características Implementadas

### ✅ Funcionalidades Principais

- **CRUD Completo**: Criar, listar, visualizar, editar e excluir motoristas
- **Validação Robusta**: Schemas Zod com validações completas para todos os campos
- **Upload de Documentos**: Sistema de upload com preview e validação de arquivos obrigatórios
- **Busca e Filtros**: Filtros avançados por nome, CPF, categoria CNH, grupo, região e status
- **Classificação Automática**: Categorização automática baseada na CNH e idiomas fluentes
- **Histórico de Serviços**: Acompanhamento de todos os serviços prestados e avaliações
- **Sistema de Notas**: Registro de elogios, reclamações e observações internas
- **Bloqueios por Cliente**: Gestão de restrições específicas por cliente

### ✅ Validações Implementadas

- **Dados Obrigatórios**: Nome, CPF, telefone, endereço, CNH e documentos
- **Formatos**: CPF, CEP, CNH com validação de formato
- **Documentos**: Obrigatoriedade de CNH, antecedentes criminais e certificados
- **Data de Validade**: CNH deve estar dentro da validade
- **Idiomas**: Pelo menos um idioma deve ser selecionado

### ✅ Campos do Sistema

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Nome Completo | String | ✅ | Nome completo do motorista |
| CPF | String | ✅ | Formato: 000.000.000-00 |
| Telefone | String | ✅ | Telefone de contato |
| Endereço | Object | ✅ | Endereço completo |
| CNH | Object | ✅ | Número, categoria (B/D) e validade |
| Documentos | Array | ✅ | CNH, antecedentes, certificados |
| Idiomas | Array | ✅ | Idiomas fluentes |
| Grupo Prioridade | Enum | ✅ | PREFERENCIAL ou APOIO |
| Região Atendimento | Object | ✅ | Cidade e bairros |
| Status | Enum | ✅ | ATIVO ou INATIVO |

## Estrutura de Arquivos

```
src/features/cadastros-essenciais/motoristas/
├── components/
│   └── DocumentUpload.tsx          # Componente de upload de documentos
├── services/
│   └── motorista.service.ts        # Serviço de dados dos motoristas
├── index.ts                        # Exportações do módulo
└── README.md                       # Documentação
```

## Páginas Implementadas

### `/cadastros/motoristas` - Listagem
- Lista todos os motoristas com paginação
- Filtros por status, categoria CNH, grupo e região
- Busca por nome ou CPF
- Ações: visualizar, editar, histórico, inativar

### `/cadastros/motoristas/novo` - Cadastro
- Formulário completo de cadastro
- Upload de documentos obrigatórios
- Validação em tempo real
- Classificação automática

### `/cadastros/motoristas/[id]` - Detalhes
- Visualização completa dos dados
- Edição inline
- Abas organizadas: dados, histórico, notas, bloqueios
- Gestão de notas internas e bloqueios

## Schemas de Validação

### Schema Principal
```typescript
const motoristaSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo eh obrigatorio"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
  // ... outros campos
}).refine(validacoes_customizadas)
```

### Enums Disponíveis
- `CategoriaCnh`: "B" | "D"
- `Idioma`: "PORTUGUES" | "INGLES" | "ESPANHOL" | "FRANCES" | "ITALIANO" | "ALEMAO"
- `GrupoPrioridade`: "PREFERENCIAL" | "APOIO"
- `StatusMotorista`: "ATIVO" | "INATIVO"
- `TipoDocumento`: "CNH" | "ANTECEDENTES" | "CERTIFICADO_DIRECAO_EXECUTIVA" | "CERTIFICADO_TRANSPORTE_PASSAGEIROS"

## Serviços

### MotoristaService
```typescript
// Listar com filtros
const { motoristas, total } = await MotoristaService.listarMotoristas(filtros);

// Buscar por ID
const motorista = await MotoristaService.obterMotoristaPorId(id);

// Criar novo
const novoMotorista = await MotoristaService.criarMotorista(dados);

// Atualizar
const atualizado = await MotoristaService.atualizarMotorista(id, dados);

// Gerenciar notas e bloqueios
await MotoristaService.adicionarNota(id, nota);
await MotoristaService.adicionarBloqueio(id, bloqueio);
```

## Classificação Automática

O sistema classifica automaticamente os motoristas em:

### Por CNH:
- **Categoria B**: "ATE_8_PASSAGEIROS"
- **Categoria D**: "ATE_8_PASSAGEIROS" + "VANS"

### Por Idiomas:
- **Apenas Português**: "MONOLINGUE"
- **Português + outros**: "BILINGUE"

## Componentes Utilizados

### shadcn/ui Components
- Form, Input, Button, Card, Table
- Select, Checkbox, RadioGroup, Textarea
- Badge, Tabs, Dialog, Label

### Validação
- react-hook-form + @hookform/resolvers
- Zod schemas

## Cenários de Teste Implementados

1. ✅ Cadastro completo com todos os campos obrigatórios
2. ✅ Validação de campos faltantes
3. ✅ Classificação automática baseada em CNH e idiomas
4. ✅ Filtros por região de atendimento
5. ✅ Sistema de notas internas
6. ✅ Bloqueios por cliente específico
7. ✅ Consulta de histórico de serviços
8. ✅ Edição de dados do motorista
9. ✅ Busca por nome ou CPF
10. ✅ Upload e preview de documentos

## Próximos Passos

- [ ] Integração com API real
- [ ] Implementação de permissões de usuário
- [ ] Relatórios específicos de motoristas
- [ ] Integração com módulo de contratos
- [ ] Notificações de vencimento de CNH
- [ ] Exportação de dados em Excel/PDF

## Dependências

- Next.js 15+ com App Router
- React Hook Form + Zod
- shadcn/ui components
- Lucide React (ícones)
- TypeScript

---

**Status**: ✅ Completo - Fase 2 do plano de implementação
**Versão**: 1.0.0
**Última atualização**: Setembro 2024