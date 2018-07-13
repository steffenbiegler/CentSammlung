import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentBackendService {
  private baseUrl = 'http://127.0.0.1:80/centBackend/?request=';

  constructor(private http: HttpClient) { }

  isBackendAlive(): boolean {
    return false;
  }

  getYearCombinations(): Observable<any> {
    return this.http.get(this.baseUrl + '  comb_year');
   }
   // --------------------------------------- Refinement done

  getCombinations(): Observable<any> {
    return this.http.get(this.baseUrl + 'combinations');
  }

  getCountries(): Observable<any> {
    return this.http.get(this.baseUrl + 'countries');
  }

  getCitys(): Observable<any> {
    return this.http.get(this.baseUrl + 'cities');
  }

  getCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count');
  }

  getYearCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count_year');
  }

  getGermanCityCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count_city');
  }

  getEuropeanCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count_country');
  }

  getMonthlyGrow(): Observable<any> {
    return this.http.get(this.baseUrl + 'grow');
  }

  getRanking(): Observable<any> {
    return this.http.get(this.baseUrl + 'ranking');
  }


  sendInput(centCount: number[]) {
    centCount.forEach((count, combination) => {
      console.log(combination);
      if (count > 0) {
        console.log('Muss noch senden: CombID:' + combination + ', '  + count + ' Cents' );
      }

    });

  }
}
