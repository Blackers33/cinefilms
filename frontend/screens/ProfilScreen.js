/**
 * @author Charlie
 */

import { useState } from "react";
import { useSelector } from 'react-redux';
import ProfilPageComponent from "../components/EditProfilComponents/ProfilPageComponent";
import EditProfilComponent from "../components/EditProfilComponents/EditProfilComponent";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/common/Button";

export default function ProfilScreen() {

    const user = useSelector((state) => state.user.value);

    const [edit, setEdit] = useState(false);

    const handleEditButton = () => {
       setEdit(true)
    }
    
   const handleConfirmation = () => {
       fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + '/users/profil/' + user.token, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           age: age,
           city: city,
           genre: genre,
           genrefilm: genrefilm,
           recherchefilm: recherchefilm,
           biography: biography,
           avatar: avatar,
         })
       })
         .then(res => res.json())
         .then(data => dispatch(updateprofilUser(data)));
         setEdit(false)
     }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" && "padding"}><ImageBackground
                source={require("../assets/backgroundGradient.png")}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                }}
            >
                <SafeAreaView>
                    {edit ? <EditProfilComponent /> : <ProfilPageComponent />}
                    <View style={styles.editProfilButtonContainer} >
                      {edit? <Button text='Terminer' onPress={handleConfirmation}></Button> : <Button text='Éditer son profil' onPress={handleEditButton}></Button> }
                    </View>

                </SafeAreaView></ImageBackground >
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    editProfilText: {
        color: "white",
        fontSize: 20,
    },
    editProfilButton: {
        width: 180,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#c94106",
        height: 50
    },
    editProfilButtonContainer: {
        marginTop: 10,
        width: 380,
        alignItems: "center",
        marginBottom: 30
    },
})