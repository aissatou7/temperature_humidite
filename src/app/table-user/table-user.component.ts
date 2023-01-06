import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {
  public users:any = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //calling function which list users
    this.loadUser();
  }
// function which list users
loadUser(){
  this.userService.listUser().subscribe((data:any) =>{
     this.users = data
  });
}
deleteUser(data: any){
  this.userService.deleteUser(data._id).subscribe(data => {
    
  });
  this.users = this.users.filter((u:any) => u!==data)
  }
}
