import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentBackendService {

  constructor(private http: HttpClient) { }


  connectionTest(): Observable<any> {
    return this.http.get('http://localhost/centBackend/');
  }
}
