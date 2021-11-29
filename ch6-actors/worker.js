const { parentPort } = require('worker_threads');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function asyncOnMessageWrap(fn) {
  return async function (msg) {
    parentPort.postMessage(await fn(msg));
  };
}

const commands = {
  async square_sum(max) {
    await sleep(Math.random() * 100);

    let sum = 0;

    for (let i = 0; i < max; i++) {
      sum += Math.sqrt(i);
    }

    return sum;
  },
};

parentPort.on(
  'message',
  asyncOnMessageWrap(async ({ method, params, id }) => ({
    result: await commands[method](...params),
    id,
  }))
);
