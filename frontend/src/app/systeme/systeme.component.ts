import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';
import { UserService } from '../user.service';
import {Socket, io }from 'socket.io-client';
import { NgSwitch } from '@angular/common';
@Component({
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.scss']
})

export class SystemeComponent implements OnInit {
  myvent:boolean
donnee:any
temoin:any
etat = false;
/* s:false
change(){
  if (this.etat == false) {
    this.s = true;

  }
} */
/* switch (key) {
  case value:

    break;

  default:
    break;
} */
temperature:any
humidity:any = 'default';
  constructor(private RealtimeService: RealtimeService) {
    this.socket = io('ws://localhost:3000');
  }
  private socket: Socket;
  open: boolean = true
    src="./assets/img/brand/ventilo.jpeg";
    style="background-color: green;";
    texteBouton = 'ALLUMER';

    dataHandler(data: string) {
      console.log("From arduino -> " + data);
    }

    changeImage() {

     if((this.src == "./assets/img/brand/ventilo.jpeg" && this.texteBouton == 'ALLUMER')){
      this.src="./assets/img/brand/ventilo.gif";
       this.style="background-color: red;";
       this.texteBouton = 'ETEINDRE';



    }
     else{this.src="./assets/img/brand/ventilo.jpeg";this.style="background-color: green;";this.texteBouton = 'ALLUMER'; this.offVent; }
    }





  ngOnInit(): void {
    this.RealtimeService.getInfo().subscribe((data) => {
     /*  if (data==1) {
        window.location.reload()
      } */
      this.temoin=data
    })
    this.RealtimeService.getTemp().subscribe((data) =>{
    console.log(data);
     this.donnee = data
     this.temperature = this.donnee[0] + this.donnee[1];
      this.humidity = this.donnee[3] + this.donnee[4];
      if (this.temperature >= 30){
        this.src="./assets/img/brand/ventilo.gif";
        this.style="background-color: red;";
        this.texteBouton = 'ETEINDRE';

      } else if (this.temperature < 30 && this.temoin == 2){

       this.src="./assets/img/brand/ventilo.jpeg";this.style="background-color: green;";this.texteBouton = 'ALLUMER';
      }

    })





  this.RealtimeService.getVent().subscribe((data) =>{
    console.log(data);
   if(data){


   } else {

   }
    })
 }

/*  onVent(){
if(this.temoin==0)
 { this.socket.emit('vent', '1');
} else if(this.temoin==1) {this.socket.emit('vent', '0');
} else  {this.socket.emit('vent', '1'); }
} */

onVent(){
  this.socket.emit('vent', '1' );
  this.etat = true
}

offVent(){
  this.socket.emit('vent', '0');
  this.etat = false
}

}