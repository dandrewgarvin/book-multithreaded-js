const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function asyncOnMessageWrap(fn) {
  return async function (msg) {
    self.postMessage(await fn(msg.data));
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
  async fibonacci(limit) {
    await sleep(Math.random() * 100);
    let prev = 1n;
    let next = 0n;
    let swap;

    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }

    return String(next);
  },
  async bad() {
    await sleep(Math.random() * 10);
    throw new Error('Ooops bad call');
  },
};

self.onmessage = asyncOnMessageWrap(async rpc => {
  const { method, params, id } = rpc;

  if (commands.hasOwnProperty(method)) {
    try {
      const result = await commands[method](...params);

      return { id, result };
    } catch (err) {
      return { id, error: { code: -32000, message: err.message } };
    }
  } else {
    return {
      id,
      error: {
        code: -32601,
        message: `method ${method} not found`,
      },
    };
  }
});
