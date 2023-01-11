import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableUserComponent } from './table-user/table-user.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AdminComponent } from './admin/admin.component';
import { SystemeComponent } from './systeme/systeme.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PasswordComponent } from './password/password.component';
@NgModule({
  declarations: [
    AppComponent,
    TableUserComponent,
    SidebarComponent,
    NavbarComponent,
    DashbordComponent,
 SystemeComponent,
    AdminComponent,
    ProfileComponent,

    InscriptionComponent,
     DropdownComponent,
     PasswordComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
