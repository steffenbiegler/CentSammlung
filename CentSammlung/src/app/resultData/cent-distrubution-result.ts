export class CentDistrubutionResult {
  data: CentDistrubutionResultSet[];
}

export class CentDistrubutionResultSet {
  distribution: [{
    year: number
    countries: [{
      country: string;
      cities: [{
        city: string[]
        count: number;
        percentage: string;
        percentage_from_country: string;
        percentage_from_year: string;
      }];
      percentage: string;
      percentage_from_year: string;
    }];
    percentage: string;
  }];
}
