// components/SocketComponent.js
import React, { useState, useEffect } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance

const SocketComponent = () => {
    const [room, setRoom] = useState(''); // State to track the room input
    const [joinedRoom, setJoinedRoom] = useState(''); // State to track the room the user joined

    useEffect(() => {
        // Listen for the connection event
        socket.on('connect', () => {
            console.log('Connected with ID:', socket.id);
        });

        // Cleanup the effect
        return () => {
            socket.off('connect');
        };
    }, []);

    const handleJoinRoom = () => {
        if (room) {
            socket.emit('joinRoom', room); // Emit joinRoom event to the server
            setJoinedRoom(room); // Track the joined room
            setRoom(''); // Clear the input
        }
    };

    return (
        <div>
            <h2>Socket.IO Example</h2>
            <input
                type="text"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            {joinedRoom && <p>You joined room: {joinedRoom}</p>}
        </div>
    );
};

export default SocketComponent;
