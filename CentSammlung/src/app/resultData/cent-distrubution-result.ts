export class CentDistrubutionResultSet {
  year: number;
  countries: CoutryDetails[];
  count: number;
  percentage: string;

  getValue() {
    return this.count;
  }

  getLabel() {
    return this.year.toString();
  }
}


class CoutryDetails {
    country: string;
    cities?: CityDetails[];
    count: number;
    percentage: string;
    percentage_from_year: string;

    getValue() {
      return this.count;
    }

    getLabel() {
      return this.country.toString();
    }
}

class CityDetails {
  city: string[];
  count: number;
  percentage: string;
  percentage_from_country: string;
  percentage_from_year: string;

  getValue() {
    return this.count;
  }

  getLabel() {
    return this.city[0] + ' (' + this.city[1] + ')';
  }
}
