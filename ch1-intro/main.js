console.log('hello from main.js');

const worker = new Worker('worker.js');

worker.onmessage = message => {
  console.log('The worker says:', message.data);
};

worker.postMessage('Initial Post');

console.log('goodbye from main.js');
