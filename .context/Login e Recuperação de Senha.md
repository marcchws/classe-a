# **Autenticação**

Objetivo: Permitir que usuários acessem o sistema de acordo com suas credenciais e permissionamentos;  
Critérios de Aceitação: 

* Implementar sistema de autenticação (login);  
* Validar credenciais (e-mail e senha);  
* Permitir acesso apenas para usuários ativos;

Campos: 

| CAMPO | Descrição |
| :---- | :---- |
| Login | Campo obrigatório para inclusão de e-mail: E-mails incorretos (sem o símbolo de @, por exemplo) devem exibir erro ao logar; Ex. de e-mail: seuemail@gmail.com |
| Senha | Campo obrigatório para inclusão de senha: Padrão de senha alfanumérica com no mínimo 8 caracteres sendo letras, números e caracteres especiais; |

Cenários de Uso:

| ID | Teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Login com credenciais válidas | E-mail e senha corretos de usuário admin ativo | Redirecionamento para dashboard \+ mensagem "Login realizado com sucesso" |
| 2 | Login com credenciais inválidas | E-mail e/ou senha incorretos | Mensagem "Credenciais inválidas" |
| 3 | Login com usuário inativo | E-mail e senha de usuário admin inativo | Mensagem "Usuário desativado. Entre em contato com o administrador" |
| 4 | Tentativa de login com campos vazios | Campos em branco | Mensagem "Preencha todos os campos obrigatórios" |

# **Recuperação de Senha**

Objetivo: Possibilitar que usuários recuperem acesso ao sistema em caso de esquecimento de senha a partir da solicitação via botão de “Esqueci minha senha” contido na tela de login.

Critérios de Aceitação:

* Enviar e-mail com link de recuperação para o e-mail cadastrado no sistema;  
  * Link deve expirar em 24h;  
  * Link deve ser de uso único;  
* Possibilitar a criação de nova senha (mínimo 8 caracteres, com letras, números e caracteres especiais);  
  * Deverá ser possível gerar uma senha automaticamente via sugestão do sistema;  
  * Deverá ser confirmada similaridade da nova senha antes de salvar;  
* Ao cadastrar uma nova senha, o usuário deverá ser levado diretamente para a tela inicial do sistema já logado.

Campos: 

| CAMPO | Descrição |
| :---- | :---- |
| Senha nova | Campo obrigatório para inserção da nova senha Padrão de senha alfanumérica com no mínimo 8 caracteres sendo letras, números e caracteres especiais; |
| Digite novamente a senha | Campo obrigatório para comparação de similaridade das senhas. Caso as senhas não sejam iguais, deverá ser apresentada mensagem de erro solicitando que o usuário repita a mesma senha em ambos os campos. |

Cenários de Uso:

| ID | Teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Solicitar recuperação de senha | E-mail válido | Mensagem "Link de recuperação enviado para seu e-mail" \+ envio do e-mail |
| 2 | Solicitar recuperação com e-mail inválido | E-mail inexistente | Mensagem "E-mail não cadastrado no sistema" |
| 3 | Acessar link expirado | Link após 24h | Mensagem "Link expirado. Solicite um novo link de recuperação" |
| 4 | Definir nova senha válida | Senha que atende requisitos \+ confirmação igual | Mensagem "Senha alterada com sucesso" |
| 5 | Definir senha inválida | Senha que não atende requisitos | Mensagem detalhando requisitos não atendidos |
| 6 | Confirmação de senha divergente | Senhas diferentes nos campos | Mensagem "As senhas não conferem"  |

