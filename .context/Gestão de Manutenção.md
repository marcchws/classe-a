# **Gestão de manutenção**

Objetivo: Garantir que todos os veículos da frota estejam sempre em perfeito estado de uso, por meio do controle automatizado de manutenções preventivas e corretivas, atribuição de fornecedores e registro histórico detalhado de cada veículo.

Critérios de aceitação:

* Criar CRUD para inclusão de veículo em manutenção preventiva e/ou por falhas  
* Implementar controle por quilometragem, com alertas automáticos para manutenção preventiva ao atingir marcos definidos.  
  * Os marcos virão diretamente do cadastro do veículo, onde será dito quais alertas automáticos deverão ser levados em consideração: ex.: quantidade de km rodado para manutenção preventiva.  
    * Iremos automatizar o preenchimento de km do veículo SEMPRE no fechamento do Contrato OU a partir de inclusões manuais no sistema.  
* Manter histórico completo de todas as manutenções realizadas em cada veículo, incluindo custos e desempenho.  
* Permitir consulta do histórico de manutenção do veículo através da filtragem por período de data.  
* Integrar alertas e status de manutenção ao dashboard da frota.  
  * Veículos em manutenção serão visualizados no dashboard de frotas;  
* Veículos já em manutenção ou com agendamentos de manutenção não são alocados para locação, porém, visualmente serão disponibilizados na listagem caso a categoria seja leve/média para análise interna de possibilidade de uso.  
  * Deverá gerar alerta visual para que o responsável decida se o veículo realmente será locado mesmo estando na categoria leve/média.  
* No caso de uma ordem de manutenção ser reprovada pelo financeiro, o gestor de manutenção deverá reavaliar os serviços/preços e modificar novamente o status para “pendente de aprovação”;

Campos: 

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da manutenção | Identificador único da manutenção, gerado automaticamente pelo sistema. |
| Veículo | Identificação do veículo (placa, modelo, categoria). |
| Tipo de manutenção | Preventiva ou corretiva. |
| Serviço realizado | Lista de opções de serviços (ex: troca de óleo, revisão, reparo de freio). Possibilidade de incluir um ou mais itens |
| Gravidade da manutenção | Classificação em leve, média ou alta do nível de gravidade para impacto na disponibilização do veículo. Leve: O veículo pode ser alugado se necessário, mas precisa de ajustes menores. Média: O veículo depende de autorização antes de ser alugado. Alta: O veículo não pode ser liberado para locação até a conclusão do serviço. Essas classificações ditarão se um veículo está disponível ou não para locação, onde veículos com gravidade leve ou média aparecerão na listagem de veículos disponíveis, mas com o status de gravidade para seleção humana de liberação.  |
| Data da manutenção | Data em que a manutenção foi ou será realizada. |
| Quilometragem | Quilometragem do veículo no momento da manutenção. |
| Fornecedor/Mecânico | Nome e contato do mecânico responsável, selecionado de cadastro prévio de fornecedores. |
| Ordem de serviço | Número ou código da ordem de serviço gerada internamente. |
| Custo da manutenção | Valor total gasto na manutenção. |
| Status da manutenção | Em andamento, concluída, Pendente de aprovação Financeiro, Reprovado Financeiro. |
| Anexos | Upload de documentos, notas fiscais, fotos do serviço (opcional). |
| Observações | Campo livre para informações adicionais sobre a manutenção. |
| Histórico de manutenções | Listagem de todas as manutenções anteriores do veículo, com detalhes e custos. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Alerta de manutenção preventiva | Veículo atinge marco de quilometragem definido | Sistema gera alerta automático para manutenção preventiva |
| 2 | Registro de manutenção corretiva | Cadastro de novo reparo para veículo | Manutenção registrada e visível para todos os setores |
| 3 | Escalação de fornecedor/mecânico | Seleção de fornecedor/mecânico ao registrar manutenção | Ordem de serviço gerada e atribuída ao fornecedor/mecânico |
| 4 | Consulta de histórico do veículo | Selecionar veículo e acessar histórico de manutenções | Exibição de todas as manutenções realizadas, com detalhes e custos |
| 5 | Exportação de histórico | Solicitar exportação do histórico de manutenções de um veículo | Download do histórico em formato PDF ou Excel |
| 6 | Atualização de status da manutenção | Alterar status de uma manutenção para "concluída" | Status atualizado e registro no histórico |
| 7 | Anexar documentos à manutenção | Upload de nota fiscal ou foto ao registrar manutenção | Documento anexado ao registro da manutenção |
| 8 | Visualização de alertas no dashboard | Veículo com manutenção pendente | Alerta exibido no dashboard da frota |
| 9 | Validação de campos obrigatórios | Tentar registrar manutenção sem preencher campos essenciais | Mensagem de erro indicando campos obrigatórios faltantes |
| 10 | Consulta por tipo de manutenção | Filtrar histórico por tipo (preventiva/corretiva) | Exibição apenas das manutenções do tipo selecionado |

