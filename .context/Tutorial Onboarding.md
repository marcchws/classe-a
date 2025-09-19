# **Tutorial/Onboarding**

Objetivo: Fornecer orientação interativa para novos usuários sobre as funcionalidades da plataforma, diferenciando o conteúdo por tipo de perfil (administrador/usuário comum).

Critérios de Aceitação:

* Primeiro Acesso:   
  * Identificar tipo de usuário (permissões do usuário)  
    * Exibir tutorial específico por perfil;  
      * Ex.: usuários que não tem permissionamento para financeiro ou reservas de locações, não irão visualizar estas etapas.   
    * Permitir pular tutorial;  
    * Opção de rever tutorial posteriormente;  
* Administrador   
  * Tutorial Inicial:  
    * Passo 1: Exibir um pouco sobre o Modo Admin;  
    * Passo 2: Ajudar na criação de logins;  
    * Passo 3: Ajudar na definição de nível de acesso dos usuários;  
    * Passo 4: Visualizar relatórios e explicar sobre como exportar, etc.  
    * Passo 5: Dar opção de continuar para próximos módulos do sistema ou concluir e retornar depois.  
* Usuário Comum  
  * Tutorial Inicial:  
    * Passo 1: Definir permissões de acesso às telas/funcionalidades;  
    * Passo 2: Iniciar tutorial com base no primeiro módulo que usuário tiver acesso;  
* Tutorial por Tela:  
  * Identificar primeiro acesso à tela;  
  * Destacar principais elementos;  
  * Explicar funcionalidades específicas da tela;

Campos:

| Campo | Descrição |
| :---- | :---- |
| ID Tutorial\* | Código gerado automaticamente |
| Tipo Usuário\* | Admin/Comum |
| Tela\* | Nome da tela |
| Passo\* | Número sequencial |
| Título\* | Texto curto |
| Descrição\* | Texto explicativo |
| Elemento\* | Seletor do elemento UI |
| Status\* | Visto/Não visto |

Cenários de uso:

| ID | Teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Primeiro acesso | Login inicial | Tutorial iniciado automaticamente |
| 2 | Identificar perfil | Verificar tipo usuário | Tutorial específico exibido |
| 3 | Pular tutorial | Clicar em "Pular" | Tutorial encerrado |
| 4 | Nova tela | Primeiro acesso à tela | Tutorial da tela iniciado |
| 5 | Rever tutorial | Solicitar ajuda | Tutorial reiniciado |
| 6 | Marcar como visto | Concluir tutorial | Status atualizado |
| 7 | Próximo passo | Avançar tutorial | Próximo elemento destacado |
| 8 | Voltar passo | Retroceder tutorial | Passo anterior exibido |
| 9 | Salvar progresso | Interromper tutorial | Progresso mantido |
| 10 | Concluir tutorial | Finalizar todos passos | Tutorial marcado como concluído  |

