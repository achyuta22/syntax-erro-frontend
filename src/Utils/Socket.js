import io from 'socket.io-client';

// Connect to the backend server (change the port if necessary)
const socket = io('http://43.204.211.130:5000/');

export default socket;
