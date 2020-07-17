var express = require('express');
var app = express();
var path = require('path');

//app.use(express.static(path.join(__dirname + '/images')))

app.use(express.static(path.join(__dirname, '/public' )))

app.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname + '/public/index.html') ) 
	//res.render('/index.html')
	});

app.listen(3000, () => console.log('App is listening on port 3000'));