import io from 'socket.io-client';

// Connect to the backend server (change the port if necessary)
 // const socket = io('https://syntax-error.onrender.com/');
const socket=io("http://localhost:5000");
// const socket = io('https://syntax-error-backend.onrender.com/');
export default socket;
