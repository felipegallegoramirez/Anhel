
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Session } from "../models/session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  selectedSession: Session;
  readonly URL_API = "http://localhost:3000/api/session";

  constructor(private http: HttpClient) {
    this.selectedSession = new Session();
  }

  postSession(session: Session) {
    return this.http.post(this.URL_API, session);
  }

  getSessions() {
    return this.http.get<Session[]>(this.URL_API);
  }

  putSession(session: Session) {
    return this.http.put(this.URL_API + `/${session._id}`, session);
  }

  deleteSession(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

