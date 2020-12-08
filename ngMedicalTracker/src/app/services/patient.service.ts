import { Patient } from './../models/patient';
import { User } from 'src/app/models/user';
import { MedicalHistory } from './../models/medical-history';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medication } from '../models/medication';

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
    userPatientMedication():Observable<Medication[]>{
      const httpOptions = this.getHttpOptions();
      let testUrl = this.baseUrl + 'api/patient/medication';
      return this.http.get<Medication[]>(testUrl, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('PatientService.userPatientMedication(): Failed to get patient')
        })
      )
    }
    userMedicalHistory():Observable<MedicalHistory[]>{
      const httpOptions = this.getHttpOptions();
      let testUrl = this.baseUrl + 'api/patient/medHis';
      return this.http.get<MedicalHistory[]>(testUrl, httpOptions).pipe(
        catchError((err:any)=> {
          console.error(err);
          return throwError('PatientService.userMedicalHistory: Failed to get medical history')
        })
      )
    }
    createPatient(patient: Patient):Observable<Patient> {
      const httpOptions = this.getHttpOptions();

      return this.http.post<Patient>(this.url, patient, httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Patient.create(): Error creating patient');
        })
      );
    }
    // addPatient(patient: Patient): Observable<Patient>{
    //   const httpOptions = this.getHttpOptions();

    //   return this.http.get<Patient>(this.url, patient, httpOptions).pipe(
    //     catchError((err: any) => {
    //       console.log(err);
    //       return throwError('Patient.add(): Error adding patient');
    //     })
    //   );
    // }

    }
