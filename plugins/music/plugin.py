from pickle import NONE
import time
import sys
sys.path.append('../../')
from pluginDefault import PluginDefault
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util

scope = 'user-library-read'
scope = 'playlist-modify-public'

CLIENT_ID = 'd36e56f267a34540b2a1d973ac1edc93'
CLIENT_SECRET = 'e1a4b0ae31b34315a233048fdd9b5ca3'
REDIRECT_URI = 'localhost:4200/'

token = util.prompt_for_user_token(scope,
                                   client_id=CLIENT_ID,
                                   client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth=token)


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
        


  
