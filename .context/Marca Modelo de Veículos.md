# **Marca/Modelo de Veículos**

Objetivo: Permitir o cadastro, edição e exclusão de marcas e modelos de veículos, que serão utilizados no cadastro de veículos, garantindo padronização e facilidade de gestão.

Critérios de aceitação:

* Criar CRUD para cadastro de marcas e modelos de veículos:  
  * Campos obrigatórios: nome da marca e nome do modelo;  
    * Deve ser possível cadastrar mais de um modelo a uma mesma marca;  
  * Campo opcional: Observação da marca/modelo  
  * Status (ativo, inativo)  
* Visualização de lista de marcas e modelos cadastrados.  
* Permitir a inclusão das informações de manutenção periódica com opção para cada item de definir a manutenção por quilometragem rodada ou tempo de checagem com base nos itens da [planilha](https://docs.google.com/spreadsheets/d/1_jSwcB8duDvUB8IAbchX5B-tI1CNLdJHVpZ7cDdeC5A/edit?usp=sharing).  
* Permitir edição e exclusão de marcas e modelos.  
* Deverá ser possível incluir as informações de marca/modelo via importação de .csv  
  * Para melhor comodidade do usuário, deverá ser incluído um botão onde o usuário poderá baixar o modelo do arquivo que o sistema espera como input

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID da marca | Identificador único da marca, gerado automaticamente pelo sistema. |
| Nome da marca | Nome da marca do veículo. Campo obrigatório. |
| Nome do modelo | Nome do modelo do veículo. Campo obrigatório. |
| Status do modelo | Indica se o modelo está ativo, inativo. |
| Observação | Campo de texto para inclusão de observações |
| Data de cadastro | Data em que a marca/modelo foi cadastrada. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastro de marca e modelo | Preencher nome da marca e modelo, associar modelo à marca | Marca e modelo cadastrados com sucesso |
| 2 | Cadastro sem campo obrigatório | Omitir nome da marca ou modelo | Mensagem de erro indicando campo obrigatório faltante |
| 3 | Edição de marca/modelo | Selecionar marca/modelo, alterar dados e salvar | Dados atualizados e mensagem de sucesso |
| 4 | Exclusão de marca/modelo | Selecionar marca/modelo e confirmar exclusão | Marca/modelo removido do sistema e mensagem de confirmação |
| 5 | Importação de marcas/modelos via CSV | Carregar arquivo .csv com marcas e modelos | Marcas/modelos importados e listados |
| 6 | Exportação de marcas/modelos | Solicitar exportação | Download do arquivo .csv com dados atuais |
| 7 | Indicativo de modelo descontinuado | Marcar modelo como descontinuado | Modelo aparece com status visual de descontinuado |
| 8 | Busca de modelo por nome | Digitar parte do nome do modelo no campo de busca | Listagem de modelos correspondentes |
| 9 | Baixar modelo de arquivo .csv | Clicar no botão de download de modelo .csv | Download do arquivo modelo para input de dados |
| 10 | Visualização de lista | Acessar tela de listagem de marcas/modelos | Exibição de todas as marcas e modelos cadastrados |

