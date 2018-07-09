import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

 laender = ['andorra', 'belgien', 'deutschland', 'estland', 'finnland', 'frankreich', 'griechenland',
'irland', 'italien', 'lettland', 'litauen', 'luxemburg', 'malta', 'monaco', 'niederlande', 'österreich', 'portugal' ];

  constructor() { }

  ngOnInit() {
  }

}
