export interface MakeSummary {
    make: string
    count: number
  }
  
  export interface YearSummary {
    year: number
    count: number
  }
  
  export interface TypeSummary {
    type: string
    count: number
    makes: string[]
  }
  
  export interface RangeSummary {
    make: string;
    average_range: number;
  }
  
  export interface CountySummary {
    county: string
    count: number
  }
  
  export interface DashboardData {
    makeSummary: MakeSummary[]
    yearSummary: YearSummary[]
    typeSummary: TypeSummary[]
    rangeSummary: RangeSummary[]
    countySummary: CountySummary[]
  }
