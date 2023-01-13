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
