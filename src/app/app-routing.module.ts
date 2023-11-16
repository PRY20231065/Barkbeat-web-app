import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AppRoutes: Routes = [
  { path: 'manage', loadChildren: () => import('./layout/manage/manage.module').then(x=> x.ManageModule) },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
