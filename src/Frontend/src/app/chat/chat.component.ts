import { Component, OnInit } from '@angular/core';
import { SocketsService} from '../services/socket.service'
import { SessionService } from '../services/session.service'
import { ProcessService } from '../services/process.service'
import { TemporalService } from '../services/temporal.service'
import { PeerService } from '../services/peer.service'
import { Session } from "../models/session";
import { Temporal } from "../models/temporal";
import { Process } from '../models/process';

import { Router, ActivatedRoute } from '@angular/router';

//import { Peer } from "peerjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socketsService:SocketsService,private sessionService :SessionService,private temporalService:TemporalService,private activatedRoute: ActivatedRoute,
    private processService :ProcessService) { }
  values={
    id:"",
    idreceptor:"",
    idsession:"62843faea5164f6a66b73d3b"
  }

  act="";

  session:Session=new Session();
  ioConnection: any;
  ioConnection2: any;
  data:any =null;
  sessiones:Session[]=[];
  procesos:Process[]=[];

  async ngOnInit (): Promise<void> {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    this.values.id=this.data._id
    console.log(this.data._id)
    this.obtenercontacto()

    

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
         /*
          if (this.session.idpatient==a.iduser){
            this.values.idreceptor=this.session.idpsichologist
          }else{
            this.values.idreceptor=this.session.idpatient
          }
          this.checkMediaDevices();
          this.initPeer();
          this.initIoConnection();
          */
  }
  public obtenercontacto():void{
    this.sessionService.getmySessions(this.data._id).subscribe((res2)=>{
      this.sessiones=res2 as Session[]
    this.processService.getmyProcess(this.data._id).subscribe((res)=>{
      this.procesos= res as Process[];/*
      for (var i=0 ;i<this.procesos.length ; i++){
        let a = document.getElementById("contactos")
        let b= document.createElement("div")
        let c = document.createElement("h3")
        if (this.data.type=='p'){
          c.innerHTML=this.procesos[i].namepatient
        }else{
          c.innerHTML=this.procesos[i].namepsichologist
        }
        b.style.cssText ='width: 100%;padding: 5px 20px;background-color: rgba(0, 0, 0, 0.4);box-sizing: border-box;border-radius: 20px;margin:10px 0px'
        c.style.cssText="color:rgba(255,255,255,1)"
        b.appendChild(c)
        b.addEventListener('click', this.nuevochat.bind(null,this.procesos[i]._id));
        a?.appendChild(b)
      }
*/
console.log(this.procesos)
this.act=this.procesos[this.procesos.length-1]._id
/*
      this.activatedRoute.params.subscribe(params => {
        this.act= params['id'];
        if(this.act==undefined || this.act==null || this.act==""){
          this.act=this.procesos[this.procesos.length-1]._id
        }
        this.nuevochat(this.act)
        this.initIoConnection();
  
        
      });
      */
    })
  })

  }

  public control(id:string){
    console.log(id)
    this.nuevochat(id);
  }

  public nuevochat(id:string){
    let eliminar = <HTMLDivElement>document.getElementById("mensajes-chat")
    eliminar.remove()
    let mess=document.getElementById("mess")
    let div=document.createElement("div")
    div.id="mensajes-chat"
    div.style.cssText="padding: 20px;"
    mess?.appendChild(div)
    console.log(this.sessiones)
    let my=this.data.type=='p'?1:2
    for(var i=0;i<this.sessiones.length;i++){
      if(this.sessiones[i].idprocess==id){
        this.values.idsession=this.sessiones[i]._id
        for(var r=0;r<this.sessiones[i].chat.length;r++){
          if(parseInt(this.sessiones[i].chat[r].sender)==my){
            this.mimensaje(this.sessiones[i].chat[r].message);
          }else{
            this.mensaje(this.sessiones[i].chat[r].message);
          }
        }
      }
    }

  }
  public mimensaje(a:string){
    let mess=document.getElementById("mensajes-chat")
    let div=document.createElement("div")
    div.style.cssText="width: 100%;text-align: end;color: #005D74;"
    let p = document.createElement("p")
    p.innerHTML=a
    div.appendChild(p)
    mess?.appendChild(div)
    
  }
  public mensaje(a:string){
    let mess=document.getElementById("mensajes-chat")
    let div=document.createElement("div")
    let p = document.createElement("p")
    p.innerHTML=a
    div.appendChild(p)
    mess?.appendChild(div)
  }


  private initIoConnection(): void {
    this.socketsService.join(this.values);

    this.ioConnection = this.socketsService.onMessage()
      .subscribe((message: any) => {
        var mensaje={
          idreceptor:message.idreceptor,
          mensaje:message.mensaje,
          idsession:message.idsession,
          idtemp:message.idtemp,
          date:message.date
        }
        for(var i=0;i<this.sessiones.length;i++){
          var sender=this.data.type=='p'?"2":"1"
          if(this.sessiones[i]._id==this.values.idsession){
            var r={
            message: mensaje.mensaje,
            sender:sender,
            date:"",}
            this.sessiones[i].chat.push(r)
          }
        }
        this.mensaje(mensaje.mensaje)
      });


  }

  public enviomenssage(men:string):void{

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
    this.mimensaje(val);
    this.enviomenssage(val)
    for(var i=0;i<this.sessiones.length;i++){
      var sender=this.data.type=='p'?"1":"2"
      if(this.sessiones[i]._id==this.values.idsession){
        var r={
        message: val,
        sender:sender,
        date:"",}
        this.sessiones[i].chat.push(r)
      }
    }

  }

  llamada():void{
    window.location.replace("http://localhost:4200/call/"+this.values.idsession);
  }

  nombre():void{
    this.processService.name(this.act,this.data._id).subscribe((res)=>{})
  }
  





}
