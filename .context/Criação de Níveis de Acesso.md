# **Criação de Níveis de Acesso**

Objetivo: Permitir que administradores definam e gerenciem permissões granulares de acesso ao sistema para diferentes perfis de usuários.  
Critérios de aceitação:

* Criar CRUD para criação de perfil de acesso, onde faremos a associação de telas x permissionamentos:  
  * Ao criar um perfil de acesso, será exibida todas as telas disponíveis no sistema com a opção de permitir visualizar, criar, editar e excluir informações da tela.  
  * Ex.: Gestão de veículos:  
    * Visualizar | Criar | Editar | Excluir  
  * Ex.: Tela de Dashboards/relatórios:  
    * Visualizar | Exportar  
* Listagem de perfis de nível de acesso já criados com as seguintes colunas:  
  * ID Perfil;  
  * Nome do perfil;  
  * Descrição do perfil;  
  * Status do perfil:  
* Possibilitar a exclusão, ativação e desativação de perfil de acesso:  
  * Ex.: um perfil pode estar inativo pois não será utilizado no momento, como pode ser excluído no caso de um perfil de acesso criado errado.

Campos:

| Nome | Descrição |
| :---- | :---- |
| ID | Campo obrigatório de identificação do cadastro do perfil, sendo gerado automaticamente pelo sistema. |
| Nome do perfil de acesso | Nome para diferenciação de tipo de perfil, de campo obrigatório a ser incluído pelo Admin na hora da criação. |
| Descrição do perfil | Campo opcional para inclusão de informação adicional sobre o perfil de acesso. Ex.: Perfil x para uso no gerenciamento de frotas |
| Status do perfil | Campo obrigatório que virá como padrão ativo sempre que um perfil é criado. |
| Telas para permissionamento | Visualização estilo tabela ou múltipla escolha onde deve ser possível selecionar para cada tela quais permissões o perfil tem. Deve ser possível selecionar todas as telas/permissões de uma vez, para facilitar; Ex.: perfil com acesso igual ao de admin; Deve ser possível selecionar todas as permissões de uma única tela de uma vez para facilitar; Ex.: perfil com acesso apenas para fazer tudo em uma ou mais páginas específicas. |

Cenários de Uso:

| ID | Teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Criar perfil com dados obrigatórios | Preencher nome e selecionar permissões | Mensagem "Perfil criado com sucesso" |
| 2 | Criar perfil sem nome | Deixar campo nome em branco | Mensagem "Nome é obrigatório" |
| 3 | Criar perfil com nome duplicado | Inserir nome já existente | Mensagem "Nome já existe no sistema" |
| 4 | Selecionar todas as permissões | Clicar em "Selecionar Todos" | Todas as permissões marcadas |
| 5 | Selecionar permissões por módulo | Clicar em "Selecionar Módulo" | Todas as permissões do módulo marcadas |
| 6 | Desativar perfil em uso | Alterar status para inativo | Mensagem "Perfil desativado com sucesso" |
| 7 | Excluir perfil sem vínculo | Clicar em excluir | Mensagem "Perfil excluído com sucesso" |
| 8 | Excluir perfil com vínculo | Tentar excluir perfil com usuários | Mensagem "Não é possível excluir perfil em uso" |
| 9 | Editar permissões | Alterar permissões existentes | Mensagem "Permissões atualizadas com sucesso" |
| 10 | Buscar perfil existente | Digitar nome no campo busca | Exibir perfil correspondente |
| 11 | Buscar perfil inexistente | Digitar nome não cadastrado | Mensagem "Nenhum perfil encontrado" |
| 12 | Filtrar por status | Selecionar status específico | Exibir apenas perfis do status selecionado  |

