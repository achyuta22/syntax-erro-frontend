import React, { useState, useEffect } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance

const SocketComponent = () => {
    const [room, setRoom] = useState(''); // State to track the room input
    const [joinedRoom, setJoinedRoom] = useState(''); // State to track the room the user joined
    const [sharedVariable, setSharedVariable] = useState(''); // Shared variable state
    const [variableInput, setVariableInput] = useState(''); // State to track variable input

    useEffect(() => {
        // Listen for the connection event
        socket.on('connect', () => {
            console.log('Connected with ID:', socket.id);
        });

        // Listen for variable updates from the backend
        socket.on('variableUpdated', (newValue) => {
            console.log('Variable updated from server:', newValue); // Debugging
            setSharedVariable(newValue); // Update the shared variable state
        });

        // Cleanup the effect when the component unmounts
        return () => {
            socket.off('connect');
            socket.off('variableUpdated');
        };
    }, []);

    const handleJoinRoom = () => {
        if (room) {
            socket.emit('joinRoom', room); // Emit joinRoom event to the server
            setJoinedRoom(room); // Track the joined room
            console.log(`Joined room: ${room}`); // Debugging
            setRoom(''); // Clear the input field
        }
    };

    const handleChangeVariable = () => {
        if (variableInput) {
            console.log('Changing variable to:', variableInput); // Debugging
            socket.emit('changeVariable', variableInput); // Emit changeVariable event
            setVariableInput(''); // Clear the variable input after submission
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

            <input
                type="text"
                placeholder="Enter the variable"
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
            />
            <button onClick={handleChangeVariable}>Change Variable</button>

            {sharedVariable && <p>Variable has been updated: {sharedVariable}</p>}
        </div>
    );
};

export default SocketComponent;
