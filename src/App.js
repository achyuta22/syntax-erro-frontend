// App.js
import './App.css';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import SocketComponent from './Components/SocketComponent';// Import SocketComponent

function App() {
  const [volume, setVolume] = useState(0.8);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">React Player Audio</h1>

      <div className="w-full md:w-2/3 lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <ReactPlayer
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          playing={playing}
          controls={true}
          volume={volume}
          width="100%"
          height="50px"
          className="rounded-md"
        />

        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-md text-white font-semibold ${playing ? 'bg-red-500' : 'bg-green-500'} hover:opacity-80 transition duration-300 ease-in-out`}
          >
            {playing ? 'Pause' : 'Play'}
          </button>

          <div className="mt-4 w-full">
            <label className="block text-gray-600 text-sm font-bold mb-2">Volume Control</label>
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
      </div>

      {/* SocketComponent for WebSocket connection */}
      <div className="mt-8">
        <SocketComponent />
      </div>
    </div>
  );
}

export default App;
