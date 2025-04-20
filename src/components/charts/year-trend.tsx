"use client"

import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { YearSummary } from "@/lib/types"

interface YearTrendProps {
  data: YearSummary[]
}

export default function YearTrend({ data }: YearTrendProps) {
  // Sort data by year
  const sortedData = [...data].sort((a, b) => a.year - b.year)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full"
    >
      <Card className="h-full border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Year-wise EV Registration</CardTitle>
          <CardDescription>Annual trend of electric vehicle registrations</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <div className="h-[350px] w-full px-2">
            <ChartContainer
              config={{
                registrations: {
                  label: "Registrations",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <defs>
                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-registrations)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-registrations)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} tickMargin={10} />
                  <YAxis width={60} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="registrations"
                    stroke="var(--color-registrations)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRegistrations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
