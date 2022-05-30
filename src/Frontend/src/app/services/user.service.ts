import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";
import {Temporal} from "./../models/temporal"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[] = [];
  readonly URL_API = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }


  postUser(user: User) {
    return this.http.post<Temporal>(this.URL_API, user);
  }

  getUsers() {
    return this.http.get<User[]>(this.URL_API);
  }

  putUser(user: User,id:string) {
    return this.http.put(this.URL_API + `/${id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getUserTemporal(user: User) {
    return this.http.post<Temporal>(this.URL_API + "/confirm", user);
  }
  
}
