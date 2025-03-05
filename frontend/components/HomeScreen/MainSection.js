import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useState } from "react";
import CardSmall from "./CardSmall";
import CardLarge from "./CardLarge";
import TextInput from "../common/TextInput";
import SearchSection from "./SearchSection";
import FiltersSection from "./FiltersSection";

export default function MainSection({
	movies,
	search,
	setSearch,
	setMoviesSearched,
	onSubmitEditing,
	filters,
	setFilters
}) {

	
	const [cardsLarge, setCardsLarge] = useState(false);

	function handlePressIcon() {
		setSearch("");
		setMoviesSearched([]);
		console.log("pressing icon");
	}

	function handleSetSize() {
		setCardsLarge(!cardsLarge);
	}

	return (
		<View>
			<ScrollView keyboardShouldPersistTaps={"handled"}>
				<SearchSection
					search={search}
					setSearch={setSearch}
					onSubmitEditing={onSubmitEditing}
					cardsLarge={cardsLarge}
					handlePressIcon={handlePressIcon}
					handleSetSize={handleSetSize}
				/>
				{search.length === 0 && (
					<FiltersSection filters={filters} setFilters={setFilters} />
				)}
				<View style={styles.cards}>
					{movies.map((movie) =>
						cardsLarge ? (
							<CardLarge movie={movie} key={movie.id} />
						) : (
							<CardSmall movie={movie} key={movie.id} />
						)
					)}
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
