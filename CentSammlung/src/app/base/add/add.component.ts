import {
  Component,
  OnInit
} from '@angular/core';
import {
  YearCombinationResultSet
} from '../../resultData/combination-result';
import {
  LAENDER
} from '../../constants';

import {
  CentBackendService
} from '../../cent-backend.service';
import {
  MatTableDataSource
} from '@angular/material';
import {
  ThrowStmt
} from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dataSource;
  combinations: YearCombinationResultSet[];
  centCount: number[] = [];
  displayedColumns = ['year', 'Berlin', 'München', 'Stuttgard', 'Karlsruhe', 'Hamburg'];
  countries: string[];
  highlight = '';

  constructor(private centService: CentBackendService) {
    this.countries = LAENDER;

  }


  ngOnInit() {
    if (this.centService.isBackendAlive()) {
      this.centService.getYearCombinations().subscribe((data: YearCombinationResultSet[]) => {
        this.combinations = data;
      });
    } else {
      this.setDefaultValues();
    }
    this.filterCombinationData();
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
    console.log(this.displayedColumns);
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

  setHighlight(country) {
    this.highlight = country;
  }

  sendCents() {
    this.centService.sendInput(this.centCount);
    this.centCount = [];
  }


  setDefaultValues() {
    this.combinations = [{
      year: 1999,
      countries: [{
        country: 'Belgien',
        combination: 1
      }, {
        country: 'Spanien',
        combination: 167
      }, {
        country: 'Finnland',
        combination: 58
      }, {
        country: 'Frankreich',
        combination: 72
      }, {
        country: 'Niederlande',
        combination: 129
      }]
    }, {
      year: 2000,
      countries: [{
        country: 'Niederlande',
        combination: 130
      }, {
        country: 'Frankreich',
        combination: 73
      }, {
        country: 'Finnland',
        combination: 59
      }, {
        country: 'Spanien',
        combination: 169
      }]
    }, {
      year: 2001,
      countries: [{
        country: 'Spanien',
        combination: 168
      }, {
        country: 'Belgien',
        combination: 2
      }, {
        country: 'Finnland',
        combination: 60
      }, {
        country: 'Monaco',
        combination: 128
      }, {
        country: 'Niederlande',
        combination: 131
      }, {
        country: 'Frankreich',
        combination: 75
      }]
    }, {
      year: 2002,
      countries: [{
        country: 'Italien',
        combination: 100
      }, {
        country: 'Luxemburg',
        combination: 100
      }, {
        country: 'Griechenland',
        combination: 100
      }, {
        country: 'Irland',
        combination: 100
      }, {
        country: 'Portugal',
        combination: 100
      }, {
        country: 'Finnland',
        combination: 100
      }, {
        country: 'Deutschland',
        city: 'berlin',
        combination: 100
      }, {
        country: 'Deutschland',
        city: 'München',
        combination: 100
      }, {
        country: 'Deutschland',
        city: 'Karlsruhe',
        combination: 100
      }, {
        country: 'Vatikan',
        combination: 100
      }, {
        country: 'Deutschland',
        city: 'Hamburg',
        combination: 100
      }, {
        country: 'Deutschland',
        city: 'Stuttgard',
        combination: 100
      }, {
        country: 'Frankreich',
        combination: 100
      }, {
        country: 'Niederlande',
        combination: 100
      }, {
        country: 'Spanien',
        combination: 100
      }, {
        country: '\u00d6sterreich',
        combination: 100
      }]
    }, {
      year: 2003,
      countries: [{
        country: 'Frankreich',
        combination: 100
      }, {
        country: 'Irland',
        combination: 100
      }, {
        country: 'Griechenland',
        combination: 100
      }, {
        country: 'Finnland',
        combination: 100
      }, {
        country: 'Niederlande',
        combination: 100
      }, {
        country: 'Italien',
        combination: 100
      }, {
        country: 'Belgien',
        combination: 100
      }, {
        country: 'Luxemburg',
        combination: 100
      }, {
        country: '\u00d6sterreich',
        combination: 100
      }, {
        country: 'Spanien',
        combination: 100
      }]
    }, {
      year: 2004,
      countries: [{
        country: 'Finnland',
        combination: 100
      }, {
        country: '\u00d6sterreich',
        combination: 100
      }, {
        country: 'Spanien',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Luxemburg',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Frankreich',
        combination: 100
      }, {
        country: 'Italien',
        combination: 100
      }, {
        country: 'Irland',
        combination: 100
      }, {
        country: 'San Marino',
        combination: 100
      }, {
        country: 'Niederlande',
        combination: 100
      }, {
        country: 'Belgien',
        combination: 100
      }, {
        country: 'Portugal',
        combination: 100
      }, {
        country: 'Griechenland',
        combination: 100
      }]
    }, {
      year: 2005,
      countries: [{
        country: 'Irland',
        combination: 100
      }, {
        country: 'Frankreich',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Griechenland',
        combination: 100
      }, {
        country: 'Niederlande',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Spanien',
        combination: 100
      }, {
        country: 'Luxemburg',
        combination: 100
      }, {
        country: '\u00d6sterreich',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Portugal',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 100
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }]
    }, {
      year: 2006,
      countries: [{
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }]
    }, {
      year: 2007,
      countries: [{
        country: 'Irland',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Slowenien',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }]
    }, {
      year: 2008,
      countries: [{
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Vatikan',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Malta',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }, {
      year: 2009,
      countries: [{
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Slowenien',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Vatikan',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }]
    }, {
      year: 2010,
      countries: [{
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }]
    }, {
      year: 2011,
      countries: [{
        country: 'Italien',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Estland',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }]
    }, {
      year: 2012,
      countries: [{
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Estland',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }, {
      year: 2013,
      countries: [{
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Malta',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }, {
      year: 2014,
      countries: [{
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Irland',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Lettland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Andorra',
        combination: 101
      }]
    }, {
      year: 2015,
      countries: [{
        country: 'Belgien',
        combination: 101
      }, {
        country: 'Estland',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Italien',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Slowenien',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: '\u00d6sterreich',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Litauen',
        combination: 101
      }, {
        country: 'Zypern',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }, {
      year: 2016,
      countries: [{
        country: 'Slowenien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Niederlande',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Portugal',
        combination: 101
      }, {
        country: 'Frankreich',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Finnland',
        combination: 101
      }, {
        country: 'Belgien',
        combination: 101
      }]
    }, {
      year: 2017,
      countries: [{
        country: 'Spanien',
        combination: 101
      }, {
        country: 'Slowakei',
        combination: 101
      }, {
        country: 'Griechenland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Estland',
        combination: 101
      }, {
        country: 'Luxemburg',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }, {
      year: 2018,
      countries: [{
        country: 'Deutschland',
        combination: 101,
        city: 'München'
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }, {
        country: 'Deutschland',
        combination: 101
      }]
    }];

  }


}
