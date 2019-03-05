export class CentDistrubutionResultSet {
  jahr: number;
  countries: CoutryDetails[];
  anzahl: number;
  percentage: string;

  getValue() {
    return this.anzahl.valueOf();
  }

  getLabel() {
    return this.jahr.toString();
  }
}


class CoutryDetails {
    country: string;
    cities?: CityDetails[];
    anzahl: number;
    percentage: string;
    percentage_from_year: string;

    getValue() {
      return this.anzahl.valueOf();
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
