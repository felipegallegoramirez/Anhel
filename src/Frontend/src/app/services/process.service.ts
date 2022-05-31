import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Process } from "../models/process";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  selectedProcess: Process;
  readonly URL_API = "http://localhost:3000/api/process";

  constructor(private http: HttpClient) {
    this.selectedProcess = new Process();
  }

  postProcess(process: Process) {
    return this.http.post(this.URL_API, process);
  }

  getProcesss() {
    return this.http.get<Process[]>(this.URL_API);
  }

  putProcess(process: Process) {
    return this.http.put(this.URL_API + `/${process._id}`, process);
  }

  deleteProcess(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getmyProcess(id:string) {
    return this.http.get<Process[]>(this.URL_API + `/myprocess/${id}`);
  }

  name(id:string,temp:string) {
    return this.http.get(this.URL_API + `/myname/${id}/${temp}`);
  }
}
