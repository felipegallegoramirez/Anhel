import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/publications';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  i:Array<number> =[]
  constructor(public publicationService:PublicationService) { }
  data:any
  ngOnInit(): void {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    this.addimg();
    this.addtext();
  }

  delete():void{
    if (this.i.length>2){
    var de=<HTMLDivElement>document.getElementById("div_"+this.i.length)
    de.remove()
    this.i.pop()
  }
  }


  addimg():void{
    this.i.push(2)
    var div = document.createElement("div")
    div.id="div_"+this.i.length
    var input = document.createElement("input")
    input.type="file"
    input.id="img_"+this.i.length
    var p = document.createElement("p")
    p.innerHTML="Subir fichero..."
    div.style.cssText="margin: 30px 0px;background-color: var(--color-primario);color: #fff;cursor: pointer;font-size: 18px;font-weight: bold;min-height: 15px;overflow: hidden;padding: 10px;position: relative;text-align: center;width: calc(100% - 80px);box-sizing: border-box;"
    input.style.cssText="border: 10000px solid transparent;cursor: pointer;font-size: 10000px;margin: 0;opacity: 0;outline: 0 none;padding: 0;position: absolute;right: -1000px;top: -1000px;"
    div.appendChild(p)
    div.appendChild(input)
    document.getElementById("centro")?.appendChild(div)
  }

  addtext():void{
    this.i.push(1)
    var div = document.createElement("div")
    div.id="div_"+this.i.length
    var text = document.createElement("textarea")
    text.id="text_"+this.i.length
    text.style.cssText="box-sizing: border-box;margin: 30px 0px;background-color: #dddddd;color: #000000;padding: 1em;border-radius: 10px;border: 2px solid transparent;outline: none;font-weight: 500;font-size: 16px;line-height: 1.4;width: calc(100% - 80px);height: 100px;transition: all 0.2s;resize: vertical;"
    text.placeholder="Enter a message..."
    div.appendChild(text)
    document.getElementById("centro")?.appendChild(div)
  }

  crear():void{
    var asd:Array<File> =[]
    for (var r =0;r<this.i.length;r++){
      if (this.i[r]==2){
        let x =<HTMLInputElement>document.getElementById("img_"+(r+1));
        if (x.files!=null){
          asd.push(x.files[0])
        }
      }
    }

    this.publicationService.postimg(asd).subscribe((res)=>{
      let x = <HTMLInputElement>document.getElementById("title");
      var title= x.value
      let item:Array<{
        type:string,
        text:string,
      }> =[]
      var z=0;
      for (var r =1;r<this.i.length+1;r++){
        var data={
          type:"",
          text:"",
        }

      if (this.i[r-1]==2){
        data.text=res[z]
        data.type=this.i[r-1].toString()
        z+=1;
      }
      else if (this.i[r-1]==1){
        let xx = <HTMLInputElement>document.getElementById("text_"+r);
        var asd= xx.value
        data.text=asd
        data.type=this.i[r-1].toString()
      }
      item.push(data)
    }

      var publi= new Publication();
      publi.title=title
      publi.item=item
      console.log(publi)
      this.publicationService.postPublication(publi,this.data._id).subscribe((res)=>{
        window.location.replace("http://localhost:4200/publi/"+res._id);
      }
      );

    })


  }

}
