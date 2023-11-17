import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserParams } from 'src/app/layout/manage/model/user/user-params';
import { Login } from 'src/app/layout/manage/model/login/login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  apiUrl: string = environment.API_LOGIN;

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
