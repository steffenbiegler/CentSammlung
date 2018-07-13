import {  Component,  OnInit} from '@angular/core';
import {  LAENDER} from '../../constants';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {
  startYear = 1999;
  endYear = (new Date()).getFullYear();
  year = this.endYear;
  countries = [];

  constructor() {
    this.countries = LAENDER;

  }

  ngOnInit() {

  }
  log(m) {
    console.log(m);
  }

}
