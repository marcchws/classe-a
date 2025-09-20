import type {
  Contrato,
  ContratoTableItem,
  BuscaContrato,
  ContratoLocacao,
  ContratoServico,
  ContratoEvento,
  ContratoTerceirizacao,
} from "../types";

// Mock data - substitua pela chamada real da API
const mockContratos: ContratoTableItem[] = [
  {
    id: "contrato-001",
    tipo: "LOCACAO",
    clienteNome: "João Silva",
    locatarioNome: "João Silva",
    veiculoInfo: "BMW X5 - ABC1234",
    motoristaInfo: "Carlos Santos",
    dataInicio: "2024-01-15T08:00:00Z",
    dataFim: "2024-01-20T18:00:00Z",
    valor: 2500.00,
    status: "ATIVO",
    dataCriacao: "2024-01-10T10:00:00Z",
  },
  {
    id: "contrato-002",
    tipo: "SERVICO",
    clienteNome: "Empresa XYZ Ltda",
    locatarioNome: "Maria Oliveira",
    veiculoInfo: "Mercedes S-Class - DEF5678",
    motoristaInfo: "Roberto Lima",
    dataInicio: "2024-01-18T14:00:00Z",
    dataFim: "2024-01-18T22:00:00Z",
    valor: 800.00,
    status: "PENDENTE_ASSINATURA",
    dataCriacao: "2024-01-17T15:30:00Z",
  },
  {
    id: "contrato-003",
    tipo: "EVENTO",
    clienteNome: "Hotel Premium",
    locatarioNome: "Ana Costa",
    veiculoInfo: "Audi A8 - GHI9012",
    motoristaInfo: "Fernando Silva",
    dataInicio: "2024-01-25T19:00:00Z",
    dataFim: "2024-01-26T02:00:00Z",
    valor: 1200.00,
    status: "RASCUNHO",
    dataCriacao: "2024-01-20T09:15:00Z",
  },
];

export class ContratoService {
  async buscarContratos(filtros: BuscaContrato): Promise<{
    contratos: ContratoTableItem[];
    total: number;
    totalPaginas: number;
  }> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    let contratosFiltrados = [...mockContratos];

    // Aplicar filtros
    if (filtros.termo) {
      const termo = filtros.termo.toLowerCase();
      contratosFiltrados = contratosFiltrados.filter(contrato =>
        contrato.clienteNome.toLowerCase().includes(termo) ||
        contrato.locatarioNome.toLowerCase().includes(termo) ||
        contrato.veiculoInfo.toLowerCase().includes(termo) ||
        contrato.motoristaInfo?.toLowerCase().includes(termo)
      );
    }

    if (filtros.tipo) {
      contratosFiltrados = contratosFiltrados.filter(contrato => contrato.tipo === filtros.tipo);
    }

    if (filtros.status) {
      contratosFiltrados = contratosFiltrados.filter(contrato => contrato.status === filtros.status);
    }

    if (filtros.dataInicio) {
      const dataInicio = new Date(filtros.dataInicio);
      contratosFiltrados = contratosFiltrados.filter(contrato => {
        const contratoInicio = new Date(contrato.dataInicio);
        return contratoInicio >= dataInicio;
      });
    }

    if (filtros.dataFim) {
      const dataFim = new Date(filtros.dataFim);
      contratosFiltrados = contratosFiltrados.filter(contrato => {
        const contratoFim = new Date(contrato.dataFim);
        return contratoFim <= dataFim;
      });
    }

    // Paginação
    const total = contratosFiltrados.length;
    const totalPaginas = Math.ceil(total / filtros.limite);
    const inicio = (filtros.pagina - 1) * filtros.limite;
    const fim = inicio + filtros.limite;
    const contratosPaginados = contratosFiltrados.slice(inicio, fim);

    return {
      contratos: contratosPaginados,
      total,
      totalPaginas,
    };
  }

  async buscarContratoPorId(id: string): Promise<Contrato | null> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock de contrato completo - em produção, buscar da API
    const contratoMock = mockContratos.find(c => c.id === id);
    if (!contratoMock) {
      return null;
    }

    // Retornar contrato completo baseado no tipo
    const contratoBase = {
      id: contratoMock.id,
      clienteId: "cliente-001",
      locatario: {
        nome: contratoMock.locatarioNome,
        documento: "123.456.789-00",
        telefone: "(11) 99999-9999",
        email: "cliente@email.com",
      },
      veiculoId: "veiculo-001",
      condutores: [],
      dataHoraInicio: contratoMock.dataInicio,
      dataHoraFim: contratoMock.dataFim,
      servicosExtras: [],
      termos: [],
      valorContrato: contratoMock.valor,
      status: contratoMock.status,
      enviarAssinaturaAutomatica: false,
      dataCriacao: contratoMock.dataCriacao,
    };

    switch (contratoMock.tipo) {
      case "LOCACAO":
        return {
          ...contratoBase,
          tipo: "LOCACAO",
          temMotorista: !!contratoMock.motoristaInfo,
          motoristaId: contratoMock.motoristaInfo ? "motorista-001" : undefined,
          diariasCalculadas: 5,
        } as ContratoLocacao;

      case "SERVICO":
        return {
          ...contratoBase,
          tipo: "SERVICO",
          tipoServico: "TRANSFER",
          motoristaId: "motorista-001",
          passageiro: "Passageiro Exemplo",
          localAtendimento: "Aeroporto de Guarulhos",
        } as ContratoServico;

      case "EVENTO":
        return {
          ...contratoBase,
          tipo: "EVENTO",
          motoristaId: "motorista-001",
          localEvento: "Local do Evento",
          responsavelEvento: "Responsável do Evento",
          numeroConvidados: 50,
        } as ContratoEvento;

      case "TERCEIRIZACAO":
        return {
          ...contratoBase,
          tipo: "TERCEIRIZACAO",
          veiculoTerceirizado: {
            fornecedorId: "fornecedor-001",
            placa: "ABC1234",
            modelo: "BMW X5",
            valorRepasse: 500.00,
          },
        } as ContratoTerceirizacao;

      default:
        return null;
    }
  }

  async criarContrato(contrato: Omit<Contrato, "id" | "dataCriacao">): Promise<Contrato> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const novoContrato = {
      ...contrato,
      id: `contrato-${Date.now()}`,
      dataCriacao: new Date().toISOString(),
    } as Contrato;

    // Em produção, salvar na API
    mockContratos.push({
      id: novoContrato.id!,
      tipo: novoContrato.tipo,
      clienteNome: "Cliente Mock",
      locatarioNome: novoContrato.locatario.nome,
      veiculoInfo: "Veículo Mock",
      motoristaInfo: "Motorista Mock",
      dataInicio: novoContrato.dataHoraInicio,
      dataFim: novoContrato.dataHoraFim,
      valor: novoContrato.valorContrato,
      status: novoContrato.status,
      dataCriacao: novoContrato.dataCriacao!,
    });

    return novoContrato;
  }

  async atualizarContrato(id: string, dados: Partial<Contrato>): Promise<Contrato> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const contratoExistente = await this.buscarContratoPorId(id);
    if (!contratoExistente) {
      throw new Error("Contrato não encontrado");
    }

    const contratoAtualizado = {
      ...contratoExistente,
      ...dados,
      dataAtualizacao: new Date().toISOString(),
    } as Contrato;

    // Em produção, atualizar na API
    return contratoAtualizado;
  }

  async excluirContrato(id: string): Promise<boolean> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = mockContratos.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }

    // Em produção, excluir na API
    mockContratos.splice(index, 1);
    return true;
  }

  async enviarParaAssinatura(id: string): Promise<boolean> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const contrato = await this.buscarContratoPorId(id);
    if (!contrato) {
      return false;
    }

    // Atualizar status para pendente assinatura
    await this.atualizarContrato(id, {
      status: "PENDENTE_ASSINATURA",
    });

    return true;
  }

  async obterEstatisticas(): Promise<{
    total: number;
    ativos: number;
    pendentes: number;
    rascunhos: number;
    encerrados: number;
  }> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 300));

    const total = mockContratos.length;
    const ativos = mockContratos.filter(c => c.status === "ATIVO").length;
    const pendentes = mockContratos.filter(c => c.status === "PENDENTE_ASSINATURA").length;
    const rascunhos = mockContratos.filter(c => c.status === "RASCUNHO").length;
    const encerrados = mockContratos.filter(c => c.status === "ENCERRADO").length;

    return {
      total,
      ativos,
      pendentes,
      rascunhos,
      encerrados,
    };
  }
}

export const contratoService = new ContratoService();
