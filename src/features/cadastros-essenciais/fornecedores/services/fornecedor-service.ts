import type {
  Fornecedor,
  FornecedorFormData,
  FornecedorTableItem,
  BuscaFornecedor
} from "@/types/fornecedor";

// Mock data para demonstração
const mockFornecedores: Fornecedor[] = [
  {
    tipo: "VEICULO",
    razaoSocial: "Locadora Premium LTDA",
    nomeFantasia: "Premium Cars",
    cnpj: "12.345.678/0001-90",
    contatoResponsavel: {
      nome: "João Silva",
      telefone: "(11) 99999-9999",
      email: "joao@premiumcars.com",
    },
    contatoFinanceiro: {
      nome: "Ana Silva",
      telefone: "(11) 88888-8888",
      email: "ana@premiumcars.com",
    },
    enderecoCompleto: {
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Sala 101",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
    },
    valorRepasseNegociado: 150.00,
    status: "ATIVO",
    dataCadastro: "2024-01-15",
  },
  {
    tipo: "SERVICO",
    razaoSocial: "Oficina Master ME",
    nomeFantasia: "Master Auto",
    cnpj: "98.765.432/0001-10",
    contatoResponsavel: {
      nome: "Maria Santos",
      telefone: "(11) 88888-8888",
      email: "maria@masterauto.com",
    },
    contatoFinanceiro: {
      nome: "Carlos Santos",
      telefone: "(11) 77777-7777",
      email: "carlos@masterauto.com",
    },
    enderecoCompleto: {
      logradouro: "Avenida Brasil",
      numero: "456",
      bairro: "Industrial",
      cidade: "São Paulo",
      estado: "SP",
      cep: "12345-678",
    },
    campoAtuacao: ["MECANICA", "ELETRICA"],
    status: "ATIVO",
    dataCadastro: "2024-02-20",
  },
];

export class FornecedorService {
  private static instance: FornecedorService;
  private fornecedores: Map<string, Fornecedor> = new Map();

  constructor() {
    // Inicializar com dados mock
    mockFornecedores.forEach((fornecedor, index) => {
      const id = (index + 1).toString();
      this.fornecedores.set(id, { ...fornecedor });
    });
  }

  static getInstance(): FornecedorService {
    if (!FornecedorService.instance) {
      FornecedorService.instance = new FornecedorService();
    }
    return FornecedorService.instance;
  }

  async buscarFornecedores(filtros: BuscaFornecedor = { pagina: 1, limite: 10 }): Promise<{
    fornecedores: FornecedorTableItem[];
    total: number;
  }> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    let fornecedoresList = Array.from(this.fornecedores.entries()).map(([id, fornecedor]) => ({
      id,
      ...fornecedor,
    }));

    // Aplicar filtros
    if (filtros.termo) {
      const termo = filtros.termo.toLowerCase();
      fornecedoresList = fornecedoresList.filter(fornecedor =>
        fornecedor.razaoSocial.toLowerCase().includes(termo) ||
        fornecedor.nomeFantasia?.toLowerCase().includes(termo) ||
        fornecedor.cnpj.includes(termo) ||
        fornecedor.contatoResponsavel.nome.toLowerCase().includes(termo)
      );
    }

    if (filtros.tipo) {
      fornecedoresList = fornecedoresList.filter(fornecedor => fornecedor.tipo === filtros.tipo);
    }

    if (filtros.status) {
      fornecedoresList = fornecedoresList.filter(fornecedor => fornecedor.status === filtros.status);
    }

    if (filtros.campoAtuacao && filtros.tipo === "SERVICO") {
      fornecedoresList = fornecedoresList.filter(fornecedor =>
        "campoAtuacao" in fornecedor &&
        fornecedor.campoAtuacao?.includes(filtros.campoAtuacao!)
      );
    }

    // Paginação
    const { pagina = 1, limite = 10 } = filtros;
    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite;
    const fornecedoresPaginados = fornecedoresList.slice(inicio, fim);

    return {
      fornecedores: fornecedoresPaginados.map(fornecedor => ({
        id: fornecedor.id,
        tipo: fornecedor.tipo,
        razaoSocial: fornecedor.razaoSocial,
        nomeFantasia: fornecedor.nomeFantasia,
        cnpj: fornecedor.cnpj,
        contatoResponsavel: fornecedor.contatoResponsavel,
        status: fornecedor.status,
        dataCadastro: fornecedor.dataCadastro || new Date().toISOString(),
      })),
      total: fornecedoresList.length,
    };
  }

  async buscarFornecedorPorId(id: string): Promise<Fornecedor | null> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 300));

    const fornecedor = this.fornecedores.get(id);
    return fornecedor || null;
  }

  async criarFornecedor(dados: FornecedorFormData): Promise<string> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = (this.fornecedores.size + 1).toString();
    const novoFornecedor = {
      ...dados,
      dataCadastro: new Date().toISOString(),
    } as Fornecedor;

    this.fornecedores.set(id, novoFornecedor);
    return id;
  }

  async atualizarFornecedor(id: string, dados: Partial<FornecedorFormData>): Promise<boolean> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fornecedorExistente = this.fornecedores.get(id);
    if (!fornecedorExistente) {
      return false;
    }

    const fornecedorAtualizado = {
      ...fornecedorExistente,
      ...dados,
    };

    this.fornecedores.set(id, fornecedorAtualizado as Fornecedor);
    return true;
  }

  async excluirFornecedor(id: string): Promise<boolean> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    return this.fornecedores.delete(id);
  }

  async alterarStatusFornecedor(id: string, status: "ATIVO" | "INATIVO"): Promise<boolean> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 300));

    const fornecedor = this.fornecedores.get(id);
    if (!fornecedor) {
      return false;
    }

    fornecedor.status = status;
    this.fornecedores.set(id, fornecedor);
    return true;
  }

  async obterEstatisticas(): Promise<{
    total: number;
    veiculos: number;
    servicos: number;
    ativos: number;
  }> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 200));

    const fornecedoresList = Array.from(this.fornecedores.values());

    return {
      total: fornecedoresList.length,
      veiculos: fornecedoresList.filter(f => f.tipo === "VEICULO").length,
      servicos: fornecedoresList.filter(f => f.tipo === "SERVICO").length,
      ativos: fornecedoresList.filter(f => f.status === "ATIVO").length,
    };
  }
}

// Instância singleton do serviço
export const fornecedorService = FornecedorService.getInstance();