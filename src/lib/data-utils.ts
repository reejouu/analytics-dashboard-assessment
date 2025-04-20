import type { DashboardData, MakeSummary, CountySummary, RangeSummary, YearSummary, TypeSummary } from "./types"

export async function fetchAllData(): Promise<DashboardData> {
  const makeSummaryRaw = await fetchData<{ name: string; count: number }[]>("make_summary.json");
  const makeSummary = makeSummaryRaw.map(item => ({ make: item.name, count: item.count }));

  const yearSummary = await fetchData<YearSummary[]>("year_summary.json");
  const typeSummary = await fetchData<TypeSummary[]>("type_summary.json");
  const rangeSummary = await fetchData<RangeSummary[]>("range_summary.json");
  const countySummary = await fetchData<CountySummary[]>("county_summary.json");

  return {
    makeSummary,
    yearSummary,
    typeSummary,
    rangeSummary,
    countySummary,
  };
}

async function fetchData<T>(url: string): Promise<T> {
  // Ensure the URL is properly resolved for both server and client environments
  const resolvedUrl = url.startsWith("http")
    ? url
    : typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${url.replace(/^\//, "")}`
    : `${window.location.origin}/${url.replace(/^\//, "")}`;

  const response = await fetch(resolvedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${resolvedUrl}`);
  }
  return response.json();
}

export function getTotalEVs(makeSummary: MakeSummary[]): number {
  return makeSummary.reduce((total, item) => total + item.count, 0)
}

export function getTopMake(makeSummary: MakeSummary[]): MakeSummary {
  return [...makeSummary].sort((a, b) => b.count - a.count)[0]
}

export function getTopCounty(countySummary: CountySummary[]): CountySummary {
  return [...countySummary].sort((a, b) => b.count - a.count)[0]
}

export function getAverageRange(rangeSummary: RangeSummary[]): number {
  // Calculate the average range directly from the `average_range` property
  const totalRange = rangeSummary.reduce((sum, item) => sum + item.average_range, 0);
  return rangeSummary.length > 0 ? Math.round(totalRange / rangeSummary.length) : 0;
}

// Updated to map `type` based on `typeSummary` makes
export function combineDataForTable(data: DashboardData, viewMode: "make" | "county") {
  const result = [];
  let id = 1;

  if (viewMode === "make") {
    for (const makeItem of data.makeSummary) {
      // Find the average range for this make
      const rangeItem = data.rangeSummary.find(item => item.make === makeItem.make);
      const range = rangeItem ? `${Math.round(rangeItem.average_range)} miles` : "N/A";

      // Find the type for this make
      const typeItem = data.typeSummary.find(item => item.makes.includes(makeItem.make));
      const type = typeItem ? typeItem.type : "N/A";

      result.push({
        id: id++,
        make: makeItem.make,
        type, // Updated to include the type
        range,
        county: "Various",
        count: makeItem.count,
      });
    }
  } else {
    for (const countyItem of data.countySummary) {
      result.push({
        id: id++,
        make: "N/A", // Placeholder as make is not directly linked to county
        type: "N/A", // Placeholder as type is not directly linked to county
        range: "N/A", // Placeholder as range is not directly linked to county
        county: countyItem.county,
        count: countyItem.count,
      });
    }
  }

  return result;
}