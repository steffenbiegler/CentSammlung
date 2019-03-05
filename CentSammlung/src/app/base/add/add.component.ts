import {
  Component,
  OnInit
} from '@angular/core';
import {
  YearCombinationResultSet
} from '../../resultData/combination-result';
import {
  CentBackendService
} from '../../cent-backend.service';
import {
  MatTableDataSource
} from '@angular/material';

import {
  LAENDER
} from '../../constants';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dataSource;
  total = 0;
  combinations: YearCombinationResultSet[];
  centCount: number[] = [];
  displayedColumns = ['year', 'Berlin', 'München', 'Stuttgart', 'Karlsruhe', 'Hamburg'];
  countries: string[];
  highlight = '';
  history: String[] = [];
  history_max_length = 20;

  constructor(private centService: CentBackendService) {
    this.countries = LAENDER;
  }

  ngOnInit() {
    this.centService.getYearCombinations().subscribe((data: YearCombinationResultSet[]) => {
      this.combinations = data;
      this.filterCombinationData();
    });

  }

  setHighlight(country) {
    this.highlight = country;
  }

  sendCents() {
    this.centService.addCentCount(this.centCount);
    this.centCount = [];
    this.total = 0;
    this.history = [];
  }

  addCent(komb: number, year: number, country: string) {
    if (this.centCount[komb] != null) {
      this.centCount[komb]++;
    } else {
      this.centCount[komb] = 1;
    }
    this.total++;
    this.history.push('inc  ' + country + ' ' + year);
  }

  removeCent(komb: number, year: number, country: string) {
    if (this.centCount[komb] != null && this.centCount[komb] > 0) {
      this.centCount[komb]--;
      this.total--;
      this.history.push('dec ' + country + ' ' + year);
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
        if (validConfig) {
          filteredDataSource.push(year);
        }
      }
    );
    this.dataSource = new MatTableDataSource(filteredDataSource);
  }

}
