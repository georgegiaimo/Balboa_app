import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
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

  private getUserFromStorage() {
    //console.log('looking for user in storage!');
    try{
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
    }
    catch(e){
      return null;
    }
  }

  // The helper getter for Guards to check instantly
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Called after your login API returns { user: {...} }
  handleLogin(user: any) {
    //console.log('handleLogIn()', user);
    localStorage.setItem('user_data', JSON.stringify(user));
    sessionStorage.clear();
    this.currentUserSubject.next(user);
  }

  handleLogout() {
    //console.log('handleLogOUt()');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    // Call your backend /logout endpoint to clear the cookie on the server
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

  SendResetLink(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/sendResetLink', object, this.httpOptions)
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

  errorHandl(error: HttpErrorResponse) {
  let errorMessage = '';
  //console.log('error', error);

  if (error.error instanceof ErrorEvent) {
    // Get client-side error (e.g., internet went down)
    errorMessage = `Client Error: ${error.error.message}`;
  } else {
    // Get server-side error (e.g., 401, 404, 500)
    // This looks for the "message" field in your Node.js JSON response
    errorMessage = error.error?.message || `Server Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  //console.log('errorMessage', errorMessage);
  console.error(errorMessage);
  
  // CRITICAL: You must return an observable for the pipe to continue the error chain
  return throwError(() => new Error(error.statusText));
}

}
