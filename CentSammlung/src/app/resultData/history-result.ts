export class HistoryResult {
  data: HistoryResultSet[];
}

export class HistoryResultSet {
  city: string;
  count: number;
  country: string;
  date: Date;
  year: number;
}
