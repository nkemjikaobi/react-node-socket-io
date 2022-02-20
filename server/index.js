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
	console.log(`User with the socket id => ${socket.id} connected`);

	//join a room
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`)
	})

	//send a message
	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data)
	})

	//disconect a user
	socket.on('disconnect', () => {
		console.log(`User ${socket.id} disconnected`);
	});
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
