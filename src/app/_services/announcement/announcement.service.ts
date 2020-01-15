import { Injectable } from '@angular/core';
import { Announcement } from '../announcement';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {

  endpoint: string = 'http://localhost:4000/announcement';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add announcement
  AddAnnouncement(data: Announcement): Observable<any> {
    let API_URL = `${this.endpoint}/add-announcement`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Announcements
  GetAnnouncements() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get announcement
  GetAnnouncement(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-announcement/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Delete Announcement
  DeleteAnnouncement(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-announcement/${id}`;
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
