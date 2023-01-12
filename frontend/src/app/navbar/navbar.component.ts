import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import{UserService} from '../user.service'
>>>>>>> 3ca8740a (ok)





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
affiche: string = ''
open: boolean = false
<<<<<<< HEAD
  constructor() {}



  ngOnInit(): void {}
=======
  constructor(
    private UserService: UserService,
  ) { }

  ngOnInit(): void {
   
  }
>>>>>>> 3ca8740a (ok)
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
<<<<<<< HEAD
=======
deconnexion(){
  this.UserService.logout();
}
>>>>>>> 3ca8740a (ok)
}
