export class CombinationResult {
    data: CombinationResultSet[];
  }


export class CombinationResultSet {
   country: [{
              name: string,
              years: [{year: number[]}]
            }];

}


