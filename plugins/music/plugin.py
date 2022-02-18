from pickle import NONE
import time
import sys
sys.path.append('../../')
from pluginDefault import PluginDefault
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="",
                                                           client_secret=""))

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
            results = sp.search(q='Démons',limit=5)
            for idx, track, in enumerate(results['tracks']['items']):
                print(idx,track['name'],track['id'])
                id = track['id']
                sp.add_to_queue(id, device_id=NONE)
            return "Ok"
        


  
