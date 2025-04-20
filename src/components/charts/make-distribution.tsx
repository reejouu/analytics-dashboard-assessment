"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import type { MakeSummary } from "@/lib/types"

interface MakeDistributionProps {
  data: MakeSummary[]
}

export default function MakeDistribution({ data }: MakeDistributionProps) {
  const [showCount, setShowCount] = useState(10)

  // Sort data by count in descending order and take top N
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, showCount)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>EV Distribution by Make</CardTitle>
              <CardDescription>Top manufacturers by vehicle count</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCount(5)}
                className={showCount === 5 ? "bg-primary/10" : ""}
              >
                Top 5
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCount(10)}
                className={showCount === 10 ? "bg-primary/10" : ""}
              >
                Top 10
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <div className="h-[350px] w-full px-2">
            <ChartContainer
              config={{
                make: {
                  label: "Vehicles",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="make"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis width={60} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" name="make" fill="var(--color-make)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
