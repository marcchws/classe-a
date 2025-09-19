# **Cadastro de Contratos**

Objetivo: Automatizar o cadastro de contratos, com diferenciação entre serviços de locação, serviço com condutor e eventos, garantindo que todas as informações necessárias sejam registradas de forma padronizada, segura e integrada, desde a negociação até a finalização do serviço, incluindo controle de terceiros e envio para assinatura digital.

Critérios de aceitação:

* Criar modal de configurações de taxas padronizadas para contratos, onde será inserido os valores padrões para:  
  * Tabela de lavagem de automóveis;  
  * Valor padrão de gasolina (valor em R$/Litro e taxa % em cima do valor);  
  * Valores para aluguel de cadeirinhas infantis;  
* Criar CRUD para cadastro de contratos com segmentação entre os tipos disponíveis: locação, serviço (com condutor), eventos, terceirização  
  * Os formulários deverão ser condicionados ao tipo de contrato selecionado, exibindo os campos específicos de cada tipo de contrato e exibindo de forma clara na tela de listagem qual o tipo de cada contrato sem a necessidade de abrir os detalhes para identificar.  
* Integrar seleção de clientes, motoristas, veículos (próprios ou terceiros) e serviços extras, utilizando dados já existentes no sistema.  
* Para terceirização, permitir cadastro simplificado do fornecedor (nome, placa, modelo) e indicar visualmente veículos terceirizados.  
* Contrato de locação (sem motorista):  
  * Por via de regra, contabilizamos diárias a cada 24h após início programado no sistema, onde existirá a cortesia de \+3 horas para devolução. No caso do cliente devolver após esse período de cortesia, será contabilizado como \+1 diária a ser paga;  
  * Condutor:  
    * O sistema deverá possibilitar a inclusão de 1 ou mais condutores, que podem ou não ser o locatário do veículo;  
      * Deverá ser incluso as informações de nome do condutor, comprovante de residência e CNH ou campo aberto no caso de reservas de cliente internacional  
      * No caso de motoristas extras, será cobrado um valor a mais;  
      * Cada condutor deverá receber um termo de responsabilidade específico para assinatura:  
        * Neste caso, mesmo que o locatário não seja um dos motoristas cadastrados, ele também deverá assinar um termo de responsabilidade;  
        * Este termo poderá ser assinado virtualmente ou impresso, a depender da solicitação do cliente.  
  * Serviços extras podem ser adicionados ao contrato:  
    * Dinâmica leva e traz, onde uma pessoa da Classe A entrega e busca o veículo no local indicado;  
      * Valor negociável onde pode ser contratado só a entrega ou recolhimento do veículo.  
    * Cálculo automatizado de combustível:  
      * Será marcado devolução de combustível em oitavos (1/8, 2/8,... 8/8) onde:   
        * Veículo com 50 Litros teria 50/8 \= 6.25, com taxa de gasolina por R$10,00L ficaria: 6.25\*10 \= 62.50  o valor do tanque totalmente vazio.  
        * Taxas percentuais podem ser incluídas em cima do valor da cobrança de gasolina.  
    * Valor do Sem Parar incluso ao final do contrato;  
      * Puxados via API  
    * Lavagem do veículo  
    * KM Adicional utilizado;  
      * Cada contrato por padrão consta com 100km/dia, qualquer KM a mais na verificação de finalização do contrato contabilizará como pagamento adicional.  
* Contrato de locação (com motorista):  
  * Seleção de tipo de serviço (Transfer, Disposição por horas, Pacote 5h)  
    * Inclua os campos de viagem do cliente, como opcional  
  * Seleção de categoria \+ marca \+ veículo  
    * A placa do veículo só será disponibilizada 48h antes do início da locação no caso de locação com motorista;  
* Todos os contratos devem exibir aviso perguntando se o contrato deverá ser enviado automaticamente para assinatura digital após cadastro.  
  * Caso sim: Perguntar se será enviado via e-mail, whatsapp ou ambos.  
  * Caso não: contrato fica como pendente na plataforma e o usuário deverá clicar em ENVIAR e aparecerá novamente a modal perguntando se será via e-mail, whatsapp ou ambos.  
* Notificar painel operacional e contas a pagar em casos de terceirização.  
* Permitir anexar documentos e registrar condições do veículo.  
* Validar obrigatoriedade de campos conforme o tipo de contrato.  
* Integrar com módulo financeiro para controle de custos, repasses e análise de margens.  
* Exibir status do contrato (rascunho, pendente de assinatura, ativo, encerrado).

Campos: 

| Nome do campo | Descrição do campo |
| :---- | :---- |
| Tipo de contrato | Seleção entre Locação, Serviço (com condutor) ou Evento |
| Cliente | Seleção de cliente (PF nacional/internacional, PJ, Evento)  |
| Locatário | Pessoa responsável pelo contrato (pode ser diferente do condutor) |
| Condutor/Motorista | Seleção de motorista (próprio, terceiro ou operacional para leva e traz) Sempre que o tipo de contrato for SERVIÇO, os dados do condutor serão sempre de um motorista do sistema Classe A; Sempre que for um contrato de locação, deverá ter a opção de identificar se o locatário é o condutor, outra pessoa (com cadastro de dados, CNH, etc) ou não informado.  |
| Veículo | Seleção de veículo da frota ou entrada manual (placa, modelo) para terceirização Seleção de categoria \+ marca \+ veículo O sistema deverá possibilitar a busca diretamente por uma placa específica ou selecionar para verificar a disponibilidade de veículos por categoria, marca ou modelo; No caso de um veículo ser buscado por placa, o sistema preencherá automaticamente a categoria, marca e modelo do veículo com o que está disposto no cadastro; |
| Fornecedor (terceirização) | Nome do fornecedor do veículo terceirizado (obrigatório se terceirização for selecionada) |
| Passageiro | Nome do passageiro (apenas para contratos de serviço com condutor) |
| Número do voo | Número do voo (apenas para serviço com condutor, se aplicável) |
| Local de atendimento | Endereço/local onde o serviço será prestado (serviço/evento) |
| Data/hora início | Data e hora de início do contrato/serviço |
| Data/hora fim | Data e hora de término do contrato/serviço |
| Contabilização de diárias | Com base na data/hora início e data/hora fim, determinar quantas diárias serão cobradas. |
| Serviços extras | Seleção de serviços adicionais (horas extras, pedágios, lavagem, leva e traz, etc.) |
| Termos de responsabilidade | Termos específicos para locatário e condutor, gerados automaticamente |
| Valor do contrato | Valor total, incluindo extras e repasses |
| Condições do veículo | Registro do estado do veículo na retirada e devolução |
| Checklist digital | Registro digital obrigatório de retirada/devolução, vinculado ao motorista e enviado por e-mail |
| Status do contrato | Rascunho, Pendente de assinatura, Ativo, Encerrado |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de contrato de locação simples | Selecionar tipo Locação, cliente, veículo, preencher datas e valor | Contrato criado e enviado para assinatura digital |
| 2 | Vincular motorista a serviço com condutor | Selecionar tipo Serviço, motorista, passageiro, local, datas | Motorista recebe programação no app, contrato criado |
| 3 | Checklist digital obrigatório | Vincular motorista operacional para leva e traz | Checklist digital gerado, enviado por e-mail e registrado |
| 4 | Adição de serviços extras | Selecionar extras (horas, pedágios, lavagem, leva e traz) | Valor do contrato atualizado, extras vinculados ao financeiro |
| 5 | Cálculo automático de combustível | Registrar marcação do tanque e abastecimento pelo app | Valor de combustível calculado e repasse gerado |
| 6 | Fechamento e automação financeira | Encerrar contrato com extras e fornecedores terceiros | Contas a receber/pagar geradas automaticamente |
| 7 | Pagamento automático para motoristas | Fechar contrato com motorista vinculado | Relatório consolidado para pagamento semanal |
| 8 | Cobrança automatizada para contratos faturados | Fechar contrato faturado | Fatura enviada, lembretes e baixa automática no contas a receber |
| 9 | Falha por campo obrigatório não preenchido | Deixar campo cliente ou veículo em branco | Mensagem "Campo obrigatório não preenchido" |
| 10 | Visualização de status do contrato | Acessar tela de contratos | Exibir status: rascunho, pendente, ativo, encerrado |

