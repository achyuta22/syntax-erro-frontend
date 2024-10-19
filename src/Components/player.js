import React, { useState } from "react";
import ReactPlayer from "react-player";
import SocketComponent from "./SocketComponent"; // Import SocketComponent
import axios from "axios";
import socket from "../Utils/Socket";
import { useAudio } from "../AudioContext"; // Import the audio context

function Player() {
  // const [audioUrls, setAudioUrls] = useState([]); // Use array for audio URLs
  const { audioUrl, setAudioUrl,playing,setPlaying ,audioUrls,setAudioUrls} = useAudio(); // Access audioUrl and setAudioUrl from context
  const [volume, setVolume] = useState(0.8);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current audio index
  //   const [playing, setPlaying] = useState(false);
  const [file, setFile] = useState(null);
  //   const [currentIndex, setCurrentIndex] = useState(0); // Track current audio index

  const togglePlay = () => {
    const newPlayStatus = !playing;
    console.log(newPlayStatus);
    setPlaying(newPlayStatus); // Update local play status
    socket.emit("playStatusChanged", newPlayStatus); // Emit play/pause status to peers
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleEnded = () => {
    if (currentIndex < audioUrls.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next audio
      setPlaying(true);
    } else {
      setPlaying(false); // Stop playing if there are no more audios
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e1y0qvof"); // Use your unsigned upload preset

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
        // setAudioUrls((prevUrls) => [...prevUrls, data.secure_url]);
        // socket.emit('updateUploadUrl',{audioUrls: audioUrls});// sending the state with all the song urls
        // Emit the updated song URL to the server
        socket.emit('updateSongUrl', data.secure_url);
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
      }
    }
  };

  // Play the next audio when current one ends
  //   const handleEnded = () => {
  //     if (currentIndex < audioUrls.length - 1) {
  //       setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next audio
  //       setPlaying(true);
  //     } else {
  //       setPlaying(false); // Stop playing if there are no more audios
  //     }
  //   };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        React Player Audio
      </h1>

      <div className="w-full md:w-2/3 lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        {audioUrl ? (
          <ReactPlayer
            url={audioUrl} // Use the global audioUrl
            playing={playing}
            controls={true}
            volume={volume}
            width="100%"
            height="50px"
            className="rounded-md"
          />
        ) : (
          <p className="text-gray-600">No audio uploaded yet</p>
        )}
        {/* {audioUrls.length > 0 ? (
          <div className="mb-4">
            <ReactPlayer
              url={audioUrls[currentIndex]} // Play the current audio URL
              playing={playing}
              controls={true}
              volume={volume}
              width="100%"
              height="50px"
              className="rounded-md"
              onEnded={handleEnded} // Handle when audio ends
            />
          </div>
        ) : (
          <p className="text-gray-600">No audio uploaded yet</p>
        )} */}

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
          >
            Upload to Cloudinary
          </button>
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
