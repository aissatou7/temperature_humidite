import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { SystemeComponent } from './systeme/systeme.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path: 'tableuser', component: TableUserComponent},
  {path: 'dashbord', component: DashbordComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'systeme', component: SystemeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
