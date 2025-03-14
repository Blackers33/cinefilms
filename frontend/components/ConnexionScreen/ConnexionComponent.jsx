//@author : Charlie

import TextInput from "../common/TextInput";
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
} from "react-native";
import { useState } from "react";

function connexionScreen({ email, setEmail, password, setPassword }) {
	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/logo/cinefilm_red_text_top.png")}
				style={{
					width: 150,
					height: 150,
					marginTop: 30,
					resizeMode: "contain"
				}}
			/>
			<Text style={styles.titrelogo}>Bienvenue !</Text>
			<Text style={styles.titrecontenu}>
				Retrouve les meilleurs films, événements et échanges entre passionnés
				de cinéma. Rejoins la communauté et vis ta passion à fond !
			</Text>
			<View style={styles.inputContainer}>
				<View style={{ marginLeft: 20, marginRight: 20 }}>
					<Text style={styles.Input}>Email</Text>
					<TextInput
						onChangeText={setEmail}
						value={email}
						placeholder='Entre ton email'
						keyboardType='email-address'
					></TextInput>
				</View>
				<View style={{ marginLeft: 20, marginRight: 20 }}>
					<Text style={styles.Input}>Password</Text>
					<TextInput
						onChangeText={setPassword}
						value={password}
						placeholder='Entre ton mot de passe'
						secureTextEntry={true}
					></TextInput>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		width: 380,
		marginTop: 20,
	},
	Input: {
		padding: 12,
		fontSize: 16,
		color: "white",
		paddingLeft: 30,
	},
	titrelogo: {
		color: "#c94106",
		fontSize: 35,
		padding: 10,
		textAlign: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#000000D9",
		alignItems: "center",
		justifyContent: "center",
		width: Dimensions.get("window").width,
	},
	titrecontenu: {
		color: "#c94106",
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: "center",
	},
});

export default connexionScreen;
