import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";
import Button from "../common/Button";
import MoviesDropdown from "../common/MoviesDropdown";
import MoviesScrollView from "../common/MoviesScrollView";
import MovieGenresEdit from "../ProfilScreen/MovieGenresEdit";

function InscriptionScreen3({
	favGenres,
	setFavGenres,
	favMovies,
	setFavMovies,
	biography,
	setBiography,
	handleProfileSetup,
}) {
	function handleSetGenres(id) {
		setFavGenres((prev) => {
			if (prev.includes(id)) {
				return prev.filter((genre) => genre !== id);
			} else {
				return [...prev, id];
			}
		});
	}
	function handleSetMovies(id) {
		setFavMovies((prev) => {
			if (prev.includes(id)) {
				return prev.filter((idInArray) => idInArray !== id);
			} else {
				return [...prev, id];
			}
		});
	}

	return (
		
			<ScrollView>
				<Text style={styles.text}>
					On parle cinéma ! Quels sont tes genres préférés ? 🎥 🎭
				</Text>
				<MovieGenresEdit list={favGenres} handleSwitch={handleSetGenres} />
	
				<Text style={styles.text}>
					Recherche tes films préférés pour les ajouter à ton profil
				</Text>
				<MoviesDropdown setMovie={(id) => handleSetMovies(id)} />
				<MoviesScrollView
					moviesIds={favMovies}
					mode='edit'
					handleDelete={(id) => handleSetMovies(id)}
				/>
	
				<Text style={styles.text}>
					Écris ta biographie sur ta passion pour le cinéma
				</Text>
				<TextInput
					style={styles.biographyInput}
					onChangeText={(value) => setBiography(value)}
					value={biography}
					placeholder='à vous de jouer !'
					autoCorrect={true}
					textContentType='text'
					multiline={true}
					numberOfLines={5}
					placeholderTextColor='#8a8a8a'
				></TextInput>
				<View style={styles.button}>
					<Button text="Compléter l'inscription" onPress={handleProfileSetup} />
				</View>
			</ScrollView>
		
	);
}

const styles = StyleSheet.create({
	text: {
		padding: 12,
		fontSize: 16,
		color: "#C94106",
		marginTop: 10
	},

	biographyInput: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderColor: "#C94106",
		textAlignVertical: "top",
		backgroundColor: "#333",
		paddingLeft: 10,
		color: "#FFF",
		borderRadius: 10,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default InscriptionScreen3;
