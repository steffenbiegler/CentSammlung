import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  headline = 'centsammlung';
  private route: ActivatedRoute;

  constructor(private _router: Router) {
  }

  ngOnInit() {

  }

}
