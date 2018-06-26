import { Component, OnInit } from '@angular/core';
import { CentBackendService } from '../cent-backend.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  centCount;

  constructor(private centService: CentBackendService) { }

  ngOnInit() {
    this.centService.getCount().subscribe((data) => {
      this.centCount = data;
      this.centCount.digits = this.centCount.gesamt.split('');
    });
  }


}
