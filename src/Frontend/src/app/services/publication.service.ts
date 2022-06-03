
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Publication } from "../models/publications";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  selectedPublication: Publication;
  publications: Publication[]=[]
  
  readonly URL_API = "http://localhost:3000/api/publi";
  readonly URL_API2 = "http://localhost:3000/api/Storage";

  constructor(private http: HttpClient) {
    this.selectedPublication = new Publication();
   }

   postPublication(publication: Publication,id:string) {
    return this.http.post<Publication>(this.URL_API+"/"+id, publication);
  }

  getPublicationss() {
    return this.http.get<Publication[]>(this.URL_API);
  }
  getPublications(id:string) {
    return this.http.get<Publication>(this.URL_API + `/${id}`);
  }


  postimg(imagenes: Array<File>,) {
    const fd = new FormData();
    for (var i = 0; i <= imagenes.length-1; i++) {
      fd.append('imagenes', imagenes[i]);
    }
    return this.http.post<Array<string>>(this.URL_API2, fd);
  }

}
