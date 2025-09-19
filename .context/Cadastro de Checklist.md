# **Cadastro de Checklist**

Objetivo: Permitir que usuários criem e personalizem templates de checklist com diferentes tipos de perguntas, validações e dependências, facilitando a padronização e automação dos processos de inspeção de veículos na saída e entrada de locações.

Critérios de aceitação:

* Criar CRUD para cadastro de checklist com campos dinâmicos e múltiplos tipos de perguntas (texto, múltipla escolha, checkbox, upload, cálculo automático, etc.).  
  * Deverá ser identificado no momento da criação do checklist se ele é de início ou finalização de contrato para que o sistema saiba em que momento exibi-lo.  
* Possibilitar configuração de validações (obrigatoriedade, formato, faixa de valores, dependências condicionais).  
* Permitir ordenação e agrupamento de perguntas por seções.  
* Suportar lógica condicional para exibição de perguntas com base em respostas anteriores.  
* Salvar, editar, duplicar e excluir templates de checklist.  
* Visualizar prévia do checklist durante a criação.  
* Garantir compatibilidade dos templates com o módulo de execução de checklists (saída/entrada de veículos).  
* Restringir acesso à criação/edição de templates conforme perfil de usuário.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do template | Identificador único do template, gerado automaticamente pelo sistema. |
| Nome do template | Nome para identificação do checklist (ex: Saída de Veículo, Entrada de Veículo). |
| Descrição | Breve descrição do objetivo do checklist. |
| Tipo de checklist | Saída, Entrada ou Ambos. |
| Lista de perguntas | Estrutura dinâmica contendo os campos criados pelo usuário. |
| Tipo de pergunta | Tipo do campo: texto, número, data/hora, dropdown, checkbox, upload, cálculo, etc. |
| Opções da pergunta | Lista de opções para perguntas do tipo múltipla escolha ou checkbox. |
| Obrigatoriedade | Indica se o campo é obrigatório para preenchimento. |
| Validação | Regras de validação (formato, faixa, tamanho, arquivo, etc.). |
| Dependência condicional | Lógica para exibir/ocultar campo com base em respostas anteriores. |
| Ordem/Seção | Posição e agrupamento da pergunta dentro do checklist. |
| Versão do template | Número da versão para controle de alterações. |
| Status do template | Ativo ou inativo. |
| Data de criação | Data/hora de criação do template. |
| Usuário responsável | Nome do usuário que criou ou editou o template. |

Cenários de uso: 

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Criar template com perguntas variadas | Adicionar perguntas de diferentes tipos e salvar template | Template criado e disponível para uso |
| 2 | Definir validação obrigatória | Marcar campo como obrigatório e tentar salvar sem preenchê-lo | Mensagem de erro "Campo obrigatório" |
| 3 | Adicionar lógica condicional | Configurar campo para aparecer apenas se resposta anterior for "Sim" | Campo exibido/ocultado conforme resposta |
| 4 | Visualizar prévia do checklist | Clicar em "Pré-visualizar" após adicionar perguntas | Exibição do checklist conforme configuração |
| 5 | Editar template existente | Alterar perguntas ou validações de um template já criado | Alterações salvas e versão incrementada |
| 6 | Duplicar template | Selecionar template e clicar em "Duplicar" | Novo template criado com base no original |
| 7 | Excluir template | Selecionar template e clicar em "Excluir" | Template removido do sistema |
| 8 | Restringir acesso por perfil | Usuário sem permissão tenta criar/editar template | Mensagem "Acesso não autorizado" |
| 9 | Versionar template | Salvar alterações em template já utilizado em checklists | Nova versão criada, histórico mantido |
| 10 | Integrar com execução de checklist | Selecionar template ao iniciar checklist de saída/entrada | Checklist gerado conforme template selecionado |

