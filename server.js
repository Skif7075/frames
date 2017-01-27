var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');

var mask = process.umask(0);
var socket = 'app.sock';

if (fs.existsSync(socket)) {
    fs.unlinkSync(socket);
}

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
});

http.createServer(function (req, res) {
    var data = [];
    var path = './public/4/img/';
    fs.readdir(path, function(err, items) {
        var len = items.length;
        data.push(len);
        for(var i=1;i<=len;i++) {
            var file = path+"image"+i+".png";
            data.push(base64_encode(file));
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    });
}).listen(socket, function() {
    if (mask) {
        process.umask(mask);
        mask = null;
    }
});


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port)
});

