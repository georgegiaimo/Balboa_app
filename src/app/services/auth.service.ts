import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = environment.baseurl + '/auth';

  constructor(
    private http: HttpClient,
    //public userService: UserService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      //'Accepts': 'application/json',
      //'Content-Type': 'application/json'
    })
  }
  

  SignUp(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/signup', object, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  LogIn(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/login', object, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetAdminFromToken(token:string): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getAdminFromToken?token=' + token, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  ResetPassword(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/resetPassword', object, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  // Error handling
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
