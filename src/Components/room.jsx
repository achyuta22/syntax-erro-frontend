import React, { useState, useEffect } from 'react';
import socket from '../Utils/Socket'; // Import the socket instance
import { useAudio} from "../AudioContext"; // Import the audio context

const Room = () =>{
    const [room,setRoom] = useState('');
    const [jroom,setJroom] = useState('');
    const [message,setMessage] = useState('');
    const handleJoin =()=>{
        setJroom(room);
        setMessage('Room Joined')
        setRoom('');
    }
    const handleCreate =()=>{
        setJroom(room)
        setMessage('Room created')
        setRoom('')
    }
    const handleDelete =()=>{
        setJroom('')
    }
    const handleLeave =()=>{
        setJroom('')
    }
    return (
        <>
        <div className="p-4 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Socket.IO Room Management</h2>
            {!jroom && <input
                type="text"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="p-2 mb-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />}
            <div className="flex justify-between mb-4">
                <button
                    onClick={jroom ? handleDelete : handleCreate}
                    className={`px-4 py-2 text-white rounded shadow transition ${
                        jroom 
                            ? "bg-red-500 hover:bg-red-700" // If jroom is present, red button
                            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90" // Default blue button
                    }`}
                >
                    {jroom ? "Delete Room" : "Create Room"}
                </button>

                <button
                    onClick={jroom ? handleLeave : handleJoin}
                    className={`px-4 py-2 text-white rounded shadow transition ${
                    jroom 
                    ? "bg-red-500 hover:bg-red-700" // If joined, red button (Leave Room)
                    : "bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90" // Default green button (Join Room)
                    }`}
                    >
                    {jroom ? "Leave Room" : "Join Room"}
                </button>

            </div>
            {jroom && <p className="text-green-600 mb-4">You have joined room: {jroom}</p>}
            {message && <p className="text-red-600 mb-4">{message}</p>} {/* Display messages to the user */}
            
        </div>
        </>
    );
};

export default Room;