import { Component, OnInit } from '@angular/core';
import { CentBackendService } from '../cent-backend.service';
import { CentAmountResult } from './../resultData/cent-amount-result';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent implements OnInit {

  centCount: CentAmountResult =  {count: 12345, digits : ['1', '2', '3', '4', '5'], date: new Date('2018-01-01')};

  constructor(private centService: CentBackendService) { }

  ngOnInit() {
    if (this.centService.isBackendAlive()) {
    this.centService.getCount().subscribe((data: CentAmountResult) => {
        this.centCount = data;
      });
    }
  }


}
