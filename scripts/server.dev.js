const fs = require('fs');
const path = require('path');
const http = require('http');
const cheerio = require('cheerio');
const express = require('express');
const chokidar = require('chokidar');
const WebSocket = require('ws');

const config = require('./config');

const app = express();

app.get('/', function(req, res, next){
  const indexContent = fs.readFileSync(path.join(config.indexFile));
  const indexTree = cheerio.load(indexContent);

  indexTree('head').append(`<script>var ws = new WebSocket("ws://localhost:${config.port}/");ws.onmessage = (e) => {if (e.data === 'reload') window.location.reload();};</script>`);

  res.send(indexTree.html());
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
      reload();
    });

    watcher.on('change', (path) => {
      reload();
    });

    watcher.on('unlink', (path) => {
      reload();
    });
  });
});
