import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:4000');

const App = () => {
	const [username, setUserName] = useState('');
	const [room, setRoom] = useState('');
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
		}
	};
	return (
		<div className='App'>
			{!showChat ? (
				<div className='joinChatContainer'>
					<h3>Join Chat</h3>
					<input
						type='text'
						onChange={e => setUserName(e.target.value)}
						name=''
						id=''
						placeholder='John...'
					/>
					<input
						type='text'
						onChange={e => setRoom(e.target.value)}
						name=''
						id=''
						placeholder='Room ID...'
					/>
					<button onClick={joinRoom}>Join A Room</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
};

export default App;
