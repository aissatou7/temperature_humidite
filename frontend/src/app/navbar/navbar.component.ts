import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service'





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
affiche: string = ''
open: boolean = false
<<<<<<< HEAD
 identifiant = localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom');
 
=======
identifiant = localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom');
>>>>>>> origin/MHDLamine3
  constructor(
    private UserService: UserService,
  ) { }

  ngOnInit(): void {

  }
afficher(){
this.affiche='d-block'
if(this.open == true) {
  this.open = false
} else {
  this.open = true
}

//this.open = this.open == true ? false : true

}
cacher(){
  this.affiche=''

  }
deconnexion(){
  this.UserService.logout();
}
}
