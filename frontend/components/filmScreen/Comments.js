import { StyleSheet, View, TextInput, Text, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Avatar from '../common/Avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Send from 'react-native-vector-icons/Feather'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function Comments({ filmId, allComments, refresh }) {
  const user = useSelector((state) => state.user.value);
  const [comment, setComment] = useState({});
  /**
  * Requête permettant d'jouter un commentaire après que l'utilisateur a cliqué sur le bouton 'Envoyer'
  * Informations requises :
  * Token de l'utilisateur (authentification)
  * Contenu du commentair
  */
  const handleSubmitMessage = () => {
    //Créer un nouveau commentaire avec userId & contenu du commentaire
    const newComment = {
      user: 'aIXUWwSgQ2b4ifIPhk8F8r5wJSPJYuJk',   //user.token
      content: comment,
    }
    
    fetch(`${BACKEND_ADDRESS}/films/${filmId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // `refresh` est une fonction qui met `refreshData` à `true`, déclenchant ainsi l'exécution du `useEffect` pour rafraîchir les données
        //  En mettant à jour l'état `allComments` apres l'ajout d'un commentaire. 
        refresh();
        setComment('');
      }
    });
  }
  //Afficher tout les commentaires
  const comments = allComments?.map((data, i) => {
    const date = formatDistanceToNow(data.date, {
      addSuffix: true, 
      includeSeconds: true,
      locale: fr,
    });
    return (
      <View key={i} style={styles.commentContainer}>
      <View style={styles.commentInfo}>
        <Avatar uri={data?.avatar} style={styles.avatar} />
        <Text style={styles.username}>{data.username}</Text>
      </View>
      <Text style={styles.content}>{data.content}</Text>
      <Text style={styles.time}>{date}</Text>
    </View>
    )  
  });
  return (
    <KeyboardAvoidingView enabled={true} behavior='padding' style={styles.flexStyle}>
      <View style={styles.commentsContainer}>
      <ScrollView style={styles.containerComments}>
        {comments}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Ajouter un commentaire..."
          placeholderTextColor="black"
          onChangeText={(value) => setComment(value)}
          value={comment}
          keyboardType='web-search'
        />
        <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.addFilterButton} activeOpacity={0.8}>
          <Send name='send' size={30} color={'#C94106'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    height: '85%'
  },
  commentInfo: {
    flexDirection: 'row',
    justifyContent: 'start',
    padding: 0,
    margin: 0,
  },
  containerComments: {
    flex: 1
  },
  commentContainer: {
    padding: 5,
    backgroundColor: 'rgba(77, 77, 77, 0.2)',
    opacity: 1,
    borderRadius: 10,
    margin: 10,

  },
  avatar: {
    marginBottom: 10,
    marginRight: 10,
    paddingLeft : 0,
  },
  username: {
    fontFamily: 'Mulish',
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    marginLeft: 10,
  },
  content: {
    fontFamily: 'Mulish',
    fontSize: 17,
    color: 'white',
  },
  time: {
    color : 'white',
    fontWeight: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white', 
  },


});
