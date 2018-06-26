import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentBackendService {
  private baseUrl = 'http://127.0.0.1:80/centBackend/?step=';

  constructor(private http: HttpClient) { }


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

}
