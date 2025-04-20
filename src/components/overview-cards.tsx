"use client"

import { motion } from "framer-motion"
import { Car, MapPin, Award, Battery } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/types"
import { getTopMake, getTopCounty, getTotalEVs, getAverageRange } from "@/lib/data-utils"

interface OverviewCardsProps {
  data: DashboardData
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const totalEVs = getTotalEVs(data.makeSummary)
  const topMake = getTopMake(data.makeSummary)
  const topCounty = getTopCounty(data.countySummary)
  const averageRange = getAverageRange(data.rangeSummary)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total EVs</CardTitle>
            <Car className="h-5 w-5 text-primary/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEVs.toLocaleString('en-US')}</div>
            <CardDescription className="mt-1">Registered electric vehicles</CardDescription>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top EV Make</CardTitle>
            <Award className="h-5 w-5 text-primary/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{topMake.make}</div>
            <CardDescription className="mt-1">{topMake.count.toLocaleString()} vehicles</CardDescription>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top County</CardTitle>
            <MapPin className="h-5 w-5 text-primary/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{topCounty.county}</div>
            <CardDescription className="mt-1">{topCounty.count.toLocaleString()} vehicles</CardDescription>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Range</CardTitle>
            <Battery className="h-5 w-5 text-primary/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageRange} miles</div>
            <CardDescription className="mt-1">Average EV driving range</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
