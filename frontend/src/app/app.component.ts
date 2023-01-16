import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'temperature_humidite';
  isLogin = false;
<<<<<<< HEAD
=======

>>>>>>> bb13590f7844c0a1928b114420cb39ba50b9d411
  constructor(
    private route:Router
  ){
    this.route.events.subscribe(() => {
      if(this.route.routerState.snapshot.url == '/'){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    });
  }
}
