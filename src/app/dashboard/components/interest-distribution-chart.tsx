"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useCustomers } from "../contexts/customer-context"
import { interestCategories, businessCategories } from "../campaigns/data/categories"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  pelanggan: {
    label: "Jumlah Pelanggan",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function InterestDistributionChart() {
    const { customers } = useCustomers()

    const chartData = useMemo(() => {
        if (!customers.length) return [];
        
        return businessCategories.map(category => {
            const categoryInterests = new Set(interestCategories[category].interests.map(i => i.id));
            const count = customers.filter(customer => 
                customer.interests.some(interestId => categoryInterests.has(interestId))
            ).length;

            return {
                kategori: category,
                pelanggan: count,
                fill: "var(--color-pelanggan)"
            }
        }).sort((a, b) => b.pelanggan - a.pelanggan); // Sort for better visualization
    }, [customers]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribusi Minat Pelanggan</CardTitle>
                <CardDescription>Jumlah pelanggan berdasarkan kategori minat utama.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ right: 20 }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="kategori"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.length > 20 ? value.slice(0, 20) + '...' : value}
                            width={120}
                        />
                        <XAxis dataKey="pelanggan" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="pelanggan" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
