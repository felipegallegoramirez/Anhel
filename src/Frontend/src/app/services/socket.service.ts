
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';;

const SERVER_URL = 'http://localhost:3000';
/*

const SERVER_URL = 'ws://localhost:8010';
const socket = new WebSocket(SERVER_URL);
*/


@Injectable({
  providedIn: 'root'
})


export class SocketsService  extends Socket {
  
  constructor() {
    super({
      url:"localhost:3000"
    })
  }


  join(a:any) {
    this.ioSocket.emit('join',JSON.stringify(a));
    }

  message(mensaje:any) {
    this.ioSocket.emit('message',JSON.stringify(mensaje));
    }

    onMessage(): Observable<any> {
      return new Observable<any>(observer => {
        this.ioSocket.on('message', (data: any) => observer.next(data));
      });
      }

      onVideo(): Observable<any> {
        return new Observable<any>(observer => {
          this.ioSocket.on('call', (data: any) => observer.next(data));
        });
        }

      joinRoom(mensaje:any) {
        this.ioSocket.emit('joinR',mensaje);
        }

        mirame(mensaje:any) {
          this.ioSocket.emit('mirame',mensaje);
          }

          miras(): Observable<any> {
            return new Observable<any>(observer => {
              this.ioSocket.on('miras', (data: any) => observer.next(data));
            });
            }

}