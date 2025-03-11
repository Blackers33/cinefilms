import { Image, ScrollView, StyleSheet, View } from "react-native";
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

export default function MoviesScrollView({ moviesIds }) {

	const [posters, setPosters] = useState([])

	/**
	 * setPosters les poster_path à partir des movies Id
	 * @param {Array} moviesIds 
	 */
	async function getPosters(moviesIds) {
		const moviesPosters = await Promise.all(
			moviesIds.map(async (movie) => {
				const response = await tmdbApiCall(`/movie/${movie}?language=fr-FR`);
				return response.poster_path;
			})
		);

		setPosters(moviesPosters);
	}

	useEffect(()=>{
		getPosters(moviesIds);
	},[])

	return (
		<ScrollView horizontal={true}>
			<View style={styles.favoriteList}>
				{posters.map((poster_path, index) => (
					<Movie poster_path={poster_path} key={index}/>
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
});
