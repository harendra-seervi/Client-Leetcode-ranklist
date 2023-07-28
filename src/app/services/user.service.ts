import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user';

  constructor(private _http: HttpClient) { }

  addUser(user: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(this.apiUrl, user, { observe: 'response' });
  }
  getUserList(): Observable<any> {
    return this._http.get<any>('http://localhost:8080/users');
  }
  deleteUser(id:number): Observable<HttpResponse<any>>{
    return this._http.delete<any>(`http://localhost:8080/user/${id}`);
  }
  updateUser(id:number,user:any):Observable<HttpResponse<any>>{
    return this._http.put<any>(`http://localhost:8080/user/${id}`,user,{ observe: 'response' });
  }
}
