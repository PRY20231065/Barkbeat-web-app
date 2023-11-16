import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ManageRoutingModule } from './manage-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BandejaPacientesComponent } from './components/bandeja-pacientes/bandeja-pacientes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalMascotaComponent } from './components/modal-mascota/modal-mascota.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BuscarPacientesComponent } from './components/buscar-pacientes/buscar-pacientes.component';


@NgModule({
  declarations: [
    ManageComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DashboardComponent,
    BandejaPacientesComponent,
    PerfilComponent,
    ModalMascotaComponent,
    BuscarPacientesComponent
  ],
  imports: [
    ManageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [
    ManageComponent
 ],
})
export class ManageModule { }
