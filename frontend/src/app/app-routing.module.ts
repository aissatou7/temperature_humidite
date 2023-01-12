import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableUserComponent } from './table-user/table-user.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { SystemeComponent } from './systeme/systeme.component';
import { ProfileComponent } from './profile/profile.component';
import { TableArchiveComponent } from './table-archive/table-archive.component';
import { TableHistoriqueComponent } from './table-historique/table-historique.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
const routes: Routes = [

  {path: 'inscription', component: InscriptionComponent},
  {path: 'table', component: TableUserComponent},
{path: 'historique', component: TableHistoriqueComponent},
{path: 'login', component: LoginComponent},

  {path: 'tableuser', component: TableUserComponent},
  {path: 'dashbord', component: DashbordComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'systeme', component: SystemeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: AdminComponent}, 
 
  {path: 'tableArchive', component: TableArchiveComponent},
  {path: 'password', component: PasswordComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
