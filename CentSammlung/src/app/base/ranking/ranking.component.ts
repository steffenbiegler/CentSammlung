import { Component,  OnInit } from '@angular/core';
import { CentBackendService } from '../../cent-backend.service';
import { RankingResultSet } from './../../resultData/ranking-result';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  data: RankingResultSet[] = [];
  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    if (this.centService.isBackendAlive()) { this.recieveData(); } else { this.generateRadomData(); }
  }

  recieveData() {
     this.centService.getRanking().subscribe((data: RankingResultSet[]) => {
      this.data = data;
    });
  }

  generateRadomData() {
    const cities = [['Berlin', 'A'] , ['München', 'D'], ['Stuttgard', 'F'], ['Karlsruhe', 'G'], ['Hamburg', 'J']];
    const countries =  ['Deutschland', 'Deutschland', 'Deutschland', 'Deutschland', 'Deutschland', 'Belgien', 'Estland', 'Finnland',
     'Frankreich', 'Griechenland', 'Irland', 'Italien', 'Lettland', 'Litauen', 'Luxemburg', 'Malta', 'Niederlande', 'Österreich',
     'Portugal', 'Slowakei', 'Slowenien', 'Spanien', 'Zypern'];
    for (let i = 0; i < 20; i++) {
      const country = `${countries[Math.floor(Math.random() * countries.length)]}`;
      const city = (country === 'Deutschland') ? cities[Math.floor(Math.random() * cities.length)] : ['-', '-'];
      this.data.push(
        new RankingResultSet(city,  Math.floor(Math.random() * 1800) , country, 'string', 1999 + Math.floor(Math.random() * 20))
      );
    }
    this.data.sort( (a: RankingResultSet, b: RankingResultSet) => {
      if (a.count < b.count) {
        return  1;
      } else if (a.count > b.count) {
        return -1;
      } else {
        return 0;
      }
    });
  }

}
