import { Button, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import LikeIcon from 'react-native-vector-icons/Ionicons';
import InfoIcon from 'react-native-vector-icons/Entypo';
import { StatusBar } from 'expo-status-bar';
import  Events from '../components/filmScreen/Events';

export default function FilmScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('events');

  const redirectedToEvents = () => {
    setActiveTab('events');
  }
  const redirectedToComments = () => {
    setActiveTab('comments');
  }
  return (
    <SafeAreaView style={{backgroundColor: '#1E1C1A', flex:1}}>
      <View style={styles.containerFilm}>
        <Text style={styles.titleFilm}>Titre du film</Text>
        <Image source={{ uri: 'https://image.tmdb.org/t/p/w780/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg' }} style={styles.imageFilm} />
        <View style={styles.containerIconsFilm}>
          <View style={styles.likeContainer}>
            <LikeIcon name='heart' size={25} color={'red'}></LikeIcon>
            <Text style={styles.likeCount}>10 likes</Text>
          </View>
          <View style={styles.infoIcon}>
            <InfoIcon name='info' size={20} color={'white'}></InfoIcon>
          </View>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => redirectedToEvents()} style={styles.buttonRedirectEvents} activeOpacity={0.8}>
          <Text style={activeTab === 'events' ? styles.buttonOn : styles.buttonOff}>Evénements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirectedToComments()} style={styles.buttonRedirectComments} activeOpacity={0.8}>
          <Text style={activeTab === 'comments'? styles.buttonOn : styles.buttonOff}>Commentaires</Text>
        </TouchableOpacity>
      </View>
      <View>
          {activeTab === "events" ? (
            <Events/>
          ) : (
            <Text>Liste des commentaires ici...</Text>
          )}
      </View>
      <StatusBar style='light'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFilm: {
    width: '100%',
    height: '33%',
    marginBottom: 5,
  },
  titleFilm: {
    color: 'white',
    fontSize: 40,
    marginLeft: 10,
  },
  imageFilm: {
    height: 180,
    resizeMode: "cover",
    borderRadiustop: 10,
  }, 
  containerIconsFilm: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likeCount: {
    color: 'white',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 3
  },
  infoIcon: {
    marginLeft: 10
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, 
  buttonOn: {
    borderWidth: 2, 
    borderColor: "#C94106", 
    color: "#C94106", 
    backgroundColor: "rgba(201, 65, 6, 0.1)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backdropFilter: "blur(10px)",
    width: 160,
  },
  buttonOff: {
    borderWidth: 2, 
    borderColor: "#969696", 
    color: "#969696", 
    backgroundColor: "rgba( 150, 150, 150, 0.1)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backdropFilter: "blur(10px)",
    width: 160,
  },
  buttonRedirectEvents: {
    justifyContent: 'center',
    alignItems: "center",
  },
  buttonRedirectComments: {
    justifyContent: 'center',
    alignItems: "center",
  }
});