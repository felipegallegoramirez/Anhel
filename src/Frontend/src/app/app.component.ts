import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'House';
  nombre:string = ""
  


  ngOnInit(): void {
    document.getElementById("About Us")!.style.display = "inline-block"
    console.log("buenas")

  }

 

  

  cerrarSesion(): void{
    localStorage.removeItem("persona");
    window.location.replace("http://localhost:4200/aboutus");
  }
  
  verificarlogin(){
    let persona = JSON.parse( localStorage.getItem('persona')!)
    if(persona){
      this.nombre=persona.name;
      let element = document.getElementById("porfile")
      element!.style.display = "flex"
      let elementlogin = document.getElementById("login")
      elementlogin!.style.display = "none"
    }
  }
}
