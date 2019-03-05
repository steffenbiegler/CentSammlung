import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  post
} from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CentBackendService {
  private baseUrl = 'http://127.0.0.1:80/centBackend/?request=';

  constructor(private http: HttpClient) {}

  isBackendAlive(): boolean {
    return true;
  }

  getYearCombinations(): Observable < any > {
    return this.http.get(this.baseUrl + 'comb_year');
  }

  getCombinations(): Observable < any > {
    return this.http.get(this.baseUrl + 'combinations');
  }

  getCountries(): Observable < any > {
    return this.http.get(this.baseUrl + 'countries');
  }

  getCitys(): Observable < any > {
    return this.http.get(this.baseUrl + 'cities');
  }

  getCount(): Observable < any > {
    return this.http.get(this.baseUrl + 'count');
  }

  getYearCount(): Observable < any > {
    return this.http.get(this.baseUrl + 'count_year');
  }

  getGermanCityCount(): Observable < any > {
    return this.http.get(this.baseUrl + 'count_city');
  }

  getEuropeanCount(): Observable < any > {
    return this.http.get(this.baseUrl + 'count_country');
  }

  getMonthlyGrow(): Observable < any > {
    return this.http.get(this.baseUrl + 'grow');
  }

  getRanking(): Observable < any > {
    return this.http.get(this.baseUrl + 'ranking');
  }

  getHistory(year: string, month: string): Observable < any > {
    const params = '&jahr=' + year + '&monat=' + month;
    return this.http.get(this.baseUrl + 'history' + params);
  }

  addCentCount(centCount: number[]) {
    centCount.forEach((count, combination) => {
      if (count > 0) {
        const params = '&count=' + count + '&combination=' + combination;
        this.http.get(this.baseUrl + 'add' + params).subscribe();
      }
    });
  }

  deleteCent(id: number) {
    const params = '&id=' + id;
    this.http.get(this.baseUrl + 'deleteCent' + params).subscribe();
  }
}
