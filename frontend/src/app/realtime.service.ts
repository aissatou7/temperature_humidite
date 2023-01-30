import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {Socket, io }from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
/*  socket = io('http://localhost:2000'); */

  constructor() {
    this.socket = io('ws://localhost:3000');
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
