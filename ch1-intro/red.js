console.log('red.js');

const worker = new SharedWorker('shared-worker.js', {
  name: 'Dummy Shared Worker Test',
});

worker.port.onmessage = message => {
  console.log('[RED]:', message.data);
};

worker.onmessage = message => {
  console.log('[RED] (noport):', message.data);
};
