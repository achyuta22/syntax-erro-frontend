// src/AudioContext.js
import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState("");

  return (
    <AudioContext.Provider value={{ audioUrl, setAudioUrl }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
