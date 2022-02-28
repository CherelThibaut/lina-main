var express = require('express');
const { stringify } = require('querystring');
var app = express();
const Websocket = require('ws');
app.use(express.json());
const wss = new Websocket.Server({ port: 8081 });
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

wss.on('connection', (ws) => {
  ws.on("message", msg => {
    console.log(msg.toString());
  });
})

app.post('/plugindata', GetData);

function GetData(req, res){
  JsonString = []
  temp = req.body;
  JsonString.push(temp)
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(JsonString));
    });
    res.send("POST Request Called");
}

app.post('/correction', callCorrection); 
  
function callCorrection(req, res) {
  jsondata = JSON.stringify(req.body);
  result = JSON.parse(jsondata);
  var spawn = require("child_process").spawn; 
    
  var process = spawn('python',["./correction.py", 
                                  result.question, 
                                  result.correction] ); 
  process.stdout.on('data', function(data) { 
      res.send(data.toString());
  } )
  
  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} 