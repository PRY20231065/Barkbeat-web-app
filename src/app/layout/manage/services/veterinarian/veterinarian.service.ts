import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  apiUrl: string = environment.API_VETS;
  constructor(private http: HttpClient) { }


  getVetById(veterinarianId: string) {
    return this.http.get<any>(`${this.apiUrl}/${veterinarianId}`, this.httpOptions)
  }

  updateVet(vet: any, veterinarianId: string) {
    return this.http.put<any>(`${this.apiUrl}/${veterinarianId}`, vet);
  }
}
