# **Gerenciamento de insights**

Objetivo: Permitir que gestores e diretoria crie e gerencie avisos e insights de ordem operacional/setorial ou geral da empresa que deverão ser disponibilizados na Plataforma na tela inicial sempre que um colaborador logar.

Critérios de aceitação:

* Implementar CRUD para cadastro, edição e exclusão dos insights  
  * Permitir cadastro, edição e exclusão de insights por gestores e diretoria.  
  * Possibilitar a definição do público-alvo do insight: setor específico ou empresa toda.  
  * Permitir inclusão de texto, imagem, vídeo e link no insight.  
  * Definir período de exibição (data/hora de início e término) para cada insight.  
  * Permitir visualização de histórico de insights ativos e expirados.  
    * Um insight inativo (expirado) poderá ser reativado caso o gestor necessitar e, nesse cenário, deverá ser solicitado o novo prazo de validade do insight (caso não seja incluso, o padrão de 30 dias prevalecerá, onde a cada 30 dias da data de criação o insight será inativado caso não exista data cadastrada de finalização)  
* Exibir insights como pop-up ao logar, com separação visual entre avisos gerais e setoriais.  
* Garantir que apenas usuários com permissão possam acessar a tela de gerenciar insights.  
* Possibilitar que o colaborador feche o pop-up a qualquer momento.  
* Exibir insights apenas para os colaboradores do setor ou empresa conforme configuração durante criação do insight.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID Insight | Identificador único do insight, gerado automaticamente pelo sistema. |
| Título | Título do insight, campo obrigatório. |
| Descrição | Texto explicativo do insight, campo obrigatório. |
| Público-alvo | Seleção entre "Setor" (especificar qual) ou "Empresa toda". |
| Setor | Campo obrigatório se o público-alvo for "Setor"; define o setor destinatário do insight. |
| Imagem | Upload de imagem ilustrativa (opcional). |
| Vídeo | Upload ou link de vídeo (opcional). |
| Link externo | URL para material complementar (opcional). |
| Data/hora início | Data e hora a partir da qual o insight será exibido. |
| Data/hora término | Data e hora de expiração do insight. |
| Status | Indica se o insight está "Ativo", "Agendado" ou "Expirado". |
| Criado por | Nome do gestor/diretor responsável pelo insight. |
| Data de criação | Data/hora em que o insight foi cadastrado. |
| Visualizações | Registro de quais colaboradores visualizaram o insight e quando. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Cadastrar insight geral | Preencher título, descrição, público "Empresa toda", definir período | Insight aparece como pop-up para todos ao logar |
| 2 | Cadastrar insight setorial | Preencher título, descrição, público "Setor", selecionar setor | Insight aparece como pop-up apenas para colaboradores do setor |
| 3 | Incluir imagem e vídeo no insight | Anexar imagem e/ou vídeo ao cadastrar insight | Pop-up exibe mídia junto ao texto |
| 4 | Definir período de exibição | Informar data/hora início e término | Insight só aparece no período definido |
| 5 | Editar insight ativo | Alterar descrição ou anexos de insight já cadastrado | Alterações refletidas imediatamente para novos acessos |
| 6 | Excluir insight | Selecionar insight e confirmar exclusão | Insight removido do sistema e não aparece mais para colaboradores |
| 7 | Visualizar histórico de insights | Acessar tela de histórico | Listagem de insights ativos e expirados, com filtros |
| 8 | Fechar pop-up de insight | Colaborador clica em "Fechar" no pop-up | Pop-up some, mas insight fica disponível no histórico |
| 9 | Registrar visualização | Colaborador visualiza insight ao logar | Sistema registra data/hora da visualização |
| 10 | Exibir múltiplos insights | Existirem avisos gerais e setoriais ativos | Pop-up exibe separação clara entre avisos gerais e do setor |

