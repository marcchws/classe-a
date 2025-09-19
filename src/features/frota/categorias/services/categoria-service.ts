import type {
  CategoriaVeiculo,
  BuscaCategoriaVeiculo,
  CategoriaVeiculoFormData,
  ImportacaoCategoriaResult,
  CategoriaVeiculoListItem
} from "../types";

// Mock data para desenvolvimento
const mockCategorias: CategoriaVeiculoListItem[] = [
  {
    id: "1",
    nome: "Sedan",
    descricao: "Veículos de passeio de 4 portas, ideais para executivos",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalVeiculos: 15
  },
  {
    id: "2",
    nome: "SUV",
    descricao: "Veículos utilitários esportivos, maior espaço interno",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalVeiculos: 8
  },
  {
    id: "3",
    nome: "Van",
    descricao: "Veículos para transporte de grupos até 15 passageiros",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalVeiculos: 5
  },
  {
    id: "4",
    nome: "Pickup",
    descricao: "Veículos para transporte misto, caçamba para cargas",
    status: "INATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalVeiculos: 2
  }
];

const categorias = [...mockCategorias];

export const categoriaService = {
  async listar(filtros: Partial<BuscaCategoriaVeiculo> = {}): Promise<{
    dados: CategoriaVeiculoListItem[];
    total: number;
    totalPaginas: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let dadosFiltrados = [...categorias];

    if (filtros.termo) {
      const termoLower = filtros.termo.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(categoria =>
        categoria.nome.toLowerCase().includes(termoLower) ||
        categoria.descricao.toLowerCase().includes(termoLower)
      );
    }

    if (filtros.status) {
      dadosFiltrados = dadosFiltrados.filter(categoria => categoria.status === filtros.status);
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

  async buscarPorId(id: string): Promise<CategoriaVeiculo | null> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const categoria = categorias.find(c => c.id === id);
    return categoria || null;
  },

  async criar(dados: CategoriaVeiculoFormData): Promise<CategoriaVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const novaCategoria: CategoriaVeiculoListItem = {
      id: Math.random().toString(36).substr(2, 9),
      nome: dados.nome,
      descricao: dados.descricao,
      status: dados.status,
      dataCadastro: new Date().toISOString(),
      totalVeiculos: 0
    };

    categorias.push(novaCategoria);

    return novaCategoria;
  },

  async atualizar(id: string, dados: Partial<CategoriaVeiculoFormData>): Promise<CategoriaVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = categorias.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }

    categorias[index] = {
      ...categorias[index],
      ...dados
    };

    return categorias[index];
  },

  async excluir(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = categorias.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }

    categorias.splice(index, 1);
  },

  async importarCSV(arquivo: File): Promise<ImportacaoCategoriaResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulação de processamento de CSV
    const resultado: ImportacaoCategoriaResult = {
      sucesso: [],
      erros: []
    };

    // Em uma implementação real, aqui seria feito o parsing do CSV
    // Por ora, retornamos um resultado simulado
    const novaCategoria: CategoriaVeiculoListItem = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "Categoria Importada",
      descricao: "Categoria criada via importação CSV",
      status: "ATIVO",
      dataCadastro: new Date().toISOString(),
      totalVeiculos: 0
    };

    categorias.push(novaCategoria);
    resultado.sucesso.push(novaCategoria);

    return resultado;
  },

  async exportarCSV(): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const headers = ["ID", "Nome", "Descrição", "Status", "Data Cadastro"];
    const linhas = [
      headers.join(","),
      ...categorias.map(categoria => [
        categoria.id,
        `"${categoria.nome}"`,
        `"${categoria.descricao}"`,
        categoria.status,
        categoria.dataCadastro
      ].join(","))
    ];

    const csvContent = linhas.join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },

  async obterModeloCSV(): Promise<Blob> {
    const headers = ["nome", "descricao", "status"];
    const exemplo = ["Sedan", "Veículos de passeio executivo", "ATIVO"];

    const csvContent = [
      headers.join(","),
      exemplo.join(",")
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  }
};