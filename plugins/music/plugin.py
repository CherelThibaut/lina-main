from pickle import NONE
import time
import requests
import sys
sys.path.append('../../')
from pluginDefault import PluginDefault
import os
import spotipy
import json
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
            results = spotify.search(q=str(lastWord),type="album,track")
            json_string = "{ @5track@5 : ["
            first = True
            for idx, track, in enumerate(results['tracks']['items']):
                if (track['preview_url'] is not None) :
                    if(first):
                        json_string += "{ @5name@5 : @5"+str(track['name'])+"@5,"
                        first = False
                    else:
                        json_string += ",{ @5name@5 : @5"+str(track['name'])+"@5,"
                    json_string += " @5song@5 : @5"+str(track['preview_url'])+"@5 }"
            json_string += "], @5question@5 : @5"+str(sentence)+"@5 }"
            json_string = json_string.replace('"'," ")
            json_string = json_string.replace("@5",'"')
            r = requests.post('http://localhost:3000/plugindata', data=json_string, headers={"Content-Type":"application/json"})
            return "Ok"
        


  
