import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
@Component({
  selector: 'app-table-historique',
  templateUrl: './table-historique.component.html',
  styleUrls: ['./table-historique.component.scss']
})
export class TableHistoriqueComponent implements OnInit {
  public tempHums:any = [];
  date = new Date()

  // pagination
  datee: any;
  nowdate: string;
  p: number = 1;
  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    console.log(this.date);
    this.loadTempHum();

    this.datee = new Date();
    /* 	this.socketService.fetchData()
      this.socketService.onFetchData().subscribe((data: any) =>  this.reel = data ) */
    var jr = this.datee.getDate()

    var mois = this.datee.getMonth() + 1
    const year = this.datee.getFullYear()
    const min = this.datee.getMinutes();
    const heur = this.datee.getHours(); //heure
    const sec = this.datee.getSeconds(); //secondes
    if (mois < 10) { mois = '0' + mois; }
    //if (mois == 0) {mois = this.datee.getMonth() + 1}
    if (jr < 10) { jr = '0' + jr; }
    this.nowdate = jr + '/' +  mois + '/' + year
    console.log(this.nowdate)
  }
// function which list users
loadTempHum(){
  this.userService.listTempHum().subscribe((data:any) =>{
     this.tempHums = data;
     console.log(data);

    this.tempHums = this.tempHums.filter((e:any) =>

    e.date !=  this.nowdate
    )

  });
}

}
