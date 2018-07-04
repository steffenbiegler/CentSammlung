import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  headline = 'centsammlung';
  private route: ActivatedRoute;

  constructor(private _router: Router) {
    switch (_router.url) {
      case '/add':
            this.headline = 'Cent(s) hinzufügen';
            break;
      case '/report':
            this.headline = 'Monatsabrechnung';
            break;
      case '/comb':
            this.headline = 'Prägekombinationen';
            break;
      case '/history':
            this.headline = 'Verlauf';
            break;
      case '/stat':
            this.headline = 'Statistiken';
            break;
      case '/ranking':
            this.headline = 'Cent-Ranking';
            break;
      default: this.headline = _router.url; break;
    }
  }

  ngOnInit() {

  }

}
