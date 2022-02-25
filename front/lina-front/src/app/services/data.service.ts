import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from "./websocket.service";
import { Observable,Subject,map } from 'rxjs';

const CHAT_URL = "ws://localhost:4200/";

export interface Message {
  title: string;
  message: string;
  song: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  local = 'http://localhost:3000';

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService, private http: HttpClient) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          title: data.title,
          message: data.message,
          song: data.song
        };
      }
    ));
  }

    getData(){
      return this.http.get(this.local+'/correction/');
    }

    sendData(value1:string, value2:string){
        this.http.get(this.local+`/correction/${value1}/${value2}`)
    }
}
