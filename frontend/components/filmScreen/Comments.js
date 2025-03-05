import { StyleSheet, View, TextInput, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Avatar from '../common/Avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Send from 'react-native-vector-icons/Feather'

export default function Comments({ navigation }) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerComments}>
        <View style={styles.commentContainer}>
          <View style={styles.commentInfo}>
            <Avatar style={styles.avatar} />
            <Text style={styles.username}>Username</Text>
          </View>
          <Text style={styles.content}>Contenu</Text>
          <Text style={styles.time}>il y a 5 min</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Ajouter un commentaire..."
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.addFilterButton} activeOpacity={0.8}>
                    <Send name='send' size={30} color={'#C94106'} />
                </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: `Platform.OS === 'ios' ? 30 : 0,` 
  },

  commentInfo: {
    flexDirection: 'row',
    justifyContent: 'start',
    padding: 0,
    margin: 0,
  },
  containerComments: {
    flex: 1,
    backgroundColor: 'rgb(30.28.26)',
  },
  commentContainer: {
    padding: 5,
    backgroundColor: 'rgb(30.28.26)',
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
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
    marginLeft: 10,
  },
  content: {
    fontFamily: 'Mulish',
    fontSize: 18,
    color: 'white',
  },
  time: {
    color : 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgb(30.28.26)',
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