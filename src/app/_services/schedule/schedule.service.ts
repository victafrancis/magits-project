import { Injectable } from '@angular/core';
import { Schedule } from './schedule';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  endpoint: string = 'https://magits-backend.herokuapp.com/schedule';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add schedule, id should be cousrse ID
  AddSchedule(id, data: Schedule): Observable<any> {
    let API_URL = `${this.endpoint}/add-schedule/${id}`;
    return this.http.post(API_URL, data, {headers: this.headers})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Schedules
  GetSchedules() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Schedule
  GetSchedule(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-schedule/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Schedule
  UpdateSchedule(id, data: Schedule): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Schedule
  DeleteSchedule(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-schedule/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
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
