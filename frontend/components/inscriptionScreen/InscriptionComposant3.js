import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInputStyled from "../common/TextInput";
import Button from "../common/Button";
import genre from "../common/genres.json";
import tmdbApiCall from "../HomeScreen/tmdbApiCall";

function InscriptionScreen3({
	genrefilm,
	setGenrefilm,
	reseachfilm,
	setReseachfilm,
	favoritefilm,
	setFavoriteFilm,
	biography,
	setBiography,
	filmInput,
	setFilmInput,
	handleinscriptionbuton,
}) {
	const [noResultsFound, setNoResultsFound] = useState(false);

	//function pour recuperer genre de film
	const handleSelectGenre = (genre) => {
		if (!genrefilm.includes(genre.name)) {
			setGenrefilm([...genrefilm, JSON.stringify(genre)]);
		}
	};

	// function pour  appeler api film et trouver le film correspondant
	const handlereseachfilm = async () => {
		if (!filmInput.trim()) return;

		try {
			const uri = `/search/movie?query=${encodeURIComponent(
				filmInput
			)}&language=fr-FR`;
			const results = await tmdbApiCall(uri);

			if (results.length === 0) {
				setNoResultsFound(true);
				return;
			}

			setReseachfilm((prevFilms) => [...prevFilms, results[0]]);
			setFavoriteFilm((prevFavorites) => [...prevFavorites, results[0].id]);
			setNoResultsFound(false);
		} catch (error) {
			console.error("Erreur lors de la recherche du film:", error);
			setNoResultsFound(true);
		}

		setFilmInput("");
	};
	// afficher les posters des films trouvés pour l'utilisateur
	const renderFavoriteFilms = () => {
		return favoritefilm.map((favoriteId) => {
			const favoriteMovie = reseachfilm.find((film) => film.id === favoriteId);
			if (favoriteMovie) {
				return (
					<View key={favoriteMovie.id} style={styles.movieItem}>
						<Image
							source={
								favoriteMovie.poster_path
									? {
											uri:
												"https://image.tmdb.org/t/p/w200" +
												favoriteMovie.poster_path,
									  }
									: require("../../assets/logo/placeholder/poster.png")
							}
							style={styles.poster}
						/>
					</View>
				);
			}
			return null;
		});
	};

	//display les genres des films choisis
	const listgenrefilms = genrefilm.map((data, i) => {
		// Transformer la chaîne JSON en objet
		const genre = JSON.parse(data);

		return (
			<Text key={i} style={{ color: "white" }}>
				<FontAwesome name='caret-right' size={25} color='#ec6e5b' />
				{genre.name}
			</Text>
		);
	});

	return (
		<>
			<View style={styles.genrefilm}>
				<Text style={styles.title}>
					On parle cinéma ! Quel est ton genre ?" 🎥🎭
				</Text>
				<LinearGradient
					colors={["#B22E2E", "#333"]}
					style={styles.gradiantlistderoulant}
				>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={{
							color: "rgba(206, 196, 188, 0.8)",
							fontSize: 14,
							padding: 5,
						}}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						containerStyle={styles.containerStyle}
						itemTextStyle={styles.itemTextStyle}
						data={genre}
						search
						maxHeight={300}
						labelField='name'
						valueField='id'
						placeholder='choissisez votre genre de film'
						searchPlaceholder='recherche...'
						onChange={handleSelectGenre}
						value={genrefilm}
					/>
				</LinearGradient>
				<View>{listgenrefilms}</View>
			</View>

			<Text style={styles.title}>
				Recherchez vos films préférés pour les ajouter à votre profil
			</Text>
			<View style={styles.barfilm}>
				<View style={{ width: "80%" }}>
					<TextInputStyled
						onChangeText={(value) => setFilmInput(value)}
						value={filmInput}
						placeholder='recherche...'
					/>
				</View>
				<TouchableOpacity activeOpacity={0.7}>
					<FontAwesome
						style={styles.iconsearch}
						name='search'
						size={25}
						color='#ec6e5b'
						onPress={handlereseachfilm}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView horizontal={true}>
				<View style={styles.favoriteList}>
					{favoritefilm && renderFavoriteFilms()}
				</View>
			</ScrollView>
			{noResultsFound && (
				<Text style={{ color: "#FFFFFF", textAlign: "center", marginTop: 20 }}>
					Aucun film trouvé pour cette recherche.
				</Text>
			)}

			<Text style={styles.title}>
				Écris ta biographie sur ta passion pour le cinéma
			</Text>
			<TextInput
				style={styles.biographyInput}
				onChangeText={(value) => setBiography(value)}
				value={biography}
				placeholder='à vous de jouer !'
				secureTextEntry={true}
				autoCorrect={false}
				textContentType='text'
				multiline={true}
				numberOfLines={5}
				placeholderTextColor='#8a8a8a'
			></TextInput>
			<View style={styles.button}>
				<Button
					text="Compléter l'inscription"
					onPress={handleinscriptionbuton}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	genrefilm: {
		alignSelf: "auto",
		marginBottom: 5,
	},
	title: {
		color: "#ffffff",
		fontSize: 12,
		marginBottom: 5,
		marginTop: 80,
	},
	reseachbarfilm: {
		marginBottom: 40,
	},
	gradiantlistderoulant: {
		width: "100%",
		height: 40,
		borderRadius: 100,
	},

	dropdown: {
		width: "100%",
		height: 40,
		backgroundColor: "rgba(29, 29, 29, 0.7)",
		borderRadius: 100,
		borderColor: "#C94106",
		fontSize: 14,
		color: "white",
		borderTopWidth: 2,
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 12,
		color: "#FFFFFF",
	},
	selectedTextStyle: {
		fontSize: 12,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	containerStyle: {
		backgroundColor: "rgb(0,0,0)",
		borderRadius: 10,
	},
	itemTextStyle: {
		color: "#ffffff",
		fontSize: 14,
	},
	reseachfilm: {
		height: "auto",
		marginBottom: 20,
		padding: 10,
	},
	barfilm: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},

	text: {
		color: "#ffffff",
		fontSize: 12,
		fontWeight: "bold",
		marginBottom: 15,
	},
	biographyInput: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderColor: "#C94106",
		textAlignVertical: "top",
		backgroundColor: "rgba(29, 29, 29, 0.7)",
		paddingLeft: 10,
		color: "#FFF",
		borderRadius: 10,
		marginTop: 10,
	},
	button: {
		marginTop: 50,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		bottom: 0,
		width: "100%",
	},
	//style pour les resultats du reseachfilm
	favoriteList: {
		flex: 1,
		marginTop: 30,
		height: "auto",
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		gap: 10,
	},
	movieItem: {
		backgroundColor: "#333",
		borderRadius: 5,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		pading: 2,
	},

	poster: {
		width: 80,
		height: 110,
		borderRadius: 5,
	},

	noImage: {
		color: "#aaa",
		fontSize: 14,
		textAlign: "center",
		marginTop: 10,
	},
	noFavoritesContainer: {
		color: "#FFFFFF",
	},
});

export default InscriptionScreen3;
