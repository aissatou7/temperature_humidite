import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';

import { NgxSerial } from 'ngx-serial';
@Component({
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.scss']
})

export class SystemeComponent implements OnInit {
donnee:any
temperature:any
humidity:any = 'default';
//bouton allumage ventillateur
serial: NgxSerial;
  port:any;
  constructor(private RealtimeService: RealtimeService) {
    this.serial = new NgxSerial(this.dataHandler);
  }

  open: boolean = true
    src="./assets/img/brand/ventilo.jpeg";
    style="background-color: green;";
    texteBouton = 'ALLUMER';

    dataHandler(data: string) {
      console.log("From arduino -> " + data);
    }
    connect() {
      if(!this.port){
      console.log("From arduino -> ");
      this.serial.connect((port:any)=>{
        port = '/dev/ttyACM0';
      });
    }else this.port = '/dev/ttyACM0';
    }
    changeImage() {

     if((this.src == "./assets/img/brand/ventilo.jpeg" && this.texteBouton == 'ALLUMER') || this.temperature >= 54){
      this.src="./assets/img/brand/ventilo.gif";
       this.style="background-color: red;";
       this.texteBouton = 'ETEINDRE';

       if(this.port)
      this.serial.sendData("22222"); //L1\n
      console.log("port     1");
    }
     else{this.src="./assets/img/brand/ventilo.jpeg";this.style="background-color: green;";this.texteBouton = 'ALLUMER';}
    }





  ngOnInit(): void {
    this.RealtimeService.getTemp().subscribe((data) =>{
    console.log(data);
     this.donnee = data
     this.temperature = this.donnee[0] + this.donnee[1];
      this.humidity = this.donnee[6] + this.donnee[7];

    })

  }



}
