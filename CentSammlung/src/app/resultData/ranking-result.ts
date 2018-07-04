export class RankingResultSet {
  city: string[];
  count: number;
  country: string;
  percentage: string;
  year: number;

  constructor(city, count, country, percentage, year) {
    this.city = city;
    this.count = count;
    this.country = country;
    this.percentage = percentage;
    this.year = year;
  }

  getLabel(): string {
    let label = '';
    if (this.city[0] !== '-') {
      label = this.city[0] + ' (' + this.city[1] + ') ' + this.year;
    } else {
      label = this.country + ' ' + this.year;
    }
    return label;
  }

  getValue(): number {
    return this.count;
  }
}

