import React, { useState, useEffect } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance
import { useAudio} from "../AudioContext"; // Import the audio context

const SocketComponent = () => {

    const { audioUrl, setAudioUrl,playing,setPlaying,joinedRoom,setJoinedRoom,audioTime,setAudioTime,timeStamp,setTimeStamp,jumped,setJumped} = useAudio(); // Access audioUrl and setAudioUrl from context
    const [uploadUrl,setUploadUrl] = useState('');// this store the audio link of the peer uploaded song 
    const [room, setRoom] = useState(''); // State to track the room input
    // const [variableInput, setVariableInput] = useState(''); // State to track variable input
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
        socket.on('roomJoined', ({roomName,hostTimeStamp}) => {
            setMessage(`Joined room "${roomName}". Waiting for updates...`);
            setJoinedRoom(roomName); // Track the joined room
            setAudioTime(hostTimeStamp);
        });

        // Handle peer and peer components 
        socket.on('peer', (peer) => {
            console.log(`Peers data ${peer.peerId}, ${peer.currentTime}`);
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
        socket.on('setChangedTimeStamp', (jumpedTimeStamp) => {
            // Update the timestamp
            console.log('Received timestamp update from host:', jumpedTimeStamp); // Debugging
            setTimeStamp(jumpedTimeStamp);
            setJumped(true);
        });
        // Listening for audio URL updates from the backend
        // socket.on('peersAudioUrls', (updatedAudioUrls) => {
        // console.log(`updated audiourls ${updatedAudioUrls}`);
        // setAudioUrls(updatedAudioUrls); // Update audio URLs for all peers
        // });
        // Listen for timestamp updates from the host
        // Inside your useEffect for socket events
        


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
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Socket.IO Room Management</h2>
            <input
                type="text"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="p-2 mb-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between mb-4">
                <button
                    onClick={handleCreateRoom}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded shadow hover:opacity-90 transition"
                >
                    Create Room
                </button>
                <button
                    onClick={handleJoinRoom}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded shadow hover:opacity-90 transition"
                >
                    Join Room
                </button>
            </div>
            {joinedRoom && <p className="text-green-600 mb-4">You have joined room: {joinedRoom}</p>}
            {message && <p className="text-red-600 mb-4">{message}</p>} {/* Display messages to the user */}

            
        </div>
    );
};

export default SocketComponent;
