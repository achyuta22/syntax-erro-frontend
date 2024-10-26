import io from 'socket.io-client';

// Connect to the backend server (change the port if necessary)
const socket = io('http://localhost:5000');

export default socket;
