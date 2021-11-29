#!/usr/bin/env node

const http = require('http');

const view = new Int32Array(new SharedArrayBuffer(4));

setInterval(() => Atomics.wait(view, 0, 0, 1900), 2000);

const server = http.createServer((req, res) => {
  res.end('Hello World');
});

const PORT = 1337;
server.listen(PORT, (err, addr) => {
  if (err) {
    throw err;
  }

  console.log(`Server listening at port ${PORT}`);
});
