var express = require('express');
var app = express();
var path = require('path');

//app.use(express.static(path.join(__dirname + '/images')))

app
  .use(express.static(path.join(__dirname, '/public' )))
  .use(express.static(path.join(__dirname, '/public/homepage' )))
  .use(express.static(path.join(__dirname, '/public/ProjectsPage' )))
  .get('/', (req,res) => res.sendFile(path.join(__dirname, '/public/homepage/index.html')))
  .get('/projects',(req,res) => {res.sendFile(path.join(__dirname, '/public/ProjectsPage/projects.html'))})
  .listen(3000, () => console.log('App is listening on port 3000'));