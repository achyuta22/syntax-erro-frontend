import React, { useState, useEffect, useRef } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance
import { useAudio} from "../AudioContext"; // Import the audio context

const SocketComponent = () => {

    const { audioUrl, setAudioUrl,playing,setPlaying,audioUrls,setAudioUrls,audiotime,setAudioTime} = useAudio(); // Access audioUrl and setAudioUrl from context
    const [uploadUrl,setUploadUrl] = useState('');// this store the audio link of the peer uploaded song 
    const [room, setRoom] = useState(''); // State to track the room input
    const [joinedRoom, setJoinedRoom] = useState(''); // State to track the room the user joined
    const [sharedVariable, setSharedVariable] = useState(''); // Shared variable state
    const [variableInput, setVariableInput] = useState(''); // State to track variable input
    const [message, setMessage] = useState(''); // State for messages (success/error)
    const [currentSongUrl, setCurrentSongUrl] = useState(''); // song url for peers from backend
    // const [song,setSong] = useState('abcd');
    // const [currentTimestamp, setCurrentTimestamp] = useState(0);


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

        // Handle peer and peer components 
        socket.on('peer', (peer) => {
            console.log(`Peers data ${peer.peerId}, ${peer.currentTime}`);
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
        socket.on('playStatusUpdated', (playStatus) => {
            console.log('Received play/pause update from host:', playStatus); // Debugging
            setPlaying(playStatus); // Update play status based on the host
        });
        // Listening for audio URL updates from the backend
        // socket.on('peersAudioUrls', (updatedAudioUrls) => {
        // console.log(`updated audiourls ${updatedAudioUrls}`);
        // setAudioUrls(updatedAudioUrls); // Update audio URLs for all peers
        // });
        // Listen for timestamp updates from the host
        // Inside your useEffect for socket events
        
        // socket.on('timestampUpdated', (timestamp) => {
        //     console.log(`Timestamp is being received from backend ${timestamp}`);
        //     setAudioTime(timestamp);
        //     console.log('Player reference:', audiotime);

        //     if (playerRef.current) { // Check if playerRef is not null
        //         const currentTime = playerRef.current.currentTime; // Get the current playback time
        //         const timeDifference = Math.abs(currentTime - timestamp); // Calculate the difference

        //         if (timeDifference > 2) { // If the difference is greater than 2 seconds, adjust
        //             // Adjust playback to match the host
        //             console.log(`Syncing to host's timestamp: ${timestamp}`);
        //             // Here you would add logic to adjust the playback time, e.g., seeking to the timestamp
        //             playerRef.current.currentTime = timestamp; // This line assumes playerRef is an audio element
        //         }
        //     } else {
        //         console.error("Player reference is null");
        //     }
        // });


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
            socket.off('peer');
            socket.off('error');
            socket.off('songUrlUpdated'); // Cleanup listener for song URL updates
            // socket.off('timestampUpdated');
            // socket.off('peersAudioUrls');
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
            socket.emit('createRoom', { roomName: room, songUrl: audioUrl,playStatus:false}); // Correctly structured object
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
    const handlePlayPauseEmit = (playStatus) => {
        socket.emit('playPauseUpdate', playStatus); // Emit the play/pause status to peers
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
