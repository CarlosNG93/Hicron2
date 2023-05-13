import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Vacation } from './_models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  editUser(id:string,user: User): Observable<Object> {
    return this.http.put(`${this.SERVER_URL}/user/${id}`, user);
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(`${this.SERVER_URL}/user`, user);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(`${this.SERVER_URL}/user/${id}`);
  }

  getUsers(): Observable<Object> {
    return this.http.get(`${this.SERVER_URL}/user`);
  }

  getAbsencesRequests(): Observable<Object> {
    return this.http.get(`${this.SERVER_URL}/vacations`);
  }

  createVacations(vacation: Vacation): Observable<Object> {
    return this.http.post(`${this.SERVER_URL}/vacations`, vacation);
  }

  deleteVacations(id: string): Observable<Object> {
    return this.http.delete(`${this.SERVER_URL}/vacations/${id}`);
  }

  editVacations(id: string, vacation: Vacation): Observable<Object> {
    return this.http.put(`${this.SERVER_URL}/vacations/${id}`, vacation);
  }
}
