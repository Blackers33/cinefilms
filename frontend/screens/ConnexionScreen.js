import ConnexionComponent from "../components/ConnexionComponent/ConnexionComponent";
import EditProfilComponent from "../components/EditProfilComponents/EditProfilComponent1";

import {
	StyleSheet,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform,
	View,
	ImageBackground,
	Text,
	ScrollView,
} from "react-native";
import { useState } from "react";
import Button from "../components/common/Button";

export default function ConnexionScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
				console.log(data);
				if (data.result) {
					navigation.navigate("TabNavigator", { token: data.token });
				} else {
					alert("Email ou mot de passe incorrect");
				}
			});
	};

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			keyboardShouldPersistTaps='handled'
		>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "padding"}
			>
				<SafeAreaView>
					<ImageBackground
						source={require("../assets/wallpaper-cinefilm.jpg")}
						style={styles.backgroundImage}
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
					</ImageBackground>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#1E1C1A",
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
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
		width: 380,
		alignItems: "center",
		backgroundColor: "#000000D9",
		paddingBottom: 30,
	},
});
