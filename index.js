<<<<<<< HEAD
var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var fs = require("fs");
var port = process.env.PORT || 3000;

app.set('views','./src');
app.set('view engine','ejs');
app.use( bodyParser());       // to support JSON-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static('public'));
app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

console.log('Starting Server...\n');


app.get('/',function(req,res){
    console.log('Get request - main page..');
    res.render('xo');
});

app.post('/st',function(req,res){
    console.log('Post request - update table..');
    var name = req.param('player');
    var Jdata = JSON.parse(fs.readFileSync("DataRank.json"));
    var exist = false;
    if(name!='Player 1' && name!='Player 2'){
        for(var exKey in Jdata) {
            if(name===Jdata[exKey].name){
                Jdata[exKey].wins++;
                var exist = true;
            }
        }
        if(!exist){
            var toAdd = {
                'name': name,
                'wins': 1
            };
            Jdata.push(toAdd);
        }
        
        fs.writeFile("DataRank.json",JSON.stringify(Jdata), 'utf-8');
    }
    var data = checkLeaders(Jdata);
    return res.send(data);
});

app.post('/start',function(req,res){
    console.log('Post request - first table..');
    var Jdata = JSON.parse(fs.readFileSync("DataRank.json"));
    var data = checkLeaders(Jdata);
    return res.send(data);
});

function checkLeaders(data){
    var toSend =[];
    for(var i=0;i<10;i++){
        var maxValue=0;
        var maxIndex=0;
        for(var exKey in data){
            if(maxValue<data[exKey].wins){
                maxValue=data[exKey].wins;
                maxIndex=exKey;
            }
        }
        if(maxValue!=0){
            temp = {'name':data[maxIndex].name,'wins':data[maxIndex].wins};
            toSend.push(temp);
            delete data[maxIndex];
            maxValue=0;
        }
    }
    return toSend;
};

app.listen(port,function(err){
    console.log('running server on port '+port);
});
=======
var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var fs = require("fs");
var port = process.env.PORT || 3000;

app.set('views','./src');
app.set('view engine','ejs');
app.use( bodyParser());       // to support JSON-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static('public'));
app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

console.log('Starting Server...\n');


app.get('/',function(req,res){
    console.log('Get request - main page..');
    res.render('xo');
});

app.post('/st',function(req,res){
    console.log('Post request - update table..');
    var name = req.param('player');
    var Jdata = JSON.parse(fs.readFileSync("DataRank.json"));
    var exist = false;
    if(name!='Player 1' && name!='Player 2'){
        for(var exKey in Jdata) {
            if(name===Jdata[exKey].name){
                Jdata[exKey].wins++;
                var exist = true;
            }
        }
        if(!exist){
            var toAdd = {
                'name': name,
                'wins': 1
            };
            Jdata.push(toAdd);
        }
        
        fs.writeFile("DataRank.json",JSON.stringify(Jdata), 'utf-8');
    }
    var data = checkLeaders(Jdata);
    return res.send(data);
});

app.post('/start',function(req,res){
    console.log('Post request - first table..');
    var Jdata = JSON.parse(fs.readFileSync("DataRank.json"));
    var data = checkLeaders(Jdata);
    return res.send(data);
});

function checkLeaders(data){
    var toSend =[];
    for(var i=0;i<10;i++){
        var maxValue=0;
        var maxIndex=0;
        for(var exKey in data){
            if(maxValue<data[exKey].wins){
                maxValue=data[exKey].wins;
                maxIndex=exKey;
            }
        }
        if(maxValue!=0){
            temp = {'name':data[maxIndex].name,'wins':data[maxIndex].wins};
            toSend.push(temp);
            delete data[maxIndex];
            maxValue=0;
        }
    }
    return toSend;
};

app.listen(port,function(err){
    console.log('running server on port '+port);
});
>>>>>>> 86533c26dcaccf464ce58becbd2f176ffc2cd30c
