import { Component, ElementRef } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Tracksong } from './interfaces/track';
import { DataService } from './services/data.service';
import { WebsocketService } from './services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, DataService]
})

export class AppComponent {

  msaapPlaylist: Track[] = [];
  Correction: string[] = [];

  value:string="";

constructor(private dataservice:DataService, private http: HttpClient) {
  dataservice.messages.subscribe(msg => {
  console.log("Response from websocket: " + msg);
  let track = {} as Tracksong;
    track.title = msg.title;
    track.link = msg.song;
    this.value = msg.question;
    this.msaapPlaylist.push(track);
  });
}

private message = {
  question :"",
  reponse : ""
};

sendMsg(value1:string, value2:string) {
  const reponse = { question: value1,correction: value2}
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(reponse);
  console.log(body)
  return this.http.post("http://localhost:3000/correction", body,{'headers':headers}).subscribe()
}

inMessagePre: any;

onMsg(event:any):void{
  console.log("connected");
  let incomingdata = JSON.parse(event.data.toString());
    /*let data:any = null;
    for (let index = 0; index < incomingdata.length; index++) {
        data = incomingdata[index];
        display(this.inMessagePre,JSON.stringify(incomingdata[index], undefined, 2));
    }*/
  console.log(incomingdata);
}

ngOnInit(): void {
  /*this.dataservice.getData().subscribe((data) => {
    console.log(data);
  });*/
}

  title = 'lina-front';

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;
    
  // Material Style Advance Audio Player Playlist
  /*msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'https://p.scdn.co/mp3-preview/d69227aeef6ec7f07f446f592f2d1bb5bed2dd12?cid=d36e56f267a34540b2a1d973ac1edc93',
      artist: 'Audio One Artist',
      //duration: 'Audio One Duration in seconds'
    },
    {
      title: 'Audio Two Title',
      link: 'Link to Audio Two URL',
      artist: 'Audio Two Artist',
      //duration: 'Audio Two Duration in seconds'
    },
    {
      title: 'Audio Three Title',
      link: 'Link to Audio Three URL',
      artist: 'Audio Three Artist',
      //duration: 'Audio Three Duration in seconds'
    },
  ];*/

  onEnded(event:string) {

  }
}