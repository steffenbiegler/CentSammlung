import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../../cent-backend.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  data;
  displayedColumns: string[] = ['jahr', 'anzahl', 'anteil'];
   constructor(private centService: CentBackendService) {}

  ngOnInit() {
    this.centService.getYearCount().subscribe((data) => {
      this.data = data;
    });
  }

}
