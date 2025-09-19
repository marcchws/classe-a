# **Painel de Gestão de Frotas**

Objetivo: Exibir uma visão completa e organizada da frota atualmente em locação ou serviço com condutor, facilitando o acompanhamento, identificação de conflitos e gestão operacional diária e semanal.

Critérios de aceite:

* Exibir apenas veículos em locação ou serviço ativo, organizados por data (mês, semana, dia) e linha do tempo por veículo.  
* Mostrar para cada veículo: categoria (com cor diferenciada), placa, nome do cliente, tipo de serviço, duração da reserva e acesso ao contrato.  
* Destacar cada categoria de veículo com cor específica para rápida identificação.  
* Disponibilizar filtros por data/período, cliente, categoria, placa e tipo de serviço.  
* Permitir ações rápidas: alterar veículo da reserva, adicionar observações, sinalizar devoluções/trocas e gerar notificações automáticas.  
* Identificar e sinalizar sobreposições e conflitos de programação.  
* Permitir busca rápida e visualização macro da movimentação da frota.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| Número do contrato | Identificador único da reserva, gerado automaticamente pelo sistema. |
| Data/período | Data ou período da reserva (mês, semana, dia). |
| Categoria do veículo | Categoria do veículo, exibida com cor específica (ex: Sedan Blindado – Verde, SUV Blindado – Amarelo). |
| Placa do veículo | Placa do veículo em atividade. |
| Nome do cliente | Nome do cliente vinculado à reserva. |
| Tipo de serviço | Locação ou Serviço com Condutor. |
| Duração da reserva | Período de locação ou serviço (data/hora início e fim). |
| Status da reserva | Ativa, pendente de devolução, troca pendente, etc. |
| Observações | Campo para anotações rápidas sobre a reserva. |
| Contrato vinculado | Link ou botão para abrir detalhes do contrato da reserva. |
| Cor da categoria | Cor visual associada à categoria do veículo para identificação rápida. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar reservas ativas | Acessar painel em modo mês, semana ou dia | Exibição de todos os veículos em atividade, organizados por período |
| 2 | Filtrar por cliente | Selecionar cliente específico no filtro | Exibição apenas das reservas vinculadas ao cliente selecionado |
| 3 | Filtrar por categoria | Selecionar categoria de veículo | Exibição apenas dos veículos daquela categoria, com cor correspondente |
| 4 | Filtrar por placa | Digitar placa no campo de busca | Exibição do veículo e sua programação atual |
| 5 | Filtrar por tipo de serviço | Selecionar Locação ou Serviço com Condutor | Exibição apenas das reservas do tipo selecionado |
| 6 | Alterar veículo da reserva | Selecionar reserva e trocar veículo vinculado | Reserva atualizada com novo veículo e notificação gerada |
| 7 | Adicionar observação | Inserir anotação em uma reserva | Observação salva e visível na reserva |
| 8 | Sinalizar devolução/troca pendente | Marcar reserva como pendente de devolução ou troca | Status atualizado e alerta gerado |
| 9 | Gerar notificação automática | Programar notificação para cliente sobre devolução/alteração | Cliente recebe notificação conforme agendamento |
| 10 | Identificar conflito de programação | Reservar veículo já alocado em outro contrato no mesmo período | Alerta de conflito exibido e bloqueio da ação |

