# **Contas a Pagar**

Objetivo: Centralizar, automatizar e controlar todos os pagamentos recorrentes e variáveis da empresa, integrando módulos de cadastro, frota, contratos e financeiro, com rastreabilidade e automatizações para evitar o máximo de trabalho manual.

Critérios de aceitação:

* Lançar automaticamente pagamentos recorrentes de funcionários, Manutenções solicitadas, fornecedores e veículos no Contas a Pagar.  
  * Nos pagamentos referentes à veículos, precisamos ter uma visão detalhada por veículo mas também uma agregação por financiamento, para entendermos quanto já foi gasto com financiamento e quanto ainda falta ser pago.  
* Integrar com módulo de frota para pagamentos de manutenção e fornecedores terceirizados.  
* Permitir vinculação de pagamentos a contratos específicos para rastreabilidade.  
* Gerar relatório semanal consolidado de pagamentos de motoristas, com opção de visualizar mais informações decorrentes de cada contrato feito na semana.  
* Após o pagamento ser efetivado, o sistema deverá remover o histórico de produção do app do motorista após confirmação de pagamento.  
  * Isso não excluirá o histórico dentro do financeiro, apenas no aplicativo do motorista.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do pagamento | Identificador único do pagamento, gerado automaticamente pelo sistema. |
| Tipo de pagamento | Funcionário, fornecedor, veículo, manutenção, motorista, investimento, etc. |
| Beneficiário | Nome do funcionário, fornecedor ou motorista a ser pago. |
| Valor | Valor do pagamento a ser efetuado. |
| Data de vencimento | Data limite para pagamento. |
| Status do pagamento | Pendente, agendado, pago, cancelado. |
| Forma de pagamento | Pix, transferência bancária, boleto, etc. |
| Contrato vinculado | Identificação do contrato relacionado ao pagamento (se aplicável). |
| Origem do pagamento | Caixa operacional ou caixa de investimentos. |
| Data de agendamento | Data em que o pagamento foi agendado (para pagamentos automáticos). |
| Autenticação | Registro de dupla verificação/autorização do pagamento. |
| Histórico de produção | Lista de atividades do motorista vinculadas ao pagamento semanal. |
| Observações | Campo livre para anotações sobre o pagamento. |
| Data de confirmação | Data/hora em que o pagamento foi confirmado. |
| Usuário responsável | Funcionário que realizou ou autorizou o pagamento. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Lançamento automático de pagamento | Cadastro de novo fornecedor com pagamento recorrente | Pagamento lançado no Contas a Pagar |
| 2 | Integração com módulo de frota | Registrar manutenção em veículo | Pagamento de manutenção lançado automaticamente |
| 3 | Pagamento vinculado a contrato | Associar fornecedor a contrato de terceirização | Contas a pagar gerado e vinculado ao contrato |
| 4 | Relatório semanal de motoristas | Consolidar atividades dos motoristas na semana | Relatório gerado e lista de pagamentos exibida |
| 5 | Conferência e confirmação de pagamento | Conferir lista de motoristas a serem pagos e confirmar | Histórico removido do app do motorista após confirmação |
| 6 | Autenticação de pagamento | Tentar efetuar pagamento sem dupla verificação | Mensagem "Autenticação obrigatória para concluir pagamento" |

