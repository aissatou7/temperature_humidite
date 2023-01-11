import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
affiche: string = ''
open: boolean = false
  constructor() {}



  ngOnInit(): void {}
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
}
