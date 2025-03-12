import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import CardSmall from "./CardSmall";
import CardLarge from "./CardLarge";
import SearchSection from "./SearchSection";
import FiltersSection from "./FiltersSection";
import tmdbApiCall from "../../components/HomeScreen/tmdbApiCall";

export default function MainSection({ navigation, user }) {
	const [cardsLarge, setCardsLarge] = useState(false);
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");

	/**
	 * Filtres de recherche qui seront passés à l'URL de l'API TMDB dans la fonction loadMovies
	 * sort_by et with_genres sont vides par défaut,
	 * ils seront remplis par les filtres dans le composant FiltersSection
	 */
	const [filters, setFilters] = useState({
		include_adult: false,
		include_video: false,
		language: "fr-FR",
		page: 1,
		sort_by: "",
		with_genres: "",
	});

	/**
	 * Fonction servant à récupérer les films sur l'API TMDB et les mettre dans l'état movies
	 */
	async function loadMovies() {
		//construction de la string de paramètres
		const params = new URLSearchParams(filters).toString();
		const url = "/discover/movie?" + params;

		let movies = await tmdbApiCall(url);

		movies = await getLikesAndComments(movies);
		setMovies(movies);
	}

	/**
	 * useEffect permettant de charger les films populaires à l'ouverture de la page
	 */
	useEffect(() => {
		loadMovies();
	}, [filters]);

	/**
	 * Fonction servant à gérer la recherche
	 * 		- Appel à l'API de recherche de films
	 * 		- Mise à jour de l'état movies
	 */
	async function onSubmitSearch() {
		let searchedMovies = await tmdbApiCall(
			`/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`
		);
		searchedMovies = await getLikesAndComments(searchedMovies);
		setMovies(searchedMovies);
	}

	/**
	 * Fonction servant à ajouter les likes et commentaires aux films
	 */
	async function getLikesAndComments(movies) {
		const updatedMovies = await Promise.all(
			//await Promise.all() permet d'attendre que toutes les promesses (les await) soient résolues
			movies.map(async (movie) => {
				const response = await fetch(
					`${process.env.EXPO_PUBLIC_IP_ADDRESS}/films/${movie.id}/${user.token}/film`
				);
				const data = await response.json();
				if (data.result) {
					movie.likes = data.likes;
					movie.comments = data.comments;
					movie.isLiked = data.isLiked;
				}
				// console.log(movie);

				return movie;
			})
		);
		return updatedMovies;
	}

	/**
	 * Fonction servant à gérer le like d'un film
	 */

	async function onPressLike(id) {
		await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/films/${id}/like`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: user.token }),
		});
		const updatedMovies = await getLikesAndComments(movies);
		setMovies(updatedMovies);
	}

	function handlePressSearchIcon() {
		if (search.length > 0) {
			setSearch("");
			setMovies([]);
			loadMovies();
		}
	}

	function toggleCardSize() {
		setCardsLarge(!cardsLarge);
	}

	return (
		<View>
			<ScrollView keyboardShouldPersistTaps={"handled"}>
				<SearchSection
					search={search}
					setSearch={setSearch}
					onSubmitSearch={onSubmitSearch}
					cardsLarge={cardsLarge}
					handlePressSearchIcon={handlePressSearchIcon}
					toggleCardSize={toggleCardSize}
				/>
				{search.length === 0 && (
					<FiltersSection filters={filters} setFilters={setFilters} />
				)}
				<View style={styles.cards}>
					{movies.map((movie) => {
						const commonProps = {
							movie,
							onPressLike,
							onPress: () => navigation.navigate("Film", movie),
						};

						return cardsLarge ? (
							<CardLarge {...commonProps} key={movie.id} />
						) : (
							<CardSmall {...commonProps} key={movie.id} />
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	cards: {
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 200,
	},
});
