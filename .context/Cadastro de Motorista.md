# **Cadastro de Motorista**

Objetivo: Permitir que usuários criem e personalizem templates de checklist com diferentes tipos de perguntas, validações e dependências, facilitando a padronização e automação dos processos de inspeção de veículos na saída e entrada de locações.  
Critérios de aceitação:

* Criar CRUD de cadastro de motorista.  
* Exigir preenchimento de dados pessoais e documentação obrigatória (CNH, antecedentes, certificados).  
* Classificar motoristas por categoria de CNH, idiomas e grupo de prioridade.  
* Registrar região de atendimento para facilitar escalação.  
* Permitir upload de documentos comprobatórios.  
* Registrar e consultar histórico de serviços, desempenho, elogios, reclamações e bloqueios por cliente.  
* Permitir busca e filtro por nome, categoria, grupo, região e status.  
* Possibilitar bloqueio de motorista para clientes específicos.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do motorista | Identificador único gerado automaticamente pelo sistema. |
| Nome completo | Nome completo do motorista. Campo obrigatório. |
| CPF | Cadastro de Pessoa Física. Campo obrigatório. |
| Telefone | Telefone de contato. Campo obrigatório. |
| Endereço | Endereço completo do motorista. Campo obrigatório. |
| CNH (Categoria) | Número e categoria da CNH (B ou D). Campo obrigatório. |
| Data de validade da CNH | Data de expiração da CNH. Campo obrigatório. |
| Antecedentes criminais | Upload do documento de antecedentes criminais. Campo obrigatório. |
| Certificados | Upload de certificados de Direção Executiva e Transporte de Passageiros. Campo obrigatório. |
| Idiomas fluentes | Seleção dos idiomas em que o motorista é fluente. Campo obrigatório. |
| Categoria de serviço | Classificação automática: CNH B (até 8 passageiros), CNH D (inclui vans), Monolíngue, Bilíngue. |
| Grupo de prioridade | Preferencial (frequente) ou Apoio (reserva). Campo obrigatório. |
| Região de atendimento | Cidade/bairro de residência para facilitar escalação. Campo obrigatório. |
| Notas internas | Campo para registro de desempenho, elogios, reclamações. |
| Bloqueio por cliente | Lista de clientes para os quais o motorista está bloqueado. |
| Histórico de serviços | Registro automático dos serviços prestados e valores recebidos. |
| Status do motorista | Ativo ou inativo. |
| Data de cadastro | Data em que o motorista foi cadastrado. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de motorista completo | Preencher todos os campos obrigatórios e anexar documentos | Motorista cadastrado com sucesso |
| 2 | Cadastro sem documentação | Omitir CNH, antecedentes ou certificados | Mensagem de erro indicando campo obrigatório faltante |
| 3 | Classificação automática | Informar CNH D e idiomas português/inglês | Motorista classificado como Bilíngue e apto para vans |
| 4 | Filtro por região de atendimento | Selecionar bairro/cidade | Exibição de motoristas disponíveis na região selecionada |
| 5 | Registro de nota interna | Adicionar elogio ou reclamação ao histórico | Nota registrada e visível no perfil do motorista |
| 6 | Bloqueio para cliente específico | Selecionar cliente e bloquear motorista | Motorista não aparece para escalação desse cliente |
| 7 | Consulta de histórico de serviços | Acessar perfil do motorista | Exibição de todos os serviços prestados e valores recebidos |
| 8 | Edição de dados do motorista | Alterar telefone, endereço ou documentos | Dados atualizados e mensagem de sucesso |
| 9 | Exclusão de motorista | Selecionar motorista e confirmar exclusão | Motorista removido do sistema |
| 10 | Busca por nome ou CPF | Digitar nome ou CPF no campo de busca | Exibição do motorista correspondente |

