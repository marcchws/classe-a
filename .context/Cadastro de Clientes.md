# **Cadastro de clientes**

Objetivo: Permitir o cadastro, edição e gestão de clientes divididos em Pessoa Física, Pessoa Jurídica e Parceiros estratégicos, garantindo histórico completo de interações, negociações e condições comerciais personalizadas.

Critérios de aceitação:

* Implementar CRUD para cadastro, edição e exclusão de clientes;  
* Exigir campos obrigatórios conforme o tipo de cliente (Pessoa Física, PJ ou Parceiro).  
  * Pessoa Física:  
    * Dados pessoais:  
      * Escolher se é nacional ou internacional  
      * Nome;  
      * CPF/Passaporte;  
        * Clientes internacionais precisam também inserir PID  
      * Data de Nascimento;  
      * Profissão;  
      * Sexo;  
    * Contato:  
      * Telefone;  
      * E-mail;  
    * Endereço;  
    * Histórico de negociação:  
      * Registro da margem aplicada nas negociações anteriores.  
        * Esse registro será utilizado futuramente na tela de solicitações de negociações para que, quando um novo pedido seja realizado, o sistema avise qual foi a última negociação feita pelo cliente.  
  * Pessoa Jurídica:  
    * Razão Social e Nome Fantasia;  
    * CNPJ;  
    * Segmento de Atuação;  
    * Contato do Responsável;  
    * Contato do Financeiro;  
    * Endereço Completo da Empresa;  
    * Histórico de Tarifa:   
      * Exibir histórico de tarifa base geral cadastrado no sistema;  
      * No momento do cadastro o usuário irá preencher o percentual base específico do cliente;  
        * Possibilitar incluir outros percentuais pontuais no momento do cadastro e aqui ficará salvo.  
      * Dentro do contrato, sempre será exibido o percentual base do cliente cadastrado.  
  * Cliente parceiro (empresas estratégicas para relacionamento comercial):  
    * Tipo de parceiro:  
      * Agências de Turismo;  
      * Hotéis;  
      * Restaurantes de Luxo;  
      * Empresas de Eventos;  
      * Locadoras parceiras;  
    * Razão Social e Nome Fantasia;  
    * CNPJ;  
    * Contato do Responsável;  
    * Contato do Financeiro;  
    * Endereço Completo da Empresa;  
    * Histórico de relacionamento e indicações:  
      * Cadastro de tabela de histórico com:  
        * Tipo:   
          * indicação (incluir campo de descrição do indicado)  
          *  relacionamento;  
        * Data da indicação/relacionamento;  
        * Descrição da indicação/relacionamento;  
* Validar obrigatoriedade e formato dos campos conforme categoria do cliente.  
* Permitir busca, filtro e listagem de clientes por categoria, nome, documento ou status.  
* Integrar cadastro de clientes com módulos de contratos, faturamento e relatórios.  
* Deverá ser possível incluir as informações dos veículos via importação de .csv  
  * Para melhor comodidade do usuário, deverá ser incluído um botão onde o usuário poderá baixar o modelo do arquivo que o sistema espera como input

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| Código do cliente | Identificador único gerado automaticamente pelo sistema. |
| Tipo de cliente | Seleção entre Pessoa Física, Pessoa Jurídica ou Parceiro. |
| Nome completo / Razão social | Nome completo (PF) ou razão social (PJ/Parceiro). Campo obrigatório. |
| Nome fantasia | Nome fantasia da empresa (PJ/Parceiro). Opcional para PF. |
| CPF / CNPJ | Documento de identificação (CPF para PF, CNPJ para PJ/Parceiro). Obrigatório conforme tipo. |
| Data de nascimento | Data de nascimento do cliente (PF). |
| Profissão | Profissão do cliente (PF). |
| Sexo | Sexo do cliente (PF). |
| Segmento de atuação | Segmento de atuação da empresa (PJ/Parceiro). |
| Contato do responsável | Nome, telefone e e-mail do responsável principal. |
| Contato do financeiro | Nome, telefone e e-mail do responsável financeiro (PJ/Parceiro). |
| Telefone | Telefone principal de contato. |
| E-mail | E-mail principal de contato e para acesso ao sistema. |
| Senha | Campo para criação de senha de primeiro acesso do cliente, onde deverá existir a possibilidade de gerar automaticamente uma nova senha; |
| Endereço completo | Logradouro, número, complemento, bairro, cidade, estado, CEP. |
| Tarifário especial | Cadastro de preços e regras comerciais diferenciadas (PJ). |
| Histórico de negociação | Registro automático das margens aplicadas em negociações anteriores (PF). |
| Histórico de relacionamento | Registro de interações, indicações e parcerias (Parceiro). |
| Status do cliente | Ativo, Inativo ou Inadimplente. |
| Data de cadastro | Data em que o cliente foi cadastrado no sistema. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de cliente PF completo | Preencher todos os campos obrigatórios de PF | Cliente cadastrado com sucesso e código gerado |
| 2 | Cadastro de cliente PJ com contatos | Preencher razão social, CNPJ, contatos e endereço | Cliente PJ cadastrado e contatos vinculados |
| 3 | Cadastro de parceiro com histórico | Preencher dados da empresa, contatos e histórico de indicações | Parceiro cadastrado e histórico iniciado |
| 4 | Cadastro sem campo obrigatório | Omitir campo obrigatório (ex: CPF ou CNPJ) | Mensagem de erro indicando campo obrigatório faltante |
| 5 | Registro automático de negociação | Realizar negociação com margem diferenciada para PF | Margem registrada no histórico do cliente |
| 6 | Cadastro de tarifário especial PJ | Informar valores e regras comerciais diferenciadas | Tarifário especial salvo e vinculado ao cliente PJ |
| 7 | Busca de cliente por documento | Digitar CPF ou CNPJ no campo de busca | Exibição do cliente correspondente |
| 8 | Edição de dados do cliente | Alterar informações de contato ou endereço | Dados atualizados e mensagem de sucesso |
| 9 | Exclusão de cliente | Selecionar cliente e confirmar exclusão | Cliente removido do sistema |
| 10 | Consulta de histórico de relacionamento | Acessar ficha de parceiro | Exibição do histórico de indicações e interações |

