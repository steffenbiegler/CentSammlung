import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../cent-backend.service';
import {
  CentAmountResult
} from './../resultData/cent-amount-result';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent implements OnInit {

  loading = true;
  centCount: CentAmountResult;
  date;
  digits;
  count;

  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    this.loadCouterdata();
  }

  digitizeCount() {
    if (this.centCount != null) {
      this.centCount.digits = [];
      const sNumber = this.centCount.count.toString();
      for (let i = 0, len = sNumber.length; i < len; i += 1) {
        this.centCount.digits.push(sNumber.charAt(i));
      }
    }
    return this;
  }

  loadCouterdata() {
    if (this.centService.isBackendAlive()) {
      this.centService.getCount().subscribe((data: CentAmountResult) => {
        this.centCount = data;
        this.digitizeCount();
        this.loading = false;
      });
    }

  }

}
