# **Caixa Investimento**

Objetivo: Gerenciar um fundo exclusivo para investimentos estratégicos, como expansão e renovação de frota, blindagens, customizações e vendas de veículos, separando claramente estes movimentos dos custos operacionais para garantir transparência e análise precisa da rentabilidade.

Cenários de uso:

* Registrar todas as entradas e saídas relacionadas a investimentos (compra, venda, blindagem, customização de veículos).  
* Integrar automaticamente com Contas a Pagar e Contas a Receber para atualizar o saldo do caixa de investimentos.  
* Permitir consulta detalhada do histórico de movimentações, com filtros por tipo de investimento, veículo e período.  
* Segregar visualmente e nos relatórios os movimentos do caixa de investimentos dos custos operacionais.  
* Exibir saldo atualizado e detalhamento por finalidade (expansão, renovação, blindagem, etc.).  
* Lançar apenas parcelas de veículos já operacionais no Contas a Pagar normal.  
* Registrar automaticamente a entrada de valores provenientes da venda de veículos.  
* Utilizar dados gerados da API do banco integrado para conciliar se os valores do sistema estão batendo com os valores reais do banco.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da movimentação | Identificador único da movimentação, gerado automaticamente pelo sistema. |
| Tipo de movimentação | Compra, venda, blindagem, customização, entrada de venda, etc. |
| Data da movimentação | Data em que a movimentação foi registrada. |
| Valor | Valor da entrada ou saída referente ao investimento. |
| Veículo relacionado | Identificação do veículo envolvido (placa, modelo, categoria), se aplicável. |
| Finalidade do investimento | Expansão, renovação, blindagem, customização, etc. |
| Origem/destino do recurso | Fornecedor, comprador, instituição financeira, etc. |
| Documento anexo | Upload de nota fiscal, contrato ou comprovante relacionado à movimentação. |
| Status da movimentação | Pendente, concluída, cancelada. |
| Observações | Campo livre para anotações adicionais. |
| Usuário responsável | Funcionário que registrou ou aprovou a movimentação. |
| Data de integração | Data/hora em que a movimentação foi integrada com contas a pagar/receber. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Registrar compra de veículo para frota | Inserir dados de compra, valor, finalidade e anexar nota fiscal | Movimentação registrada no caixa de investimentos |
| 2 | Registrar venda de veículo | Informar dados do veículo vendido e valor recebido | Entrada registrada automaticamente no caixa de investimentos |
| 3 | Integrar contas a pagar de blindagem | Lançar pagamento de blindagem no contas a pagar | Saída registrada no caixa de investimentos |
| 4 | Consultar histórico de movimentações | Filtrar por período, tipo ou veículo | Exibição detalhada das movimentações do caixa de investimentos |
| 5 | Anexar documento à movimentação | Fazer upload de nota fiscal ou contrato | Documento vinculado à movimentação |
| 6 | Visualizar saldo por finalidade | Selecionar finalidade (ex: renovação de frota) | Exibição do saldo e movimentações relacionadas |
| 7 | Exportar relatório financeiro | Selecionar período e tipo de movimentação | Relatório exportado em PDF ou Excel |
| 8 | Lançar parcela de veículo operacional | Veículo entra em operação | Parcela lançada no contas a pagar normal, não no caixa de investimentos |
| 9 | Cancelar movimentação | Selecionar movimentação e cancelar | Status atualizado para "Cancelada" |
| 10 | Registrar customização de veículo | Inserir valor e detalhes da customização | Saída registrada no caixa de investimentos |

