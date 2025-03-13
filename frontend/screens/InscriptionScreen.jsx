import { BackHandler, StyleSheet, View } from "react-native";
import InscriptionScreen1 from "../components/inscriptionScreen/InscriptionComposant1";
import InscriptionScreen2 from "../components/inscriptionScreen/InscriptionComposant2";
import InscriptionScreen3 from "../components/inscriptionScreen/InscriptionComposant3";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/user";

export default function InscriptionScreen({ navigation, route }) {
	const [age, setAge] = useState("");
	const [location, setLocation] = useState("");
	const [genre, setGenre] = useState("");
	const [biography, setBiography] = useState("");
	const [avatar, setAvatar] = useState(""); //pour afficher l'avatar
	const [favGenres, setFavGenres] = useState([]);
	const [favMovies, setFavMovies] = useState([]);
	const [currentStep, setCurrentStep] = useState(Number(route.params.step)); //pour afficher les étapes de l'inscription
	const dispatch = useDispatch(); //pour envoyer les données de l'utilisateur
	const user = useSelector((state) => state.user.value); //pour récupérer les données de l'utilisateur

	/**
	 * Custom navigation
	 * Gestion du bouton Retour pour revenir à la step précédente et non au menu Connexion
	 */
	useEffect(() => {
		const handleBackPress = () => {
			if (currentStep > 1) {
				setCurrentStep(currentStep - 1);
				return true; // Empêche la sortie de l'app
			}
			return false; // Permet de revenir à l'écran précédent si step === 1
		};

		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackPress
		);

		return () => subscription.remove();
	}, [currentStep]);

	/**
	 * Custom navigation
	 * Permet de passer à l'étape suivante
	 */
	function handleNext() {
		setCurrentStep(currentStep + 1);
	}

	/**
	 * Fonction qui gère l'inscription finale de l'utilisateur
	 */

	async function handleProfileSetup() {
		const response = await fetch(
			process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/profil/" + user.token,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					age,
					location,
					genre,
					biography,
					avatar,
					favGenres,
					favMovies,
				}),
			}
		);
		const data = await response.json();
		console.log(data);
		if (data.result) {
			dispatch(setUser({...data.profil}));
			navigation.navigate("TabNavigator");
		} else {
			alert(data.message);
		}
	}

	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView style={styles.container}>
				{currentStep === 1 && (
					<View>
						<InscriptionScreen1 handleNext={handleNext} />
					</View>
				)}
				{currentStep === 2 && (
					<InscriptionScreen2
						handleNext={handleNext}
						age={age}
						setAge={setAge}
						location={location}
						setLocation={setLocation}
						genre={genre}
						setGenre={setGenre}
						avatar={avatar}
						setAvatar={setAvatar}
					/>
				)}
				{currentStep === 3 && (
					<InscriptionScreen3
						handleProfileSetup={handleProfileSetup}
						favGenres={favGenres}
						setFavGenres={setFavGenres}
						biography={biography}
						setBiography={setBiography}
						favMovies={favMovies}
						setFavMovies={setFavMovies}
					/>
				)}
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1E1C1A",
		padding: 10,
	},
});
