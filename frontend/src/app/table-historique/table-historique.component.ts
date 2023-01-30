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
  p: number = 1;
  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    console.log(this.date);
    this.loadTempHum();
  }
// function which list users
loadTempHum(){
  this.userService.listTempHum().subscribe((data:any) =>{
     this.tempHums = data;
     console.log(data);
     
    this.tempHums = this.tempHums.filter((e:any) =>
     
    e.date != this.date
    )

  });
}

}
