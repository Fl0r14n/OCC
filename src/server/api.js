const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

module.exports.init = function (app) {

  const basePath = '/mock/api';

  const buildPath = function (endpoint) {
    return basePath + endpoint;
  };

  const serveImage = function (req, res) {
    var path = './src/public/medias/' + req.query.name + '.';
    var type = req.query.type ? req.query.type : 'jpg';
    path += type;
    switch(type) {
      case 'jpg': {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        break;
      }
      case 'svg': {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        break;
      }
      default: {
        res.writeHead(200, {'Content-Type': 'image/'+type});
      }
    }
    res.end(fs.readFileSync(path), 'binary');
  };

  const getJsonFile = function (name) {
    var path = './src/server/json/' + name + '.json';
    return fs.readFileSync(path);
  };

  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

  const mediaRouter = express.Router();
  {
    // ex: /medias/?name=logo.jpg
    mediaRouter.get('/', function (req, res) {
      if (req.query.name) {
        serveImage(req, res);
      } else {
        res.status(404).send('Sorry can\'t find that');
      }
    });
  }
  app.use('/medias', mediaRouter);
};

