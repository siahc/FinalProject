import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Message } from '../models/message';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // private baseUrl = 'http://localhost:8090/';
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/message';

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
  getMessages(): Observable<Message[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Message[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('MessageService.getMessages(): Failed to get messages');
      })
    );
  }
  createMessage(id: number, message: Message): Observable<Message> {
    const httpOptions = this.getHttpOptions();

    return this.http.post<Message>(`${this.url}/${id}`, message, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Message.createMessage(): Error creating message');
      })
    );
  }
  updateMessage(message: Message): Observable<Message> {
    const httpOptions = this.getHttpOptions();

    return this.http.put<Message>(`${this.url}/${message.id}`, message, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Message.updateMessage(): Error updating message');
      })
    );
  }
  deleteMessage(message: Message): Observable<boolean> {
    const httpOptions = this.getHttpOptions();

    return this.http.delete<boolean>(`${this.url}/${message.id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Message.deleteMessage(): Error deleting message');
      })
    );
  }

}
