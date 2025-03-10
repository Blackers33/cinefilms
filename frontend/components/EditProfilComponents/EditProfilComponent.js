//@author : Charlie

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions, Modal } from "react-native";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../common/Avatar";
import TextInput from "../common/TextInput";
import avatars from "../common/avatars.json";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import TextInputStyled from "../common/TextInput";


export default function EditProfilComponent(filmInput,
  setFilmInput,) {

const [noResultsFound,setNoResultsFound]=useState(false);

  const user = useSelector((state) => state.user.value);
  console.log(user);

  const dispatch = useDispatch();

  const optionsGenres = [
    { name: "Homme", id: 1 },
    { name: "Femme", id: 2 },
    { name: "Autres", id: 3 },
  ];

  const profile = user? user: {};

  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(profile.avatar || "");
  const [age, setAge] = useState(profile.age ? String(profile.age) : "");
  const [city, setCity] = useState(profile.location || "");
  const [genre, setGenre] = useState(profile.genre || "");
  const [genrefilm, setGenrefilm] = useState(profile.favGenres || "");
  const [recherchefilm, setRecherchefilm] = useState(profile.favMovies || "");
  const [biography, setBiography] = useState(profile.biography || "");

  const handleAvatarSelect = (avatar) => {
    setModalVisible(!modalVisible);
    setAvatar(avatar);
  };

  const handleSelectGenre = (selectedValue) => {
    setGenre(selectedValue.name);
  };

  const listgenrefilms = genrefilm.map((data, i) => {
      const genre = JSON.parse(data);
  
      return (
        <Text key={i} style={{ color: "white" }}>
          <FontAwesome name="caret-right" size={25} color="#ec6e5b" />
          {genre.name}
        </Text>
      );
    });


  return (
    <View style={styles.container}>

      <View style={styles.avatar}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}>
          <Avatar uri={avatar} size={150} />
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Avatar</Text>
            <ScrollView style={styles.scrollContainer}>
              {avatars.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handleAvatarSelect(item.url)}>
                  <Image source={{ uri: item.url }} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome style={styles.iconclose} name="close" size={25} color={"#C94106"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.usernameStyle} >{user.username}</Text>

      <View style={styles.inputContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled' style={styles.scrollViewStyle}>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Age</Text>
            <TextInput value={age} onChangeText={(value) => setAge(value)} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Votre localisation </Text>
            <TextInput value={city} onChangeText={(value) => setCity(value)} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Genre</Text>
            <LinearGradient
                        colors={["#B22E2E", "#333"]}
                        style={styles.gradiant}
                      >
                        <Dropdown
                          style={styles.dropdowngenre}
                          selectedTextStyle={styles.selectedTextStyle}
                          containerStyle={styles.containerStyle}
                          itemTextStyle={styles.itemTextStyle}
                          activeColor="false"
                          maxHeight={300}
                          data={optionsGenres}
                          placeholder={genre}
                          labelField="name"
                          valueField="id"
                          placeholderStyle={{
                            color: "rgba(206, 196, 188, 0.8)",
                            fontSize: 14,
                          }}
                          onChange={handleSelectGenre}
                          value={genre}
                        />
                        </LinearGradient>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Tes films favoris</Text>
           
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Tes genres favoris</Text>
            <LinearGradient
                      colors={["#B22E2E", "#333"]}
                      style={styles.gradiantlistderoulant}
                    >
                    </LinearGradient>
                    <View>{listgenrefilms}</View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Biographie</Text>
            <TextInput value={biography} onChangeText={(value) => setBiography(value)} multiline={true} />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  inputContainer: {
    marginTop: 50,
    paddingRight: 12,
    height: 480,
    alignItems: "flex-start",
    width: "100%"
  },
  champInput: {
    borderWidth: 2,
    borderColor: "#C94106",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
    color: "#FFFFFF",
    width: "100%",
  },
  Input: {
    paddingLeft: 12,
    fontSize: 16,
    color: "#C94106",
    fontWeight: "bold",
  },

  text: {
    color: "white",
    fontSize: 16,
    paddingLeft: 15,
  },

  textContainer: {
    paddingBottom: 20,
    width: Dimensions.get("window").width,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "rgba(146, 140, 135, 0.8)",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#C94106",
  },
  scrollContainer: {
    width: "100%",
    maxHeight: 500,
    flexDirection: "column",
    alignContent: "center",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
    margin: "auto",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",

    marginTop: 10,
  },
  gradiant: {
		borderRadius: 100,
		alignItems: "stretch",
	},
  selectedTextStyle: {
		fontSize: 14,
		color: "white",
	},
  containerStyle:{
    backgroundColor: "black",
    borderRadius: 10,  
  },
  itemTextStyle:{
    color:"#ffffff",
    fontSize:14,
  },
  dropdown: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(29, 29, 29, 0.7)",
    borderRadius: 100,
    borderColor: "#C94106",
    fontSize: 14,
    color: "white",
    borderTopWidth: 2,
  },
  usernameStyle: {

    fontSize: 22,
    color: "#C94106",
    fontWeight: "bold",
  },
});