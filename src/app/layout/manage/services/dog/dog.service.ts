import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from '../../model/dog/dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  apiUrl: string = 'http://34.204.154.158:443/api/v1/dogs';


  constructor(private http: HttpClient) { }


  getDogsByVeterinarianId(vet_id) {
    return this.http.get<any>(`${this.apiUrl}/filterByVet?vet_id=` + vet_id, this.httpOptions)
  }

  getDogsByBreedId(breed_id) {
    return this.http.get<any>(`${this.apiUrl}/filterByBreed?breed_id=` + breed_id, this.httpOptions)
  }

  getDogsWithoutVeterinarianId() {
    return this.http.get<any>(`${this.apiUrl}/withoutVet`, this.httpOptions)
  }

  updateDog(dog: any, dog_id: string, owner_id: string) {
    return this.http.put<any>(`${this.apiUrl}/${dog_id}/owner/${owner_id}`, dog);
  }

}
