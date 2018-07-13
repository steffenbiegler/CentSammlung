import {  Component,  OnInit} from '@angular/core';
import {  YearCombinationResultSet} from '../../resultData/combination-result';
import {  CentBackendService} from '../../cent-backend.service';
import {  MatTableDataSource} from '@angular/material';

import {  LAENDER, yearcomb} from '../../constants';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dataSource;
  combinations: YearCombinationResultSet[];
  centCount: number[] = [];
  displayedColumns = ['year', 'Berlin', 'München', 'Stuttgart', 'Karlsruhe', 'Hamburg'];
  countries: string[];
  highlight = '';

  constructor(private centService: CentBackendService) {
    this.countries = LAENDER;
  }

  ngOnInit() {
    if (this.centService.isBackendAlive()) {
      this.centService.getYearCombinations().subscribe((data: YearCombinationResultSet[]) => {
        this.combinations = data;
        this.filterCombinationData();
      });
    } else {
      this.combinations = yearcomb;
      this.filterCombinationData();
    }
  }


  setHighlight(country) {
    this.highlight = country;
  }

  sendCents() {
    this.centService.sendInput(this.centCount);
    this.centCount = [];
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

  addColumn(country) {
    this.displayedColumns.push(country);
    this.filterCombinationData();
  }

  getCombination(year: YearCombinationResultSet, country: string) {
    const result = year.countries.filter((entry) => {
     if (entry.country.toLowerCase() === country.toLowerCase()) {
      return true;
     } else if (entry.city && entry.city.toLowerCase() === country.toLowerCase()) {
      return true;
     }
    })[0];
    if (result) {
      if (!this.centCount[result.combination]) {
        this.centCount[result.combination] = 0;
      }
      return result.combination;
    }

    return false;
  }

  filterCombinationData() {
    const filteredDataSource: YearCombinationResultSet[] = [];
    this.combinations.forEach(
      (year) => {
        let validConfig = false;
        year.countries.forEach((country) => {
          if (this.displayedColumns.includes(country.country)) {
            validConfig = true;
          } else if (country.city && this.displayedColumns.includes(country.city)) {
            validConfig = true;
          }
        });
        if (validConfig) { filteredDataSource.push(year); }
      }
    );
    this.dataSource = new MatTableDataSource(filteredDataSource);
  }


}
