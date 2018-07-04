export class RankingResult {
  data: RankingResultSet[];
}


export class RankingResultSet {
  city: string[];
  count: number;
  country: string;
  percentage: string;
  year: string;

  getLabel(): string {
    let label = '';
    if (this.city[0] === '-') {
      label = this.city[0] + ' (' + this.city[1] + ') ' + this.year;
    } else {
      label = this.country + ' ' + this.year;
    }
    return label;
  }
}

