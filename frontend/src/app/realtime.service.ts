import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {Socket, io }from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {


  constructor() {
    this.socket = io('ws://localhost:2000');
   }
  private socket: Socket;

  getTemp() {
    return new Observable(observer => {
      this.socket.on('temp', data => {
        observer.next(data);
      });
    });
  }
}
