// src/Player.js

import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import SocketComponent from "./SocketComponent"; // Import SocketComponent
import axios from "axios";
import socket from "../Utils/Socket";
import { useAudio } from "../AudioContext"; // Import the audio context

function Player() {
  const {
    audioUrl,
    setAudioUrl,
    playing,
    setPlaying,
    joinedRoom,
    setJoinedRoom,
    audioTime,
    setAudioTime,
    timeStamp,
    setTimeStamp,
    jumped,setJumped
  } = useAudio(); // Access audioUrl and setAudioUrl from context
  const [volume, setVolume] = useState(0.8);
  const [file, setFile] = useState(null);
  const [Host, setHost] = useState();
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isReady, setIsReady] = useState(false); // Track if player is ready
  socket.on("Host", (hostId) => {
    setHost(hostId);
  });
  const togglePlay = () => {
    const newPlayStatus = !playing;
    console.log(newPlayStatus);
    setPlaying(newPlayStatus); // Update local play status
    socket.emit("playStatusChanged", newPlayStatus); // Emit play/pause status to peers
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleEnded = () => {
  //   if (currentIndex < audioUrls.length - 1) {
  //     setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next audio
  //     setPlaying(true);
  //   } else {
  //     setPlaying(false); // Stop playing if there are no more audios
  //   }
  // };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e1y0qvof"); // Use your unsigned upload preset

      setIsLoading(true); // Start loading

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dnlklmo7y/upload`, // Replace with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(`here the new Upload url is present ${data.secure_url}`);

        // Emit the updated song URL to the server
        socket.emit("updateSongUrl", data.secure_url);
        setAudioUrl(data.secure_url); // Set the uploaded file URL in global state
        const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage

        if (email) {
          // Make a request to your backend to store the URL in the database
          await axios.post("http://localhost:5000/api/store-audio-url", {
            email,
            audioUrl: data.secure_url,
          });
          console.log("Audio URL stored in the database successfully");
        } else {
          console.error("No email found in localStorage");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  // sending host timestamp to server that intern will be broadcasted to the peers
  //(which will intern be used in functions used for synchronisation)

  // this will run socket.id == hostId
  // Function to sync the host's timestamp with peers
  // Sync with the host's timestamp when the player is ready
  useEffect(() => {
    if (
      joinedRoom &&
      audioTime !== null &&
      !isNaN(audioTime) &&
      isReady &&
      playerRef.current
    ) {
      console.log(`Trying to sync with host timestamp: ${audioTime}`);
      playerRef.current.seekTo(audioTime);
    } else {
      console.error("Invalid audioTime:", audioTime); // Log the invalid audioTime
    }
  }, [audioTime, joinedRoom, isReady]);

  const syncWithHost = () => {
    if (playing && Host === socket.id) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current playback time
      console.log(`Host Timestamp is being sent ${currentTime}`);
      socket.emit("syncTimestamp", currentTime); // Emit the timestamp to peers
    }
  };

  useEffect(() => {
    if (playing && Host === socket.id) {
      const interval = setInterval(syncWithHost, 1000); // Sync every second
      return () => clearInterval(interval);
    }
  }, [playing]);

  // setting broadcast of the currenttime of peers to server(now currentime can be used in synchronization functions)
  // setting broadcast of the currenttime of peers to server
  const syncpeer = () => {
    if (playing && socket.id !== Host) {
      // Ensure only peers (not the host) emit their timestamp
      const currentTime = playerRef.current.getCurrentTime(); // Get current playback time
      console.log("Peer timestamp for sync (peer):", currentTime);
      socket.emit("updatePeerComponent", {
        currentTime: currentTime,
        peerId: socket.id,
      }); // Emit the timestamp to the server
    }
  };

  // Run syncpeer periodically only if playing and it's a peer
  useEffect(() => {
    if (playing && socket.id !== Host) {
      // Ensure only peers run the syncpeer function
      const interval = setInterval(syncpeer, 1000); // Sync every second
      return () => clearInterval(interval); // Clear interval when not playing
    }
  }, [playing]); // Include Host in the dependency array to react to changes

  const handlePlayerReady = () => {
    setIsReady(true);
  };
  useEffect(() => {
    console.log("Timestamp changed to:", timeStamp);    // Add any other actions to handle the timestamp change here
    // const currentTime = playerRef.current.getCurrentTime(); // Get current playback time
    socket.emit("timeStampChanged", timeStamp); // Emit play/pause status to peers
  }, [timeStamp]); // Runs every time `timestamp` changes
  
  const handleSeek = (seconds) => {
    setTimeStamp(seconds); // Directly updates timestamp when user seeks to a new point
    console.log("User changed timestamp to:", seconds);
  };
  useEffect(()=>{
    if(jumped){
    if (playerRef.current) {
      playerRef.current.seekTo(timeStamp, 'seconds');
  }
  setJumped(false);
}


  },[jumped] )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        React Player Audio
      </h1>

      <div className="w-full md:w-2/3 lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        {audioUrl ? (
          <>
          <ReactPlayer
            url={audioUrl} // Use the global audioUrl
            ref={playerRef} // Attach the ref to ReactPlayer
            playing={playing}
            controls={true}
            volume={volume}
            onSeek={handleSeek} // Fires when user seeks
            width="100%"
            height="50px"
            className="rounded-md"
            onReady={handlePlayerReady}
          />
                <p>Current timestamp: {timeStamp.toFixed(2)} seconds</p>
</>
        ) : (
          <p className="text-gray-600">No audio uploaded yet</p>
        )}

        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              playing ? "bg-red-500" : "bg-green-500"
            } hover:opacity-80 transition duration-300 ease-in-out`}
          >
            {playing ? "Pause" : "Play"}
          </button>

          <div className="mt-4 w-full">
            <label className="block text-gray-600 text-sm font-bold mb-2">
              Volume Control
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="mt-2 text-gray-600">Volume: {volume}</p>
          </div>
        </div>

        {/* File upload section */}
        <div className="mt-4 w-full">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Uploading..." : "Upload a file"}
          </button>
          {isLoading && (
            <p className="text-blue-500">Uploading your file, please wait...</p>
          )}{" "}
          {/* Loading message */}
        </div>
      </div>

      {/* SocketComponent for WebSocket connection */}
      <div className="mt-8">
        <SocketComponent />
      </div>
    </div>
  );
}

export default Player;
