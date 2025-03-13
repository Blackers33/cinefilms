import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user";

function InscriptionScreen1({ handleNext }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const dispatch = useDispatch();
 
	const EMAIL_REGEX =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * HandleSignup
   * - Vérifie l'email en Regex.
   * - Prcède au signup de l'utilisateur.
   * - Si la route renvoie une erreur, l'erreur est affichée et l'utilisateur n'est pas enregistré.
   */
	const handleSignup = () => {
		if (EMAIL_REGEX.test(email)) {
			fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password, email }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.result) {
						console.log('from server ' + data.token)
						dispatch(setUser({token : data.token, username}))
						handleNext();
					} else {
						setEmailError(data.error);
					}
				});
		} else {
			setEmailError("Merci de saisir un adresse email valide.");
		}
	};

	return (
		<View>
			<Text style={styles.titrelogo}>
				Commencer votre inscription sur Cinefilms
			</Text>

			<View>
				<Text style={styles.titreInput}>Nom d'utilisateur</Text>

				<TextInput
					onChangeText={setUsername}
					value={username}
					placeholder="Entrez votre nom d'utilisateur"
				></TextInput>
			</View>
			<View>
				<Text style={styles.titreInput}>Email</Text>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder='Entrez votre email'
					autoCorrect={false}
				></TextInput>
			</View>
			<View>
				<Text style={styles.titreInput}>Mot de passe</Text>
				<TextInput
					onChangeText={setPassword}
					value={password}
					placeholder='Créez votre mot de passe'
					secureTextEntry={true}
					autoCorrect={false}
					textContentType='password'
				></TextInput>
			</View>
			<View style={styles.button}>
				<Button text="C'est parti" onPress={handleSignup} />

				<Text style={styles.text}>{emailError}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	titrelogo: {
		color: "#c94106",
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 85,
		textAlign: "center",
		marginTop: 70,
	},

	titreInput: {
		padding: 12,
		fontSize: 16,
		color: "#C94106",
	},

	text: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
	},
	button: {
		marginTop: 50,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default InscriptionScreen1;
