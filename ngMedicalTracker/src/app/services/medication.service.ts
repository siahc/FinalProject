import { MedicalHistory } from './../models/medical-history';
import { Medication } from './../models/medication';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  // private baseUrl = 'http://localhost:8090/';
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/medication';

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

    updateRx(medication: Medication):Observable<Medication>{
      const httpOptions = this.getHttpOptions();

      return this.http.put<Medication>(`${this.url}/${medication.id}`, medication, httpOptions).pipe(
        catchError((err:any) => {
          console.error(err);
          return throwError('medication service failed to update')
        })
      )
    }

    addMed(medication: Medication): Observable<Medication> {
      const httpOptions = this.getHttpOptions();

      return this.http.post<Medication>(this.url, medication, httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('TodoService.create(): Error creating todo');
        })
      );
    }
    deleteMed(rxId: number): Observable<boolean>{
      const httpOptions = this.getHttpOptions();

      return this.http.delete<boolean>(`${this.url}/${rxId}`, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('medication service failed to delete')
        })
      )
    }
    showRxHis(rxId: number): Observable<MedicalHistory> {
      const httpOptions = this.getHttpOptions();
      return this.http.get<MedicalHistory>(`${this.url}/${rxId}/diagnosis`, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('medication diagnosis service failed to display')
        })
      )
    }
    addDxToRx(rxId:number, dxId:number):Observable<boolean>{
      const httpOptions = this.getHttpOptions();
      return this.http.get<boolean>(`${this.url}/${rxId}/${dxId}`, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('medication.service.ts.addDxToRx(): Failed')
        })
      )
    }

}
