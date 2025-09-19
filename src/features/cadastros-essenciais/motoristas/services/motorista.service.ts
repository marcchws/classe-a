import {
  Motorista,
  BuscaMotorista,
  motoristaSchema,
  StatusMotorista,
  CategoriaCnh,
  GrupoPrioridade,
  Idioma
} from "@/lib/schemas";

// Mock data - substituir por integração real com API/banco de dados
const mockMotoristas: Motorista[] = [
  {
    id: "1",
    nomeCompleto: "João Silva Santos",
    cpf: "123.456.789-00",
    telefone: "(11) 99999-9999",
    endereco: {
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Apto 101",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
    },
    cnh: {
      numero: "12345678901",
      categoria: "B" as CategoriaCnh,
      dataValidade: "2025-12-31",
    },
    documentos: [
      {
        tipo: "CNH",
        url: "/docs/joao-cnh.pdf",
        nome: "joao-cnh.pdf",
        dataUpload: "2024-01-15T10:00:00Z",
      },
      {
        tipo: "ANTECEDENTES",
        url: "/docs/joao-antecedentes.pdf",
        nome: "joao-antecedentes.pdf",
        dataUpload: "2024-01-15T10:05:00Z",
      },
      {
        tipo: "CERTIFICADO_DIRECAO_EXECUTIVA",
        url: "/docs/joao-cert-exec.pdf",
        nome: "joao-cert-exec.pdf",
        dataUpload: "2024-01-15T10:10:00Z",
      },
    ],
    idiomasFluentes: ["PORTUGUES", "INGLES"] as Idioma[],
    categoriaServico: ["ATE_8_PASSAGEIROS", "BILINGUE"],
    grupoPrioridade: "PREFERENCIAL" as GrupoPrioridade,
    regiaoAtendimento: {
      cidade: "São Paulo",
      bairros: ["Vila Madalena", "Pinheiros", "Jardins"],
    },
    notasInternas: [
      {
        tipo: "ELOGIO",
        data: "2024-03-15",
        descricao: "Cliente elogiou a pontualidade e cortesia do motorista.",
        autorNome: "Maria Silva",
        clienteRelacionado: "Empresa ABC Ltda",
      },
    ],
    bloqueiosPorCliente: [],
    historicoServicos: [
      {
        contratoId: "contrato-1",
        clienteNome: "Empresa ABC Ltda",
        dataServico: "2024-03-20",
        valorRecebido: 350.00,
        avaliacaoCliente: 5,
        observacoes: "Serviço executado com excelência",
      },
    ],
    status: "ATIVO" as StatusMotorista,
    dataCadastro: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    nomeCompleto: "Maria Oliveira Costa",
    cpf: "987.654.321-00",
    telefone: "(11) 88888-8888",
    endereco: {
      logradouro: "Avenida Paulista",
      numero: "1000",
      complemento: "",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01310-100",
    },
    cnh: {
      numero: "98765432100",
      categoria: "D" as CategoriaCnh,
      dataValidade: "2026-06-30",
    },
    documentos: [
      {
        tipo: "CNH",
        url: "/docs/maria-cnh.pdf",
        nome: "maria-cnh.pdf",
        dataUpload: "2024-02-20T10:00:00Z",
      },
      {
        tipo: "ANTECEDENTES",
        url: "/docs/maria-antecedentes.pdf",
        nome: "maria-antecedentes.pdf",
        dataUpload: "2024-02-20T10:05:00Z",
      },
      {
        tipo: "CERTIFICADO_TRANSPORTE_PASSAGEIROS",
        url: "/docs/maria-cert-transporte.pdf",
        nome: "maria-cert-transporte.pdf",
        dataUpload: "2024-02-20T10:10:00Z",
      },
    ],
    idiomasFluentes: ["PORTUGUES"] as Idioma[],
    categoriaServico: ["VANS", "MONOLINGUE"],
    grupoPrioridade: "APOIO" as GrupoPrioridade,
    regiaoAtendimento: {
      cidade: "São Paulo",
      bairros: ["Bela Vista", "Centro", "Liberdade"],
    },
    notasInternas: [],
    bloqueiosPorCliente: [],
    historicoServicos: [],
    status: "ATIVO" as StatusMotorista,
    dataCadastro: "2024-02-20T08:00:00Z",
  },
];

export class MotoristaService {
  private static readonly STORAGE_KEY = "classe-a-motoristas";

  // Método para classificar automaticamente o motorista baseado na CNH e idiomas
  private static classificarMotorista(motorista: Omit<Motorista, 'categoriaServico'>): ("ATE_8_PASSAGEIROS" | "VANS" | "MONOLINGUE" | "BILINGUE")[] {
    const categorias: ("ATE_8_PASSAGEIROS" | "VANS" | "MONOLINGUE" | "BILINGUE")[] = [];

    // Classificação por CNH
    if (motorista.cnh.categoria === "B") {
      categorias.push("ATE_8_PASSAGEIROS");
    } else if (motorista.cnh.categoria === "D") {
      categorias.push("ATE_8_PASSAGEIROS", "VANS");
    }

    // Classificação por idiomas
    const temIngles = motorista.idiomasFluentes.includes("INGLES");
    const temOutrosIdiomas = motorista.idiomasFluentes.some(
      idioma => idioma !== "PORTUGUES" && idioma !== "INGLES"
    );

    if (temIngles || temOutrosIdiomas) {
      categorias.push("BILINGUE");
    } else {
      categorias.push("MONOLINGUE");
    }

    return categorias;
  }

  static async listarMotoristas(filtros?: BuscaMotorista): Promise<{
    motoristas: Motorista[];
    total: number;
    pagina: number;
    totalPaginas: number;
  }> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    let motoristasFiltrados = [...mockMotoristas];

    if (filtros?.termo) {
      const termo = filtros.termo.toLowerCase();
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista =>
          motorista.nomeCompleto.toLowerCase().includes(termo) ||
          motorista.cpf.includes(termo)
      );
    }

    if (filtros?.categoria) {
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista => motorista.cnh.categoria === filtros.categoria
      );
    }

    if (filtros?.grupoPrioridade) {
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista => motorista.grupoPrioridade === filtros.grupoPrioridade
      );
    }

    if (filtros?.status) {
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista => motorista.status === filtros.status
      );
    }

    if (filtros?.regiaoAtendimento) {
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista => motorista.regiaoAtendimento.cidade.toLowerCase().includes(
          filtros.regiaoAtendimento!.toLowerCase()
        )
      );
    }

    if (filtros?.idioma) {
      motoristasFiltrados = motoristasFiltrados.filter(
        motorista => motorista.idiomasFluentes.includes(filtros.idioma!)
      );
    }

    const pagina = filtros?.pagina || 1;
    const limite = filtros?.limite || 10;
    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite;

    const total = motoristasFiltrados.length;
    const totalPaginas = Math.ceil(total / limite);
    const motoristas = motoristasFiltrados.slice(inicio, fim);

    return {
      motoristas,
      total,
      pagina,
      totalPaginas,
    };
  }

  static async obterMotoristaPorId(id: string): Promise<Motorista | null> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));

    const motorista = mockMotoristas.find(m => m.id === id);
    return motorista || null;
  }

  static async criarMotorista(dadosMotorista: Omit<Motorista, 'id' | 'dataCadastro' | 'categoriaServico'>): Promise<Motorista> {
    // Validar dados
    const dadosValidados = motoristaSchema.parse({
      ...dadosMotorista,
      id: undefined,
      dataCadastro: undefined,
      categoriaServico: undefined,
    });

    // Gerar ID e data de cadastro
    const novoId = String(mockMotoristas.length + 1);
    const dataCadastro = new Date().toISOString();

    // Classificar automaticamente
    const categoriaServico = this.classificarMotorista(dadosValidados);

    const novoMotorista: Motorista = {
      ...dadosValidados,
      id: novoId,
      dataCadastro,
      categoriaServico,
    };

    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    mockMotoristas.push(novoMotorista);

    return novoMotorista;
  }

  static async atualizarMotorista(id: string, dadosAtualizados: Partial<Motorista>): Promise<Motorista> {
    const indice = mockMotoristas.findIndex(m => m.id === id);
    if (indice === -1) {
      throw new Error("Motorista não encontrado");
    }

    // Merge dos dados
    const motoristaAtualizado = {
      ...mockMotoristas[indice],
      ...dadosAtualizados,
      id, // Garantir que o ID não seja alterado
    };

    // Reclassificar se necessário
    if (dadosAtualizados.cnh || dadosAtualizados.idiomasFluentes) {
      motoristaAtualizado.categoriaServico = this.classificarMotorista(motoristaAtualizado);
    }

    // Validar dados atualizados
    const dadosValidados = motoristaSchema.parse(motoristaAtualizado);

    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    mockMotoristas[indice] = dadosValidados;

    return dadosValidados;
  }

  static async excluirMotorista(id: string): Promise<void> {
    const indice = mockMotoristas.findIndex(m => m.id === id);
    if (indice === -1) {
      throw new Error("Motorista não encontrado");
    }

    // Simular exclusão
    await new Promise(resolve => setTimeout(resolve, 500));
    mockMotoristas.splice(indice, 1);
  }

  static async alterarStatusMotorista(id: string, novoStatus: StatusMotorista): Promise<Motorista> {
    return this.atualizarMotorista(id, { status: novoStatus });
  }

  static async adicionarNota(id: string, nota: Omit<import("@/lib/schemas").NotaInterna, 'data' | 'autorNome'>): Promise<Motorista> {
    const motorista = mockMotoristas.find(m => m.id === id);
    if (!motorista) {
      throw new Error("Motorista não encontrado");
    }

    const novaNota = {
      ...nota,
      data: new Date().toISOString(),
      autorNome: "Usuário Atual", // Em produção, pegar do contexto de autenticação
    };

    const notasAtualizadas = [...(motorista.notasInternas || []), novaNota];

    return this.atualizarMotorista(id, { notasInternas: notasAtualizadas });
  }

  static async adicionarBloqueio(id: string, bloqueio: Omit<import("@/lib/schemas").BloqueioCliente, 'dataBloqueio' | 'bloqueadoPorNome'>): Promise<Motorista> {
    const motorista = mockMotoristas.find(m => m.id === id);
    if (!motorista) {
      throw new Error("Motorista não encontrado");
    }

    const novoBloqueio = {
      ...bloqueio,
      dataBloqueio: new Date().toISOString(),
      bloqueadoPorNome: "Usuário Atual", // Em produção, pegar do contexto de autenticação
    };

    const bloqueiosAtualizados = [...(motorista.bloqueiosPorCliente || []), novoBloqueio];

    return this.atualizarMotorista(id, { bloqueiosPorCliente: bloqueiosAtualizados });
  }

  static async removerBloqueio(id: string, clienteId: string): Promise<Motorista> {
    const motorista = mockMotoristas.find(m => m.id === id);
    if (!motorista) {
      throw new Error("Motorista não encontrado");
    }

    const bloqueiosAtualizados = (motorista.bloqueiosPorCliente || []).filter(
      bloqueio => bloqueio.clienteId !== clienteId
    );

    return this.atualizarMotorista(id, { bloqueiosPorCliente: bloqueiosAtualizados });
  }
}