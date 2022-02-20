const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	},
});

io.on('connection', socket => {
	console.log('user socket id => ', socket.id);

	socket.on('disconnect', () => {
		console.log(`User ${socket.id} disconnected`);
	});
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
