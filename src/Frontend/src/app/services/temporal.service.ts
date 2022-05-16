import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Temporal } from "../models/temporal";

@Injectable({
  providedIn: 'root'
})
export class TemporalService {

  selectedTemporal: Temporal;
  readonly URL_API = "http://localhost:3000/api/temporal";

  constructor(private http: HttpClient) {
    this.selectedTemporal = new Temporal();
  }

  postTemporal(temporal: Temporal) {
    return this.http.post(this.URL_API, temporal);
  }

  getTemporals() {
    return this.http.get<Temporal[]>(this.URL_API);
  }

  putTemporal(temporal: Temporal) {
    return this.http.put(this.URL_API + `/${temporal._id}`, temporal);
  }

  deleteTemporal(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
