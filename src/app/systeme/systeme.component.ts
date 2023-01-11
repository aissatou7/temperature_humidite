import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';

@Component({
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.scss']
})







export class SystemeComponent implements OnInit {
  

  constructor() {

  }
  open: boolean = true
    src="./assets/img/brand/ventilo.jpeg";
    style="background-color: green;";
    texteBouton = 'ALLUMER';
    changeImage() {

     if(this.src == "./assets/img/brand/ventilo.jpeg" && this.texteBouton == 'ALLUMER'){this.src="./assets/img/brand/ventilo.gif"; this.style="background-color: red;";this.texteBouton = 'ETEINDRE';}
     else{this.src="./assets/img/brand/ventilo.jpeg";this.style="background-color: green;";this.texteBouton = 'ALLUMER';}
    }





  ngOnInit(): void {
  }

}
