// src/AudioContext.js
import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [playing, setPlaying] = useState(false);


  return (
    // wrapping children with some global state variables 
    <AudioContext.Provider value={{ audioUrl, setAudioUrl,playing,setPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
