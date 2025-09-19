# **Criação de usuários**

Objetivo: Possibilitar o cadastro e gerenciamento de usuários internos do sistema com suas respectivas informações e permissões.

Critérios de Aceitação:

* Implementar CRUD completo de usuários internos;  
* Deve ser possível realizar busca por:  
  * ID;  
  * Nome do usuário;  
  * Cargo;  
  * E-mail;  
* Deve ser possível realizar filtros por:  
  * Status (ativo, inativo, ambos);  
  * Setor (um ou mais);  
* Deve ser possível realizar a ativação/desativação de cadastros de usuários;  
  * Todo usuário tido como INATIVO deverá ter seu login BLOQUEADO automaticamente;  
    * Ativar o usuário novamente DESBLOQUEIA seu acesso  
* Deverá ser possível incluir as informações dos usuários via importação de .csv  
  * Para melhor comodidade do usuário, deverá ser incluído um botão onde o usuário poderá baixar o modelo do arquivo que o sistema espera como input

Campos: 

| CAMPO | Descrição |
| :---- | :---- |
| ID\* | Campo obrigatório de identificação do cadastro do usuário, sendo gerado automaticamente pelo sistema. |
| Nome do usuário\* | Campo obrigatório. Deverá conter o nome completo do usuário. |
| Documento | Campo obrigatório com possibilidade de selecionar o tipo de documento: CPF, PASSAPORTE, CNH |
| Setor\* | Campo obrigatório Deverá conter listagem de setores da empresa para seleção. Caso o setor desejado não esteja disponível, deverá ser possível criar um novo. |
| Cargo\* | Campo obrigatório. O administrador deverá conseguir realizar o cadastro de novos cargos, além de incluir/retirar cargos em todos os usuários.  |
| Data de Contratação | Campo para inclusão de data de contratação |
| Telefone\* | Campo Obrigatório com possibilidade de edição pelo Admin e usuário. O Administrador deverá ser capaz de realizar alterações no telefone do usuário. O telefone deverá ter o padrão de DDI+DDD+NÚMERO. |
| Data de Nascimento | Campo de data para inclusão de Data de nascimento. |
| Benefícios | Campo de inclusão de benefícios onde deverá ser possível incluir um ou vários benefícios contendo: Nome do benefício Valor do benefício Status do benefício Recorrência (Dia/mês de vencimento) Deverá ser possível excluir um benefício da listagem. Cada benefício deverá gerar uma conta a pagar para o funcionário, com descrição em separado do Salário para fins fiscais e auditoria interna. |
| Salário\* | Campo obrigatório para inclusão de salário e de Comissões: Comissões não é um dado obrigatório |
| Comissão/PLR | Campo de seleção não obrigatório para identificar se o usuário recebe um dos dois formatos. Ao selecionar, deverá aparecer a opção de: Valor pago (% ou R$) Periodicidade (mensal, a cada x meses) |
| Histórico de Promoções | Campo para inclusão de Data e Valor da promoção |
| Histórico de Comissão/PLR | Histórico de alterações em valores de comissão/PLR |
| Histórico de férias | Campo para inclusão de Data de histórico de férias |
| Histórico profissional | Campo para inclusão de histórico profissional do colaborador: Nome da empresa, cargo, período trabalhado e campo de observações; |
| Endereço\* | Campo para inclusão de endereço do colaborador: CEP, Rua, nº, Complemento, Bairro, Cidade, Estado, País CEP buscará o endereço automaticamente, mas sem bloquear a edição dos campos |
| E-mail\* | Campo Obrigatório com possibilidade de edição pelo Admin e usuário. O Administrador deverá ser capaz de realizar alterações no e-mail do usuário.  |
| Senha\* | Campo para criação de primeira senha do usuário, com opção de gerar automaticamente seguindo os padrões determinados de senha: Padrão de senha alfanumérica com no mínimo 8 caracteres sendo letras, números e caracteres especiais; Esta senha será enviada por e-mail cadastrado do usuário, onde ao realizar o primeiro login ele deverá ser forçado a cadastrar sua senha. |
| Foto de perfil | Campo opcional. Tanto o usuário quanto o Admin devem ser capazes de realizar exclusão e inclusão de fotos no perfil de um usuário. |
| Status | Campo obrigatório. O administrador deve ser capaz de classificar um usuário como ‘Ativo’ ou ‘Inativo’ Caso um usuário tenha seu status como ‘INATIVO’ seu login deverá ficar automaticamente bloqueado para acessos ao sistema. Usuários inativos que tentem logar deverão receber a informação de “Erro ao logar no sistema, procure um administrador.” |
| Nível de Acesso | Campo com listagem de níveis de acesso já criados para seleção Caso não seja incluído um nível de acesso deverá ser exibida uma mensagem informando que sem nível de acesso o usuário não poderá acessar nada do sistema; Usuários podem ser cadastrados SEM nível de acesso, mas deve ser exibida tag/ícone informativo na listagem avisando que usuário está sem nível de acesso cadastrado |
| Anexos | Campo para inclusão de anexos, sendo: Documento\* Comprovante de residência\* Demais anexos |

Cenários de Uso:

| ID | Teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Criar novo usuário com dados válidos | Todos os campos obrigatórios preenchidos | Mensagem "Usuário criado com sucesso" \+ registro na listagem |
| 2 | Criar usuário com campos obrigatórios vazios | Campos obrigatórios em branco | Mensagem "Preencha todos os campos obrigatórios" |
| 3 | Criar usuário com e-mail já cadastrado | E-mail duplicado | Mensagem "E-mail já cadastrado no sistema" |
| 4 | Editar dados do usuário | Alteração em campos existentes | Mensagem "Dados atualizados com sucesso"Obs.: ID não é passível de alteração |
| 5 | Desativar usuário | Clicar em botão desativar e na opção “Confirmar” | Mensagem "Usuário desativado com sucesso" \+ status atualizado |
| 6 | Buscar usuário por nome | Nome existente na barra de busca | Exibição apenas dos registros correspondentes à filtragem \+ busca Ex.: filtro de inativo selecionado, trazer apenas usuários inativos com o nome buscado |
| 7 | Filtrar por status ativo | Selecionar filtro "Ativo" | Exibição apenas de usuários ativos |
| 8 | Incluir níveis de acesso | Editar um usuário interno incluindo/excluindo um nível de acesso | Mensagem “Nível de acesso atualizado” \+ nível de acesso atualizado no perfil do usuário  |

