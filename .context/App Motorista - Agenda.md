# **App Motorista \- Agenda**

Objetivo: Permitir que motoristas visualizem sua programação diária e semanal, recebam notificações de novos agendamentos, registrem ciência e confirmem (aceite) os serviços 48h antes da locação, garantindo previsibilidade e controle operacional.

Critérios de aceitação:

* Exibir agenda diária e semanal com todos os serviços programados para o motorista.  
* Permitir que o motorista registre o aceite do serviço 48h antes da data de locação; apenas após o aceite o serviço é considerado confirmado pelo motorista.  
  * Caso o contrato tenha sido criado com \<48h o motorista só precisará dar um aceite.  
* Registrar e exibir o status de ciência e aceite para cada agendamento.  
* Notificar a equipe operacional caso o aceite não seja realizado no prazo de 48h antes do serviço (painel de pendências).  
* Permitir consulta ao histórico de agendamentos e status de confirmação durante o período aberto (antes do pagamento).  
* Garantir que apenas serviços com aceite sejam considerados confirmados para o motorista.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do agendamento | Identificador único do agendamento, gerado automaticamente pelo sistema. |
| Data/hora do serviço | Data e hora programada para o serviço. |
| Tipo de serviço | Descrição do serviço (ex: locação, transfer, disposição, etc.). |
| Status do agendamento | Pendente, ciência registrada, aguardando aceite, confirmado, cancelado. |
| Data/hora de ciência | Data e hora em que o motorista registrou ciência do agendamento. |
| Data/hora de aceite | Data e hora em que o motorista confirmou o aceite do serviço. |
| Motorista | Nome e identificação do motorista. |
| Cliente | Nome do cliente vinculado ao serviço. |
| Veículo | Veículo designado para o serviço. |
| PDFs do contrato | Campo com possibilidade de download dos contratos para caso o motorista precise imprimir o documento. |
| Notificações enviadas | Registro de notificações de ciência e aceite enviadas ao motorista. |
| Observações | Campo livre para anotações adicionais sobre o agendamento. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar agenda diária e semanal | Motorista acessa o app e seleciona agenda | Exibição de todos os serviços programados do dia e da semana |
| 2 | Notificação de novo agendamento | Novo serviço é agendado para o motorista | Motorista recebe notificação e opção de registrar ciência |
| 3 | Registrar ciência de agendamento | Motorista clica em "Dar ciência" após receber notificação | Status atualizado para "ciência registrada" |
| 4 | Aceite 48h antes da locação | Motorista acessa agendamento 48h antes do serviço e clica em "Aceitar" | Status atualizado para "confirmado" |
| 5 | Não registrar aceite no prazo | Motorista não confirma aceite até 48h antes | Notificação enviada à equipe operacional para reescalonamento |
| 6 | Consultar status de agendamento | Motorista ou gestor acessa detalhes do agendamento | Exibição dos status de ciência e aceite |
| 7 | Histórico de agendamentos | Motorista acessa histórico no app | Exibição de todos os agendamentos e seus status |
| 8 | Cancelamento de agendamento | Serviço é cancelado pelo operacional | Status atualizado para "cancelado" e notificação enviada ao motorista |
| 9 | Notificação de aceite pendente | Faltando 48h para o serviço sem aceite registrado | App envia lembrete automático ao motorista |
| 10 | Visualizar detalhes do serviço | Motorista clica em um agendamento na agenda | Exibição de todos os detalhes do serviço, cliente e veículo |

