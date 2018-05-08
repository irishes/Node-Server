var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Gpio = require('onoff').Gpio;

app.get('/', function(req, res){
    res.sendFile(__dirname + 'client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

var port = 2000;
serv.listen(port);
console.log('Server started on: ' + port);

var blinkInterval = 0;

var LED = new Gpio(4, 'out');
blinkInterval = setInterval(blinkLED, 250);

function blinkLED(){
    if(LED.readSync() === 0){
        LED.writeSync(1);
    }else{
        LED.writeSync(0);
    }
}

function endBlink(){
    clearInterval(blinkInterval);
    LED.writeSync(0);
    LED.unexport();
}

var io = require('socket.io')(serv, {});
socket.on('connection', function(socket){
    console.log('New Connection');
    blinkLED();
});
