import io from 'socket.io-client';

// Connect to the backend server (change the port if necessary)
const socket = io('http://localhost:4000');

export default socket;