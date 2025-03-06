import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/common/UserTopSection";
import MainSection from "../components/HomeScreen/MainSection";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import tmdbApiCall from "../components/HomeScreen/tmdbApiCall";
import { useSelector } from "react-redux";

const mockUser = {
	username: "Dominic Torreto",
	avatar:
		"https://static.thefinancialbrand.com/uploads/2010/12/lloyds_tsb_me_hero.jpg",
	token: "123456789",
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

		const movies = await tmdbApiCall(url);

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
		const searchedMovies = await tmdbApiCall(
			`/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`
		);
		setMovies(searchedMovies);
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
				<TopSection user={mockUser} />
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
				/>
			</ImageBackground>
		</SafeAreaView>
	);
}
