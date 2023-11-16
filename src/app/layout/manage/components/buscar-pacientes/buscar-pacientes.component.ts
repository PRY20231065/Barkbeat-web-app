import { Component, OnInit } from '@angular/core';
import { DogList } from '../../model/list/dogLis';
import { DogService } from '../../services/dog/dog.service';
import { OwnerService } from '../../services/owner/owner.service';
import { BreedService } from '../../services/breed/breed.service';
import Swal from 'sweetalert2';
import { Dog } from '../../model/dog/dog';

@Component({
  selector: 'app-buscar-pacientes',
  templateUrl: './buscar-pacientes.component.html',
  styleUrls: ['./buscar-pacientes.component.css']
})
export class BuscarPacientesComponent implements OnInit {

  mascotaList: any = [];
  breedList: any = [];
  ownerList: any = [];

  veterinarianId: string = "";

  mascotasList: DogList = new DogList();

  constructor(
    private dogService: DogService,
    private ownerService: OwnerService,
    private breedService: BreedService,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('User') !== null) {
      this.veterinarianId = JSON.parse(sessionStorage.getItem('User')).id;
    }
    
    this.getOwners();
    this.getBreeds();
    this.getdogsLis();
  }

  getOwners() {
    this.ownerService.getOwners().subscribe({
      next: (response) => {
        this.ownerList = response;
      }
    })
  }

  getBreeds() {
    this.breedService.getBreeds().subscribe({
      next: (response) => {
        this.breedList = response;
      }
    })
  }

  getdogsLis() {
    this.dogService.getDogsWithoutVeterinarianId().subscribe({
      next: (response) => {
        if(!response.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al obtener los registros.',
          });
        }
        this.mascotaList = response.data;
      }
    });
    
  }

  aceptarPaciente(dog: Dog) {
    var dog_id = dog.id;
    var owner_id = dog.owner_id;
    
    var auxDog = {
      name: dog.name,
      age: dog.age,
      weight: dog.weight,
      veterinarian_id: this.veterinarianId,
      breed_id: dog.breed_id
  }
    
    this.dogService.updateDog(auxDog, dog_id, owner_id).subscribe({
      next: (next) => {
        Swal.fire({
          icon: 'success',
          title: 'Se le asignó el perro correctamente.',
        });
        this.getdogsLis();
      }
    })
  }

  getBreedName(id) {
    var breed = this.breedList.find( x=> x.id == id);
    return breed != undefined? breed.name : '';
  }

  getOwnerName(id) {
    var owner =  this.ownerList.find( o => o.id == id);
    return owner != undefined ? owner.lastname + ' ' + owner.name : '';
  }
}
