import { Component, OnInit } from '@angular/core';
import { Session} from './../models/session'
import { SessionService} from './../services/session.service'
import { UserService} from "./../services/user.service"
import { User } from "../models/user";
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService,SessionService]
})

export class SearchComponent implements OnInit {
  resultados:number = 0
  constructor(public sessionService: SessionService, private userService : UserService) {}
  data:any =null;

  ngOnInit(): void {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    this.obtenerSesiones()
    if(this.data.type!='p'){
      let ar= <HTMLButtonElement>document.getElementById("create")
      ar.style.visibility="hidden"
    }
  }



  formExample = new FormGroup({
    price: new FormControl('',[Validators.required,]),
    start: new FormControl('',[Validators.required,]),
    end: new FormControl('',[Validators.required,])
  });


  obtenerSesiones(){
    this.sessionService.getSessionss()
    .subscribe(res => {
      this.sessionService.sesiones = res as Session[]
      this.resultados= this.sessionService.sesiones.length
    })
  }
  /*
  obtenerUser(id:string):User{
    let psicologo = this.userService.users.find(function(element:User) {
      return element._id == id;
    });
    if(psicologo){
      return psicologo
    }else{
      return new User()
    }
  }
  */
  send(){
    console.log("buenas send")
    let persona = JSON.parse( localStorage.getItem('persona')!)  
    var new_session: Session = new Session

      new_session.price = this.formExample.value.price
      new_session.start= this.formExample.value.start
      new_session.end= this.formExample.value.end
      new_session.idpsichologist = persona._id
      

      this.sessionService.postSession(new_session,this.data._id).subscribe(res=>{
        window.location.replace("http://localhost:4200/search");
      })


      //window.location.replace("http://localhost:4200/about");
    
    this.formExample.reset()
  }
  desplegar_create(){
    let pestaña = document.getElementById("createSession")
    pestaña!.style.display = "flex"
  }


  reservar(session:Session){
    this.sessionService.join(session._id,this.data._id).subscribe((res)=>{})
  }
}
