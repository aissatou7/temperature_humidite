import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ActivatedRoute } from '@angular/router';
import { RealtimeService } from '../realtime.service';
/* import { Data } from 'src/app/data';


import { SocketService } from 'src/app/services/socket.service'; */


// send a message to the server
/* socket.emit("dddddddd"); */

// receive a message from the server
/* socket.on('data', function(data) {


  console.log('les information sont: ' + data);
 const temp = data.split('/');
 console.log(temp);

}); */
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  reel: any;
  vent: any;
  dat: any;
  p: number = 1;
  index = [1, 2, 3, 4];
  term: any;
  datee: any;
  donnees: any;
  data: any;
  nowdate: string;
  constructor(
    private RealtimeService: RealtimeService,
    private userService: UserService,

    private url: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.RealtimeService.getHeur().subscribe((data) => {
      if (data) {
        window.location.reload()
      }
    })
    this.loadData();
    this.datee = new Date();
    /* 	this.socketService.fetchData()
      this.socketService.onFetchData().subscribe((data: any) =>  this.reel = data ) */
    var jr = this.datee.getDate()

    var mois = this.datee.getMonth()
    const year = this.datee.getFullYear()
    const min = this.datee.getMinutes();
    const heur = this.datee.getHours(); //heure
    const sec = this.datee.getSeconds(); //secondes
    if (mois < 10) { mois = '0' + mois; }
    if (mois == 0) {mois = this.datee.getMonth() + 1}
    if (jr < 10) { jr = '0' + jr; }
    this.nowdate = jr + '/' + 0 + mois + '/' + year
    console.log(this.nowdate)
  }



  loadData() {
    this.userService.listTempHum().subscribe((data: any) => {

      this.dat = data;
      console.log(this.dat)
      this.dat = this.dat.filter((e: any) => e.date == this.nowdate)

      //filtrer les donnéesc
      // this.datas = this.datas.filter()
    });
  }

  /*  getData() {
     this.userService.getMessages().subscribe((data:any) =>{
       this.donnees = data;
       console.log(this.donnees)

 });

 } */







  /* 	handleModal(movie?: Movie) {
      this.modalService.show(FormComponent, { initialState: { movie } });
    }

    handleDelete(movie: Movie) {
          if(movie.id) {
              this.socketService.deleteMovie(movie.id);
          }
    } */
}

