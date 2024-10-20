// src/AudioContext.js
import React, { createContext, useContext, useState,useRef} from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audiotime,setAudioTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [audioUrls, setAudioUrls] = useState([]); // Use array for audio URLs


  return (
    // wrapping children with some global state variables 
    <AudioContext.Provider value={{ audioUrl, setAudioUrl,playing,setPlaying, audioUrls,setAudioUrls,audiotime,setAudioTime}}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
