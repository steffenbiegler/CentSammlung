import {  Component,  OnInit } from '@angular/core';
import {  YearCombinationResultSet } from '../../resultData/combination-result';
import { LAENDER } from '../../constants';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dataSource;
  centCount = [];
  combinations: YearCombinationResultSet[];
  displayedColumns = ['year', 'belgien', 'österreich'];
  countries;

  constructor() {
  }


  ngOnInit() {
    this.countries = LAENDER;
    this.combinations = [
      {year: 2002,
       countries: [{country: 'deutschland', combination: 0},
                   {country: 'belgien', combination: 1},
                   {country: 'österreich', combination: 3},
                              ]},
    ];
    this.dataSource = new MatTableDataSource(this.combinations);
  }

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
