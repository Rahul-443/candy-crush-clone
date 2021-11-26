var path = require('path');
var express = require('express');
var fs = require('fs');

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const { ExplorerApi, RpcApi } = require('atomicassets');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save_score', function(req, res) {
  const user_id = req.body.user_id;
  const chances_left = req.body.chances_left;
  const score = req.body.score;

  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      const score_new = {
        chances_left: chances_left,
        score: score
      };
      if (data.hasOwnProperty(user_id)) {
        score_new[chances_left] = data[user_id][chances_left] - 1;
      } else {
        score_new[chances_left] = 4;
      }
      if (score_new[chances_left] > -1) {
        data[user_id] = score_new;
        let sData = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, 'scores.json'),
          sData,
          'utf-8',
          function(err) {
            console.log(err);
          }
        );
        res.send(JSON.stringify(data[user_id]));
      }
    }
  });
});

app.param('user_id', function(req, res, next, user_id) {
  const id = user_id;
  req.user_id = id;
  next();
});

app.get('/users/:user_id', function(req, res) {
  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      res.send(JSON.stringify(data[req.user_id]));
    }
  });
});

app.get('/users', function(req, res) {
  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      res.send(JSON.stringify(data));
    }
  });
});

setInterval(function() {
  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      for (let property in data) {
        property[chances_left] = 5;
        property[score] = 0;
      }
      data = JSON.stringify(data);
      fs.writeFile(path.join(__dirname, 'scores.json'), data, 'utf-8', function(
        err
      ) {
        console.log(err);
      });
    }
  });
}, 86400000);

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port', server.address().port);
});
