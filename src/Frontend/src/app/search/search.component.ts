import { Component, OnInit } from '@angular/core';
import { Session} from './../models/session'
import { SessionService} from './../services/session.service'
import { UserService} from "./../services/user.service"
import { User } from "../models/user";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService,SessionService]
})

export class SearchComponent implements OnInit {
  resultados:number = 0
  constructor(public sessionService: SessionService, private userService : UserService) {}
   

  ngOnInit(): void {
    this.obtenerSesiones()
    this.obtenerUsers()
  }

  obtenerSesiones(){
    this.sessionService.getSessionss()
    .subscribe(res => {
      this.sessionService.sesiones = res as Session[]
      this.resultados= this.sessionService.sesiones.length
    })
  }
  obtenerUsers(){
    this.userService.getUsers()
    .subscribe(res => {
      this.userService.users = res as User[]
    })
  }

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
}
