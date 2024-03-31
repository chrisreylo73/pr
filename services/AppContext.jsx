import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);
  const [playlistNames, setPlaylistNames] = useState([]);
  const [artistNames, setArtistNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [playState, setPlayState] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [songToEdit, setSongToEdit] = useState();
  const [isEditSongModalVisable, setIsEditSongModalVisable] = useState(false);

  return (
    <AppContext.Provider
      value={{
        songData,
        setSongData,
        playlistNames,
        setPlaylistNames,
        artistNames,
        setArtistNames,
        playState,
        setPlayState,
        isLoading,
        setIsLoading,
        currentSong,
        setCurrentSong,
        currentPlaylist,
        setCurrentPlaylist,
        isPlayerVisible,
        setIsPlayerVisible,
        isShuffleOn,
        setIsShuffleOn,
        songToEdit,
        setSongToEdit,
        isEditSongModalVisable,
        setIsEditSongModalVisable,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
