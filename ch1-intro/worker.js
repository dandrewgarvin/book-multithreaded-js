console.log('worker spawned');

self.onmessage = message => {
  console.log('The parent said:', message.data);
};

setTimeout(() => {
  self.postMessage('A message from our sponsor');
}, 1000);
