// src/AudioContext.js
import React, { createContext, useContext, useState,useRef} from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioTime,setAudioTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [audioUrls, setAudioUrls] = useState([]); // Use array for audio URLs
  const [joinedRoom, setJoinedRoom] = useState(''); // State to track the room the user joined
  const [timeStamp,setTimeStamp] = useState(0);
  const [jumped,setJumped] = useState(false);

  return (
    // wrapping children with some global state variables 
    <AudioContext.Provider value={{ audioUrl, setAudioUrl,playing,setPlaying, audioUrls,setAudioUrls,audioTime,setAudioTime,joinedRoom,setJoinedRoom,timeStamp,setTimeStamp,jumped,setJumped}}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
