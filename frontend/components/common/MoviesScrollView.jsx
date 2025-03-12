import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import tmdbApiCall from "../HomeScreen/tmdbApiCall";
import { useEffect, useState } from "react";

const Movie = ({ poster_path }) => {
	return (
		<View style={styles.movieItem}>
			<Image
				source={
					poster_path
						? { uri: "https://image.tmdb.org/t/p/w200" + poster_path }
						: require("../../assets/logo/placeholder/poster.png")
				}
				style={styles.poster}
			/>
		</View>
	);
};

export default function MoviesScrollView({ moviesIds, handleDelete, mode }) {
	const [posters, setPosters] = useState([]);

	/**
	 * setPosters les poster_path à partir des movies Id
	 * @param {Array} moviesIds
	 */
	async function getPosters(moviesIds) {
		const moviesPosters = await Promise.all(
			moviesIds.map(async (movieId) => {
				const response = await tmdbApiCall(`/movie/${movieId}?language=fr-FR`);
				const { poster_path } = response;
				return { movieId, poster_path };
			})
		);

		setPosters(moviesPosters);
	}

	useEffect(() => {
		getPosters(moviesIds);
	}, [moviesIds]);

	if (moviesIds.length === 0) {
		return (
			<Text style={{ color: "#555" }}>
				Aucun film favori à afficher. Ajoutez en un !
			</Text>
		);
	}

	return (
		<ScrollView horizontal={true}>
			<View style={styles.favoriteList}>
				{posters.map((movie, index) => (
					<View key={index} style={styles.movie}>
						<Movie poster_path={movie.poster_path} />
						{mode === "edit" && (
							<TouchableOpacity
								style={styles.button}
								onPress={() => handleDelete(movie.movieId)}
							>
								<Text style={{ color: "#C94106" }}>Suppr</Text>
							</TouchableOpacity>
						)}
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
	favoriteList: {
		flex: 1,
		height: "auto",
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		gap: 10,
		marginBottom: 15,
	},
	movie: { alignItems: "center", gap: 15 },
	button: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		borderColor: "#C94106",
	},
});
