import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../../cent-backend.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  data;
  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    this.recieveData();
  }

  recieveData() {
     this.centService.getRanking().subscribe((data) => {
      this.data = [];
      for (let index = 0; index < data.length; index++) {
        this.data.push([`${data[index].stadt_lang ? data[index].stadt_lang : data[index].land}`, parseInt(data[index].anz, 10),
        parseInt(data[index].jahr, 10)]);
      }

    });
  }

  generateRadomData() {
    this.data = [];
    const cities = ['Berlin', 'München', 'Stuttgard', 'Karlsruhe', 'Hamburg', 'Belgien', 'Estland', 'Finnland', 'Frankreich',
    'Griechenland', 'Irland', 'Italien', 'Lettland', 'Litauen', 'Luxemburg', 'Malta', 'Niederlande', 'Österreich', 'Portugal',
    'Slowakei', 'Slowenien', 'Spanien', 'Zypern'];
    for (let i = 0; i < (80 + Math.floor(Math.random() * 30)); i++) {
      this.data.push([
        `${cities[Math.floor(Math.random() * cities.length)]}`,
         Math.floor(Math.random() * 1800), 1999 + Math.floor(Math.random() * 20)]);
    }
  }

}
