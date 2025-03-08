import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/common/UserTopSection";
import MainSection from "../components/HomeScreen/MainSection";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import tmdbApiCall from "../components/HomeScreen/tmdbApiCall";
import { useSelector } from "react-redux";


const mockUser = {
	_id: "67ca1d44bfc125477ece24ce",
	username: "Lou",
	password: "$2b$10$nPPlMDeI.NFKkZCh7Bs0e.WYyIVs3rwj6D6i.yCXlIWWXt3T8SDB6",
	email: "Lou@gmail.com",
	token: "_ZpeuBlpvOL6Qd1yLwyg50_GhAxA-cMl",
	friends: [],
	favGenres: ["447277", "812"],
	favMovies: ["Action", "Adventure"],
	__v: 0,
	age: 25,
	avatar:
		"https://image.noelshack.com/fichiers/2015/12/1426650974-quiz-les-personnages-de-tintin-5472.jpeg",
	biography: "je ne suis pas un robot",
	genre: "Homme",
	location: {
		name: "Paris",
		latitude: 48.859,
		longitude: 2.347,
	},
};

export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);
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
	async function handleSearch() {
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
		let updatedNb = movies.length;
		const updatedMovies = await Promise.all(
			//await Promise.all() permet d'attendre que toutes les promesses (les await) soient résolues
			movies.map(async (movie) => {
				try {
					const response = await fetch(
						`${process.env.EXPO_PUBLIC_IP_ADDRESS}/films/${movie.id}/film`
					);
					const data = await response.json();
					movie.likes = data.film.likes;
					movie.comments = data.film.comments;
					movie.isLiked = data.film.likes.includes(user._id);
				} catch (error) {
					updatedNb--;
				}
				return movie;
			})
		);
		return updatedMovies;
	}

	/**
	 * Fonction servant à gérer le like d'un film
	 */

	async function handlePressLike(id) {
		await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/films/${id}/like`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: user.token }),
		})
		const updatedMovies = 	await getLikesAndComments(movies)
		setMovies(updatedMovies)
			

	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			<ImageBackground
				source={require("../assets/backgroundGradient.png")}
				style={{
					flex: 1,
					resizeMode: "cover",
				}}
			>
				<TopSection user={user} />
				<MainSection
					movies={movies}
					search={search}
					setSearch={setSearch}
					setMovies={setMovies}
					loadMovies={loadMovies}
					onSubmitEditing={handleSearch}
					filters={filters}
					setFilters={setFilters}
					navigation={navigation}
					onPressLike={handlePressLike}
				/>
			</ImageBackground>
		</SafeAreaView>
	);
}
