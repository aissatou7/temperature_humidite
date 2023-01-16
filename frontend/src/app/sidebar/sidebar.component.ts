import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role = localStorage.getItem('role')

  now:number | undefined;
  constructor() {setInterval(() => {
        this.now = Date.now();
      }, 1);}
      src="./assets/img/icons/common/ajouter.svg";
      fonct(){
        this.src = "./assets/img/icons/common/ajouter.svg";
      }
  ngOnInit(): void {
  }

}
