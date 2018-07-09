import {
  Component,
  OnInit
} from '@angular/core';
import {
  LAENDER
} from '../../constants';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  laender = LAENDER.slice(1);
  centCount = [];

  constructor() {}

  ngOnInit() {}

  addCent(komb: number) {
    if (this.centCount[komb] != null) {
      this.centCount[komb]++;
    } else {
      this.centCount[komb] = 1;
    }
  }

  removeCent(komb: number) {
    if (this.centCount[komb] != null && this.centCount[komb] > 0) {
      this.centCount[komb]--;
    } else {
      this.centCount[komb] = 0;
    }

  }

  addColumn() {

  }
}
