import {  Component,  OnInit } from '@angular/core';
import {  YearCombinationResultSet } from '../../resultData/combination-result';
import { LAENDER } from '../../constants';

import { CentBackendService } from '../../cent-backend.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dataSource;
  combinations: YearCombinationResultSet[];
  centCount = [];
  displayedColumns = ['year', 'deutschland', 'deutschland', 'deutschland', 'deutschland', 'deutschland'];
  countries;

  constructor(private centService: CentBackendService) {
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
  }


  ngOnInit() {
      this.centService.getYearCombinations().subscribe((data: YearCombinationResultSet[]) => {
          this.combinations = data;
          this.dataSource = new MatTableDataSource(this.combinations);
        });
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
  }

  getCombination(year: YearCombinationResultSet, country: string) {
    const result = year.countries.filter((entry) => entry.country.toLowerCase() === country.toLowerCase() )[0];
    if (result) {
      if (!this.centCount[result.combination]) { this.centCount[result.combination] = 0 ; }
      return result.combination;
    }
    return false;
  }

}

/*
[{"year":"1999","countries":[{"country":"Belgien","combination":"1"},{"country":"Spanien","combination":"167"},{"country":"Finnland","combination":"58"},{"country":"Frankreich","combination":"72"},{"country":"Niederlande","combination":"129"}]},{"year":"2000","countries":[{"country":"Niederlande","combination":"130"},{"country":"Frankreich","combination":"73"},{"country":"Finnland","combination":"59"},{"country":"Spanien","combination":"169"}]},{"year":"2001","countries":[{"country":"Spanien","combination":"168"},{"country":"Belgien","combination":"2"},{"country":"Finnland","combination":"60"},{"country":"Monaco","combination":"128"},{"country":"Niederlande","combination":"131"},{"country":"Frankreich","combination":"75"}]},{"year":"2002","countries":[{"country":"Italien","combination":"106"},{"country":"Luxemburg","combination":"116"},{"country":"Griechenland","combination":"86"},{"country":"Irland","combination":"96"},{"country":"Portugal","combination":"152"},{"country":"Finnland","combination":"61"},{"country":"Deutschland","combination":"13"},{"country":"Deutschland","combination":"11"},{"country":"Deutschland","combination":"12"},{"country":"Vatikan","combination":"180"},{"country":"Deutschland","combination":"14"},{"country":"Deutschland","combination":"15"},{"country":"Frankreich","combination":"74"},{"country":"Niederlande","combination":"132"},{"country":"Spanien","combination":"170"},{"country":"\u00d6sterreich","combination":"142"}]},{"year":"2003","countries":[{"country":"Frankreich","combination":"77"},{"country":"Irland","combination":"97"},{"country":"Griechenland","combination":"87"},{"country":"Finnland","combination":"62"},{"country":"Niederlande","combination":"133"},{"country":"Italien","combination":"107"},{"country":"Belgien","combination":"3"},{"country":"Luxemburg","combination":"117"},{"country":"\u00d6sterreich","combination":"143"},{"country":"Spanien","combination":"171"}]},{"year":"2004","countries":[{"country":"Finnland","combination":"63"},{"country":"\u00d6sterreich","combination":"144"},{"country":"Spanien","combination":"172"},{"country":"Deutschland","combination":"17"},{"country":"Deutschland","combination":"18"},{"country":"Deutschland","combination":"19"},{"country":"Luxemburg","combination":"118"},{"country":"Deutschland","combination":"20"},{"country":"Deutschland","combination":"16"},{"country":"Frankreich","combination":"76"},{"country":"Italien","combination":"108"},{"country":"Irland","combination":"99"},{"country":"San Marino","combination":"161"},{"country":"Niederlande","combination":"134"},{"country":"Belgien","combination":"4"},{"country":"Portugal","combination":"153"},{"country":"Griechenland","combination":"88"}]},{"year":"2005","countries":[{"country":"Irland","combination":"98"},{"country":"Frankreich","combination":"78"},{"country":"Deutschland","combination":"21"},{"country":"Griechenland","combination":"89"},{"country":"Niederlande","combination":"136"},{"country":"Deutschland","combination":"22"},{"country":"Spanien","combination":"173"},{"country":"Luxemburg","combination":"119"},{"country":"\u00d6sterreich","combination":"145"},{"country":"Deutschland","combination":"23"},{"country":"Portugal","combination":"154"},{"country":"Deutschland","combination":"25"},{"country":"Deutschland","combination":"24"},{"country":"Italien","combination":"109"},{"country":"Finnland","combination":"64"}]},{"year":"2006","countries":[{"country":"Portugal","combination":"155"},{"country":"Belgien","combination":"5"},{"country":"Italien","combination":"110"},{"country":"Spanien","combination":"174"},{"country":"Niederlande","combination":"135"},{"country":"Irland","combination":"100"},{"country":"Frankreich","combination":"79"},{"country":"\u00d6sterreich","combination":"146"},{"country":"Luxemburg","combination":"120"},{"country":"Griechenland","combination":"90"},{"country":"Finnland","combination":"65"}]},{"year":"2007","countries":[{"country":"Irland","combination":"101"},{"country":"Griechenland","combination":"91"},{"country":"Luxemburg","combination":"121"},{"country":"Frankreich","combination":"80"},{"country":"Belgien","combination":"6"},{"country":"Deutschland","combination":"26"},{"country":"Deutschland","combination":"27"},{"country":"Deutschland","combination":"28"},{"country":"Deutschland","combination":"29"},{"country":"Deutschland","combination":"30"},{"country":"Spanien","combination":"175"},{"country":"Slowenien","combination":"165"},{"country":"Portugal","combination":"156"},{"country":"\u00d6sterreich","combination":"147"},{"country":"Italien","combination":"111"},{"country":"Niederlande","combination":"137"},{"country":"Finnland","combination":"66"}]},{"year":"2008","countries":[{"country":"Niederlande","combination":"138"},{"country":"Portugal","combination":"157"},{"country":"Zypern","combination":"185"},{"country":"Vatikan","combination":"181"},{"country":"Spanien","combination":"176"},{"country":"Italien","combination":"112"},{"country":"Luxemburg","combination":"122"},{"country":"Deutschland","combination":"36"},{"country":"\u00d6sterreich","combination":"148"},{"country":"Malta","combination":"127"},{"country":"Deutschland","combination":"37"},{"country":"Deutschland","combination":"39"},{"country":"Griechenland","combination":"92"},{"country":"Deutschland","combination":"40"},{"country":"Irland","combination":"102"},{"country":"Frankreich","combination":"81"},{"country":"Finnland","combination":"67"},{"country":"Deutschland","combination":"38"}]},{"year":"2009","countries":[{"country":"\u00d6sterreich","combination":"149"},{"country":"Portugal","combination":"158"},{"country":"Slowakei","combination":"162"},{"country":"Slowenien","combination":"166"},{"country":"Niederlande","combination":"139"},{"country":"Zypern","combination":"186"},{"country":"Vatikan","combination":"182"},{"country":"Spanien","combination":"177"},{"country":"Belgien","combination":"7"},{"country":"Deutschland","combination":"31"},{"country":"Deutschland","combination":"32"},{"country":"Deutschland","combination":"33"},{"country":"Deutschland","combination":"34"},{"country":"Deutschland","combination":"35"},{"country":"Finnland","combination":"68"},{"country":"Griechenland","combination":"93"},{"country":"Frankreich","combination":"82"},{"country":"Irland","combination":"103"},{"country":"Italien","combination":"113"},{"country":"Luxemburg","combination":"123"}]},{"year":"2010","countries":[{"country":"Finnland","combination":"69"},{"country":"Luxemburg","combination":"124"},{"country":"Deutschland","combination":"45"},{"country":"Deutschland","combination":"44"},{"country":"Deutschland","combination":"43"},{"country":"Niederlande","combination":"140"},{"country":"Portugal","combination":"159"},{"country":"Deutschland","combination":"42"},{"country":"Deutschland","combination":"41"},{"country":"\u00d6sterreich","combination":"151"},{"country":"Griechenland","combination":"94"},{"country":"Frankreich","combination":"83"},{"country":"Zypern","combination":"187"},{"country":"Belgien","combination":"8"},{"country":"Slowakei","combination":"163"},{"country":"Spanien","combination":"178"},{"country":"Italien","combination":"114"},{"country":"Irland","combination":"104"}]},{"year":"2011","countries":[{"country":"Italien","combination":"115"},{"country":"Belgien","combination":"9"},{"country":"Luxemburg","combination":"125"},{"country":"Griechenland","combination":"95"},{"country":"Zypern","combination":"188"},{"country":"Spanien","combination":"179"},{"country":"Slowakei","combination":"164"},{"country":"Frankreich","combination":"84"},{"country":"Estland","combination":"56"},{"country":"Irland","combination":"105"},{"country":"Niederlande","combination":"141"},{"country":"Finnland","combination":"70"},{"country":"Deutschland","combination":"50"},{"country":"Deutschland","combination":"49"},{"country":"\u00d6sterreich","combination":"150"},{"country":"Deutschland","combination":"48"},{"country":"Deutschland","combination":"47"},{"country":"Deutschland","combination":"46"},{"country":"Portugal","combination":"160"}]},{"year":"2012","countries":[{"country":"Portugal","combination":"200"},{"country":"Spanien","combination":"202"},{"country":"Slowakei","combination":"201"},{"country":"Niederlande","combination":"230"},{"country":"\u00d6sterreich","combination":"199"},{"country":"Italien","combination":"198"},{"country":"Irland","combination":"197"},{"country":"Griechenland","combination":"196"},{"country":"Zypern","combination":"189"},{"country":"Deutschland","combination":"54"},{"country":"Deutschland","combination":"52"},{"country":"Deutschland","combination":"55"},{"country":"Estland","combination":"57"},{"country":"Finnland","combination":"71"},{"country":"Frankreich","combination":"85"},{"country":"Luxemburg","combination":"126"},{"country":"Deutschland","combination":"51"},{"country":"Belgien","combination":"10"},{"country":"Deutschland","combination":"53"}]},{"year":"2013","countries":[{"country":"Spanien","combination":"208"},{"country":"Italien","combination":"207"},{"country":"Frankreich","combination":"216"},{"country":"Slowakei","combination":"274"},{"country":"Griechenland","combination":"215"},{"country":"\u00d6sterreich","combination":"217"},{"country":"Niederlande","combination":"231"},{"country":"Irland","combination":"228"},{"country":"Luxemburg","combination":"206"},{"country":"Zypern","combination":"205"},{"country":"Deutschland","combination":"190"},{"country":"Deutschland","combination":"191"},{"country":"Deutschland","combination":"192"},{"country":"Deutschland","combination":"194"},{"country":"Belgien","combination":"195"},{"country":"Malta","combination":"241"},{"country":"Finnland","combination":"204"},{"country":"Deutschland","combination":"193"}]},{"year":"2014","countries":[{"country":"Slowakei","combination":"275"},{"country":"Luxemburg","combination":"229"},{"country":"Frankreich","combination":"235"},{"country":"Niederlande","combination":"232"},{"country":"Irland","combination":"266"},{"country":"Griechenland","combination":"236"},{"country":"Portugal","combination":"234"},{"country":"Finnland","combination":"227"},{"country":"Italien","combination":"237"},{"country":"Deutschland","combination":"211"},{"country":"Deutschland","combination":"210"},{"country":"Spanien","combination":"281"},{"country":"Deutschland","combination":"212"},{"country":"Deutschland","combination":"213"},{"country":"Lettland","combination":"214"},{"country":"Deutschland","combination":"209"},{"country":"\u00d6sterreich","combination":"218"},{"country":"Zypern","combination":"221"},{"country":"Andorra","combination":"283"}]},{"year":"2015","countries":[{"country":"Belgien","combination":"252"},{"country":"Estland","combination":"259"},{"country":"Frankreich","combination":"250"},{"country":"Italien","combination":"249"},{"country":"Griechenland","combination":"263"},{"country":"Luxemburg","combination":"267"},{"country":"Niederlande","combination":"270"},{"country":"Slowenien","combination":"279"},{"country":"Slowakei","combination":"276"},{"country":"Portugal","combination":"272"},{"country":"\u00d6sterreich","combination":"248"},{"country":"Deutschland","combination":"225"},{"country":"Spanien","combination":"242"},{"country":"Finnland","combination":"238"},{"country":"Deutschland","combination":"226"},{"country":"Deutschland","combination":"224"},{"country":"Deutschland","combination":"223"},{"country":"Litauen","combination":"240"},{"country":"Zypern","combination":"282"},{"country":"Deutschland","combination":"222"}]},{"year":"2016","countries":[{"country":"Slowenien","combination":"280"},{"country":"Deutschland","combination":"247"},{"country":"Luxemburg","combination":"268"},{"country":"Niederlande","combination":"271"},{"country":"Slowakei","combination":"277"},{"country":"Portugal","combination":"273"},{"country":"Frankreich","combination":"262"},{"country":"Griechenland","combination":"264"},{"country":"Deutschland","combination":"244"},{"country":"Spanien","combination":"251"},{"country":"Deutschland","combination":"245"},{"country":"Deutschland","combination":"246"},{"country":"Deutschland","combination":"243"},{"country":"Finnland","combination":"261"},{"country":"Belgien","combination":"253"}]},{"year":"2017","countries":[{"country":"Spanien","combination":"284"},{"country":"Slowakei","combination":"278"},{"country":"Griechenland","combination":"265"},{"country":"Deutschland","combination":"254"},{"country":"Estland","combination":"260"},{"country":"Luxemburg","combination":"269"},{"country":"Deutschland","combination":"258"},{"country":"Deutschland","combination":"257"},{"country":"Deutschland","combination":"256"},{"country":"Deutschland","combination":"255"}]},{"year":"2018","countries":[{"country":"Deutschland","combination":"285"},{"country":"Deutschland","combination":"286"},{"country":"Deutschland","combination":"287"},{"country":"Deutschland","combination":"288"},{"country":"Deutschland","combination":"289"}]}]
*/