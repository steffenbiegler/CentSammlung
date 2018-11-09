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
    return this.http.get(this.baseUrl + '  comb_year');
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


  addCentCount(centCount: number[]) {
    centCount.forEach((count, combination) => {
      if (count > 0) {
        console.log('Muss noch senden: CombID:' + combination + ', ' + count + ' Cents');
        this.addCents(combination.toString(), count.toString()).subscribe(
          (data) => console.log(data + 'count ' + count  + ' combination ' + combination)
        );
      }
    });
  }

  addCents(combination: String, count: String): Observable < any > {
    const params = '&count=' + count + '&combination=' + combination;
    return this.http.get(this.baseUrl + 'add' + params);
  }
}
