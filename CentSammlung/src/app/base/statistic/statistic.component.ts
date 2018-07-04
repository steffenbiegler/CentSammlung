import {Component, OnInit} from '@angular/core';
import {CentBackendService} from '../../cent-backend.service';

import {CentDistrubutionResultSet} from './../../resultData/cent-distrubution-result';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})


export class StatisticComponent implements OnInit {
  data: CentDistrubutionResultSet[];
  constructor(private centService: CentBackendService) {}

  ngOnInit() {
    if (this.centService.isBackendAlive()) {
      this.centService.getYearCount().subscribe((data: CentDistrubutionResultSet[]) => {
        this.data = data;
      });
    } else {
      this.data = [{
          year: 2018,
          percentage: '34%',
          count: 600,
          countries: [{
              country: 'Land1',
              percentage: '6%',
              percentage_from_year: '17%',
              count: 100
            },
            {
              country: 'Land2',
              percentage: '11%',
              percentage_from_year: '33%',
              count: 200
            },
            {
              country: 'Deutschland',
              percentage: '17%',
              percentage_from_year: '50%',
              count: 300,
              cities: [{
                  city: ['Berlin', 'A'],
                  count: 124,
                  percentage: '7%',
                  percentage_from_country: '41%',
                  percentage_from_year: '21%'
                },
                {
                  city: ['München', 'D'],
                  count: 176,
                  percentage: '10%',
                  percentage_from_country: '59%',
                  percentage_from_year: '29%'
                }
              ]
            }
          ]
        },
        {
          year: 2010,
          percentage: '66%',
          count: 1150,
          countries: [{
              country: 'Land1',
              percentage: '9%',
              percentage_from_year: '13%',
              count: 150
            },
            {
              country: 'Land2',
              percentage: '11%',
              percentage_from_year: '17%',
              count: 200
            },
            {
              country: 'Deutschland',
              percentage: '46%',
              percentage_from_year: '70%',
              count: 800,
              cities: [{
                  city: ['Berlin', 'A'],
                  count: 124,
                  percentage: '7%',
                  percentage_from_country: '16%',
                  percentage_from_year: '11%'
                },
                {
                  city: ['München', 'D'],
                  count: 676,
                  percentage: '39%',
                  percentage_from_country: '85%',
                  percentage_from_year: '59%'
                }
              ]
            },
          ]

        }
      ];
      console.log(this.data);
    }

  }
