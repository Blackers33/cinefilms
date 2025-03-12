import React, { memo, useCallback, useRef, useState } from "react";
import { Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export const CitiesDropdown = memo(({ city, setLocation }) => {
	const [loading, setLoading] = useState(false);
	const [suggestionsList, setSuggestionsList] = useState(null);
	const dropdownController = useRef(null);
	const searchRef = useRef(null);
	const getSuggestions = useCallback(async (q) => {
		if (typeof q !== "string" || q.length < 3) {
			setSuggestionsList(null);
			return;
		}
		setLoading(true);
		const response = await fetch(
			`https://api-adresse.data.gouv.fr/search/?q=${q}&type=municipality`
		);
		const items = await response.json();
		const suggestions = items.features?.map((item) => ({
			id: item.properties.id,
			title: item.properties.name,
			name: item.properties.name,
			label: item.properties.label,
			latitude: item.geometry.coordinates[1],
			longitude: item.geometry.coordinates[0],
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
							setLocation({
								name: item.name,
								latitude: item.latitude,
								longitude: item.longitude,
							});
					}}
					debounce={600}
					suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
					onClear={onClearPress}
					//  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
					onOpenSuggestionsList={onOpenSuggestionsList}
					loading={loading}
					useFilter={false} // set false to prevent rerender twice
					textInputProps={{
						placeholder: city,
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

export default CitiesDropdown;
