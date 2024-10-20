import io from 'socket.io-client';

// Connect to the backend server (change the port if necessary)
const socket = io('https://syntax-error.onrender.com/');

export default socket;
