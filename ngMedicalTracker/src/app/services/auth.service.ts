import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
// import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/'
  // private baseUrl = environment.baseUrl;
  user = null;
  constructor(
    private http:HttpClient
    ) { }

  login(username, password) {

    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    // create request to authenticate credentials
    return this.http
      .get(this.baseUrl + 'authenticate', httpOptions)
      .pipe(
        tap((res) => {
          localStorage.setItem('credentials' , credentials);
          this.setUserRole();
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('AuthService.login(): Error logging in.');
        })
      );
  }

  register(user: User) {
    // create request to register a new account
    return this.http.post(this.baseUrl + 'register', user)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): error registering user.');
      })
    );
  }

  logout():void {
    localStorage.removeItem('credentials');
    localStorage.removeItem('role');
  }

  checkLogin():boolean {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username, password):string {
    return btoa(`${username}:${password}`);
  }

  getCredentials():string {
    return localStorage.getItem('credentials');
  }

  getRole():string {
    return localStorage.getItem('role');
  }

  getHttpOptions() {
    const credentials = this.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return httpOptions;
  }

  setUserRole() {
    const httpOptions = this.getHttpOptions();
     this.http.get(this.baseUrl + 'api/user', httpOptions).subscribe(
      data=>{
        this.user = data;
        localStorage.setItem('role', this.user.role);
      },
      err=>{
        console.error(err);

      }
    )
  }

}
