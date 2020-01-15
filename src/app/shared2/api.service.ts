import { Injectable } from '@angular/core';
import { Player } from './player';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IGame } from '../game';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:4000/api';
  userEndpoint: string = 'http://localhost:4000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private games_url: string ="/assets/data/games.json";

  constructor(private http: HttpClient) { }

  // Add player
  AddPlayer(data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/add-player`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Add user
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.userEndpoint}/register`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  //Login User
  LoginUser(data: User): Observable<any> {
    let API_URL = `${this.userEndpoint}/login`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Check if logged in
  LoggedIn(){
    return !!localStorage.getItem('token');
  }

  // Get all players
  GetPlayers() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get player
  GetPlayer(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-player/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update player
  UpdatePlayer(id, data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete player
  DeletePlayer(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-player/${id}`;
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

  getGames(): Observable<IGame[]>{
    return this.http.get<IGame[]>(this.games_url);
  }
}
