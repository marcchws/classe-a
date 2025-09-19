# **Escalação de Motorista**

Objetivo: Permitir que funcionários visualizem, filtrem e gerenciem o histórico completo de alocação de motoristas para cada tipo de serviço, facilitando o acompanhamento, análise, ajustes das escalações realizadas e relatórios de pagamento.  
Critérios de aceitação:

* Exibir painel com todas as escalações realizadas, incluindo tipo de serviço, motorista, veículo, valor a ser pago e status.  
* Permitir filtro por período, tipo de serviço, motorista, cliente e status da escalação.  
* Visualizar detalhes de cada alocação, incluindo confirmação do motorista, notificações enviadas e histórico de alterações.  
* Registrar e exibir logs de alterações e acessos, com data, hora e usuário responsável.  
* Permitir edição manual de alocação, com registro de justificativa e histórico.  
* Exibir status de confirmação do motorista e alertar para pendências.  
* Permitir exportação do histórico em PDF ou Excel.  
* Integrar com módulos de contratos, financeiro e painel operacional para atualização automática das informações.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da escalação | Identificador único da alocação, gerado automaticamente pelo sistema. |
| Data/hora da escalação | Data e hora em que a alocação foi registrada. |
| Tipo de serviço | Transfer, Disposição, Viagem, etc. |
| Motorista | Nome do motorista alocado. |
| Veículo | Veículo associado à escalação. |
| Cliente | Nome do cliente vinculado ao serviço. |
| Status da escalação | Confirmada, pendente, cancelada, concluída. |
| Confirmação do motorista | Status e data/hora da confirmação pelo motorista. |
| Notificações enviadas | Registro de notificações e alertas enviados ao motorista. |
| Histórico de alterações | Log de edições, com data/hora, usuário e justificativa. |
| Valor do serviço | Valor a ser recebido pelo motorista para o serviço. |
| Observações | Campo livre para anotações sobre a escalação. |
| Usuário responsável | Funcionário que realizou ou editou a alocação. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar histórico de escalações | Acessar painel e selecionar período desejado | Exibição de todas as escalações do período |
| 2 | Filtrar por tipo de serviço | Selecionar "Transfer" no filtro | Exibição apenas das escalações do tipo selecionado |
| 3 | Consultar escalação por motorista | Buscar nome do motorista | Exibição de todas as alocações do motorista |
| 4 | Visualizar detalhes da escalação | Clicar em uma escalação específica | Exibição de todos os dados e histórico de alterações |
| 5 | Editar alocação manualmente | Alterar motorista ou veículo e registrar justificativa | Alteração salva e log atualizado |
| 6 | Verificar confirmação do motorista | Consultar status de confirmação | Alerta para pendências ou confirmação registrada |
| 7 | Exportar histórico | Clicar em exportar e selecionar formato | Download do histórico em PDF ou Excel |
| 8 | Visualizar logs de acesso | Acessar aba de logs | Exibição de todas as ações realizadas no histórico |
| 9 | Filtrar por cliente | Selecionar cliente no filtro | Exibição das escalações vinculadas ao cliente |
| 10 | Integrar com painel operacional | Atualizar escalação em outro módulo | Histórico refletido automaticamente |

