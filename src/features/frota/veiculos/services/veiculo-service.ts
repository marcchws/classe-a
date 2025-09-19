import type {
  Veiculo,
  VeiculoFormData,
  VeiculoListItem,
  BuscaVeiculo,
  ImportacaoVeiculoResult,
} from "../types";

// Mock data para desenvolvimento
const mockVeiculos: VeiculoListItem[] = [
  {
    id: "1",
    categoriaId: "1",
    marcaId: "1",
    modeloId: "1",
    versao: "2.0 GLi",
    tipoCombustivel: "GASOLINA",
    cor: "Prata",
    capacidadePassageiros: 5,
    placa: "ABC-1234",
    blindagem: {
      temBlindagem: true,
      valor: 45000,
      parcelado: true,
      numeroParcelas: 12
    },
    transformacoesEspeciais: "Vidros fumê, película de segurança",
    outrosAcessorios: ["GPS", "Câmera de ré", "Sensor de estacionamento"],
    entrada: 25000,
    valorTotalCompra: 85000,
    modalidadeCompra: "FINANCIAMENTO",
    financiamento: {
      numeroParcelas: 48,
      taxaJuros: 1.2,
      valorTotalComJuros: 95000,
      parcelasPagas: 12,
      parcelasPendentes: 36
    },
    kmAtual: 45000,
    capacidadeTanque: 55,
    detalhesManutencao: [
      {
        id: "1",
        itemManutencaoId: "1",
        proximaManutencaoKm: 50000,
        descricao: "Próxima troca de óleo"
      },
      {
        id: "2",
        itemManutencaoId: "2",
        proximaManutencaoData: "2024-06-15",
        descricao: "Revisão anual completa"
      }
    ],
    status: "DISPONIVEL",
    dataCadastro: "2024-01-15T10:00:00Z",
    categoriaNome: "Sedan",
    marcaNome: "Toyota",
    modeloNome: "Corolla",
    proximaManutencao: "2024-06-15",
    diasParaManutencao: 45
  },
  {
    id: "2",
    categoriaId: "2",
    marcaId: "2",
    modeloId: "3",
    versao: "xDrive30i",
    tipoCombustivel: "GASOLINA",
    cor: "Azul",
    capacidadePassageiros: 5,
    placa: "XYZ-5678",
    blindagem: {
      temBlindagem: false,
      parcelado: false
    },
    entrada: 80000,
    valorTotalCompra: 320000,
    modalidadeCompra: "A_VISTA",
    kmAtual: 12000,
    capacidadeTanque: 65,
    status: "ALUGADO",
    dataCadastro: "2024-02-01T14:30:00Z",
    categoriaNome: "SUV",
    marcaNome: "BMW",
    modeloNome: "X3",
    proximaManutencao: "2024-08-01",
    diasParaManutencao: 120
  },
  {
    id: "3",
    categoriaId: "3",
    marcaId: "1",
    modeloId: "2",
    versao: "SR 2.8 4x4",
    tipoCombustivel: "DIESEL",
    cor: "Branco",
    capacidadePassageiros: 5,
    placa: "HIL-9876",
    blindagem: {
      temBlindagem: false,
      parcelado: false
    },
    entrada: 35000,
    valorTotalCompra: 180000,
    modalidadeCompra: "FINANCIAMENTO",
    financiamento: {
      numeroParcelas: 60,
      taxaJuros: 1.5,
      valorTotalComJuros: 200000,
      parcelasPagas: 24,
      parcelasPendentes: 36
    },
    kmAtual: 78000,
    capacidadeTanque: 80,
    status: "MANUTENCAO",
    dataCadastro: "2023-12-10T09:15:00Z",
    categoriaNome: "Pickup",
    marcaNome: "Toyota",
    modeloNome: "Hilux",
    proximaManutencao: "2024-05-20",
    diasParaManutencao: 15
  }
];

const veiculos = [...mockVeiculos];

export const veiculoService = {
  async listar(filtros: BuscaVeiculo = { pagina: 1, limite: 10 }): Promise<{
    dados: VeiculoListItem[];
    total: number;
    totalPaginas: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let dadosFiltrados = [...veiculos];

    if (filtros.termo) {
      const termoLower = filtros.termo.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(veiculo =>
        veiculo.placa?.toLowerCase().includes(termoLower) ||
        veiculo.marcaNome?.toLowerCase().includes(termoLower) ||
        veiculo.modeloNome?.toLowerCase().includes(termoLower) ||
        veiculo.categoriaNome?.toLowerCase().includes(termoLower) ||
        veiculo.versao.toLowerCase().includes(termoLower)
      );
    }

    if (filtros.categoriaId) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.categoriaId === filtros.categoriaId);
    }

    if (filtros.marcaId) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.marcaId === filtros.marcaId);
    }

    if (filtros.modeloId) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.modeloId === filtros.modeloId);
    }

    if (filtros.tipoCombustivel) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.tipoCombustivel === filtros.tipoCombustivel);
    }

    if (filtros.status) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.status === filtros.status);
    }

    if (filtros.temBlindagem !== undefined) {
      dadosFiltrados = dadosFiltrados.filter(veiculo => veiculo.blindagem.temBlindagem === filtros.temBlindagem);
    }

    const pagina = filtros.pagina || 1;
    const limite = filtros.limite || 10;
    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite;

    const paginados = dadosFiltrados.slice(inicio, fim);

    return {
      dados: paginados,
      total: dadosFiltrados.length,
      totalPaginas: Math.ceil(dadosFiltrados.length / limite)
    };
  },

  async buscarPorId(id: string): Promise<Veiculo | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const veiculo = veiculos.find(v => v.id === id);
    return veiculo || null;
  },

  async criar(dados: VeiculoFormData): Promise<Veiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const novoVeiculo: Veiculo = {
      id: Math.random().toString(36).substr(2, 9),
      ...dados,
      dataCadastro: new Date().toISOString()
    };

    veiculos.push(novoVeiculo);
    return novoVeiculo;
  },

  async atualizar(id: string, dados: Partial<VeiculoFormData>): Promise<Veiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = veiculos.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error("Veículo não encontrado");
    }

    veiculos[index] = {
      ...veiculos[index],
      ...dados
    };

    return veiculos[index];
  },

  async excluir(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = veiculos.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error("Veículo não encontrado");
    }

    veiculos.splice(index, 1);
  },

  async atualizarKm(id: string, novoKm: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const index = veiculos.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error("Veículo não encontrado");
    }

    veiculos[index].kmAtual = novoKm;
  },

  async importarCSV(arquivo: File): Promise<ImportacaoVeiculoResult> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const resultado: ImportacaoVeiculoResult = {
      sucesso: [],
      erros: []
    };

    // Simulação de processamento de CSV
    const novoVeiculo: Veiculo = {
      id: Math.random().toString(36).substr(2, 9),
      categoriaId: "1",
      marcaId: "1",
      modeloId: "1",
      versao: "Importado CSV",
      tipoCombustivel: "GASOLINA",
      cor: "Importado",
      capacidadePassageiros: 5,
      placa: "IMP-2024",
      blindagem: { temBlindagem: false, parcelado: false },
      entrada: 30000,
      valorTotalCompra: 90000,
      modalidadeCompra: "A_VISTA",
      kmAtual: 0,
      capacidadeTanque: 50,
      status: "DISPONIVEL",
      dataCadastro: new Date().toISOString()
    };

    veiculos.push(novoVeiculo);
    resultado.sucesso.push(novoVeiculo);

    return resultado;
  },

  async exportarCSV(): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const headers = [
      "ID", "Categoria", "Marca", "Modelo", "Versão", "Combustível",
      "Cor", "PAX", "Placa", "Blindado", "Valor Blindagem", "KM Atual",
      "Entrada", "Valor Total", "Modalidade", "Status", "Data Cadastro"
    ];

    const linhas = [
      headers.join(","),
      ...veiculos.map(veiculo => [
        veiculo.id,
        `"${veiculo.categoriaNome || ""}"`,
        `"${veiculo.marcaNome || ""}"`,
        `"${veiculo.modeloNome || ""}"`,
        `"${veiculo.versao}"`,
        veiculo.tipoCombustivel,
        `"${veiculo.cor}"`,
        veiculo.capacidadePassageiros,
        `"${veiculo.placa || ""}"`,
        veiculo.blindagem.temBlindagem ? "SIM" : "NÃO",
        veiculo.blindagem.valor || 0,
        veiculo.kmAtual,
        veiculo.entrada,
        veiculo.valorTotalCompra,
        veiculo.modalidadeCompra,
        veiculo.status,
        veiculo.dataCadastro
      ].join(","))
    ];

    const csvContent = linhas.join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },

  async obterModeloCSV(): Promise<Blob> {
    const headers = [
      "categoria_id", "marca_id", "modelo_id", "versao", "tipo_combustivel",
      "cor", "capacidade_passageiros", "placa", "tem_blindagem", "valor_blindagem",
      "entrada", "valor_total_compra", "modalidade_compra", "km_atual", "capacidade_tanque", "status"
    ];

    const exemplo = [
      "1", "1", "1", "2.0 GLi", "GASOLINA", "Prata", "5", "ABC-1234",
      "true", "45000", "25000", "85000", "FINANCIAMENTO", "45000", "55", "DISPONIVEL"
    ];

    const csvContent = [
      headers.join(","),
      exemplo.join(",")
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },

  // Estatísticas para dashboard
  async obterEstatisticas(): Promise<{
    total: number;
    disponiveis: number;
    alugados: number;
    manutencao: number;
    indisponiveis: number;
    proximasManutencoes: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const total = veiculos.length;
    const disponiveis = veiculos.filter(v => v.status === "DISPONIVEL").length;
    const alugados = veiculos.filter(v => v.status === "ALUGADO").length;
    const manutencao = veiculos.filter(v => v.status === "MANUTENCAO").length;
    const indisponiveis = veiculos.filter(v => v.status === "INDISPONIVEL").length;

    // Próximas manutenções (próximos 30 dias)
    const hoje = new Date();
    const proximoMes = new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000);
    const proximasManutencoes = veiculos.filter(v => {
      if (v.proximaManutencao) {
        const dataManutencao = new Date(v.proximaManutencao);
        return dataManutencao >= hoje && dataManutencao <= proximoMes;
      }
      return false;
    }).length;

    return {
      total,
      disponiveis,
      alugados,
      manutencao,
      indisponiveis,
      proximasManutencoes
    };
  }
};