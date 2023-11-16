import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserParams } from 'src/app/layout/manage/model/user/user-params';
import { Login } from 'src/app/layout/manage/model/login/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = 'http://107.21.241.233:443/api/v1/authenticate/veterinarian'; 


  constructor(private http: HttpClient) { }

  verificarGuard() {
    return sessionStorage.getItem('Guard') !== null ? true : false;
  }

  logIn(userParams: UserParams): Observable<Login> {
    return this.http.post<Login>(this.apiUrl, userParams);
  }


  // No esta implementado
  logOut(intUser: number): Observable<any> {
    return this.http.post<any>('/login/logout', intUser);
  }

}
