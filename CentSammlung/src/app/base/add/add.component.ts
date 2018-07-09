import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  laender = ['andorra', 'belgien', 'deutschland', 'estland', 'finnland', 'frankreich', 'griechenland',
    'irland', 'italien', 'lettland', 'litauen', 'luxemburg', 'malta', 'monaco', 'niederlande', 'österreich', 'portugal'
  ];
  centCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor() {}

  ngOnInit() {}

  addCent(komb: number) {
    this.centCount[komb]++;
  }

  removeCent(komb: number) {
    this.centCount[komb]--;
  }
}
