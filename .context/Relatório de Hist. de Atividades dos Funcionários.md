# **Relatório de Histórico de Atividades dos Funcionários**

Objetivo: Possibilitar análises centralizadas e precisas sobre a produtividade, eficiência, desempenho e histórico de atividades dos funcionários, permitindo acompanhamento detalhado por setor, período e colaborador, com indicadores visuais e exportação de relatórios para tomada de decisão estratégica.  
Critérios de aceitação:

* Exibir painel com indicadores globais:   
  * total de funcionários, eficiência média, quantidade de atividades realizadas no dia.  
* Listar funcionários em cartões individuais, mostrando eficiência, número de tarefas e tempo médio por tarefa.  
  * Utilizar indicadores visuais (cores, ícones) para níveis de eficiência ("Excelente", "Bom", "Atenção").  
* Permitir filtros por filial, setor, período e colaborador.  
* Exibir histórico de atividades em tempo real, com busca por atividade, funcionário ou setor.  
* Exibir indicadores gerais das respostas do NPS que serão de 1 a 5;  
  * Sempre que tiver uma discrepância de 2 pontos entre a resposta do cliente x motorista, exibir indicativo visual de discrepância para análise.  
* Permitir exportação do relatório em PDF e/ou Excel.  
* Exibir histórico com detalhes de cada atividade por funcionário:   
  * Nome do funcionário  
  * Setor  
  * Nome da atividade  
  * Data de criação da atividade  
  * Duração em min/horas/dias (caso seja menos de 60min exibir em min, caso menos de 24h exibir em horas)  
  * Campo de descrição da tarefa  
  * Status (em andamento, concluído, pendente)  
  * Campos específicos por setor:  
    * Nome do cliente  
    * Contato do cliente  
    * Carro (placa/modelo)  
* Permitir segmentação dos dados por filial, mantendo independência entre unidades.  
* Respeitar níveis de acesso customizados para visualização e exportação dos dados.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| ID Funcionário | Identificador único do funcionário. |
| Nome | Nome completo do funcionário. |
| Setor | Departamento/setor ao qual o funcionário pertence. |
| Número de Tarefas | Quantidade de tarefas/atividades realizadas no período selecionado. |
| Tempo Médio por Tarefa | Duração média das tarefas executadas pelo funcionário. |
| Status de Eficiência | Indicador visual do nível de eficiência (e.g., "Excelente", "Bom", "Atenção"). |
| Cliente | Nome do cliente associado à atividade. |
| Veículo | Identificação do veículo relacionado à atividade. |
| Data/Hora | Data e hora de início da atividade. |
| Duração | Tempo total gasto na atividade. |
| Status da Atividade | Situação atual da atividade (concluída, em andamento, pendente). |
| Filtros | Opções para filtrar por setor, período, colaborador e tipo de atividade. |
| Exportação de Relatório | Botão para exportar os dados filtrados em PDF ou Excel. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar painel geral | Acessar tela de produtividade | Exibir indicadores globais e lista de funcionários |
| 2 | Filtrar por setor e período | Selecionar setor "Operacional" e período "Última semana" | Exibir dados apenas do setor e período selecionados |
| 3 | Buscar funcionário específico | Digitar nome do funcionário no campo de busca | Exibir cartão e histórico apenas do funcionário buscado |
| 4 | Visualizar detalhes de atividade | Clicar em uma atividade na lista de histórico | Exibir detalhes: tipo, cliente, veículo, data, duração |
| 5 | Exportar relatório filtrado | Aplicar filtros e clicar em "Exportar PDF" | Gerar arquivo PDF com os dados filtrados |
| 6 | Ver indicador visual de eficiência | Funcionário com eficiência \< 70% | Exibir status "Atenção" em vermelho no cartão |
| 7 | Listar atividades em tempo real | Nova atividade concluída por funcionário | Atualizar lista de atividades automaticamente |
| 8 | Restringir acesso por perfil | Usuário com perfil "Gestor de Filial" acessa tela | Exibir apenas dados da filial correspondente |
| 9 | Buscar atividade por descrição | Digitar palavra-chave no campo de busca de atividades | Exibir atividades que contenham a palavra-chave |
| 10 | Visualizar eficiência média geral | Acessar tela sem filtros | Exibir eficiência média de todos os funcionários  |

