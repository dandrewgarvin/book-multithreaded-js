#!/usr/bin/env node

const http = require('http');
const RpcWorkerPool = require('./rpc-worker');
const worker = new RpcWorkerPool(
  './worker.js',
  Number(process.env.THREADS),
  process.env.STRATEGY
);

const server = http.createServer(async (req, res) => {
  const value = Math.floor(Math.random() * 100_000_000);
  const sum = await worker.exec('square_sum', value);

  res.end(JSON.stringify({ sum, value }));
});

const PORT = 1337;
server.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`listening on port ${PORT}`);
});
