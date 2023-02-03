import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Socket, io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {


  constructor() {
    this.socket = io('ws://localhost:3000');
  }
  private socket: Socket;
  public dataa = 1;
  getTemp() {
    return new Observable(observer => {
      this.socket.on('temp', data => {
        observer.next(data);
      });
    });
  }

  getHeur() {
    return new Observable(observer => {
      this.socket.on('Heure', data => {
        observer.next(data);
      });
    });
  }


  getInfo() {
    return new Observable(observer => {
      this.socket.on('recu', data => {
        observer.next(data);
      });
    });
  }




  getVent() {
    return new Observable(observer => {
      this.socket.on('value', data => {
        observer.next(data);
      });
    });
  }

}
