import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [playState, setPlayState] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playState,
        setPlayState,
        isLoading,
        setIsLoading,
        songData,
        setSongData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
