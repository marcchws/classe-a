import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Contrato } from "../types";

// Interface para configurações do PDF
interface PDFConfig {
  logoUrl?: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
}

// Configuração padrão da empresa
const defaultConfig: PDFConfig = {
  companyName: "Classe A Locadora",
  companyAddress: "Rua Exemplo, 123 - Centro, São Paulo - SP",
  companyPhone: "(11) 3456-7890",
  companyEmail: "contato@classealocadora.com.br",
};

// Função para gerar HTML do contrato
export function generateContractHTML(contrato: Contrato, config: PDFConfig = defaultConfig): string {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const calcularValorTotal = () => {
    const valorBase = contrato.valorContrato;
    const valorServicos = contrato.servicosExtras?.reduce(
      (total, servico) => total + (servico.valor * servico.quantidade),
      0
    ) || 0;
    return valorBase + valorServicos;
  };

  const tipoContratoLabels = {
    LOCACAO: "Locação",
    SERVICO: "Serviço",
    EVENTO: "Evento",
    TERCEIRIZACAO: "Terceirização",
  };

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contrato ${contrato.id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }

        .company-logo {
          max-height: 80px;
          margin-bottom: 10px;
        }

        .company-info {
          font-size: 12px;
          color: #666;
        }

        .contract-title {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
          text-transform: uppercase;
        }

        .contract-number {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-bottom: 30px;
        }

        .section {
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 16px;
          font-weight: bold;
          background-color: #f5f5f5;
          padding: 8px 12px;
          border-left: 4px solid #333;
          margin-bottom: 15px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-weight: bold;
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .info-value {
          font-size: 14px;
          color: #333;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .services-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .services-table th,
        .services-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .services-table th {
          background-color: #f5f5f5;
          font-weight: bold;
        }

        .financial-summary {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }

        .financial-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .financial-total {
          font-weight: bold;
          font-size: 16px;
          border-top: 1px solid #333;
          padding-top: 10px;
          margin-top: 10px;
        }

        .signatures {
          margin-top: 50px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .signature-block {
          text-align: center;
        }

        .signature-line {
          border-top: 1px solid #333;
          margin-top: 60px;
          padding-top: 5px;
          font-size: 12px;
        }

        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 11px;
          color: #666;
          text-align: center;
        }

        @media print {
          body {
            margin: 0;
            padding: 15px;
          }

          .header {
            margin-bottom: 20px;
          }

          .signatures {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${config.logoUrl ? `<img src="${config.logoUrl}" alt="Logo" class="company-logo">` : ''}
        <h1>${config.companyName}</h1>
        <div class="company-info">
          ${config.companyAddress}<br>
          Tel: ${config.companyPhone} | Email: ${config.companyEmail}
        </div>
      </div>

      <div class="contract-title">
        Contrato de ${tipoContratoLabels[contrato.tipo]}
      </div>

      <div class="contract-number">
        Contrato Nº ${contrato.id || 'NOVO'}
      </div>

      <div class="section">
        <div class="section-title">Informações do Contrato</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Data/Hora Início</div>
            <div class="info-value">
              ${format(new Date(contrato.dataHoraInicio), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">Data/Hora Fim</div>
            <div class="info-value">
              ${format(new Date(contrato.dataHoraFim), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </div>
          </div>
          ${contrato.tipo === "LOCACAO" && contrato.diariasCalculadas ? `
          <div class="info-item">
            <div class="info-label">Diárias Calculadas</div>
            <div class="info-value">${contrato.diariasCalculadas}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Dados do Locatário</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nome Completo</div>
            <div class="info-value">${contrato.locatario.nome}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Documento</div>
            <div class="info-value">${contrato.locatario.documento}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Telefone</div>
            <div class="info-value">${contrato.locatario.telefone}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">${contrato.locatario.email}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Informações do Veículo</div>
        ${contrato.tipo === "TERCEIRIZACAO" && contrato.veiculoTerceirizado ? `
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Placa</div>
            <div class="info-value">${contrato.veiculoTerceirizado.placa}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Modelo</div>
            <div class="info-value">${contrato.veiculoTerceirizado.modelo}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Valor Repasse</div>
            <div class="info-value">${formatarMoeda(contrato.veiculoTerceirizado.valorRepasse)}</div>
          </div>
        </div>
        ` : `
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="info-label">Veículo ID</div>
            <div class="info-value">${contrato.veiculoId || "A definir"}</div>
          </div>
        </div>
        `}
      </div>

      ${contrato.tipo === "SERVICO" ? `
      <div class="section">
        <div class="section-title">Informações do Serviço</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Tipo de Serviço</div>
            <div class="info-value">${contrato.tipoServico}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Passageiro</div>
            <div class="info-value">${contrato.passageiro}</div>
          </div>
          ${contrato.numeroVoo ? `
          <div class="info-item">
            <div class="info-label">Número do Voo</div>
            <div class="info-value">${contrato.numeroVoo}</div>
          </div>
          ` : ''}
          <div class="info-item full-width">
            <div class="info-label">Local de Atendimento</div>
            <div class="info-value">${contrato.localAtendimento}</div>
          </div>
        </div>
      </div>
      ` : ''}

      ${contrato.tipo === "EVENTO" ? `
      <div class="section">
        <div class="section-title">Informações do Evento</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Local do Evento</div>
            <div class="info-value">${contrato.localEvento}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Responsável</div>
            <div class="info-value">${contrato.responsavelEvento}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Número de Convidados</div>
            <div class="info-value">${contrato.numeroConvidados}</div>
          </div>
        </div>
      </div>
      ` : ''}

      ${contrato.servicosExtras && contrato.servicosExtras.length > 0 ? `
      <div class="section">
        <div class="section-title">Serviços Extras</div>
        <table class="services-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${contrato.servicosExtras.map(servico => `
            <tr>
              <td>${servico.descricao}</td>
              <td>${servico.quantidade}</td>
              <td>${formatarMoeda(servico.valor)}</td>
              <td>${formatarMoeda(servico.valor * servico.quantidade)}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}

      <div class="section">
        <div class="section-title">Resumo Financeiro</div>
        <div class="financial-summary">
          <div class="financial-row">
            <span>Valor Base:</span>
            <span>${formatarMoeda(contrato.valorContrato)}</span>
          </div>
          ${contrato.servicosExtras && contrato.servicosExtras.length > 0 ? `
          <div class="financial-row">
            <span>Serviços Extras:</span>
            <span>${formatarMoeda(contrato.servicosExtras.reduce((total, servico) => total + (servico.valor * servico.quantidade), 0))}</span>
          </div>
          ` : ''}
          <div class="financial-row financial-total">
            <span>VALOR TOTAL:</span>
            <span>${formatarMoeda(calcularValorTotal())}</span>
          </div>
        </div>
      </div>

      ${contrato.observacoes ? `
      <div class="section">
        <div class="section-title">Observações</div>
        <div class="info-value" style="white-space: pre-wrap;">${contrato.observacoes}</div>
      </div>
      ` : ''}

      <div class="signatures">
        <div class="signature-block">
          <div class="signature-line">
            ${config.companyName}<br>
            <small>Locador</small>
          </div>
        </div>
        <div class="signature-block">
          <div class="signature-line">
            ${contrato.locatario.nome}<br>
            <small>Locatário</small>
          </div>
        </div>
      </div>

      <div class="footer">
        Documento gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
      </div>
    </body>
    </html>
  `;
}

// Função para baixar PDF (usando window.print)
export function downloadContractPDF(contrato: Contrato, config?: PDFConfig): void {
  const htmlContent = generateContractHTML(contrato, config);

  // Criar uma nova janela para impressão
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Não foi possível abrir a janela de impressão. Verifique se o bloqueador de pop-ups está desabilitado.');
  }

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Aguardar o carregamento e abrir o diálogo de impressão
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
}

// Hook para usar a funcionalidade de PDF
export function usePDFGenerator() {
  const generatePDF = async (contrato: Contrato, config?: PDFConfig) => {
    try {
      downloadContractPDF(contrato, config);
      return { success: true };
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  };

  return { generatePDF };
}