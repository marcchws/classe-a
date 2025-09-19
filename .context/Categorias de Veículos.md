# **Categorias de Veículos**

Objetivo: Permitir o cadastro, edição e exclusão de categorias dos veículos, que serão utilizados no cadastro de veículos, garantindo padronização e facilidade de gestão.

Critérios de aceitação:

* Criar CRUD para cadastro de categorias de locação:  
  * Campo obrigatório: nome da categoria;  
  * Campo opcional: descrição da categoria;  
  * Status (ativo, inativo);  
* Permitir edição, exclusão e ativação/inativação de categorias.  
* Deverá ser possível incluir as informações de categoria via importação de .csv  
  * Para melhor comodidade do usuário, deverá ser incluído um botão onde o usuário poderá baixar o modelo do arquivo que o sistema espera como input

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da categoria | Identificador único da categoria, gerado automaticamente pelo sistema. |
| Nome da categoria | Nome da categoria (ex: Sedan, SUV, Van). Campo obrigatório. |
| Descrição da categoria | Descrição detalhada da categoria. Campo obrigatório. |
| Status da categoria | Indica se a categoria está ativa, em uso, com alta demanda ou indisponível. |
| Data de cadastro | Data em que a categoria foi cadastrada. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de categoria | Preencher nome e descrição da categoria | Categoria cadastrada com sucesso |
| 2 | Cadastro sem campo obrigatório | Omitir nome ou descrição da categoria | Mensagem de erro indicando campo obrigatório faltante |
| 3 | Edição de categoria | Selecionar categoria, alterar dados e salvar | Dados atualizados e mensagem de sucesso |
| 4 | Exclusão de categoria | Selecionar categoria e confirmar exclusão | Categoria removida do sistema e mensagem de confirmação |
| 5 | Importação de categorias via CSV | Carregar arquivo .csv com categorias | Categorias importadas e listadas |
| 6 | Exportação de categorias | Solicitar exportação | Download do arquivo .csv com dados atuais |
| 7 | Indicativo de categoria indisponível | Marcar categoria como indisponível | Categoria aparece com status visual de indisponível |
| 8 | Busca de categoria por nome | Digitar parte do nome da categoria no campo de busca | Listagem de categorias correspondentes |
| 9 | Baixar modelo de arquivo .csv | Clicar no botão de download de modelo .csv | Download do arquivo modelo para input de dados |
| 10 | Visualização de lista | Acessar tela de listagem de categorias | Exibição de todas as categorias cadastradas |

