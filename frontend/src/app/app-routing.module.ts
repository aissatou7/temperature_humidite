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
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [

  {path: 'inscription', component: InscriptionComponent, canActivate: [AuthGuard]},
  {path: 'table', component: TableUserComponent, canActivate: [AuthGuard]},
{path: 'historique', component: TableHistoriqueComponent, canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent, canActivate: [AuthGuard]},

  {path: 'tableuser', component: TableUserComponent, canActivate: [AuthGuard]},
  {path: 'dashbord', component: DashbordComponent, canActivate: [AuthGuard]},
  {path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard]},
  {path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard]},
  {path: 'systeme', component: SystemeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', component: AdminComponent}, 
 
  {path: 'tableArchive', component: TableArchiveComponent, canActivate: [AuthGuard]},
  {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
