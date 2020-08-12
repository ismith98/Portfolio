var express = require('express');
var app = express();
var path = require('path');

//app.use(express.static(path.join(__dirname + '/images')))

app
  .use(express.static('public'))
  /*
  .use(express.static(path.join(__dirname, '/public/ProjectsPage' )))
  .use(express.static(path.join(__dirname, '/public/ProjectsPage/MedTimer' )))
  .use(express.static(path.join(__dirname, '/public/ProjectsPage/MedTimer/audio' )))*/
  .get('/', (req,res) => res.sendFile(path.join(__dirname, '/public/HomePage/index.html')))
  .get('/projects',(req,res) => {res.sendFile(path.join(__dirname, '/public/ProjectsPage/projects.html'))})
  .get('/projects/MeditationTimer', (req,res) => res.sendFile(path.join(__dirname, 'public/ProjectsPage/MedTimer/index.html')))
  .listen(3000, () => console.log('App is listening on port 3000'));