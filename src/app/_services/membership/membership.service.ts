import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Membership } from './membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  endpoint: string = 'https://magits-backend.herokuapp.com/membership';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add membership, id should be cousrse ID
  AddMembership(id, data: Membership): Observable<any> {
    let API_URL = `${this.endpoint}/add-membership/${id}`;
    return this.http.post(API_URL, data, {headers: this.headers})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Memberships
  GetMemberships() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Membership
  GetMembership(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-membership/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Membership
  UpdateMembership(id, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Membership
  DeleteMembership(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-membership/${id}`;
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
