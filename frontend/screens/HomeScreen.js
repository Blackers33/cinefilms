<<<<<<< HEAD
import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/HomeScreen/TopSection";
import MainSection from "../components/HomeScreen/MainSection";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import tmdbApiCall from "../components/HomeScreen/tmdbApiCall";

const mockUser = {
	username: "Dominic Torreto",
	avatar:
		"https://static.thefinancialbrand.com/uploads/2010/12/lloyds_tsb_me_hero.jpg",
	token: "123456789",
};

const mockFilms = [
	{
		tmdbId: 1241982,
		likes: ["123456789", "T", "d"],
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
	const [filters, setFilters] = useState({
		sort: null,
		genres: null,
	});

	console.log(filters)

	/**
	 * moviesToDisplay est un tableau de films à afficher
	 * Si l'utilisateur a effectué une recherche, on affiche les films recherchés
	 * Sinon, on affiche les films populaires
	 *
	 */
	const moviesToDisplay = moviesSearched.length > 0 ? moviesSearched : movies;

	/**
	 * Injection des likes et commentaires dans les films
	 *  TODO à changer pour une requete au backend
	 */
	moviesToDisplay.forEach((movie) => {
		const film = mockFilms.find((film) => film.tmdbId === movie.id);
		if (film) {
			movie.likes = film.likes;
			movie.comments = film.comments;
			if (movie.likes.includes(mockUser.token)) {
				movie.liked = true;
			}
		}
	});

	/**
	 * useEffect servant à récupérer les films populaires
	 */
	useEffect(() => {
		const url = `/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1${
			filters.genres && `&with_genres=${filters.genres}`
		}&sort_by=${filters.sort}`;

		console.log(url)

		async function loadMovies() {
			const movies = await tmdbApiCall(url);
			setMovies(movies);
		}
		loadMovies();
	}, [filters]);

	/**
	 * Fonction servant à gérer la recherche
	 * 		- Appel à l'API de recherche de films
	 * 		- Mise à jour de l'état moviesSearched
	 */
	async function handleSearch() {
		const searchedMovies = await tmdbApiCall(
			`/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`
		);
		setMoviesSearched(searchedMovies);
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
					movies={moviesToDisplay}
					search={search}
					setSearch={setSearch}
					setMoviesSearched={setMoviesSearched}
					onSubmitEditing={handleSearch}
					filters={filters}
					setFilters={setFilters}
				/>
			</ImageBackground>
		</SafeAreaView>
	);
}
=======
import React from 'react';
import { Button, StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
   
 return (
   <SafeAreaView > 
    <TouchableOpacity onPress={() => navigation.navigate('Film')}>
        <Text>Go to FilmScreen</Text>
    </TouchableOpacity>
   </SafeAreaView>
 );
}
>>>>>>> filmScreen
