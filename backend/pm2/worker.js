const { createServer } = require('http');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/cluster-adapter');
const { setupWorker } = require('@socket.io/sticky');

const httpServer = createServer();
const io = new Server(httpServer);

io.adapter(createAdapter());

setupWorker(io);

io.on('connection', (socket) => {
  console.log(`connect ${socket.id}`);
});
