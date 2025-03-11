import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import TextInputStyled from "../common/TextInput";
import Icon from "react-native-vector-icons/Ionicons";

export default function reseachsection(props) {
  return (
    <View style={styles.reseachcontainer}>
      <View style={styles.reseachInput}>
        <TextInputStyled
          placeholder="Rechercher un film ou un utilisateur"
          onChangeText={props.setInputreseach}
          value={props.inputreseach}
        ></TextInputStyled>
      </View>
      <TouchableOpacity onPress={props.handlePressSearchIcon}>
        <View style={styles.button}>
          <Icon name="search-sharp" size={24} color="#bbb" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputrseach: {
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
  },
  reseachcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    paddingRight: 20,
  },
  reseachInput: {
    width: "65%",
    height: 40,
  },
});
