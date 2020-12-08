import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/patients';

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

    getHttpOptions() {
      const credentials = this.auth.getCredentials();

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return httpOptions;
    }


}
