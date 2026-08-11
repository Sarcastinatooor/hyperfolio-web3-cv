import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export interface StatMetric {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

interface AdvancedStatsProps {
  metrics: StatMetric[];
  chartData: Array<{ date: string; impressions: number; engagements: number }>;
}

const compactNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export const AdvancedStats = ({ metrics, chartData }: AdvancedStatsProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.045 }}>
              <Card className="group h-full border-border bg-card/70 shadow-none transition-colors hover:border-primary/40 hover:bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                    <Icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold text-foreground">{metric.value}</div>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{metric.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden border-border bg-card/70 shadow-none">
          <CardContent className="p-4 md:p-5">
            <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Daily attention curve</div>
                <div className="text-xs text-muted-foreground">Impressions with engagement overlay</div>
              </div>
              <div className="mt-2 flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:mt-0">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Impressions</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" />Engagements</span>
              </div>
            </div>
            <ChartContainer config={{ impressions: { label: "Impressions", color: "hsl(var(--primary))" }, engagements: { label: "Engagements", color: "hsl(var(--accent))" } }} className="h-[300px] w-full aspect-auto">
              <AreaChart data={chartData} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="advanced-impressions-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-impressions)" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="var(--color-impressions)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={34} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => compactNumber.format(Number(value))} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="impressions" type="monotone" fill="url(#advanced-impressions-fill)" stroke="var(--color-impressions)" strokeWidth={2} />
                <Area dataKey="engagements" type="monotone" fill="transparent" stroke="var(--color-engagements)" strokeWidth={1.5} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
