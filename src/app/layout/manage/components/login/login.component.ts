import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { UserParams } from '../../model/user/user-params';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  flagLoginBtn: boolean;
  mensajeValidacionServidor: string;
  mensajeValidacionUsuario: string;
  mensajeValidacionPassword: string;
  userParams: UserParams = new UserParams();

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('Menu');
    sessionStorage.removeItem('Guard');
  }

  ngOnInit() {
    if (sessionStorage.getItem('Guard') === null) {
      this.router.navigate(['/manage/inicio']);
    }
  }

  menuTemporal() {
    return [
        {
          "nidresource": 1,
          "nidfather": 0,
          "sname": "Perfil",
          "sdescription": null,
          "ntyperesource": 0,
          "srouterlink": "",
          "shtml": "",
          "norder": 1,
          "sactive": null,
          "dregister": "0001-01-01T00:00:00",
          "nuserregister": null,
          "dupdate": "0001-01-01T00:00:00",
          "nuserupdate": null,
          "items": [
            {
              "nidresource": 4,
              "nidfather": 1,
              "sname": "Perfil",
              "sdescription": null,
              "ntyperesource": 0,
              "srouterlink": "/manage/perfil",
              "shtml": "",
              "norder": 1,
              "sactive": null,
              "dregister": "0001-01-01T00:00:00",
              "nuserregister": null,
              "dupdate": "0001-01-01T00:00:00",
              "nuserupdate": null,
              "items": []
            }
          ]
        },
        {
          "nidresource": 2,
          "nidfather": 0,
          "sname": "Gestión de Pacientes",
          "sdescription": null,
          "ntyperesource": 0,
          "srouterlink": "",
          "shtml": "",
          "norder": 2,
          "sactive": null,
          "dregister": "0001-01-01T00:00:00",
          "nuserregister": null,
          "dupdate": "0001-01-01T00:00:00",
          "nuserupdate": null,
          "items": [
            {
              "nidresource": 5,
              "nidfather": 2,
              "sname": "Bandeja de Pacientes",
              "sdescription": null,
              "ntyperesource": 0,
              "srouterlink": "/manage/bandeja-pacientes",
              "shtml": "",
              "norder": 1,
              "sactive": null,
              "dregister": "0001-01-01T00:00:00",
              "nuserregister": null,
              "dupdate": "0001-01-01T00:00:00",
              "nuserupdate": null,
              "items": []
            },
            {
              "nidresource": 6,
              "nidfather": 2,
              "sname": "Buscar Paciente",
              "sdescription": null,
              "ntyperesource": 0,
              "srouterlink": "/manage/buscar-pacientes",
              "shtml": "",
              "norder": 2,
              "sactive": null,
              "dregister": "0001-01-01T00:00:00",
              "nuserregister": null,
              "dupdate": "0001-01-01T00:00:00",
              "nuserupdate": null,
              "items": []
            }
          ]
        },
        // {
        //   "nidresource": 3,
        //   "nidfather": 0,
        //   "sname": "Notificaciones",
        //   "sdescription": null,
        //   "ntyperesource": 0,
        //   "srouterlink": "",
        //   "shtml": "",
        //   "norder": 2,
        //   "sactive": null,
        //   "dregister": "0001-01-01T00:00:00",
        //   "nuserregister": null,
        //   "dupdate": "0001-01-01T00:00:00",
        //   "nuserupdate": null,
        //   "items": [
        //     {
        //       "nidresource": 6,
        //       "nidfather": 3,
        //       "sname": "Aceptar mascotas",
        //       "sdescription": null,
        //       "ntyperesource": 0,
        //       "srouterlink": "/manage/aceptar-mascotas",
        //       "shtml": "",
        //       "norder": 1,
        //       "sactive": null,
        //       "dregister": "0001-01-01T00:00:00",
        //       "nuserregister": null,
        //       "dupdate": "0001-01-01T00:00:00",
        //       "nuserupdate": null,
        //       "items": []
        //     },
        //     {
        //       "nidresource": 7,
        //       "nidfather": 3,
        //       "sname": "Reporte mascotas",
        //       "sdescription": null,
        //       "ntyperesource": 0,
        //       "srouterlink": "/manage/reporte-mascotas",
        //       "shtml": "",
        //       "norder": 1,
        //       "sactive": null,
        //       "dregister": "0001-01-01T00:00:00",
        //       "nuserregister": null,
        //       "dupdate": "0001-01-01T00:00:00",
        //       "nuserupdate": null,
        //       "items": []
        //     }
        //   ]
        // }
      ]
  }


  serviceLogin(f: NgForm) {

    if (this.validateForm() && f.valid) {
      // Cargar Spinner
      this.flagLoginBtn = true;
      let menu = this.menuTemporal();

      this.loginService.logIn(this.userParams).subscribe({
        next: (res) => {
          console.log("Respuesat", res);
          
          //validar login correcto
          if (!res.success) {
            this.flagLoginBtn = false;
            this.mensajeValidacionServidor = 'Usuario o contraseña inválida';
            return;
          }

          sessionStorage.setItem('Guard', res.data.token);
          sessionStorage.setItem('Menu', JSON.stringify(menu));

          const usuario = {
            id: res.data.id,
            email: res.data.email
          };

          sessionStorage.setItem('User', JSON.stringify(usuario));
          window.location.href = environment.localUrl;
        },
        error: (err) => {
          this.flagLoginBtn = false;
          this.mensajeValidacionServidor = 'Usuario o contraseña inválida';
        }
      }

      );
    } else {
      this.flagLoginBtn = false;
    }
  }

  validateForm() {
    if (this.userParams.email === undefined || this.userParams.email == "") {
      this.mensajeValidacionUsuario = 'Mail incorrecto';
      return false;
    }
    if (this.userParams.password === undefined || this.userParams.password == "") {
      this.mensajeValidacionUsuario = 'Contraseña no valida';
      return false;
    }

    return true;
  }

  clearMensaje(input: string) {
    switch (input) {
      case 'usuario':
        this.mensajeValidacionUsuario = '';
        break;
      case 'password':
        this.mensajeValidacionPassword = '';
        break;
      default:
        break;
    }
  }

}
