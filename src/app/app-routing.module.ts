import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';

const routes: Routes = [
  {path: 'tableuser', component: TableUserComponent},
  {path: '', component: DashbordComponent},
  {path: 'navbar', component: NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
