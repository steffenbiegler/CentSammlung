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
    this.centService.getRanking().subscribe((data) => {
      this.data = data;
    });

  }

}
