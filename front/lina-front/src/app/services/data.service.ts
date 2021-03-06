import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from "./websocket.service";
import { Observable,Subject,map } from 'rxjs';

const CHAT_URL = "ws://localhost:8081/";

export interface Message {
  title: string;
  song: string;
  question:string;
}

export interface Correction {
  question:string;
  reponse:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  local = 'http://localhost:3000';

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService, private http: HttpClient) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent) => {
        let data = JSON.parse(response.data);
        for (var i = 0; i < data[0].track.length; i++) {
          return {
            title: data[0].track[i].name,
            song: data[0].track[i].song,
            question : data[0].question
          }
        };
        return 0;
      }
    ));
  }
}
