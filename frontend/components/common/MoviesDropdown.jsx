import React, { memo, useCallback, useRef, useState } from "react";
import { Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export const MoviesDropdown = memo(({ setMovie }) => {
	const [loading, setLoading] = useState(false);
	const [suggestionsList, setSuggestionsList] = useState(null);
	const dropdownController = useRef(null);
	const searchRef = useRef(null);


	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmY4ZDQxNjAyMzFiNjE3YTA2MTU3M2ZhODA4YzlmMCIsIm5iZiI6MTczODc0NDYzMi41ODksInN1YiI6IjY3YTMyMzM4NDRkNjg2M2I3NDhhNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GmSmaJ7gWBY4f7F4QCE_TrHH95nnNwEhrqAxg655Q4",
		},
	};
	const getSuggestions = useCallback(async (q) => {
		if (typeof q !== "string" || q.length < 3) {
			setSuggestionsList(null);
			return;
		}
		setLoading(true);
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${q}&include_adult=false&language=fr-FR&page=1`, options
		);
		const items = await response.json();
		const suggestions = items.results?.map((item) => ({
			id: item.id,
			title: item.title,
			name: item.title,
		}));
		setSuggestionsList(suggestions);
		setLoading(false);
	}, []);

	const onClearPress = useCallback(() => {
		setSuggestionsList(null);
	}, []);

	const onOpenSuggestionsList = useCallback((isOpened) => {}, []);


	return (
		<>
			<View style={Platform.select({ ios: { zIndex: 1 } })}>
				<AutocompleteDropdown
					ref={searchRef}
					controller={(controller) => {
						dropdownController.current = controller;
					}}
					// initialValue={'1'}
					direction={Platform.select({ ios: "down" })}
					dataSet={suggestionsList}
					onChangeText={getSuggestions}
					onSelectItem={(item) => {
						item &&
							setMovie(item.id);
					}}
					debounce={600}
					suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
					onClear={onClearPress}
					//  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
					onOpenSuggestionsList={onOpenSuggestionsList}
					loading={loading}
					useFilter={false} // set false to prevent rerender twice
					textInputProps={{
						placeholder: "Rechercher un film",
						placeholderTextColor:"white",
						autoCorrect: false,
						autoCapitalize: "none",
						style: {
							paddingLeft: 18,
							color: "white",
							
						},
					}}
					rightButtonsContainerStyle={{
						right: 8,
						height: 30,
						alignSelf: "center",

					}}
					inputContainerStyle={{
						backgroundColor: "#333",
					}}
					containerStyle={{
						flexGrow: 1,
						flexShrink: 1,
					}}
					renderItem={(item, text) => (
						<Text style={{ padding: 15 }}>{item.title}</Text>
					)}
					//   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
					//   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
					inputHeight={45}
					showChevron={false}
					closeOnBlur={false}
					//  showClear={false}
				/>
			</View>
		</>
	);
});

export default MoviesDropdown;
