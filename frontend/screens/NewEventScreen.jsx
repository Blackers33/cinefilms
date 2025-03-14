//Création du screen pour créer un nouvel évènement

import {
	KeyboardAvoidingView,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	View,
	Image,
	Text,
	TextInput,
	StatusBar,
	ScrollView,
	Platform,
} from "react-native";
import Inputstyled from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import tmdbApiCall from "../components/HomeScreen/tmdbApiCall";
import { useSelector } from "react-redux";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import MoviesDropdown from "../components/common/MoviesDropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export default function NewEventScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedHeure, setSelecteHeure] = useState(null);
	const [description, setDescription] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState({})

	// formatte Date pour afficher sur input Date
	const formatDateToFrench = (date) => {
		const formattedDate = new Date(date);
		return formattedDate.toLocaleDateString("fr-FR", {
			year: "numeric", // Année
			month: "numeric",
			day: "numeric", // Jour
		});
	};

	//selection la date sur Calendrier
	const handleDateSelect = (day) => {
		const formattedDate = formatDateToFrench(day.dateString);
		setSelectedDate(formattedDate);
		setShowCalendar(false); // Cache le calendrier après sélection
	};

	// ajouter le film et appeler API film pour trouver TmdbId film

	function handleSetMovies(id) {
		setMovieId(id);
	}

  async function getPosterPath(){
    const response = await tmdbApiCall(`/movie/${movieId}?language=fr-FR`);
              const {poster_path, title} = response;
              setMovie({poster_path, title})
  }

  useEffect(()=>{
    if(movieId){
          getPosterPath() 
    }
  }, [movieId])

	// buton creer l'evenement et appeler la route post de l'evenement
	const handleSubmitMessage = () => {
		const [hours, minutes] = selectedHeure.split(":");
		const [day, month, year] = selectedDate.split("/");
		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

		fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/events/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: place,
				description: description,
				title: title,
				user: user.token,
				tmbdId: movieId,
				date: formattedDate,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					console.log(data);
					navigation.navigate("TabNavigator", { screen: "Events" });
				} else {
					console.log("Erreur:", data.message);
				}
			})
			.catch((error) => {
				console.error("Erreur lors de l'envoi de la requête:", error);
			});
	};

	const hanldeAnnulerButton = () => {
		navigation.navigate("TabNavigator", { screen: "Events" });
	};

	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar hidden={true} />
				<ScrollView>
					<KeyboardAvoidingView behavior={Platform.OS === "padding"}>
						<StatusBar barStyle='dark-content' backgroundColor='white' />
						<Text style={styles.title}>Créer votre évènement</Text>
						<View style={styles.container}>
							<View style={styles.infos}>
								<View style={styles.inputBubble}>
									<Inputstyled
										placeholder="Titre de l'évènement"
										placeholderTextColor='white'
										onChangeText={(value) => setTitle(value)}
										value={title}
									></Inputstyled>
								</View>
								<View style={styles.inputBubble}>
									<Inputstyled
										placeholder='Ajouter un lieu'
										placeholderTextColor='white'
										onChangeText={(value) => setPlace(value)}
										value={place}
									></Inputstyled>
								</View>
								<View style={styles.inputBubble}>
									<TouchableOpacity
										onPress={() => setShowCalendar(!showCalendar)}
									>
										<Inputstyled
											placeholder='Sélectionner une date'
											placeholderTextColor='white'
											value={selectedDate}
											editable={false}
											pointerEvents='none'
										/>
									</TouchableOpacity>

									{showCalendar && (
										<Calendar
											style={styles.calendarcontainer}
											onDayPress={handleDateSelect}
											markedDates={{
												[selectedDate]: {
													selected: true,
													selectedColor: "blue",
												},
											}}
											theme={{
												backgroundColor: "black",
												calendarBackground: "black",
												selectedDayTextColor: "white",
												dayTextColor: "white",
												textDisabledColor: "gray",
												dotColor: "white",
												arrowColor: "white",
												monthTextColor: "white",
											}}
										/>
									)}
								</View>
								<View style={styles.inputBubble}>
									<TouchableOpacity
										onPress={() => setShowTimePicker(!showTimePicker)}
									>
										<Inputstyled
											placeholder="Sélectionner l'heure de l'événement"
											placeholderTextColor='white'
											value={selectedHeure}
											editable={false}
											pointerEvents='none'
										/>
									</TouchableOpacity>
									<TouchableOpacity>
										<TimerPickerModal
											visible={showTimePicker}
											setIsVisible={setShowTimePicker}
											onConfirm={(pickedDuration) => {
												// Formater uniquement heure et minute, ignorer les secondes
												const formattedTime = `${String(
													pickedDuration.hours
												).padStart(2, "0")}:${String(
													pickedDuration.minutes
												).padStart(2, "0")}`;
												setSelecteHeure(formattedTime);
												setShowTimePicker(false);
											}}
											modalTitle='Choisir votre heure '
											onCancel={() => setShowTimePicker(false)}
											closeOnOverlayPress
											use24HourPicker
											LinearGradient={LinearGradient}
											styles={{
												theme: "dark",
												pickerLabelContainer: {
													right: -20,
													top: 0,
													bottom: 6,
													width: 40,
													alignItems: "center",
												},
											}}
											confirmButtonText='Confirmer'
											cancelButtonText='Annuler'
											secondsPickerIsDisabled={true}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View>
								<View style={styles.inputBubble}>
									<MoviesDropdown setMovie={(id) => handleSetMovies(id)} />
								</View>
								{movieId && (
									<View style={styles.resultContainer}>
										<Text style={styles.movieTitle}>{movie.title}</Text>
										<Image
											source={{
												uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
											}}
											style={styles.moviePoster}
											resizeMode='contain'
										/>
									</View>
								)}

								{/* Affichage d'un message si aucun film n'est trouvé */}
								{!movieId && (
									<Text style={styles.errorMessage}>Aucun film trouvé</Text>
								)}
								<View style={styles.inputBubble}>
									<TextInput
										style={styles.description}
										placeholder="Description de l'évènement"
										placeholderTextColor='white'
										onChangeText={(value) => setDescription(value)}
										value={description}
										multiline={true}
										numberOfLines={5}
										maxLength={400}
									></TextInput>
								</View>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									text='Créer'
									onPress={() => handleSubmitMessage()}
								></Button>

								{/* Permet de naviguer avec la page 'Events' */}
								<Button
									text='Annuler'
									onPress={() => hanldeAnnulerButton()}
								></Button>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#000000",
	},
	container: {
		backgroundColor: "#000000",
		flexDirection: "column",
		justifyContent: "space-between",
		marginBottom: 50,
	},
	title: {
		fontFamily: "Mulish",
		fontSize: 24,
		color: "#c94106",
		textAlign: "center",
		marginVertical: 10,
		marginTop: 30,
		fontWeight: "bold",
	},


	inputBubble: {
		borderRadius: 20,
		padding: 15,
	},

	calendarcontainer: {
		height: "auto",
	},
	buttonContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},


	description: {
		height: 150, // Vous pouvez ajuster la hauteur selon votre besoin
		width: "100%", // Le champ prendra toute la largeur
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 10,
		backgroundColor: "rgb(30,28,26)",
		borderColor: "rgb(201,65,6)",
		marginBottom: -30,
		paddingTop: 10,
		color: "white",
		fontFamily: "Mulish",
		textAlignVertical: "top",
	},
	resultContainer: {
		marginTop: 5,
		alignItems: "center",
		marginBottom: 10,
	},
	movieTitle: {
		color: "white",
		fontSize: 14,
		fontWeight: "bold",
	},
	moviePoster: {
		width: 200,
		height: 300,
	},
	errorMessage: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
});
