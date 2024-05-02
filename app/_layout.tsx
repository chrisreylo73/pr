import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Player from '~/components/Player';
import LoadingModal from '~/components/LoadingModal';
import { AppProvider } from '~/services/AppContext';
import { StatusBar } from 'expo-status-bar';
import EditSongModal from '~/components/EditSongModal';
import DownloadModal from '~/components/DownloadModal';

const _layout = () => {
  return (
    <AppProvider>
      <Header />
      <StatusBar hidden />
      <Slot />
      <Player />
      <Footer />
      <LoadingModal />
      <EditSongModal />
      <DownloadModal />
    </AppProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
