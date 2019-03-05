import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes} from '@angular/router';
import { MaterialModule } from './MaterialModule/material.module';

import { AppComponent } from './app.component';
import { StartComponent } from './base/start/start.component';

import { BaseComponent } from './base/base.component';
import { AddComponent } from './base/add/add.component';
import { StatisticComponent } from './base/statistic/statistic.component';
import { RankingComponent } from './base/ranking/ranking.component';
import { ReportComponent } from './base/report/report.component';
import { CombinationComponent } from './base/combination/combination.component';
import { HistoryComponent } from './base/history/history.component';
import { NavigationComponent } from './base/navigation/navigation.component';
import { CounterComponent } from './counter/counter.component';

import { IgxPieChartModule } from 'igniteui-angular-charts/ES5/igx-pie-chart-module';
import { IgxItemLegendModule } from 'igniteui-angular-charts/ES5/igx-item-legend-module';

const appRoutes: Routes = [  {path: '', component: BaseComponent, children: [{ path: '', component: StartComponent}]},
                             {path: 'add', component: BaseComponent, children: [{ path: '', component: AddComponent}]},
                             {path: 'stat', component: BaseComponent, children: [{ path: '', component: StatisticComponent}]},
                             {path: 'ranking', component: BaseComponent, children: [{ path: '', component: RankingComponent}]},
                             {path: 'report', component: BaseComponent, children: [{ path: '', component: ReportComponent}]},
                             {path: 'history', component: BaseComponent, children: [{ path: '', component: HistoryComponent}]},
                             {path: 'comb', component: BaseComponent, children: [{ path: '', component: CombinationComponent}]}
 ];

@NgModule({
  declarations: [
    AppComponent,
    StatisticComponent,
    RankingComponent,
    CombinationComponent,
    AddComponent,
    HistoryComponent,
    ReportComponent,
    StartComponent,
    BaseComponent,
    NavigationComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IgxPieChartModule,
    IgxItemLegendModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
