# **Dashboard de frotas**

Objetivo: Possibilitar a gestão macro de informações sobre a frota, permitindo uma tomada de decisão mais ágil sobre renovação de veículos, retiradas de modelos, etc.

Critérios de aceitação:

* Criar visualização de dashboard com as seguintes visualizações:  
  * Visão geral da frota:  
    * Big Number de Nº total de veículos próprios;  
    * Valor do patrimônio x dívida da frota;  
    * Nº de veículos por categoria;  
  * Categorias da frota:  
    * Para cada categoria exibir o Valuation (soma total do valor de compra dos veículos);  
    * Para cada categoria exibir a média de valor de compra;  
    * Status dos veículos, onde iremos calcular com base em 40 meses de uso a partir da compra E/OU 100.000 km rodados, onde:  
      * Verde (\<80%): veículos dentro dos padrões normais de uso (km e ano);  
      * Amarelo (\> 80%): veículos próximos do limite de km/tempo de renovação;  
      * Vermelho (\>95%): veículos que atingiram ou ultrapassaram o limite recomendado para substituição;  
    * Status quantitativo de veículos em manutenção:  
      * Veículos em manutenção preventiva x por falha;  
      * Visualização de qual classe/modelo da frota esteve mais com status em manutenção;  
  * Análise por veículo:   
    * Exibir quais veículos estão com despesas acima da média;  
      * Linkar card com veículos à histórico de manutenção do veículo onde ao clicar no dashboard o usuário será levado a essa visualização do histórico para identificar as manutenções  
    * Exibir comparação entre financiamento x patrimônio:  
      * quanto da frota já foi paga e quanto ainda está em débito;  
  * Permitir filtros por categoria, status e período.  
  * Atualização automática dos dados conforme movimentações da frota.

Campos:

| Nome do campo | Descrição do campo |
| :---- | :---- |
| Nº total de veículos | Quantidade total de veículos próprios cadastrados na frota. |
| Valor do patrimônio | Soma do valor de compra de todos os veículos da frota. |
| Dívida da frota | Valor total das dívidas atreladas à aquisição dos veículos. |
| Categoria do veículo | Classificação dos veículos (ex: Sedan, SUV, Van, etc.). |
| Nº de veículos por categoria | Quantidade de veículos em cada categoria. |
| Valuation por categoria | Soma do valor de compra dos veículos de cada categoria. |
| Média de valor por categoria | Média do valor de compra dos veículos em cada categoria. |
| Status do veículo | Indicador visual (verde, amarelo, vermelho) conforme uso, km e tempo de renovação. |
| Km atual | Quilometragem atual de cada veículo, utilizada para cálculo de status. |
| Ano de do modelo | Ano do modelo do veículo, utilizado para cálculo de tempo de renovação. |
| Veículos em manutenção preventiva | Quantidade de veículos em manutenção preventiva. |
| Veículos em manutenção por falha | Quantidade de veículos em manutenção por falha. |
| Classe/modelo mais em manutenção | Classe ou modelo que mais esteve em manutenção no período analisado. |

Cenários de uso:

| ID | Nome do teste | Entrada | Saída Esperada |
| :---- | :---- | :---- | :---- |
| 1 | Visualizar visão geral da frota | Acessar dashboard | Exibição do Big Number, patrimônio x dívida, veículos por categoria |
| 2 | Filtrar por categoria | Selecionar categoria específica | Exibição de valuation e status apenas da categoria selecionada |
| 3 | Visualizar status dos veículos | Acessar painel de status | Veículos destacados em verde, amarelo ou vermelho conforme regras |
| 4 | Visualizar manutenção preventiva x falha | Acessar painel de manutenção | Quantitativo de veículos em cada tipo de manutenção |
| 5 | Visualizar classe/modelo mais em manutenção | Selecionar período de análise | Exibição da classe/modelo com maior incidência de manutenção |
| 6 | Exportar dados do dashboard | Clicar em exportar | Download dos dados em formato Excel ou PDF |
| 7 | Atualizar dados automaticamente | Realizar movimentação na frota | Dashboard reflete atualização em tempo real |
| 8 | Visualizar valuation por categoria | Selecionar categoria | Exibição da soma total e média do valor de compra |
| 9 | Comparar patrimônio x dívida | Acessar dashboard | Gráfico comparativo entre valor do patrimônio e dívida da frota |
| 10 | Filtrar por status | Selecionar status (verde, amarelo, vermelho) | Exibição apenas dos veículos no status seleciona |

