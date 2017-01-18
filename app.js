var express = require('express');
var session = require('express-session');
var app = express();

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: '1234567890QWERTYaa',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

app.set('port', 3000);
app.set('ip', "0.0.0.0");

var maxPings = 300;
var pingCode = '994359278';

app.get('/', function (req, res) {
	if (req.query.callback && req.query.ping){
		console.log(req.query.ping + '; ' + req.session.ping);
		if(!req.session.ping || req.query.ping <= (parseInt(req.session.ping) + 1)){
			req.session.ping = parseInt(req.query.ping);
			res.jsonp({ test: 1 });
		}
	} else if (req.query.callback && req.query.final){
		console.log(req.query.final + '; ' + req.session.ping);
		if(req.session.ping && req.session.ping >= maxPings - 1 && req.query.final <= req.session.ping + 1){
			res.jsonp({ code: pingCode });
		}
	} else {
		res.send(' ');
	}
});

var server = app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Wi-Fi MODULE listening on: ' + app.get('ip') + ':' + app.get('port'));
});