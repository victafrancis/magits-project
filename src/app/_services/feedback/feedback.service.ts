import { Injectable } from '@angular/core';
import { Feedback } from './feedback';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  endpoint: string = 'https://magits-backend.herokuapp.com/feedback';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add feedback
  // requires json format:
  // {
  //   "content":"content",
  //   "member": "member id",
  //   "session":"session id"
  // }
  AddFeedback(data: any): Observable<any> {
    let API_URL = `${this.endpoint}/add-feedback`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Feedback
  GetFeedbacks() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Feedback
  GetFeedback(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-feedback/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Feedback
  UpdateFeedback(id, data: Feedback): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Feedback
  DeleteFeedback(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-feedback/${id}`;
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
