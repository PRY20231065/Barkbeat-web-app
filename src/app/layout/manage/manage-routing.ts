import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// General
import { ManageComponent } from './manage.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './admin/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BandejaPacientesComponent } from './components/bandeja-pacientes/bandeja-pacientes.component';
import { BuscarPacientesComponent } from './components/buscar-pacientes/buscar-pacientes.component';
// Components+

const broutes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      { path: '', component: LoginComponent},
      { path: 'login', component: LoginComponent },
      { path: 'inicio', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AdminGuard] },
      { path: 'bandeja-pacientes', component: BandejaPacientesComponent, canActivate: [AdminGuard] },
      { path: 'buscar-pacientes', component: BuscarPacientesComponent, canActivate: [AdminGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(broutes)],
  declarations: [],
  exports: [RouterModule]
})

export class ManageRoutingModule { }
