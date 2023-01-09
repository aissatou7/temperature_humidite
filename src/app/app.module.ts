import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableUserComponent } from './table-user/table-user.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';




import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AdminComponent } from './admin/admin.component';
import { SystemeComponent } from './systeme/systeme.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination'; //pagination
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //recherche
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
   
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
   
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
     NgxPaginationModule,
     Ng2SearchPipeModule


  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
