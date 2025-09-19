# **Contas a Receber**

Objetivo: Automatizar o processo de cobrança, desde a definição do tipo de pagamento do cliente até o envio de faturas, lembretes e controle de inadimplência, garantindo rastreabilidade, agilidade e redução de erros no recebimento.

Critérios de aceitação:

* Criar CRUD para cadastro de contas a receber  
* Gerar alerta para o operacional em casos de pagamento antecipado antes da execução do serviço.  
* Ajustar automaticamente o vencimento para clientes faturados conforme negociação.  
* Permitir fechamento de faturamento pelo financeiro após conferência operacional.  
* Possibilitar enviar de forma automatizada fatura para conferência do cliente, com prazo de 3 dias úteis para objeção.  
* Possibilitar enviar de forma automatizada fatura definitiva 5 dias antes do vencimento via e-mail e/ou WhatsApp.  
* Enviar lembrete automático no dia do vencimento se não houver pagamento identificado.  
* Gerar alerta para equipe financeira e marcar cliente automaticamente como inadimplente 5 dias após o vencimento.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da cobrança | Identificador único da cobrança, gerado automaticamente pelo sistema. |
| Cliente | Nome e identificação do cliente. |
| Tipo de pagamento | Antecipado ou faturado, definido no cadastro do cliente. |
| Data de execução do serviço | Data prevista ou realizada do serviço contratado. |
| Data de vencimento | Data limite para pagamento, ajustada conforme negociação. |
| Valor da cobrança | Valor total a ser recebido. |
| Status da cobrança | Pendente, em conferência, aguardando pagamento, pago, inadimplente. |
| Data de fechamento | Data em que o financeiro fechou o faturamento. |
| Data de envio para conferência | Data de envio da fatura para conferência do cliente. |
| Prazo de contestação | Data limite para o cliente apresentar objeção (3 dias úteis após envio). |
| Data de envio da fatura definitiva | Data de envio da fatura final (5 dias antes do vencimento). |
| Forma de pagamento | Pix, boleto, transferência, etc. |
| Data de pagamento | Data em que o pagamento foi identificado. |
| Data de lembrete | Data de envio de lembrete no vencimento. |
| Data de alerta de inadimplência | Data em que o cliente foi marcado como inadimplente. |
| Histórico de comunicações | Registro de todos os envios, alertas e respostas do cliente. |
| Observações | Campo livre para anotações adicionais. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de cliente com pagamento antecipado | Definir tipo de pagamento como antecipado no cadastro | Alerta gerado para operacional antes do serviço |
| 2 | Cadastro de cliente com pagamento faturado | Definir tipo de pagamento como faturado e negociar prazo | Vencimento ajustado automaticamente conforme negociação |
| 3 | Fechamento de faturamento | Finalizar custos e fechar faturamento pelo financeiro | Fatura gerada e enviada para conferência do cliente |
| 4 | Envio de fatura para conferência | Enviar fatura ao cliente após fechamento | Cliente recebe resumo detalhado e prazo de 3 dias para objeção |
| 5 | Envio automático de fatura definitiva | Passados 3 dias sem objeção, enviar fatura final 5 dias antes do vencimento | Cliente recebe fatura definitiva com link Pix/boleto e PDF |
| 6 | Lembrete no dia do vencimento | Não identificar pagamento até a data de vencimento | Lembrete automático enviado ao cliente |
| 7 | Alerta de inadimplência | Pagamento não identificado 5 dias após vencimento | Alerta gerado para financeiro e cliente marcado como inadimplente |
| 8 | Registro de histórico de comunicações | Enviar faturas, lembretes e alertas | Todas as comunicações registradas no histórico |
| 9 | Contestação de cobrança | Cliente responde com objeção dentro do prazo | Sistema registra contestação e aguarda ajuste do financeiro |
| 10 | Pagamento identificado | Cliente realiza pagamento antes do vencimento | Status atualizado para "Pago" e processo encerrado |

