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

@Component({
  selector: 'app-llamada',
  templateUrl: './llamada.component.html',
  styleUrls: ['./llamada.component.css']
})
export class LlamadaComponent implements OnInit {

  constructor(private socketsService:SocketsService,private sessionService :SessionService,private temporalService:TemporalService,private peerService:PeerService,private activatedRoute: ActivatedRoute,
    private processService :ProcessService) { }
    data:any =null;

  ngOnInit(): void {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    this.values.id=this.data._id
    this.activatedRoute.params.subscribe(params => { 
      this.values.idsession= params['id'];
          this.checkMediaDevices();
          this.initPeer();
          this.initIoConnection();
    });
  }

  

  values={
    id:"",
    idreceptor:"",
    idsession:"62843faea5164f6a66b73d3b"
  }
  ioConnection: any;
  ioConnection2: any;

  private initIoConnection(): void {
    this.socketsService.join(this.values);


    this.ioConnection2 = this.socketsService.onVideo()
    .subscribe((callEnter: any) => {
      this.sendCall(callEnter.idPeer, this.currentStream);
      console.log(callEnter);
    });




  }
  ido=""
  initPeer ():void{
    
    const {peer} = this.peerService;

    peer.on('call', (callEnter:any) => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote:any) => {
        this.addVideoUser2(streamRemote);

      });
    }, (err:any) => {
      console.log('*** ERROR *** Peer call ', err);
    });
    
    peer.on('open', (id:any) => {
      const body = {
        idPeer: id,
        idsesion: this.values.idsession,
        temp: this.values.id
      };
      console.log("cambie");
      this.socketsService.joinRoom(body);
    });
    



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
    let b =<HTMLVideoElement>document.querySelector("#b")
    b.srcObject =stream;
  }


  async sendCall (idPeer:any, stream:any): Promise<void> {
    var newUserCall = await this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream:any) => {
        this.addVideoUser2(userStream);
      })
    }
  }

}
