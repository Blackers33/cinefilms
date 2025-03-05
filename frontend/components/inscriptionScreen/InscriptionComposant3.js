import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInputStyled from "../common/TextInput";
import Button from "../common/Button";
import genre from "../common/genres.json";

function InscriptionScreen3({
  genrefilm,
  setGenrefilm,
  recherchefilm,
  setRecherchefilm,
  biography,
  setBiography,
  filmInput,
  setFilmInput,
  handleinscriptionbuton,
}) {


  const handleSelectGenre = (genre) => {
    if (!genrefilm.includes(genre.name)) {
      setGenrefilm([...genrefilm, JSON.stringify(genre)]);
    }
  };

  const handlereseachfilm = () => {
    setRecherchefilm([...recherchefilm, filmInput]);
    setFilmInput("");
  };

  const listgenrefilms = genrefilm.map((data, i) => {
    // Transformer la chaîne JSON en objet
    const genre = JSON.parse(data);
  
    return (
      <Text key={i} style={{ color: "white" }}>
        <FontAwesome name="caret-right" size={25} color="#ec6e5b" />
        {genre.name}
      </Text>
    );
  });

  const listefilms = recherchefilm.map((data, i) => {
    //afficher les films recherché par l'utilisateur
    return (
      <Text key={i} style={{ color: "white", flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="caret-right" size={25} color="#ec6e5b" style={{ marginRight: 8 }} />
        {data}
      </Text>
    );
  });

  return (
    <>
      <View style={styles.genrefilm}>
        <Text style={styles.title}>
          On parle cinéma ! Quel est ton genre ?" 🎥🎭
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genre}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="choissisez votre genre de film"
          searchPlaceholder="recherche..."
          onChange={handleSelectGenre}
          value={genrefilm}
        />
        <View>
        {listgenrefilms}
        </View>
      </View>
      <View style={styles.reseachfilm}>
        <Text style={styles.title}>
          Recherchez vos films préférés pour les ajouter à votre profil
        </Text>
        <View style={styles.barfilm}>
          <TextInputStyled
            onChangeText={(value) => setFilmInput(value)}
            value={filmInput}
            placeholder="recherche..."
          ></TextInputStyled>
          <TouchableOpacity activeOpacity={0.8} onPress={handlereseachfilm}>
            <FontAwesome
              style={styles.iconsearch}
              name="search"
              size={25}
              color="#ec6e5b"
            />
          </TouchableOpacity>
        </View>
        {listefilms}
      </View>

      <Text style={styles.title}>
        Écris ta biographie sur ta passion pour le cinéma
      </Text>
      <TextInput
        style={styles.biographyInput}
        onChangeText={(value) => setBiography(value)}
        value={biography}
        placeholder="à vous de jouer !"
        secureTextEntry={true}
        autoCorrect={false}
        textContentType="text"
        multiline={true}
        numberOfLines={5}
      ></TextInput>
      <View style={styles.button}>
        <Button
          text="Compléter l'inscription"
          onPress={handleinscriptionbuton}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  genrefilm: {
    alignSelf: "auto",
    marginBottom: 5,
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 5,
  },
  reseachbarfilm: {
    marginBottom: 40,
  },
  dropdown: {
    margin: 10,
    height: 40,
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
  reseachfilm: {
    marginBottom: 15,
  },
  iconsearch: {
    position: "absolute",
    top: 10,
    right: 10,
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

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  biographyInput: {
    height: 95,
    width: "95%",
    borderWidth: 1,
    borderColor: "#C94106",
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
    color: "#000000",
    marginBottom: 20,
  },
  button: {
    marginTop: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
});

export default InscriptionScreen3;
