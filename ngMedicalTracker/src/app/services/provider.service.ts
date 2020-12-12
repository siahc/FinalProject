import { MedicalHistory } from './../models/medical-history';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Provider } from '../models/provider';
import { Patient } from '../models/patient';
import { Medication } from '../models/medication';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/providerpatients';


  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
    return httpOptions;
  }
  showProvider(): Observable<Provider> {
    const httpOptions = this.getHttpOptions();
    let providerURL = this.baseUrl + 'api/providerinfo';
    return this.http.get<Provider>(providerURL, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          'providerService.showProvider(): Error showing provider'
        );
      })
    );
  }
  providerPatientList(): Observable<Patient[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Patient[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'PatientService.providerPatientInformation(): Failed to get patients'
        );
      })
    );
  }
  providerViewPatientMeds(id:number): Observable<Medication[]>{
    const httpOptions = this.getHttpOptions();
    return this.http.get<Medication[]>(`${this.url}/${id}/medications`, httpOptions).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Provider.service.providerViewPatientMeds():Failed to retrieve med list');
      })
    )
  }
  providerViewPatientHist(id:number): Observable<MedicalHistory[]>{
    const httpOptions = this.getHttpOptions();
    return this.http.get<MedicalHistory[]>(`${this.url}/${id}/history`, httpOptions).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Provider.service.providerViewPatientHist():Failed to retrieve med list');
      })
    )
  }
  providerRemovePatient(id:number): Observable<boolean>{
    const httpOptions = this.getHttpOptions();
    return this.http.delete<boolean>(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Provider.service.providerViewPatientHist():Failed to delete patient');
      })
    )
  }
  updateProvider(prov:Provider):Observable<Provider>{
    let updateUrl = this.baseUrl + '/api/provider/' + prov.id;
    const httpOptions = this.getHttpOptions();
    return this.http.put<Provider>(updateUrl, prov, httpOptions).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Provider.service.updateProvider):Failed to update provider');
      })
    )
  }
}
