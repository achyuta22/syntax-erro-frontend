import React, { useState, useEffect } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance
import { useAudio } from "../AudioContext"; // Import the audio context

const SocketComponent = () => {
    const { audioUrl, setAudioUrl } = useAudio(); // Access audioUrl and setAudioUrl from context
    const [room, setRoom] = useState(''); // State to track the room input
    const [joinedRoom, setJoinedRoom] = useState(''); // State to track the room the user joined
    const [sharedVariable, setSharedVariable] = useState(''); // Shared variable state
    const [variableInput, setVariableInput] = useState(''); // State to track variable input
    const [message, setMessage] = useState(''); // State for messages (success/error)
    const [song,setSong] = useState('abcd');
    const [currentSongUrl, setCurrentSongUrl] = useState(''); // song url for peers from backend

    useEffect(() => {
        // Listen for the connection event
        socket.on('connect', () => {
            console.log('Connected with ID:', socket.id);
        });

        // Listen for room creation confirmation
        socket.on('roomCreated', (room) => {
            setMessage(`Room "${room}" created. Waiting for peers to join...`);
            setJoinedRoom(room); // Track the created room
        });

        // Listen for room joining confirmation
        socket.on('roomJoined', (room) => {
            setMessage(`Joined room "${room}". Waiting for updates...`);
            setJoinedRoom(room); // Track the joined room
        });

        // Handle peer joining notification
        socket.on('peerJoined', (peerId) => {
            setMessage(`Peer ${peerId} joined the room!`);
        });

        // Listen for variable updates from the backend
        socket.on('variableUpdated', (newValue) => {
            console.log('Variable updated from server:', newValue); // Debugging
            setSharedVariable(newValue); // Update the shared variable state
        });
        socket.on('songUrlUpdated', (url) => {
            console.log('Song URL is succesfully emitted from server:', url); // Debugging
             setAudioUrl(url);
            setCurrentSongUrl(url); // Update the song URL state
        });

        // Handle errors
        socket.on('error', (error) => {
            setMessage(error);
        });

        // Cleanup the effect when the component unmounts
        return () => {
            socket.off('connect');
            socket.off('variableUpdated');
            socket.off('roomCreated');
            socket.off('roomJoined');
            socket.off('peerJoined');
            socket.off('error');
            socket.off('songUrlUpdated'); // Cleanup listener for song URL updates
        };
    }, []);

    const handleJoinRoom = () => {
        if (room) {
            socket.emit('joinRoom', room); // Emit joinRoom event to the server
            console.log(`Attempting to join room: ${room}`); // Debugging
            setRoom(''); // Clear the input field
        }
    };

    const handleCreateRoom = () => {
        if (room) {
            socket.emit('createRoom', { roomName: room, songUrl: audioUrl }); // Correctly structured object
            console.log(`Creating room: ${room}`); // Debugging
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
            <h2>Socket.IO Room Management</h2>
            <input
                type="text"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
            <button onClick={handleJoinRoom}>Join Room</button>
            {joinedRoom && <p>You are in room: {joinedRoom}</p>}
            {message && <p>{message}</p>} {/* Display messages to the user */}

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
