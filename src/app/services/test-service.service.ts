import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private readonly baseUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  private getRequestOptions() {
    // You can add headers, authentication tokens, etc., if needed
    const headers = new HttpHeaders();
    return { headers };
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.baseUrl, data, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.baseUrl, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`, this.getRequestOptions()).pipe(catchError(this.handleError));
  }
}
