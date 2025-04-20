"use client"

import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { RangeSummary } from "@/lib/types"

interface RangeDistributionProps {
  data: RangeSummary[]
}

export default function RangeDistribution({ data }: RangeDistributionProps) {
  // Sort data by average range
  const sortedData = [...data].sort((a, b) => b.average_range - a.average_range)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="h-full"
    >
      <Card className="h-full border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Range Distribution</CardTitle>
          <CardDescription>Average range of EVs by make (miles)</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <div className="h-[350px] w-full px-2">
            <ChartContainer
              config={{
                average_range: {
                  label: "Average Range",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="make" tick={{ fontSize: 12 }} tickMargin={10} />
                  <YAxis width={60} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="average_range" name="Average Range" fill="var(--color-average_range)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
