import { Component, OnInit } from '@angular/core';
import { DogList } from '../../model/list/dogLis';
import { DogService } from '../../services/dog/dog.service';
import Swal from 'sweetalert2';
import { OwnerService } from '../../services/owner/owner.service';
import { BreedService } from '../../services/breed/breed.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMascotaComponent } from '../modal-mascota/modal-mascota.component';
import { Dog } from '../../model/dog/dog';


@Component({
  selector: 'app-bandeja-pacientes',
  templateUrl: './bandeja-pacientes.component.html',
  styleUrls: ['./bandeja-pacientes.component.css']
})
export class BandejaPacientesComponent implements OnInit {

  mascotaList: any = [];
  breedList: any = [];
  ownerList: any = [];

  veterinarianId: string = "";

  // Filtrar tabla
  mascotasList: DogList = new DogList();

  constructor(
    private dogService: DogService,
    private ownerService: OwnerService,
    private breedService: BreedService,
    private dialog: MatDialog
    ) 
    {
  }

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
    this.dogService.getDogsByVeterinarianId(this.veterinarianId).subscribe({
      next: (response) => {
        if(!response.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al obtener los registros.',
          });
        }
        this.mascotaList = response.items;
      }
    });
    
  }

  informacionMascota(item: any) {

    var dog = {
      id: item.id,
      owner_id: item.owner_id,
      name: item.name,
      age: item.age,
      weight: item.weight,
      veterinarian_id: item.veterinarian_id,
      breed_id: item.breed_id,
      sbreed: this.getBreedName(item.breed_id),
      sowner: this.getOwnerName(item.owner_id)
    }
    
    const dialogOpenBandeja = this.dialog.open(ModalMascotaComponent, {
      width: '80%',
      height: '90%',
      autoFocus:false,
      data: {
        dog: dog,
      },
      disableClose: false,
    });
    dialogOpenBandeja.afterClosed().subscribe(data => {
        this.getdogsLis ();
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
