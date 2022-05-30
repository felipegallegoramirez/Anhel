import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService} from "./../services/user.service"
import { User } from "../models/user";

@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.css'],
  providers: [UserService]
})
export class PorfileComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  formExample = new FormGroup({

    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    number: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    profesional_info: new FormControl('',[Validators.required])
  });
  send():any{
    let data= localStorage.getItem('persona')
    
    if(data) { 
      console.log(data)
      let usuario:User = JSON.parse(data)
      usuario.name= this.formExample.value.name
      usuario.email= this.formExample.value.email
      usuario.phonenumber = this.formExample.value.number
      this.userService.putUser(usuario)
      window.location.replace("http://localhost:4200/about");
    }
    this.formExample.reset()
  }
}
