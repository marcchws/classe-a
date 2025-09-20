"use client";

import { useState } from "react";
import { Search, Filter, X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import type { ContratoFilters, TipoContrato, StatusContrato } from "../types";

interface ContratosFiltersProps {
  filters: ContratoFilters;
  onFiltersChange: (filters: ContratoFilters) => void;
  onClearFilters: () => void;
}

const tipoContratoOptions: { value: TipoContrato; label: string }[] = [
  { value: "LOCACAO", label: "Locação" },
  { value: "SERVICO", label: "Serviço" },
  { value: "EVENTO", label: "Evento" },
  { value: "TERCEIRIZACAO", label: "Terceirização" },
];

const statusContratoOptions: { value: StatusContrato; label: string }[] = [
  { value: "RASCUNHO", label: "Rascunho" },
  { value: "PENDENTE_ASSINATURA", label: "Pendente Assinatura" },
  { value: "ATIVO", label: "Ativo" },
  { value: "ENCERRADO", label: "Encerrado" },
];

export function ContratosFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ContratosFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof ContratoFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value.length > 0).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Filtros básicos */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Busca por termo */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, locatário, veículo..."
              value={filters.termo || ""}
              onChange={(e) => updateFilter("termo", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtro por tipo */}
        <Select
          value={filters.tipo || "all"}
          onValueChange={(value) => updateFilter("tipo", value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {tipoContratoOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro por status */}
        <Select
          value={filters.status || "all"}
          onValueChange={(value) => updateFilter("status", value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {statusContratoOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Botão de filtros avançados */}
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Botão de limpar filtros */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filtros avançados */}
      {showAdvanced && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro por data de início */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Data de início</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dataInicio && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dataInicio ? (
                        format(new Date(filters.dataInicio), "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        "Selecionar data"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dataInicio ? new Date(filters.dataInicio) : undefined}
                      onSelect={(date) => {
                        updateFilter("dataInicio", date?.toISOString());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Filtro por data de fim */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Data de fim</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dataFim && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dataFim ? (
                        format(new Date(filters.dataFim), "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        "Selecionar data"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dataFim ? new Date(filters.dataFim) : undefined}
                      onSelect={(date) => {
                        updateFilter("dataFim", date?.toISOString());
                      }}
                      disabled={(date) => {
                        if (filters.dataInicio) {
                          return date < new Date(filters.dataInicio);
                        }
                        return false;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Ações dos filtros avançados */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {activeFiltersCount > 0 && (
                  <span>{activeFiltersCount} filtro(s) ativo(s)</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClearFilters}>
                  Limpar tudo
                </Button>
                <Button size="sm" onClick={() => setShowAdvanced(false)}>
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags dos filtros ativos */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.tipo && (
            <Badge variant="secondary" className="gap-1">
              Tipo: {tipoContratoOptions.find(o => o.value === filters.tipo)?.label}
              <button
                onClick={() => updateFilter("tipo", undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {statusContratoOptions.find(o => o.value === filters.status)?.label}
              <button
                onClick={() => updateFilter("status", undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.dataInicio && (
            <Badge variant="secondary" className="gap-1">
              Início: {format(new Date(filters.dataInicio), "dd/MM/yyyy", { locale: ptBR })}
              <button
                onClick={() => updateFilter("dataInicio", undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.dataFim && (
            <Badge variant="secondary" className="gap-1">
              Fim: {format(new Date(filters.dataFim), "dd/MM/yyyy", { locale: ptBR })}
              <button
                onClick={() => updateFilter("dataFim", undefined)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}