import { Suspense } from "react"
import DashboardHero from "@/components/dashboard-hero"
import OverviewCards from "@/components/overview-cards"
import MakeDistribution from "@/components/charts/make-distribution"
import YearTrend from "@/components/charts/year-trend"
import VehicleTypes from "@/components/charts/vehicle-types"
import RangeDistribution from "@/components/charts/range-distribution"
import CountyDistribution from "@/components/charts/county-distribution"
import DetailedTable from "@/components/detailed-table"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAllData } from "@/lib/data-utils"

export default async function Dashboard() {
  const data = await fetchAllData()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHero />

      <main className="w-full flex justify-center px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-7xl py-8">
          <Suspense
            fallback={
              <div className="grid gap-6 md:grid-cols-4">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
              </div>
            }
          >
            <OverviewCards data={data} />
          </Suspense>

          <div className="grid gap-8 mt-10 md:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <MakeDistribution data={data.makeSummary} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <YearTrend data={data.yearSummary} />
            </Suspense>
          </div>

          <div className="grid gap-8 mt-10 md:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <VehicleTypes data={data.typeSummary} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <RangeDistribution data={data.rangeSummary} />
            </Suspense>
          </div>

          <div className="mt-10">
            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
              <CountyDistribution data={data.countySummary} />
            </Suspense>
          </div>

          <div className="mt-10">
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <DetailedTable data={data} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
