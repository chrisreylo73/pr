import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);
  const [playlistNames, setPlaylistNames] = useState([]);
  const [artistNames, setArtistNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState();
  const [playState, setPlayState] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [songToEdit, setSongToEdit] = useState();
  const [isEditSongModalVisable, setIsEditSongModalVisable] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [backupColors] = useState([
    '#EB5E28',
    '#F15025',
    '#F24333',
    '#DB222A',
    '#840000',
    '#3A86FF',
    '#2F52E0',
    '#6A5ACD',
    '#5E2BFF',
    '#232ED1',
    '#3CB371',
    '#2E8B57',
    '#228B22',
    '#058E3F',
    '#32CD32',
    '#FF5A5F',
    '#8F00FF',
    '#F2A359',
    '#FFBE0B',
    '#FF8811',
    '#48647C',
    '#520C17',
    '#1d1936',
    '#123449',
  ]);

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
        isPlayerVisible,
        setIsPlayerVisible,
        isShuffleOn,
        setIsShuffleOn,
        songToEdit,
        setSongToEdit,
        isEditSongModalVisable,
        setIsEditSongModalVisable,
        backupColors,
        audio,
        setAudio,
        currentSongIndex,
        setCurrentSongIndex,
        currentPlaylist,
        setCurrentPlaylist,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
