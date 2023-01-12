import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> 3ca8740a (ok)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'temperature_humidite';
<<<<<<< HEAD
=======
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
>>>>>>> 3ca8740a (ok)
}
