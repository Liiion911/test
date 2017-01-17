var express = require('express');
var router = express.Router();

var app = express();

app.set('port', 3000);
app.set('ip', "0.0.0.0");

app.use('/', router);

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); 
});

var server = app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Wi-Fi MODULE listening on: ' + app.get('ip') + ':' + app.get('port'));
});