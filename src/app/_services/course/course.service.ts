import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  endpoint: string = 'http://localhost:4000/course';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add course
  AddCourse(data): Observable<any> {
    let API_URL = `${this.endpoint}/add-course`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Courses
  GetCourses() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get course
  GetCourse(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-course/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // GET ALL MEMBERS ENROLLED TO THE COURSE
  GetMembersEnrolled(id) {
    let API_URL = `${this.endpoint}/course-members/${id}`;
    return this.http.get(API_URL);
  }

  // GET ALL MEMBERS NOT ENROLLED IN THIS COURSE
  GetMembersNotEnrolled(id) {
    let API_URL = `${this.endpoint}/members-not-enrolled-in-course/${id}`;
    return this.http.get(API_URL);
  }

  // Update course
  UpdateCourse(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // add member to a course
  EnrolMember(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/register-user-to-course/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  // Delete course
  RemoveStudent(id, data): Observable<any> {
    var API_URL = `${this.endpoint}/remove-user-from-course/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  // Delete course
  DeleteCourse(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-course/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get all instructors assigned to the course
  GetCourseInstructors(id){
    let API_URL = `${this.endpoint}/course-instructors/${id}`;
    return this.http.get(API_URL);
  }

  // Assign instructor to a course - ADMIN ONLY!!!
  AssignInstructor(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/assign-instructor-to-course/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
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
