import { Component } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { DataService } from './services/data.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, DataService]
})

export class AppComponent {

constructor(private dataservice:DataService) {
  dataservice.messages.subscribe(msg => {
  console.log("Response from websocket: " + msg);
  });
}

ngOnInit(): void {
  this.dataservice.getData().subscribe((data) => {
    console.log(data);
  });
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
  msaapPlaylist: Track[] = [
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
  ];

  onEnded(event:string) {

  }
}