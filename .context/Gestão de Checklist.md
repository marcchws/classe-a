# **Gestão de Checklist** 

Objetivo: Permitir que funcionários registrem, revisem e gerenciem checklists detalhados de saída e entrada de veículos, automatizando o cálculo de combustível, controle de itens e serviços extras, garantindo a integridade do veículo e a transparência no processo de locação.

Critérios de aceitação:

* Criar CRUD para cadastro de checklists  
  * Diferenciar via cadastro se o checklist é de saída (antes da locação) ou de entrada (após devolução).  
* Permitir upload de fotos e documentos para comprovação do estado do veículo.  
* Gerar alertas para itens faltantes, avarias ou divergências entre saída e entrada.  
  * Itens faltantes ou avarias geram um alerta para a equipe operacional, que irá aprovar ou não o envio da notificação às contas a pagar por parte do cliente.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do checklist | Identificador único do checklist, gerado automaticamente pelo sistema. |
| Tipo de checklist | Saída ou Entrada. |
| Data e hora | Data e hora do registro do checklist. |
| Funcionário responsável | Nome do funcionário que realizou o checklist. |
| ID do veículo | Identificação do veículo (placa, modelo, categoria). |
| Estado do veículo | Descrição e/ou seleção do estado geral do veículo (lataria, pneus, vidros, etc.). |
| Nível de combustível | Marcação do nível de combustível na saída e na entrada. |
| Capacidade do tanque | Capacidade total do tanque de combustível do veículo. |
| Quilometragem | Quilometragem do veículo no momento do checklist. |
| Itens/acessórios entregues | Lista de itens e acessórios entregues ao cliente (ex: estepe, triângulo, cadeirinha, etc.). |
| Serviços extras contratados | Serviços adicionais (lavagem, cadeirinha, etc.) e status de pagamento. |
| Fotos/documentos anexos | Upload de imagens e documentos para comprovação do estado do veículo. |
| Observações | Campo livre para observações adicionais. |
| Divergências/avarias | Registro de itens faltantes, avarias ou divergências identificadas na entrada. |
| Valor de combustível devido | Valor calculado automaticamente caso haja diferença no nível de combustível. |
| Status do checklist | Concluído, pendente, com divergências. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de checklist de saída | Preencher estado do veículo, nível de combustível, itens e serviços extras | Checklist de saída salvo e vinculado ao contrato |
| 2 | Cadastro de checklist de entrada | Registrar estado do veículo, nível de combustível, itens devolvidos | Checklist de entrada salvo, divergências identificadas |
| 3 | Automatização de cálculo de combustível | Informar capacidade do tanque e nível de combustível na entrada/saída | Valor devido calculado automaticamente |
| 4 | Registro de serviços extras pagos | Selecionar serviços extras e marcar como pagos | Serviços registrados e vinculados ao contrato |
| 5 | Upload de fotos e documentos | Anexar imagens do veículo e documentos | Arquivos salvos junto ao checklist |
| 6 | Alerta de item faltante/avaria | Marcar item como faltante ou registrar avaria | Alerta gerado e pendência financeira criada, se aplicável |
| 7 | Consulta de histórico de checklists | Buscar por veículo ou contrato | Exibição de todos os checklists relacionados |
| 8 | Comparação entre saída e entrada | Visualizar ambos checklists para o mesmo contrato | Destaque de divergências e itens não devolvidos |
| 9 | Integração com financeiro | Registrar cobrança adicional por combustível ou item faltante | Pendência financeira criada automaticamente |
| 10 | Checklist incompleto | Tentar salvar checklist sem campos obrigatórios preenchidos | Mensagem de erro indicando campos obrigatórios faltantes |

