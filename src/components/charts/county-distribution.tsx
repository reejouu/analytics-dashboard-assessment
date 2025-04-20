"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import type { CountySummary } from "@/lib/types"

interface CountyDistributionProps {
  data: CountySummary[]
}

export default function CountyDistribution({ data }: CountyDistributionProps) {
  const [showCount, setShowCount] = useState(10)

  const sortedData = [...data]
    .sort((a, b) => b.count - a.count) // Sort by count in descending order
    .slice(0, showCount); // Take the top N items based on the toggle

  const groupedData = sortedData.reduce<Record<string, { county: string; count: number }>>((acc, item) => {
    const county = item.county;
    if (!acc[county]) {
      acc[county] = { county, count: 0 };
    }
    acc[county].count += item.count;
    return acc;
  }, {});

  const finalData = Object.values(groupedData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>EVs by County</CardTitle>
              <CardDescription>Distribution of electric vehicles by county</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCount(10)}
                className={showCount === 10 ? "bg-primary/10 text-primary" : "text-muted-foreground"}
              >
                Top 10
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCount(20)}
                className={showCount === 20 ? "bg-primary/10 text-primary" : "text-muted-foreground"}
              >
                Top 20
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <div className="h-[500px] w-full px-2 overflow-hidden">
            <ChartContainer
              config={{
                county: {
                  label: "Vehicles",
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={finalData} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="county"
                    type="category"
                    width={110}
                    tickMargin={5}
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" name="county" fill="var(--color-county)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
