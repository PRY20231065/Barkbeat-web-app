import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  apiUrl: string = 'http://107.21.241.233:443/api/v1/owners';


  constructor(private http: HttpClient) { }


  getOwners() {
    return this.http.get<any>(this.apiUrl, this.httpOptions)
  }
}
