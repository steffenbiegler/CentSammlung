import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../../cent-backend.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  data;
  centcount = 0;
  displayedColumns: string[] = ['jahr', 'anzahl', 'anteil'];
   constructor(private centService: CentBackendService) {}

  ngOnInit() {
    this.centService.getYearCount().subscribe((data) => {
      this.data = [];
      for (let index = 0; index < data.length; index++) {
        this.data.push([parseInt(data[index].jahr, 10), parseInt(data[index].anzahl, 10)]);
        this.centcount += parseInt(data[index].anzahl, 10);
      }
      console.log(this.data);
    });
  }

}
