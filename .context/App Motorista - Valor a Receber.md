# **App Motorista \- Valor a Receber**

Objetivo: Permitir que o motorista visualize o total de atendimentos realizados, os valores a receber por cada serviço. Após o pagamento, as informações são removidas da visualização do motorista e mantidas apenas no módulo financeiro administrativo.

Critérios de aceitação:

* Exibir lista de atendimentos realizados pelo motorista na semana, com valor individual de cada um.  
* Mostrar total de atendimentos  e total a receber.  
* Remover automaticamente da tela do motorista os atendimentos pagos após confirmação no contas a pagar.  
* Garantir que apenas atendimentos pendentes de pagamento fiquem visíveis para o motorista.  
* Manter histórico completo dos atendimentos pagos apenas no módulo administrativo financeiro.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do atendimento | Identificador único do atendimento, gerado automaticamente pelo sistema. |
| Data do atendimento | Data em que o atendimento foi realizado. |
| Tipo de serviço | Descrição do serviço prestado (ex: locação, transfer, viagem, etc.). |
| Valor do atendimento | Valor a receber referente ao atendimento. |
| Status do pagamento | Indica se o atendimento está pendente ou já foi pago. |
| Data prevista de pagamento | Data em que o pagamento foi confirmado (visível apenas no módulo financeiro). |
| Total de atendimentos | Quantidade total de atendimentos realizados (campo de resumo). |
| Total recebido | Soma dos valores já pagos ao motorista (campo de resumo). |
| Total a receber | Soma dos valores pendentes de pagamento (campo de resumo). |
| Filtro por data | Campo para seleção de período para exibição dos atendimentos. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar atendimentos realizados | Motorista acessa tela de atendimentos | Lista de atendimentos, valores e totais exibidos |
| 2 | Filtrar atendimentos por data | Selecionar período no filtro de datas | Exibição apenas dos atendimentos do período selecionado |
| 3 | Visualizar valor a receber | Consultar coluna de valor na lista de atendimentos | Valor individual de cada atendimento exibido |
| 4 | Visualizar total recebido e a receber | Acessar campos de resumo na tela | Totais atualizados conforme atendimentos exibidos |
| 5 | Excluir informações após pagamento | Pagamento confirmado no contas a pagar | Atendimento removido da tela do motorista, mantido no módulo financeiro |
| 6 | Visualizar apenas pendentes | Motorista acessa tela após pagamentos | Apenas atendimentos pendentes de pagamento visíveis |
| 7 | Buscar atendimento por tipo ou valor | Digitar tipo de serviço ou valor no campo de busca | Exibição dos atendimentos correspondentes |
| 8 | Tentar acessar atendimentos pagos | Motorista tenta visualizar atendimento já pago | Atendimento não aparece na tela do motorista |
| 9 | Consulta administrativa | Administrador acessa módulo financeiro | Histórico completo de atendimentos e pagamentos disponível |

