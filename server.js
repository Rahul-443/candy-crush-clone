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
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.post('/save_score', function(req, res) {
  const user_id = req.body.user_id;
  const chances_left = req.body.chances_left;
  const score = req.body.score;
  const score_new = {
    user_id: {
      chances_left: chances_left,
      score: score
    }
  };

  fs.readFile(path.join(__dirname, 'scores.json'), 'utf-8', function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      data[user_id] = score_new[user_id];
      res.end(JSON.stringify(score_new));
    }
  });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port', server.address().port);
});
