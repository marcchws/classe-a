# **Cadastro de Veículo**

Objetivo: Possibilitar a gestão de veículos, realizando o cadastro, edição e exclusão de veículos da frota vigente, bem como o gerenciamento de alertas de marcos de manutenções preventivas por quilometragem ou tempo.

Critérios de aceitação:

* Criar CRUD para tela de cadastro de veículos  
* Visualizar na listagem dos veículos a informação de disponibilidade do veículo em tempo real  
  * Indicativo visual caso um veículo esteja em manutenção ou alugado  
* Deverá ser possível incluir as informações dos veículos via importação de .csv  
  * Para melhor comodidade do usuário, deverá ser incluído um botão onde o usuário poderá baixar o modelo do arquivo que o sistema espera como input

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do veículo | Identificador único gerado automaticamente pelo sistema. |
| Categoria do veículo\* | Ex: Sedan, SUV, Pickup, Van. Campo obrigatório. |
| Marca e Modelo do veículo\* | Nome e especificação exata do veículo. Campo obrigatório. |
| Versão do veículo\* | Identificação do modelo específico. Campo obrigatório. |
| Tipo de combustível\* | Gasolina, Etanol, Diesel, Híbrido, Elétrico. Campo obrigatório. |
| Cor do veículo\* | Cor para identificação rápida. Campo obrigatório. |
| Capacidade de passageiros\* | Número máximo de passageiros (PAX). Campo obrigatório. |
| Detalhes de manutenção por item | Listagem vinda da seleção de modelo com todos os itens programados para serem revisados, com sua periodicidade |
| Blindagem | Indica se o veículo é blindado (Sim/Não). Opcional. |
| Valor da Blindagem | Campo para inserção de valor da blindagem e se foi pago parcelado e em quantas vezes. Este valor será  pago diretamente do valor existente no caixa de investimento |
| Transformações especiais | Descrição de adaptações realizadas no veículo. Opcional. |
| Outros acessórios | Lista de acessórios adicionais personalizáveis. Opcional. |
| Entrada\* | Valor de entrada pago na compra do veículo, sai diretamente do valor existente no caixa de investimento. Campo obrigatório. |
| Valor total de compra\* | Valor total do veículo. Campo obrigatório. |
| Financiamento | Dados do financiamento: nº de parcelas, taxa de juros, valor total com juros. Campos opcionais. |
| Parcelas pagas | Quantidade de parcelas já pagas. Campo opcional. |
| Parcelas pendentes | Quantidade de parcelas a pagar. Campo opcional. |
| Modalidade de compra\* | Ex: À vista, Financiamento, Leasing, Consórcio. Campo obrigatório. |
| Km atual\* | Quilometragem atual do veículo. Campo obrigatório. Poderá ser alterado MANUALMENTE, mas sempre que um contrato for encerrado, o valor inserido no fechamento irá alimentar AUTOMATICAMENTE essa informação. Ex.: Carro com 78.000 km, teve alteração manual para 78.500km, porém, posteriormente a isso, foi inserido no contrato de fechamento que o veículo está com 78.500km, logo, o campo ficará com 78.500KM. |
| Capacidade do tanque\* | Volume do tanque de combustível. Campo obrigatório. |
| Manutenção preventiva  | Campos Opcionais sobre Cadastro de revisões programadas que irão alimentar triggers no dashboard das frotas e notificações de alertas de manutenção: Descrição de tipo de revisão (freios, completa, óleo, etc) Data da revisão programada Recorrência (opcional): Alertar sobre nova manutenção cada x KM ou a cada x meses  |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de veículo completo | Preencher todos os campos obrigatórios e opcionais | Veículo cadastrado com sucesso e listado na frota |
| 2 | Cadastro sem campo obrigatório | Omitir um campo obrigatório (ex: categoria) | Mensagem de erro indicando campo obrigatório faltante |
| 3 | Edição de veículo | Selecionar veículo existente, alterar dados e salvar | Dados atualizados e mensagem de sucesso |
| 4 | Exclusão de veículo | Selecionar veículo e confirmar exclusão | Veículo removido da frota e mensagem de confirmação |
| 5 | Cadastro de veículo blindado | Marcar blindagem como "Sim" e informar valor da blindagem | Cadastro aceito e valor da blindagem registrado |
| 6 | Cadastro com financiamento | Informar dados de financiamento (parcelas, juros, valor total) | Dados financeiros validados e salvos |
| 7 | Busca de veículo por modelo | Digitar parte do modelo no campo de busca | Listagem de veículos correspondentes |
| 8 | Cadastro com acessórios | Incluir lista de acessórios personalizáveis | Acessórios registrados junto ao veículo |
| 9 | Validação de parcelas | Informar parcelas pagas maior que o total de parcelas | Mensagem de erro de validação |
| 10 | Visualização de detalhes | Clicar em veículo na listagem | Exibição de todos os dados cadastrados do veículo |

