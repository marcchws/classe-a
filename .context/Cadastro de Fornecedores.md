# **Cadastro de Fornecedores**

Objetivo: Permitir o cadastro, edição e gestão de fornecedores, facilitando análises de preços e condições de serviços de cada fornecedor/produto.

Critérios de aceitação:

* Criar CRUD da tela de fornecedores.  
  * Disponibilizar diferenciação no formulário e na visualização entre cadastro de Fornecedores de veículos e fornecedores de serviços;  
* Exibir e validar campos específicos conforme o tipo selecionado.  
  * Fornecedores de veículos (locadoras terceirizadas que fornecem carros para cobrir alta demanda ou solicitações específicas):  
    * Razão Social e Nome Fantasia;  
    * CNPJ;  
    * Contato do Responsável;  
    * Contato do Financeiro;  
    * Endereço Completo da Empresa;  
    * Lista de veículos já usados anteriormente para consulta  
      * Cadastro de tabela de veículo \+ valor negociado no período para eventual consulta;  
    * Valor de repasse negociado;  
      * Deverá existir campo para inserção deste valor, bem como histórico de pagamentos feitos por terceirização de frota, puxados de contas a pagar;  
  * Fornecedores de serviços (empresas e profissionais terceirizados responsáveis por manutenção e suporte operacional):  
    * Razão Social e Nome Fantasia;  
    * CNPJ;  
    * Contato do Responsável;  
    * Contato do Financeiro;  
    * Endereço Completo da Empresa;  
    * Lista de veículos disponíveis  
    * Campo de atuação do fornecedor:  
      * Mecânicos, Oficinas de funilaria, pintura, higienização e limpeza, seguradoras, etc.   
* Permitir anexar documentos fiscais e contratos.  
* Em ambos os tipos de fornecedores, deverá existir a opção de cadastro de serviços prestados pelo fornecedor, onde iremos cadastrar cada ordem de serviço gerada para cada fornecedor e seu custo;  
  * Sempre que uma ordem de serviço for criada, precisaremos integrar ao módulo do financeiro para que seja gerada pendência para cada serviço ou compra registrada.  
* Listar, editar e excluir fornecedores cadastrados.  
* Buscar e filtrar fornecedores por nome, tipo, CNPJ/CPF ou status.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID do fornecedor | Identificador único gerado automaticamente pelo sistema. |
| Tipo de fornecedor | Seleção obrigatória: Veículo ou Serviço. |
| Razão social / Nome completo | Nome da empresa (PJ) ou profissional (PF). Campo obrigatório. |
| CNPJ / CPF | Documento de identificação fiscal. Obrigatório conforme tipo. |
| Endereço completo | Logradouro, número, complemento, bairro, cidade, estado, CEP. |
| Telefone | Telefone principal de contato. |
| E-mail | E-mail principal de contato. |
| Responsável | Nome do responsável pelo fornecedor. |
| Lista de veículos utilizados anteriormente | (Somente para fornecedores de veículos) Marca, modelo, categoria, placa, cor, PAX, blindagem, acessórios, valores negociados anteriormente. |
| Serviços prestados | (Somente para fornecedores de serviço) Descrição dos serviços oferecidos. |
| Equipe / Profissionais | (Opcional para fornecedores de serviço) Lista de profissionais vinculados. |
| Documentos anexos | Upload de notas fiscais, contratos, certificados, etc. |
| Status do fornecedor | Ativo ou inativo. |
| Data de cadastro | Data em que o fornecedor foi cadastrado. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de fornecedor de veículo | Selecionar tipo "Veículo", preencher campos obrigatórios e lista de veículos | Fornecedor cadastrado com sucesso e veículos vinculados |
| 2 | Cadastro de fornecedor de serviço | Selecionar tipo "Serviço", preencher campos obrigatórios e serviços prestados | Fornecedor cadastrado com sucesso e serviços vinculados |
| 3 | Cadastro sem tipo selecionado | Deixar campo "Tipo de fornecedor" em branco | Mensagem "Tipo de fornecedor é obrigatório" |
| 4 | Cadastro sem campo obrigatório | Omitir campo obrigatório (ex: CNPJ/CPF) | Mensagem de erro indicando campo obrigatório faltante |
| 5 | Anexar documento fiscal | Fazer upload de nota fiscal ao registrar serviço ou compra | Documento anexado ao cadastro e pendência financeira criada |
| 6 | Geração automática de pendência | Registrar serviço ou compra para fornecedor | Pendência financeira criada e vinculada ao módulo financeiro |
| 7 | Edição de fornecedor | Alterar informações de contato ou lista de veículos/serviços | Dados atualizados e mensagem de sucesso |
| 8 | Exclusão de fornecedor | Selecionar fornecedor e confirmar exclusão | Fornecedor removido do sistema e mensagem de confirmação |
| 9 | Busca de fornecedor por nome ou CNPJ | Digitar nome ou CNPJ/CPF no campo de busca | Exibição do fornecedor correspondente |
| 10 | Filtrar fornecedores por tipo | Selecionar tipo "Veículo" ou "Serviço" no filtro | Exibição apenas dos fornecedores do tipo selecionado |

