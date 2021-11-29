const ID = Math.floor(Math.random() * 999999);

console.log('shared-worker.js', ID);

const ports = new Set();

self.onconnect = event => {
  const port = event.ports[0];

  ports.add(port);

  console.log('[S-WRK] Connection:', ID, ports.size);

  port.onmessage = message => {
    console.log('[S-WRK] Message:', ID, message.data);

    for (let p of ports) {
      p.postMessage([ID, message.data]);
    }
  };
};
