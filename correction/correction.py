import sys
import json

json_string = { "question" : str(sys.argv[1]), "correction" : str(sys.argv[2]) }
filename = 'correction.json'

with open(filename, "r+") as file:
    data = json.load(file)
    data.append(json_string)
    file.seek(0)
    json.dump(data, file)
sys.stdout.write("fini")