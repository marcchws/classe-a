"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import {
  tipoFornecedorEnum,
  statusFornecedorEnum,
  campoAtuacaoEnum,
} from "@/lib/schemas";
import type { FornecedorFilters } from "@/types/fornecedor";

interface FornecedorFiltersProps {
  filters: FornecedorFilters;
  onFiltersChange: (filters: FornecedorFilters) => void;
  onClearFilters: () => void;
}

export function FornecedorFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
}: FornecedorFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FornecedorFilters>(filters);

  const handleFilterChange = (key: keyof FornecedorFilters, value: string | undefined) => {
    // Tratar valores "TODOS" e "TODAS" como undefined para limpar o filtro
    const normalizedValue = value === "TODOS" || value === "TODAS" ? undefined : value;
    const newFilters = { ...localFilters, [key]: normalizedValue };
    setLocalFilters(newFilters);
  };

  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  const handleClear = () => {
    const clearedFilters: FornecedorFilters = {};
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== undefined && value !== "");

  const getTipoLabel = (tipo: string) => {
    return tipo === "VEICULO" ? "Veículo" : "Serviço";
  };

  const getCampoAtuacaoLabel = (campo: string) => {
    return campo.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Filtros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Busca por termo */}
          <div className="space-y-2">
            <Label htmlFor="termo">Buscar</Label>
            <Input
              id="termo"
              placeholder="Nome ou CNPJ..."
              value={localFilters.termo || ""}
              onChange={(e) => handleFilterChange("termo", e.target.value)}
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              value={localFilters.tipo || "TODOS"}
              onValueChange={(value) => handleFilterChange("tipo", value)}
            >
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os tipos</SelectItem>
                {tipoFornecedorEnum.options.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {getTipoLabel(tipo)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={localFilters.status || "TODOS"}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os status</SelectItem>
                {statusFornecedorEnum.options.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo de Atuação (apenas para fornecedores de serviço) */}
          <div className="space-y-2">
            <Label htmlFor="campoAtuacao">Campo de Atuação</Label>
            <Select
              value={localFilters.campoAtuacao || "TODAS"}
              onValueChange={(value) => handleFilterChange("campoAtuacao", value)}
            >
              <SelectTrigger id="campoAtuacao">
                <SelectValue placeholder="Todas as áreas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODAS">Todas as áreas</SelectItem>
                {campoAtuacaoEnum.options.map((campo) => (
                  <SelectItem key={campo} value={campo}>
                    {getCampoAtuacaoLabel(campo)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!hasActiveFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpar Filtros
          </Button>

          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Buscar
          </Button>
        </div>

        {/* Filtros ativos */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <span className="text-sm font-medium">Filtros ativos:</span>
            {localFilters.termo && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Termo: {localFilters.termo}
              </span>
            )}
            {localFilters.tipo && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Tipo: {getTipoLabel(localFilters.tipo)}
              </span>
            )}
            {localFilters.status && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Status: {localFilters.status}
              </span>
            )}
            {localFilters.campoAtuacao && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Área: {getCampoAtuacaoLabel(localFilters.campoAtuacao)}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}