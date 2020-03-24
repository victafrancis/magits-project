import { Injectable } from '@angular/core';
import { Log } from './log';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  endpoint: string = 'https://magits-backend.herokuapp.com/logs';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  
  GetLogs(){
    return this.http.get(`${this.endpoint}`);
  }
}

