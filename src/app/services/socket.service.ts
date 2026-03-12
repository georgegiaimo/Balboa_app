import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = environment.baseurl;

  constructor() {
    this.socket = io(this.url);
  }

  // Emit an event to the server
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Listen for events from the server as an Observable
  onNewMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message-broadcast', (data: string) => {
        observer.next(data);
      });
    });
  }
}