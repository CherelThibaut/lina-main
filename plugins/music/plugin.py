from pickle import NONE
import time
import requests
import sys
sys.path.append('../../')
from pluginDefault import PluginDefault
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

class PluginMusic(PluginDefault):
    
    def response(self, sentence=""):
        themeName= self.subject.split(".")[1]
        if themeName == "soundUp":
            if type(self)._volume + 20 <= 100:
                type(self)._volume+= 20
                os.system("setvol "+str(type(self)._volume))
            return "Ok"
        elif themeName == "soundDown":
            if type(self)._volume - 20 >= 0:
                type(self)._volume-= 20
                os.system("setvol "+str(type(self)._volume))
            return "Ok"
        elif themeName == "soundMute":
            if  not type(self)._isMute :
                os.system("setvol mute")
            else: 
                os.system("setvol unmute")
            type(self)._isMute= not  type(self)._isMute
        elif themeName =="playMusic":
            nameMusic = sentence.split()
            lastWord = nameMusic[-1:]
            results = spotify.search(q=str(lastWord),limit=5)
            json = "{ 'track' : ["
            first = True
            for idx, track, in enumerate(results['tracks']['items']):
                if (track['preview_url'] is not None) :
                    if(first):
                        json += "{ 'name' : '"+str(track['name'])+"',"
                        first = False
                    else:
                        json += ",{ 'name' : '"+str(track['name'])+"',"
                    json += " 'song' : '"+str(track['preview_url'])+"' }"
            json += "]}"
            print(json)
            r = requests.post('http://localhost:4200/', json={"key": json})
            return "Ok"
        


  
