import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  apiUrl: string = environment.API_BREEDS;

  constructor(private http: HttpClient) { }


  getBreeds() {
    return this.http.get<any>(this.apiUrl, this.httpOptions)
  }

}
