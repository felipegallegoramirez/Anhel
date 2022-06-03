import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publications';
@Component({
  selector: 'app-spublication',
  templateUrl: './spublication.component.html',
  styleUrls: ['./spublication.component.css']
})
export class SpublicationComponent implements OnInit {

  constructor(public publicationService:PublicationService) { }
  data:any
  va:boolean=false

  ngOnInit(): void {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    if (this.data.type=="p"){
      this.va=true
    }
    this.obtener()
    
  }

  obtener():void{
    this.publicationService.getPublicationss()
    .subscribe(res => {
      this.publicationService.publications = res as Publication[]
    })
  }

  public llevar(a:any):void{
    window.location.replace("http://localhost:4200/publi"+a);
  }

}
