import {
  Component,
  OnInit
} from '@angular/core';
import {
  HistoryResultSet
} from 'src/app/resultData/history-result';
import {
  CentBackendService
} from 'src/app/cent-backend.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historicData: HistoryResultSet[];
  displayedColumns = ['land', 'stadt', 'jahr', 'anzahl', 'datum', 'action'];
  months = ['alle', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  startYear = 2010;
  currentYear = new Date().getFullYear();
  years: number[];


  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    this.years = new Array;
    for (let index = this.currentYear; index >= this.startYear; index--) {
      this.years.push(index);
    }
    this.loadHistoryData(this.currentYear.toString(), '');
  }

  loadHistoryData(year: string, month: string) {
    if (year == null || year === undefined || month === 'alle' || month === undefined) {
      month = '';
    }
    this.centService.getHistory(year, month).subscribe((data: HistoryResultSet[]) => this.historicData = data);
  }

  deleteEntry(id: number) {
    this.centService.deleteCent(id);
    this.loadHistoryData(this.currentYear.toString(), '');
  }


}
