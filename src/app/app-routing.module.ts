import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableUserComponent } from './table-user/table-user.component';

const routes: Routes = [
  {path: '', component: TableUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
