import GradientBackground from "../components/common/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/HomeScreen/TopSection";
import MainSection from "../components/HomeScreen/MainSection";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const mockUser = {
	username: "Dominic Torreto",
	avatar:
		"https://static.thefinancialbrand.com/uploads/2010/12/lloyds_tsb_me_hero.jpg",
	token: "123456789",
};

const mockFilms = [
	{
		tmdbId: 1241982,
		likes: ["123456789", "b", "c", "d"],
		comments: ["a", "b", "c", "d"],
	},
	{
		tmdbId: 1084199,
		likes: ["a", "123456789", "c", "d"],
		comments: ["a", "b", "c", "d"],
	},
	{
		tmdbId: 539972,
		likes: ["a", "b", "c", "d"],
		comments: ["a", "b", "c", "d"],
	},
	{
		tmdbId: 549509,
		likes: ["a", "b", "c", "d"],
		comments: ["a", "b", "c", "d"],
	},
];

export default function HomeScreen({ navigation }) {
	const [movies, setMovies] = useState([]);
	const [moviesSearched, setMoviesSearched] = useState([]);
	const [search, setSearch] = useState("");

	/**
	 * options est un objet contenant les options de la requête à l'API
	 */
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmY4ZDQxNjAyMzFiNjE3YTA2MTU3M2ZhODA4YzlmMCIsIm5iZiI6MTczODc0NDYzMi41ODksInN1YiI6IjY3YTMyMzM4NDRkNjg2M2I3NDhhNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GmSmaJ7gWBY4f7F4QCE_TrHH95nnNwEhrqAxg655Q4",
		},
	};

	/**
	 * moviesToDisplay est un tableau de films à afficher
	 * Si l'utilisateur a effectué une recherche, on affiche les films recherchés
	 * Sinon, on affiche les films populaires
	 *
	 */
	const moviesToDisplay = moviesSearched.length > 0 ? moviesSearched : movies;

	/**
	 * useEffect servant à récupérer les films populaires
	 */
	useEffect(() => {
		const url =
			"https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1";

		fetch(url, options)
			.then((res) => res.json())
			.then((json) => setMovies(json.results))
			.catch((err) => console.error(err));
	}, []);

	/**
	 * Fonction servant à gérer la recherche
	 * 		- Appel à l'API de recherche de films
	 * 		- Mise à jour de l'état moviesSearched
	 */

	function handleSearch() {
		const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`;

		fetch(url, options)
			.then((res) => res.json())
			.then((json) => setMoviesSearched(json.results))
			.catch((err) => console.error(err));
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			<GradientBackground />
			<TopSection user={mockUser} />
			<MainSection
				movies={moviesToDisplay}
				search={search}
				setSearch={setSearch}
				setMoviesSearched={setMoviesSearched}
				onSubmitEditing={handleSearch}
			/>
			<StatusBar style='light' />
		</SafeAreaView>
	);
}
