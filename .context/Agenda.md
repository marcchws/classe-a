# **Agenda**

Objetivo: Permitir que gestores, líderes e funcionários consigam realizar a gestão eficaz das agendas de trabalho (reuniões, compromissos, agendamento de motoristas, etc.)

Critérios de aceitação:

* Criar visualização de agenda interna onde será possível visualizar os eventos cadastrados por dia, semana ou mês:  
  * Ao clicar em um evento deverá ser exibido um pequeno detalhamento dele com a opção de abrir para visualizar anexos e outros campos  
  * O usuário poderá editar as informações da agenda, desde que tenha nível de acesso para isso  
  * Por padrão cada usuário poderá visualizar sua própria agenda, mas gestores e diretoria pode visualizar a agenda de todos  
    * Dentro de nível de acesso, na funcionalidade de agenda, deverá existir a opção para definir que determinado nível de acesso pode visualizar as agendas de todos;  
  * A agenda deverá notificar os usuários 30 minutos antes do evento e, após isso, 10 minutos antes.  
    * No caso do motorista a agenda deverá avisar um dia antes se ele tem alguma entrega de veículo a fazer;  
  * A agenda deverá possibilitar filtrar entre os tipos de eventos ou todos:  
    * Ex.: visualizar apenas a agenda de reserva de veículos ou reserva de veículos \+ reserva de motorista  
* Criar CRUD de cadastro de evento na agenda:  
  * Ao criar um evento na agenda e associar a um funcionário, o sistema deverá avisar a nível visual se esse funcionário já está alocado em outro evento nesta mesma data e horário, como hoje é feita na agenda do google;  
  * Ao clicar em novo evento, o usuário deverá definir se o evento é uma reserva de motorista, reunião setorial (e quais setores), reunião geral, reunião com cliente (e definir qual cliente), manutenção de veículo (e definir quais veículos)  
    * Esses tipos de campos por atividade da agenda estão definidos neste [link](https://docs.google.com/spreadsheets/d/1_jSwcB8duDvUB8IAbchX5B-tI1CNLdJHVpZ7cDdeC5A/edit?usp=drive_web&ouid=101601100896264554756).

Campos: 

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do evento | Identificador único do evento, gerado automaticamente pelo sistema. |
| Título | Nome ou título do evento, campo obrigatório. |
| Descrição | Detalhamento do evento, campo opcional. |
| Setor | Setor responsável pelo evento (ex: Comercial, Operações, Motoristas). |
| Responsável | Funcionário responsável pelo evento, selecionado da base de usuários. |
| Data e hora de início | Data e hora de início do evento, campo obrigatório. |
| Data e hora de término | Data e hora de término do evento, campo obrigatório. |
| Tipo de evento | Categoria do evento (reunião, compromisso, reserva de motorista, etc.). |
| Anexos | Upload de arquivos relacionados ao evento (contratos, documentos, etc.). |
| Endereço de retirada | Local onde o motorista deve buscar o veículo (campo obrigatório para eventos de motorista). |
| Endereço do cliente | Local onde o motorista deve buscar o cliente (campo obrigatório para eventos de motorista). |
| Notificação ao motorista | Indica se o motorista será notificado automaticamente (sim/não). |
| Contrato associado | Upload ou referência ao contrato (campo obrigatório para eventos do setor comercial). |
| Status do evento | Situação do evento: agendado, concluído, cancelado, etc. |
| Permissão de edição | Indica se o usuário atual pode editar o evento (baseado no nível de acesso). |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar agenda por semana | Selecionar visualização semanal | Exibir todos os eventos da semana, organizados por dia |
| 2 | Detalhar evento | Clicar em um evento na agenda | Exibir pop-up com resumo e opção de abrir detalhamento completo |
| 3 | Editar evento com permissão | Usuário com acesso tenta editar evento | Permitir edição e salvar alterações |
| 4 | Editar evento sem permissão | Usuário sem acesso tenta editar evento | Exibir mensagem "Permissão insuficiente" |
| 5 | Cadastrar evento comercial | Preencher campos obrigatórios e anexar contrato | Evento criado com sucesso, contrato anexado |
| 6 | Cadastrar reserva de motorista | Preencher dados, selecionar motorista, inserir endereços | Evento criado, motorista recebe notificação com detalhes |
| 7 | Anexar documento a evento | Fazer upload de arquivo em evento existente | Documento anexado e disponível para visualização |
| 8 | Filtrar eventos por setor | Selecionar setor "Operações" na agenda | Exibir apenas eventos do setor selecionado |

