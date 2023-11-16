import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  apiUrl: string = 'http://34.204.154.158:443/api/v1/breeds';


  constructor(private http: HttpClient) { }


  getBreeds() {
    return this.http.get<any>(this.apiUrl, this.httpOptions)
  }

}
