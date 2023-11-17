import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  apiUrl: string = environment.API_OWNERS;


  constructor(private http: HttpClient) { }


  getOwners() {
    return this.http.get<any>(this.apiUrl, this.httpOptions)
  }
}
