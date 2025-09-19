import type {
  MarcaVeiculo,
  ModeloVeiculo,
  MarcaVeiculoFormData,
  ModeloVeiculoFormData,
  BuscaMarcaModelo,
  MarcaVeiculoListItem,
  ModeloVeiculoListItem,
  ImportacaoMarcaModeloResult,
  ItemManutencao
} from "../types";

// Mock data para desenvolvimento
const mockMarcas: MarcaVeiculoListItem[] = [
  {
    id: "1",
    nome: "Toyota",
    observacao: "Marca japonesa, conhecida pela confiabilidade",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalModelos: 5
  },
  {
    id: "2",
    nome: "BMW",
    observacao: "Marca alemã premium",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalModelos: 3
  },
  {
    id: "3",
    nome: "Mercedes-Benz",
    observacao: "Marca alemã de luxo",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    totalModelos: 4
  }
];

const mockModelos: ModeloVeiculoListItem[] = [
  {
    id: "1",
    marcaId: "1",
    nome: "Corolla",
    observacao: "Sedan médio, muito popular",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    marcaNome: "Toyota",
    totalVeiculos: 8,
    itensManutencao: [
      {
        id: "1",
        nome: "Troca de óleo",
        tipo: "QUILOMETRAGEM",
        valor: 10000,
        descricao: "Troca de óleo do motor"
      },
      {
        id: "2",
        nome: "Revisão completa",
        tipo: "TEMPO",
        valor: 12,
        descricao: "Revisão completa anual"
      }
    ]
  },
  {
    id: "2",
    marcaId: "1",
    nome: "Hilux",
    observacao: "Pickup robusta",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    marcaNome: "Toyota",
    totalVeiculos: 3
  },
  {
    id: "3",
    marcaId: "2",
    nome: "X3",
    observacao: "SUV premium",
    status: "ATIVO",
    dataCadastro: "2024-01-15T10:00:00Z",
    marcaNome: "BMW",
    totalVeiculos: 2
  }
];

const marcas = [...mockMarcas];
const modelos = [...mockModelos];

export const marcaModeloService = {
  // CRUD Marcas
  async listarMarcas(filtros: BuscaMarcaModelo = {}): Promise<{
    dados: MarcaVeiculoListItem[];
    total: number;
    totalPaginas: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let dadosFiltrados = [...marcas];

    if (filtros.termo) {
      const termoLower = filtros.termo.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(marca =>
        marca.nome.toLowerCase().includes(termoLower) ||
        (marca.observacao && marca.observacao.toLowerCase().includes(termoLower))
      );
    }

    if (filtros.status) {
      dadosFiltrados = dadosFiltrados.filter(marca => marca.status === filtros.status);
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

  async buscarMarcaPorId(id: string): Promise<MarcaVeiculo | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const marca = marcas.find(m => m.id === id);
    return marca || null;
  },

  async criarMarca(dados: MarcaVeiculoFormData): Promise<MarcaVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const novaMarca: MarcaVeiculo = {
      id: Math.random().toString(36).substr(2, 9),
      ...dados,
      dataCadastro: new Date().toISOString()
    };

    marcas.push(novaMarca);
    return novaMarca;
  },

  async atualizarMarca(id: string, dados: Partial<MarcaVeiculoFormData>): Promise<MarcaVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = marcas.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error("Marca não encontrada");
    }

    marcas[index] = {
      ...marcas[index],
      ...dados
    };

    return marcas[index];
  },

  async excluirMarca(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = marcas.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error("Marca não encontrada");
    }

    // Verificar se há modelos associados
    const modelosAssociados = modelos.filter(modelo => modelo.marcaId === id);
    if (modelosAssociados.length > 0) {
      throw new Error("Não é possível excluir marca com modelos associados");
    }

    marcas.splice(index, 1);
  },

  // CRUD Modelos
  async listarModelos(filtros: BuscaMarcaModelo = {}): Promise<{
    dados: ModeloVeiculoListItem[];
    total: number;
    totalPaginas: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let dadosFiltrados = [...modelos];

    if (filtros.termo) {
      const termoLower = filtros.termo.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(modelo =>
        modelo.nome.toLowerCase().includes(termoLower) ||
        (modelo.observacao && modelo.observacao.toLowerCase().includes(termoLower)) ||
        (modelo.marcaNome && modelo.marcaNome.toLowerCase().includes(termoLower))
      );
    }

    if (filtros.marcaId) {
      dadosFiltrados = dadosFiltrados.filter(modelo => modelo.marcaId === filtros.marcaId);
    }

    if (filtros.status) {
      dadosFiltrados = dadosFiltrados.filter(modelo => modelo.status === filtros.status);
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

  async buscarModeloPorId(id: string): Promise<ModeloVeiculo | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const modelo = modelos.find(m => m.id === id);
    return modelo || null;
  },

  async criarModelo(dados: ModeloVeiculoFormData): Promise<ModeloVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const novoModelo: ModeloVeiculo = {
      id: Math.random().toString(36).substr(2, 9),
      ...dados,
      dataCadastro: new Date().toISOString()
    };

    modelos.push(novoModelo);
    return novoModelo;
  },

  async atualizarModelo(id: string, dados: Partial<ModeloVeiculoFormData>): Promise<ModeloVeiculo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = modelos.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error("Modelo não encontrado");
    }

    modelos[index] = {
      ...modelos[index],
      ...dados
    };

    return modelos[index];
  },

  async excluirModelo(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = modelos.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error("Modelo não encontrado");
    }

    modelos.splice(index, 1);
  },

  // Importação e Exportação CSV
  async importarCSV(arquivo: File): Promise<ImportacaoMarcaModeloResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const resultado: ImportacaoMarcaModeloResult = {
      sucesso: {
        marcas: [],
        modelos: []
      },
      erros: []
    };

    // Simulação de processamento de CSV
    const novaMarca: MarcaVeiculo = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "Marca Importada",
      observacao: "Marca criada via importação CSV",
      status: "ATIVO",
      dataCadastro: new Date().toISOString()
    };

    const novoModelo: ModeloVeiculo = {
      id: Math.random().toString(36).substr(2, 9),
      marcaId: novaMarca.id,
      nome: "Modelo Importado",
      observacao: "Modelo criado via importação CSV",
      status: "ATIVO",
      dataCadastro: new Date().toISOString()
    };

    marcas.push(novaMarca);
    modelos.push(novoModelo);

    resultado.sucesso.marcas.push(novaMarca);
    resultado.sucesso.modelos.push(novoModelo);

    return resultado;
  },

  async exportarCSV(): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const headers = ["ID Marca", "Nome Marca", "Observação Marca", "Status Marca", "ID Modelo", "Nome Modelo", "Observação Modelo", "Status Modelo", "Data Cadastro"];
    const linhas = [headers.join(",")];

    // Exportar marcas com seus modelos
    for (const marca of marcas) {
      const modelosDaMarca = modelos.filter(m => m.marcaId === marca.id);

      if (modelosDaMarca.length === 0) {
        // Marca sem modelos
        linhas.push([
          marca.id,
          `"${marca.nome}"`,
          `"${marca.observacao || ""}"`,
          marca.status,
          "",
          "",
          "",
          "",
          marca.dataCadastro
        ].join(","));
      } else {
        // Marca com modelos
        for (const modelo of modelosDaMarca) {
          linhas.push([
            marca.id,
            `"${marca.nome}"`,
            `"${marca.observacao || ""}"`,
            marca.status,
            modelo.id,
            `"${modelo.nome}"`,
            `"${modelo.observacao || ""}"`,
            modelo.status,
            modelo.dataCadastro
          ].join(","));
        }
      }
    }

    const csvContent = linhas.join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },

  async obterModeloCSV(): Promise<Blob> {
    const headers = ["nome_marca", "observacao_marca", "status_marca", "nome_modelo", "observacao_modelo", "status_modelo"];
    const exemplo = ["Toyota", "Marca japonesa confiável", "ATIVO", "Corolla", "Sedan médio popular", "ATIVO"];

    const csvContent = [
      headers.join(","),
      exemplo.join(",")
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },

  // Buscar apenas marcas ativas para seleção
  async listarMarcasAtivas(): Promise<MarcaVeiculo[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return marcas.filter(marca => marca.status === "ATIVO");
  }
};