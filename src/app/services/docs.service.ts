import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  baseurl = environment.baseurl + '/docs';

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

  
  GetProductionReport(production_report_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getProductionReport?id=' + production_report_id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }

  uploadUsersFromCSV(file: File, run_id:number) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // This sends a multipart/form-data request
    return this.http.post(this.baseurl + '/uploadUsersFromCSV?id=' + run_id, formData, this.httpOptions);
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
