import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

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

    index(): Observable<Patient[]>{
      const httpOptions = this.getHttpOptions();
      return this.http.get<Patient[]>(this.url, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('PatientService.Index(): Failed to get patients[]')
        })
      )
    }

    userPatientInfo():Observable<Patient>{
      const httpOptions = this.getHttpOptions();
      let testUrl = this.baseUrl + 'api/patient/info';
      return this.http.get<Patient>(testUrl, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('PatientService.userPatientInfo(): Failed to get patient')
        })
      )
    }

    show(patientId: number): Observable<Patient> {
      const httpOptions = this.getHttpOptions();
      return this.http.get<Patient>(`${this.url}/${patientId}`, httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('PatientService.index(): Error retrieving patient ' + patientId);
        })
      );
    }

    }
