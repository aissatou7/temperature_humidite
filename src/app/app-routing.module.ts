import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableUserComponent } from './table-user/table-user.component';

const routes: Routes = [
 
  {path: 'inscription', component: InscriptionComponent},
  {path: 'table', component: TableUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
