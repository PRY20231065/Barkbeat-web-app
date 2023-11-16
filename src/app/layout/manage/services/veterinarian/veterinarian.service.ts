import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  apiUrl: string = 'http://107.21.241.233:443/api/v1/vets';


  constructor(private http: HttpClient) { }


  getVetById(veterinarianId: string) {
    return this.http.get<any>(`${this.apiUrl}/${veterinarianId}`, this.httpOptions)
  }

  updateVet(vet: any, veterinarianId: string) {
    return this.http.put<any>(`${this.apiUrl}/${veterinarianId}`, vet);
  }
}
