var express = require('express');
var app = express();
var path = require('path');
const fetch = require("node-fetch");

var PORT = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname + '/images')))
console.log(path.join(__dirname, './public'));
app
  .use(express.static(path.join(__dirname, './public')))
  /*
  .use(express.static(path.join(__dirname, '/public/ProjectsPage' )))
  .use(express.static(path.join(__dirname, '/public/ProjectsPage/MedTimer' )))
  .use(express.static(path.join(__dirname, '/public/ProjectsPage/MedTimer/audio' )))*/
  .get('/', (req,res) => res.sendFile(path.join(__dirname, './public/HomePage/index.html')))
  .get('/projects',(req,res) => {res.sendFile(path.join(__dirname, './public/ProjectsPage/projects.html'))})
  .get('/projects/MeditationTimer', (req,res) => res.sendFile(path.join(__dirname, './public/ProjectsPage/MedTimer/index.html')))
  .get('/projects/Converter', (req,res) => res.sendFile(path.join(__dirname, './public/ProjectsPage/Converter/index.html')))
  .get('/projects/Converter/Exchange', async(req, res) => createProxyServer(req, res))
  .listen(PORT, () => console.log(`App is listening on port ${PORT}`));

  // Server for to get the exchange rates for the currency converter
  async function createProxyServer(req, res) {
    //Send a get request to the exchange API
    let exchangeHttp = "https://api.exchangeratesapi.io/latest";
    let response = await fetch(exchangeHttp);
    let exchange = await response.json();
    res.json(exchange);
  }
  