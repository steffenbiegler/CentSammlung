import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../../cent-backend.service';

import {
  CentDistrubutionResultSet
} from './../../resultData/cent-distrubution-result';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})


export class StatisticComponent implements OnInit {
  displayedColumns = ['jahr', 'anzahl'];
  data: CentDistrubutionResultSet[];
  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    if (this.centService.isBackendAlive()) {
      this.centService.getYearCount().subscribe((data: CentDistrubutionResultSet[]) => {
        this.data = data;

        this.data.forEach(element => {
          element.anzahl = parseInt(element.anzahl.toString(), 10);
        });


      });

    }
  }
}
