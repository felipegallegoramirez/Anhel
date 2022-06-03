import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publications';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public publicationService:PublicationService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      var idsession= params['id'];
      this.publicationService.getPublications(idsession).subscribe((res)=>{
        this.datos(res);
      })
      
    });
  }
  
  public datos (data:Publication) :void{
    console.log(data)
    let x = <HTMLElement>document.getElementById("titulo")
      x.innerHTML=data.title
    for (var i=0;i<data.item.length;i++){
      if (data.item[i].type=="2"){
        this.imagen(data.item[i].text)
      }
      else if (data.item[i].type=="1"){
        this.texto(data.item[i].text)
      } 
    }
  }

  public imagen(a:string):void{
    let y = document.createElement("img")
    y.src="http://localhost:3000/"+a
    y.style.cssText="width: 600px;border-radius: 20px;box-shadow: 20px 10px 30px #000000a0;margin: 20px 0px;"
    document.getElementById("centro")?.appendChild(y)
  }
  public texto(a:string):void{
    let y = document.createElement("p")
    y.innerHTML=a
    let z= document.createElement("div")
    z.style.cssText="margin: 20px 0px;border-radius: 20px;text-align: initial;padding: 10px;box-sizing: border-box;box-shadow: 20px 10px 30px #000000a0;"
    z.appendChild(y)
    document.getElementById("centro")?.appendChild(z)
  }

  

}
