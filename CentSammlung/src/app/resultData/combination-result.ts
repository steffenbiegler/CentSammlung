export class CountryCombinationResultSet {
   country: string;
   years: {year: number, combination: number}[];
}


export class YearCombinationResultSet {
    year: number;
    countries: {country: string, combination: number}[];
}

