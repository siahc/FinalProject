import { Patient } from './../models/patient';
import { MedicalHistory } from './../models/medical-history';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medication } from '../models/medication';
import { Provider } from '../models/provider';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  // private baseUrl = 'http://localhost:8090/';
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/patient';

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

  index(): Observable<Patient[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Patient[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.Index(): Failed to get patients[]');
      })
    );
  }

  userPatientInfo(): Observable<Patient> {
    const httpOptions = this.getHttpOptions();
    let testUrl = this.baseUrl + 'api/patient';
    return this.http.get<Patient>(testUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.userPatientInfo(): Failed to get patient');
      })
    );
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
  userPatientMedication(): Observable<Medication[]> {
    const httpOptions = this.getHttpOptions();
    let testUrl = this.baseUrl + 'api/patient/medication';
    return this.http.get<Medication[]>(testUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.userPatientMedication(): Failed to get patient');
      })
    );
  }
  userMedicalHistory(): Observable<MedicalHistory[]> {
    const httpOptions = this.getHttpOptions();
    let testUrl = this.baseUrl + 'api/patient/medHis';
    return this.http.get<MedicalHistory[]>(testUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.userMedicalHistory: Failed to get medical history');
      })
    );
  }
  createPatient(patient: Patient): Observable<Patient> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<Patient>(this.url, patient, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Patient.create(): Error creating patient');
      })
    );
  }
  patientProvList(): Observable<Provider[]> {
    const httpOptions = this.getHttpOptions();

    let ptproviderlist = this.baseUrl + 'api/patient/providers';
    return this.http.get<Provider[]>(ptproviderlist, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.providerlist: Failed to get list of providers');
      })
    );
  }
  rmvPtProvList(id: number): Observable<boolean> {
    const httpOptions = this.getHttpOptions();
    let rmvptprovlist = this.baseUrl + 'api/patientproviders';
    return this.http.delete<boolean>(`${rmvptprovlist}/${id}`, httpOptions).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError('PatientService.rmptproviderlist: Failed to remove provider from list');
        })
      );
  }
  addPtProvList(id: number): Observable<boolean> {
    const httpOptions = this.getHttpOptions();
    let addptprovlist = this.baseUrl + 'api/patientproviders';
    return this.http.get<boolean>(`${addptprovlist}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.addptproviderlist: Failed to add provider to list');
      })
    );
  }
  updatePt(pt:Patient): Observable<Patient>{
    const httpOptions = this.getHttpOptions();
    return this.http.put<Patient>(`${this.url}/${pt.id}`, pt, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('PatientService.addptproviderlist: Failed to update pt');
      })
    );
  }
}
