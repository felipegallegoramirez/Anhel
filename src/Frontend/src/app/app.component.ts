import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'House';
  nombre:string = ""
  

  constructor(){
    
  }
  ngOnInit(): void {
    //document.getElementById("About Us")!.style.display = "inline-block"
    this.verificarlogin()

  }

 

  

  cerrarSesion(): void{
    localStorage.removeItem("persona");
    window.location.replace("http://localhost:4200/aboutus");
  }
  
  verificarlogin():void{
    console.log("asd")
    let x=localStorage.getItem('persona')
    
    if (x!=null){
    let persona = JSON.parse(x)
    console.log(persona)
    if(persona){
      
      this.nombre=persona.name;
      let element = document.getElementById("porfile")
      element!.style.display = "flex"
      let elementlogin = document.getElementById("login")
      elementlogin!.style.display = "none"
    }
  }
  }
}
