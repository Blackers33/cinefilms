import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import avatars from "../common/avatars.json";
import Avatar from "../common/Avatar";


function InscriptionScreen2({
  handleNext,
  age,
  setAge,
  city,
  setCity,
  genre,
  setGenre,
  ModalVisible,
  SetmodalVisible,
  avatar,
  setAvatar,
}) {
 
  const optionsGenres = [
    { name: "Homme", id: 1 },
    { name: "Femme", id: 2 },
    { name: "Autres", id: 3 },
  ];

  const handleSelectGenre = (selectedValue) => {
    setGenre(selectedValue.name); // Mettre à jour l'état avec la valeur sélectionnée
  };

  const handleAvatarSelect = (avatar) => {
    //choisir l'image avatar
    SetmodalVisible(!ModalVisible);
    setAvatar(avatar);
  };

  return (
    <View>
      <View style={styles.avatar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => SetmodalVisible(!ModalVisible)}
        >
          <Avatar uri={avatar} size={150} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          SetmodalVisible(!ModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Avatar</Text>
            <ScrollView style={styles.scrollContainer}>
              {avatars.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleAvatarSelect(item.url)}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={styles.avatarImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => SetmodalVisible(!ModalVisible)}
              >
                <FontAwesome
                  style={styles.iconclose}
                  name="check-square"
                  size={25}
                  color={"#C94106"}
                ></FontAwesome>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => SetmodalVisible(!ModalVisible)}
              >
                <FontAwesome
                  style={styles.iconclose}
                  name="close"
                  size={25}
                  color={"#C94106"}
                ></FontAwesome>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.avatarinstructiontext}>
        Cliquer pour choisir votre avatar
      </Text>
      <View>
        <View>
          <Text style={styles.Input}>Age</Text>

          <TextInput
            onChangeText={setAge}
            value={age}
            placeholder="Entrez votre âge"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Votre localisation </Text>

          <TextInput
            onChangeText={setCity}
            value={city}
            placeholder="Entez où vous situez"
          ></TextInput>
        </View>
        <View>
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
              labelField="name"
              valueField="id"
              placeholder="Cliquer et choisir 😉"
              placeholderStyle={{
                color: "rgba(206, 196, 188, 0.8)",
                fontSize: 14,
              }}
              onChange={handleSelectGenre}
              value={genre}
            />
          </LinearGradient>
        </View>
        <View style={styles.button}>
          <Button text="Scène suivante🎬" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
    marginLeft: 20,
  },
  iconplus: {
    alignSelf: "center",
    marginTop: 10,
  },

  Input: {
    padding: 12,
    fontSize: 16,
    color: "#C94106",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C94106",
  },
  avatarinstructiontext: {
    color: "#c94106",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
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
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#C94106",
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
    justifyContent: "space-between",
    width: "100%",

    marginTop: 10,
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdowngenre: {
    height: 40,
    width: 300,
    opacity: 0.7,
    borderRadius: 100,
    padding: 12,
    backgroundColor: "rgba(29, 29, 29,0.9)",
    borderColor: "#C94106",
    borderTopWidth: 1,
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
  }
});

export default InscriptionScreen2;
