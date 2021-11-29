console.log('blue.js');

const worker = new SharedWorker('shared-worker.js', {
  name: 'Dummy Shared Worker Test',
});

worker.port.onmessage = message => {
  console.log('[BLUE]:', message.data);
};
