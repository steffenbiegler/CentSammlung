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
      {year: 1999,
        countries: [{country: 'österreich', combination: 3},
                               ]},
      {year: 2002,
       countries: [{country: 'deutschland', combination: 0},
                   {country: 'belgien', combination: 1},
                              ]} ,
      {year: 2004,
       countries: [{country: 'deutschland', combination: 2},
                   {country: 'österreich', combination: 4},
                              ]},
      {year: 2005,
        countries: [{country: 'österreich', combination: 3},
                                ]},
      {year: 2010,
        countries: [{country: 'deutschland', combination: 0},
                    {country: 'belgien', combination: 1},
                              ]} ,
      {year: 2014,
        countries: [{country: 'deutschland', combination: 2},
                    {country: 'österreich', combination: 4},
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
    console.log(this.centCount);
  }

  removeCent(komb: number) {
    if (this.centCount[komb] != null && this.centCount[komb] > 0) {
      this.centCount[komb]--;
    } else {
      this.centCount[komb] = 0;
    }

  }

  addColumn(country) {
    this.displayedColumns.push(country);
  }

  getCombination(year: YearCombinationResultSet, country: string) {
    const result = year.countries.filter((entry) => entry.country === country)[0];
    if (result) {
      if (!this.centCount[result.combination]) { this.centCount[result.combination] = 0 ; }
      return result.combination;
    }
    return false;
  }

}
