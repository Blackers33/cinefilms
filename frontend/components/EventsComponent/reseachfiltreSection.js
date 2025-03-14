import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import TextInputStyled from "../common/TextInput";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function reseachsection(props) {
  return (
    <View style={styles.reseachcontainer}>
      <View style={styles.reseachInput}>
        <TextInputStyled
          placeholder="Recherche par ville"
          onChangeText={props.setInputreseach}
          value={props.inputreseach}
        ></TextInputStyled>
      </View>
      <TouchableOpacity onPress={props.handlePressSearchIcon}>
        <View style={styles.button}>
          <Icon name="search-sharp" size={24} color="#bbb" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.handlerefreshIcon}>
        <View style={styles.button}>
        <FontAwesome name="refresh" size={24} color="#bbb" />
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    paddingRight: 20,
  },
  reseachInput: {
    width: "75%",
    height: 40,
  },
});
