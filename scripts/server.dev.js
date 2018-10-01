const fs = require('fs');
const path = require('path');
const http = require('http');
const cheerio = require('cheerio');
const express = require('express');
const chokidar = require('chokidar');
const WebSocket = require('ws');

const config = require('./config');
const packager = require('./packager');


const app = express();

app.get('/', function(req, res, next){
  const indexContent = fs.readFileSync(path.join(config.indexFile));
  const indexTree = cheerio.load(indexContent);

  indexTree('head').append(`<script>var ws = new WebSocket("ws://localhost:${config.port}/");ws.onmessage = (e) => {if (e.data === 'reload') window.location.reload();};</script>`);

  res.send(indexTree.html());
});

app.get('/dist/bundle.js', function(req, res, next){
  const bundle = fs.readFileSync(config.jsBundleFile);

  res.type('text/javascript');
  res.send(bundle);
});

app.get('/dist/bundle.css', function(req, res, next){
  const bundle = fs.readFileSync(config.cssBundleFile);

  res.type('text/css');
  res.send(bundle);
});

app.use('/assets', express.static(config.assetsDir));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('error', (err) => {
    return console.log((err.code !== 'ECONNRESET')? err : '🔁 Browser reloaded.');
  });
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 5000);

const reload = () => {
  wss.clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('reload');
    }
  });
};

server.listen(config.port, () => {
  console.log(`Server started on: http://localhost:${config.port}`);

  const watcher = chokidar.watch(
    ['index.html', 'src'], 
    {
      ignored: /(^|[\/\\])\../,
      persistent: true
    }
  );

  watcher.on('ready', (path) => {
    watcher.on('add', (path) => {
      packager.logPackageAllAndCatchErrors('added', path);
      reload();
    });

    watcher.on('change', (path) => {
      packager.logPackageAllAndCatchErrors('changed', path);
      reload();
    });

    watcher.on('unlink', (path) => {
      packager.logPackageAllAndCatchErrors('removed', path);
      reload();
    });
  });
});
