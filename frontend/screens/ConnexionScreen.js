//@author : Charlie

import ConnexionComponent from "../components/ConnexionComponent/ConnexionComponent";
import { useDispatch } from 'react-redux';
import { setProfilUser } from '../reducers/user';
import {
	StyleSheet,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform,
	View,
	ImageBackground,
	Text,
	ScrollView,
	Dimensions,
} from "react-native";
import { useState } from "react";
import Button from "../components/common/Button";
import ProfilPageComponent from "../components/EditProfilComponents/ProfilPageComponent";


export default function ConnexionScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleConnexion = () => {

		fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/profil/" + data.token)
						.then((response) => response.json())
						.then((profileData) => {
							dispatch(setProfilUser({...profileData.profil, token: data.token}));
							navigation.navigate("TabNavigator");
						});
				} else {
					alert("Email ou mot de passe incorrect");
				}
			});
	};


	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" && "padding"}
		>
			<SafeAreaView>
				<ImageBackground
					source={require("../assets/wallpaper-cinefilm.jpg")}
					style={styles.backgroundImage}
				>	
					<ScrollView
						contentContainerStyle={{ flexGrow: 1 }}
						keyboardShouldPersistTaps='handled'
					>
						<ConnexionComponent
							email={email}
							setEmail={setEmail}
							password={password}
							setPassword={setPassword}
						/>
						<View style={styles.buttonContainer}>
							<Button text='Connexion' onPress={() => handleConnexion()} />
							<Text style={styles.transitionText}>Pas encore inscrit ?</Text>
							<Button
								text='Inscrivez-vous'
								onPress={() => navigation.navigate("Inscription")}
							/>
						</View>
					</ScrollView>
				</ImageBackground>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	backgroundImage: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		justifyContent: "center",
		alignItems: "center",
	},
	transitionText: {
		color: "#c94106",
		fontSize: 20,
		marginTop: 60,
		textAlign: "center",
	},
	buttonContainer: {
		alignItems: "center",
		backgroundColor: "#000000D9",
		paddingBottom: 30,
		width: Dimensions.get("window").width,
	},
});
