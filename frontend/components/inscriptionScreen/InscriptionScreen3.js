import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function InscriptionScreen3() {
  const [genrefilm, setGenrefilm] = useState([]);
  const [recherchefilm, setRecherchefilm] = useState("");

  const movieGenres = [
    //data des movieGenres
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Animation" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Crime" },
    { id: 6, name: "Drama" },
    { id: 7, name: "Fantasy" },
    { id: 8, name: "Horror" },
    { id: 9, name: "Mystery" },
    { id: 10, name: "Romance" },
    { id: 11, name: "Science Fiction" },
    { id: 12, name: "Thriller" },
    { id: 13, name: "Western" },
    { id: 14, name: "Documentary" },
    { id: 15, name: "Musical" },
    { id: 16, name: "War" },
    { id: 17, name: "Family" },
    { id: 18, name: "History" },
    { id: 19, name: "Sport" },
    { id: 20, name: "Biography" },
  ];

  const handleSelectGenre = (genre) => {
    if (!genrefilm.includes(genre.name)) {
      setGenrefilm([...genrefilm, genre.name]);
    } 
  };

  const listgenrefilms = genrefilm.map((data, i) => {
    // afficher les genres de films choisi par l'utlisateur
    return (
      <Text key={i} style={{ color: "white" }}>
        <FontAwesome name="caret-right" size={25} color="#ec6e5b" />
        {data}
      </Text>
    );
  });

  return (
    <View style={styles.text}>
      <Text style={styles.title}>Select your favorite movie genres.</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={movieGenres}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select a genre"
        searchPlaceholder="search..."
        onChange={(item) => handleSelectGenre(item)}
        value={genrefilm}
      />
      {listgenrefilms}
      <View>
        <Text style={styles.title}>
          Search for your favorite movie to add your profil
        </Text>
        <TextInput
          style={styles.reseachbarfilm}
          onChangeText={(value) => setRecherchefilm(value)}
          value={recherchefilm}
          placeholder="Search..."
        ></TextInput>
        <FontAwesome
          style={styles.icon}
          name="search"
          size={25}
          color="#ec6e5b"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.bouton}
      >
        <Text style={styles.text}>Complete your registration </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#ffffff",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: "#C94106",
    backgroundColor: "#bcbcbc",
    borderWidth: 1.5,
    borderRadius: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  reseachbarfilm: {
    width: "95%",
    height: 50,
    backgroundColor: "#bcbcbc",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#C94106",
    fontSize: 12,
    color: "white",
    marginVertical: 10,
    paddingLeft: 40,
  },
  icon: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: [{ translateY: -7.5 }],
  },
  bouton: {
    backgroundColor: "#C94106",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InscriptionScreen3;
