import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';
import { UserService } from '../user.service';
import { Socket, io } from 'socket.io-client';
import { NgSwitch } from '@angular/common';
@Component({
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.scss']
})

export class SystemeComponent implements OnInit {
  myvent: boolean
  donnee: any
  temoin: any
  etat = false;
  temperature: any
  humidity: any = 'default';
  state: any
  constructor(private RealtimeService: RealtimeService) {
    this.socket = io('ws://localhost:3000');
  }
  private socket: Socket;
  open: boolean = true
  src = "./assets/img/brand/ventilo.jpeg";
  style = "background-color: green;";
  texteBouton = 'ALLUMER';

  changeImage() {

    if ((this.src == "./assets/img/brand/ventilo.jpeg" && this.texteBouton == 'ALLUMER')) {
      this.src = "./assets/img/brand/ventilo.gif";
      this.style = "background-color: red;";
      this.texteBouton = 'ETEINDRE';
    }
    else { this.src = "./assets/img/brand/ventilo.jpeg"; this.style = "background-color: green;"; this.texteBouton = 'ALLUMER'; }
  }





  ngOnInit(): void {
    this.RealtimeService.getInfo().subscribe((data) => {

      this.temoin = data
    })

    this.RealtimeService.getTemp().subscribe((data) => {

      this.donnee = data
      this.temperature = this.donnee[0] + this.donnee[1];
      this.humidity = this.donnee[3] + this.donnee[4];
      //this.state = this.donnee[0];
      console.log(this.donnee[0])
      if (this.temperature > 26) {
        this.src = "./assets/img/brand/ventilo.gif";
        this.style = "background-color: red;";
        this.texteBouton = 'ETEINDRE';


      } else if (this.temperature < 26 && this.etat == false) {

        this.offVent(); this.src = "./assets/img/brand/ventilo.jpeg"; this.style = "background-color: green;"; this.texteBouton = 'ALLUMER';
      } //else {this.offVent(); this.src = "./assets/img/brand/ventilo.jpeg"; this.style = "background-color: green;"; this.texteBouton = 'ALLUMER';}

    })


  }


  onVent() {
    if (this.etat == false) {
      this.socket.emit('vent', '1');
      this.etat = true
      1
    }
  }

  offVent() {
    if (this.etat == true) {
      this.socket.emit('vent', '0');
      this.etat = false
    }
  }

}
