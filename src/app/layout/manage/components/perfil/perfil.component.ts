import { Component, OnInit } from '@angular/core';
import { Veterinarian } from '../../model/veterinarian/veterinarian';
import { VeterinarianService } from '../../services/veterinarian/veterinarian.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  veterinarian: Veterinarian = new Veterinarian();

  maxLength = 8;
  docRepetido = false;
  isValidEmail = true;

  veterinarianId: string = "";

  
  constructor(
    private veterinarianService: VeterinarianService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('User') !== null) {
      this.veterinarianId = JSON.parse(sessionStorage.getItem('User')).id;
    }

    this.getVeterinario();
  }

  getVeterinario() {
    this.veterinarianService.getVetById(this.veterinarianId).subscribe({
      next: (response) => {
        if(!response.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al obtener los datos del usuario.',
          });          
        }
        this.veterinarian = response.data;
      }
    })
  }


  save() {

    var auxVet = {
      name: this.veterinarian.name,
      lastname: this.veterinarian.lastname,
      phone: this.veterinarian.phone,
      clinic_name: this.veterinarian.clinic_name,
      disponibility_start: this.veterinarian.disponibility_start,
      disponibility_end: this.veterinarian.disponibility_end
    }
    this.veterinarianService.updateVet(auxVet, this.veterinarianId).subscribe({
      next: (resp) => {
        if(!resp.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al actualizar los datos.',
          });          
        }

        Swal.fire({
          icon: 'success',
          title: 'Se actualizaron los datos correctamente.',
        });
      }
    })
  }

}
