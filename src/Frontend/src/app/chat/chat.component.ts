import { Component, OnInit } from '@angular/core';
import { SocketsService} from '../services/socket.service'
import { SessionService } from '../services/session.service'
import { TemporalService } from '../services/temporal.service'
import { PeerService } from '../services/peer.service'
import { Session } from "../models/session";
import { Temporal } from "../models/temporal";

//import { Peer } from "peerjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socketsService:SocketsService,private sessionService :SessionService,private temporalService:TemporalService,private peerService:PeerService) { }
  values={
    id:"",
    idreceptor:"",
    idsession:"62843faea5164f6a66b73d3b"
  }
  session:Session=new Session();
  ioConnection: any;
  ioConnection2: any;

  async ngOnInit (): Promise<void> {
    if (localStorage.getItem('id')!=null){
      // let a=await this.sessionService.getSessions(this.values.idsession).subscribe()            <--probar
      this.values.id=localStorage.getItem('id') || '';
     this.sessionService.getSessions(this.values.idsession).subscribe((res)=>{
        this.session=res;
        this.temporalService.getTemporal(this.values.id).subscribe((res)=>{
          //se puede optimizar

          /*
          ?Falla seguridad
          ?hay que comprobar que los id
          * Solucionado

          ?Optimizar .subcribe()

          se puede optimizar y es en ves de comprobar el id en temporal, 
          enviar una comprobacio y que con el id temporal e id de la sesion
          consigue el resto de datos
          sin embargo seria muy ineficiente en el backend,
          para versiones futuras

          !Crear bases de datos temporales tal como
          !como las creadas para el temporal de inicio de sesion
          !y requerir todos los datos necesarios

          !Idsession sera un localstorage
          !Alsalir se elimina el localstorage

          */
          var a =res as Temporal

          if (this.session.idpatient==a.iduser){
            this.values.idreceptor=this.session.idpsichologist
          }else{
            this.values.idreceptor=this.session.idpatient
          }
          this.checkMediaDevices();
          this.initPeer();
          this.initIoConnection();
        })

      })
      this.checkMediaDevices();
      this.initPeer();
      this.initIoConnection();
    } 
  }


  private initIoConnection(): void {

    const {peer} = this.peerService;
    peer.on('open', (id:any) => {
      const body = {
        idPeer: id,
        roomName: this.values.idreceptor
      };
      this.socketsService.joinRoom(body);
    });
    

    peer.on('call', (callEnter:any) => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote:any) => {
        this.addVideoUser2(streamRemote);
      });
    })

    this.socketsService.join(this.values);
    this.ioConnection2 = this.socketsService.onVideo()
    .subscribe((callEnter: any) => {
      this.sendCall(callEnter.idPeer, this.currentStream);
    });
    this.ioConnection = this.socketsService.onMessage()
      .subscribe((message: any) => {
        var mensaje={
          idreceptor:message.idreceptor,
          mensaje:message.mensaje,
          idsession:message.idsession,
          idtemp:message.idtemp,
          date:message.date
        }
        this.recibio(mensaje)
      });


  }

  enviomenssage(men:string):void{

    /*
* Mensaje 
? datos: idreceptor
?        mensaje
?        idsession
?        idtemp
?        fecha
*/
var mensaje={
  idreceptor:this.values.idreceptor,
  mensaje:men,
  idsession:this.values.idsession,
  idtemp:this.values.id,
  date:""
}
this.socketsService.message(mensaje);
console.log(mensaje)

  }



  envio():void{
    var a=<HTMLInputElement>document.querySelector("#in");
    var val= a.value;
    a.value="";
    var master=<HTMLDivElement>document.querySelector("#mess")
    var b=document.createElement('p');
    b.style.color="#ff0000"
    b.innerText=val
    master.appendChild(b)

    this.enviomenssage(val)
  }

  recibio(mensaje:any):void{
    var master=<HTMLDivElement>document.querySelector("#mess")
    var b=document.createElement('p');
    b.style.color="#00ff00"
    b.innerText=mensaje.mensaje
    master.appendChild(b)

  }
  
  initPeer ():void{


  }


    currentStream:any;
    listUser: Array<any> = [];
    checkMediaDevices ():void {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);
        this.sendCall(this.values.idreceptor, this.currentStream);

      }).catch((e) => {
        console.log('*** ERROR *** Not permissions'+e);
      });

    }
    

    addVideoUser(stream: any) :void {
      this.listUser.push(stream);
      const unique = new Set(this.listUser);
      this.listUser = [...unique];
      let b =<HTMLVideoElement>document.querySelector("#a")
      b.srcObject =stream;
    }

    addVideoUser2(stream: any) :void {
      this.listUser.push(stream);
      const unique = new Set(this.listUser);
      this.listUser = [...unique];
      let b =<HTMLVideoElement>document.querySelector("#b")
      b.srcObject =stream;
    }


    sendCall (idPeer:any, stream:any):void {
      console.log(idPeer)
      const newUserCall = this.peerService.peer.call(idPeer, stream);
      if (!!newUserCall) {
        newUserCall.on('stream', (userStream:any) => {
          this.addVideoUser2(userStream);
        })
      }
    }

}
