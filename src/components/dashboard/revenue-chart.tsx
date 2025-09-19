"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", receita: 380000, meta: 400000 },
  { month: "Fev", receita: 420000, meta: 400000 },
  { month: "Mar", receita: 390000, meta: 450000 },
  { month: "Abr", receita: 480000, meta: 450000 },
  { month: "Mai", receita: 470000, meta: 500000 },
  { month: "Jun", receita: 520000, meta: 500000 },
  { month: "Jul", receita: 490000, meta: 500000 },
  { month: "Ago", receita: 530000, meta: 550000 },
  { month: "Set", receita: 510000, meta: 550000 },
  { month: "Out", receita: 450000, meta: 500000 },
  { month: "Nov", receita: 480000, meta: 500000 },
  { month: "Dez", receita: 550000, meta: 600000 },
];

const chartConfig = {
  receita: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
  meta: {
    label: "Meta",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita Mensal</CardTitle>
        <CardDescription>
          Acompanhamento da receita vs meta estabelecida
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="meta"
              type="natural"
              fill="var(--color-meta)"
              fillOpacity={0.1}
              stroke="var(--color-meta)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Area
              dataKey="receita"
              type="natural"
              fill="var(--color-receita)"
              fillOpacity={0.4}
              stroke="var(--color-receita)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}