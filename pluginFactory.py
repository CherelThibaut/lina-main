from pluginDefault import PluginDefault
from plugins.alarm.plugin import PluginAlarm
from plugins.remote.plugin import PluginRemote
from plugins.music.plugin import PluginMusic

class PluginFactory:

    def getPlugin(subject, typeS):
        themeName= subject.split(".")[0]    
        if themeName== "alarm":
            return PluginAlarm(subject, typeS)
        elif themeName== "remote":
            return PluginRemote(subject, typeS)
        elif themeName== "music":
            return PluginMusic(subject, typeS)
        return PluginDefault(subject, typeS)