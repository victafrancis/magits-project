import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Identifiers } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  endpoint: string = 'http://localhost:4000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add user
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/register`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

   //Login User
   LoginUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/login`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all users
  GetUsers() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get all members
  GetMembers() {
    return this.http.get(`${this.endpoint}/get-members`);
  }
  
  // Get all instructors
  GetInstructors() {
    return this.http.get(`${this.endpoint}/get-instructors`);
  }

  // Get Instructors not in the course
  GetInstructorsNotInCourse(id){
    let API_URL = `${this.endpoint}/get-instructors-not-assigned-in-course/${id}`;
    return this.http.get(API_URL);
  }

  // Get user
  GetUser(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-user/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }



  // Update user
  UpdateUser(id, data: User): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete user
  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-user/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  //get all the sessions attended by a member
  // requires json object with 'subject' containing member ID
  GetMemberSessionsAttended(data: any): Observable<any> {
    let API_URL = `${this.endpoint}/member-get-attended-sessions`;
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  //get the course details for the instructor
  GetInstructorCourseDetails(data: any): Observable<any> {
    let API_URL = `${this.endpoint}/instructor-get-course-details`;
    return this.http.post(API_URL, data).pipe(
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
