"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useCustomers } from "../contexts/customer-context"
import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import { format } from "date-fns"
import { id } from "date-fns/locale"

const chartConfig = {
  pelanggan: {
    label: "Pelanggan",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CustomerLoyaltyChart() {
    const { customers } = useCustomers()

    const chartData = useMemo(() => {
        if (!customers.length) return [];
        
        // Group customers by registration month
        const monthlyData: { [key: string]: number } = {};
        customers.forEach(customer => {
            const date = new Date(customer.registeredAt.split(' ')[0]);
            const monthKey = format(date, "yyyy-MM");
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 0;
            }
            monthlyData[monthKey]++;
        });

        const sortedKeys = Object.keys(monthlyData).sort();

        // Calculate cumulative sum for growth chart
        let cumulativeTotal = 0;
        return sortedKeys.map(key => {
            cumulativeTotal += monthlyData[key];
            const [year, month] = key.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return {
                bulan: format(date, "MMM yyyy", { locale: id }),
                pelanggan: cumulativeTotal,
            };
        });

    }, [customers]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pertumbuhan Pelanggan</CardTitle>
                <CardDescription>Menunjukkan total kumulatif pelanggan terdaftar dari waktu ke waktu.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
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
                            dataKey="bulan"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" label="Pelanggan" />}
                        />
                        <Area
                            dataKey="pelanggan"
                            type="natural"
                            fill="var(--color-pelanggan)"
                            fillOpacity={0.4}
                            stroke="var(--color-pelanggan)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
