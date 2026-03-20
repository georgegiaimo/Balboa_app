import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  baseurl = environment.baseurl + '/apis';

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

  
  GetProductions(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getProductions', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetProductionDetails(production_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getProductionDetails?id=' + production_id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetUsers(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getUsers', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetUserDetails(user_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getUserDetails?id=' + user_id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetDomainDetails(domain:string): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getDomainDetails?domain=' + domain, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetAdmins(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getAdmins', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  AddAdmin(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/addAdmin', object, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetAdmin(admin_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getAdmin?id=' + admin_id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  UpdateAdmin(object:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/updateAdmin', object, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetCoordinators(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getCoordinators', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetCoordinatorDetails(coordinator_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getCoordinatorDetails?id=' + coordinator_id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetHealth(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getHealth', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetDuplicatedUsersByEmail(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getDuplicatedUsersByEmail', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetDuplicatedUsersByName(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getDuplicatedUsersByName', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetUnassignedUsers(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getUnassignedUsers', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetInactiveUsers(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getInactiveUsers', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetSimilarUsersByEmail(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getSimilarByEmail', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetSimilarUsersByName(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getSimilarByName', this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  GetApproachingOneYear(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getApproachingOneYear', this.httpOptions)
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
