import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService} from "./../services/user.service"
import { User } from "../models/user";
import { Temporal } from "../models/temporal";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [UserService]
})

export class LoginRegisterComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    // @ts-ignore: Object is possibly 'null'
    
    signUpButton.addEventListener('click', () => {
      // @ts-ignore: Object is possibly 'null'
      container.classList.add("right-panel-active");
    });
    // @ts-ignore: Object is possibly 'null'
    signInButton.addEventListener('click', () => {
      // @ts-ignore: Object is possibly 'null'
      container.classList.remove("right-panel-active");
    });

  }

  formRegistro = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,]),
  });

  formLogin = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });


//registro
  sendR():any{
    console.log("buenas send")
      var new_user: User = new User()
      new_user.email = this.formRegistro.value.email
      new_user.password= this.formRegistro.value.password

      this.userService.postUser(new_user) .subscribe(res=>{
        let usuarioTemporal = res as Temporal
        localStorage.setItem('persona', JSON.stringify(usuarioTemporal));
        window.location.replace("http://localhost:4200/porfile");
      })


      //window.location.replace("http://localhost:4200/about");
    
    this.formRegistro.reset()
  }

//login

  sendL(){
    
    let us = new User();
    us.email = this.formLogin.value.email
    us.password = this.formLogin.value.password

    this.userService.getUserTemporal(us).subscribe(res => {
      let usuarioTemporal = res as Temporal
      if (usuarioTemporal) {
        
        window.location.replace("http://localhost:4200/about");
        localStorage.setItem('persona', JSON.stringify(usuarioTemporal));
        //persona = JSON.parse(localStorage.getItem('persona'))
      
      }else{
        console.log("no existe el correo digitado")
      }
    }) 
    this.formLogin.reset()
  }

  obtenerUsers(){
    this.userService.getUsers()
    .subscribe(res => {
      this.userService.users = res as User[]
    })
  }


  
}
