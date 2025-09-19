# **App Motorista \- Iniciar Atendimento**

Objetivo: Permitir que o motorista registre o início e a finalização do atendimento de locação, alerte acidentes durante o serviço, garantindo segurança, rastreabilidade e conformidade operacional.

Critérios de aceitação:

* Permitir que o motorista inicie o atendimento pelo app que começará a contar à partir da data/hora definida no contrato, registrando o status "Em Atendimento".  
  * Caso o motorista inicie num horário diferente da data/hora do contrato, será exibido um alerta visual avisando sobre e vai ser salvo no contrato.  
  * Ao final de cada dia o motorista deverá preencher o horário estimado do início do próximo dia (caso exista), que também contabilizará um alerta visual se ele iniciar em um horário diferente do acordado.  
    * Caso exista mudança de motorista, o sistema enviará o próximo horário definido para o aplicativo do novo motorista.  
* Disponibilizar botão para alerta imediato de acidente durante o atendimento, com registro de detalhes e fotos.  
* Permitir finalização do atendimento ao término de cada dia, com informativo de data/hora do próximo encontro com o cliente.  
* Integrar com módulos de contratos dos registros.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do atendimento | Identificador único do atendimento, gerado automaticamente pelo sistema. |
| Motorista | Nome e identificação do motorista responsável pelo atendimento. |
| Cliente | Nome e identificação do cliente da locação. |
| Veículo | Identificação do veículo utilizado no atendimento. |
| Data/hora de início | Data e hora em que o atendimento foi iniciado. |
| Status do contrato | Indica se o contrato está assinado ou pendente; permite solicitar assinatura digital. |
| Alerta de acidente | Registro de ocorrência de acidente, com detalhes, fotos e data/hora. |
| Data/hora de finalização | Data e hora em que o atendimento foi finalizado. |
| Status do atendimento | Em andamento, finalizado, cancelado, com incidente. |
| Observações | Campo livre para anotações adicionais do motorista. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Iniciar atendimento | Motorista acessa o app e clica em "Iniciar Atendimento" | Status atualizado para "A Caminho" ou "Em Atendimento" |
| 3 | Solicitar assinatura do contrato | Contrato do cliente está pendente | App solicita assinatura digital |
| 4 | Alertar acidente | Motorista clica em "Alerta de Acidente" e preenche detalhes/fotos | Alerta registrado e notificação enviada à equipe operacional |
| 5 | Finalizar atendimento | Motorista preenche data/hora do próximo atendimento com o cliente (caso exista) e clica em "Finalizar Atendimento" | Atendimento encerrado, status atualizado e registros salvos |
| 6 | Visualizar histórico de atendimentos | Motorista acessa histórico no app | Exibição de todos os atendimentos realizados e seus status |
| 7 | Registrar observação | Motorista adiciona observação durante o atendimento | Observação salva junto ao atendimento |
| 8 | Atendimento com incidente | Atendimento finalizado após alerta de acidente | Status do atendimento marcado como "Com Incidente" |
| 9 | Integração com contratos | Atendimento iniciado/finalizado | Dados sincronizados com módulos de contratos |

