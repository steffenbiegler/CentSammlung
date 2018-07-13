export class CountryCombinationResultSet {
   country: string;
   years: {year: number, combination: number, city?: string}[];
}


export class YearCombinationResultSet {
    year: number;
    countries: {country: string, combination: number, city?: string}[];
}

