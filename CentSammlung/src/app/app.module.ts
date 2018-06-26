import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';

import { BaseComponent } from './base/base.component';
import { AddComponent } from './base/add/add.component';
import { StatisticComponent } from './base/statistic/statistic.component';
import { RankingComponent } from './base/ranking/ranking.component';
import { ReportComponent } from './base/report/report.component';
import { CombinationComponent } from './base/combination/combination.component';
import { HistoryComponent } from './base/history/history.component';
import { NavigationComponent } from './base/navigation/navigation.component';
import { CounterComponent } from './counter/counter.component';

const appRoutes: Routes = [  {path: '', component: StartComponent },
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
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
