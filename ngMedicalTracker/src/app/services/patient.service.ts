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

      show(patientId: number): Observable<Patient> {
        const httpOptions = this.getHttpOptions();
  console.log(patientId);

        return this.http.get<Patient>(`${this.url}/${patientId}`, httpOptions).pipe(
          catchError((err: any) => {
            console.log(err);
            return throwError('PatientService.index(): Error retrieving patient ' + patientId);
          })
        );
      }

      getHttpOptions() {
        console.log('****************************************************');

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
