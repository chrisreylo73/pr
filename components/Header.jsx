import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>POCKET RECORDS</Text>
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          cursorColor="#FCBE11"
          placeholder="search..."
          placeholderTextColor={'#222222'}
          color="white"
          textAlignVertical="center"
          textAlign="left"></TextInput>
      </View> */}
      {/* <View style={styles.routeTitleContainer}>
				<Text style={styles.routeTitle}>SONGS</Text>
			</View> */}
      {/* <View style={styles.filterContainer}>
				<TouchableOpacity style={styles.filterButton}>
					<Text style={styles.filterButtonText}>SONGS</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.filterButton}>
					<Text style={styles.filterButtonText}>ARTISTS</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.filterButton}>
					<Text style={styles.filterButtonText}>PLAYLISTS</Text>
				</TouchableOpacity>
			</View> */}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // justifyContent: "center",
    //top: 30,
    alignSelf: 'center',
    width: '100%',
    //  position: 'absolute',
    //  zIndex: 2,
    //backgroundColor: "#0D0D0D",
    backgroundColor: 'black',
    paddingTop: 10,
    elevation: 10,
    borderBottomWidth: 2,
    // borderColor: "black",
    //  borderColor: '#101010',
    // alignItems: "center",
    // paddingBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    // color: "#CCCCCC", // Light color scheme
    alignSelf: 'center',
    letterSpacing: 10,
    color: 'white',
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 40,
    // width: 1000,
    //backgroundColor: "#0D0D0D",
    backgroundColor: 'black',
    paddingHorizontal: 50,
    width: '100%',
    // paddingHorizontal: 100,
    // borderRadius: 10,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    //  paddingBottom: 10,
    //backgroundColor: "#0D0D0D",
    backgroundColor: 'black',
    paddingHorizontal: 10,
    width: '100%',
  },
  searchBar: {
    width: '90%',
    height: 35,
    // backgroundColor: "#090909",
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#111111',
    borderWidth: 2,
    paddingHorizontal: 10,
    // elevation: 8,
  },
  filterButton: {
    padding: 5,
  },
  filterButtonText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: 'bold',
  },
  routeTitleContainer: {
    alignItems: 'center',
  },
  routeTitle: {
    color: 'white',
    fontSize: 12,
  },
});
