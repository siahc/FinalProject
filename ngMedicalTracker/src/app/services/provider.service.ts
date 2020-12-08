import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Provider } from '../models/provider';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/provider';

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

  showProvider(): Observable<Provider>{
    const httpOptions = this.getHttpOptions();
    let providerURL = this.baseUrl + 'api/providerinfo';
    return this.http.get<Provider>(providerURL, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('providerService.showProvider(): Error showing provider');

      })
    )
}
providerPatientInformation():Observable<Patient[]>{
  const httpOptions = this.getHttpOptions();
  let testUrl = this.baseUrl + 'api/providerpatients';
  return this.http.get<Patient[]>(testUrl, httpOptions).pipe(
    catchError((err:any)=> {
      console.error(err);
      return throwError('PatientService.providerPatientInformation(): Failed to get patients')
    })
  )
}
}
