var path = require('path');
var express = require('express');
var fs = require('fs');

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const { ExplorerApi, RpcApi } = require('atomicassets');

var app = express();

const localHost = 'http://localhost:8080';
const ipHost = 'http://192.168.43.118:8080';
const zanyGumballsSite = 'https://zany-gumballs.herokuapp.com';

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', zanyGumballsSite);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save_score', function(req, res) {
  const user_id = req.body.user_id;
  const score = req.body.score;

  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      const user_data_new = {
        chances_left: data[user_id]['chances_left'],
        score: score
      };
      if (user_data_new['score'] > -1) {
        data[user_id] = user_data_new;
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

app.post('/update_chance', function(req, res) {
  const user_id = req.body.user_id;
  const chances_left = req.body.chances_left;

  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      const user_data_new = {
        chances_left: chances_left,
        score: data[user_id]['score']
      };
      if (data.hasOwnProperty(user_id)) {
        user_data_new['chances_left'] = data[user_id]['chances_left'] - 1;
      } else {
        user_data_new['chances_left'] = 4;
      }
      if (user_data_new['chances_left'] > -1) {
        data[user_id] = user_data_new;
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
      if (data[req.user_id]) {
        res.send(JSON.stringify(data[req.user_id]));
      } else {
        const user_addr = req.user_id;
        let user_def_data = {
          chances_left: 5,
          score: 0
        };
        data[user_addr] = user_def_data;
        let sData = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, 'scores.json'),
          sData,
          'utf-8',
          function(err) {
            console.log(err);
          }
        );
        res.send(data[user_addr]);
      }
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
        data[property]['chances_left'] = 5;
        data[property]['score'] = 0;
      }
      data = JSON.stringify(data);
      fs.writeFile(path.join(__dirname, 'scores.json'), data, 'utf-8', function(
        err
      ) {
        console.log(err);
      });
    }
  });
}, 24 * 60 * 60 * 1000);

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port', server.address().port);
});
