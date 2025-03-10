import { ScrollView, StyleSheet, View } from "react-native";
import { use, useState } from "react";
import CardSmall from "./CardSmall";
import CardLarge from "./CardLarge";
import SearchSection from "./SearchSection";
import FiltersSection from "./FiltersSection";

export default function MainSection({
	movies,
	search,
	setSearch,
	setMovies,
	loadMovies,
	onSubmitEditing,
	filters,
	setFilters,
	navigation,
	onPressLike,
}) {
	const [cardsLarge, setCardsLarge] = useState(false);

	function handlePressSearchIcon() {
		if (search.length > 0) {
			setSearch("");
			setMovies([]);
			loadMovies();
		}
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
					handlePressSearchIcon={handlePressSearchIcon}
					handleSetSize={handleSetSize}
				/>
				{search.length === 0 && (
					<FiltersSection filters={filters} setFilters={setFilters} />
				)}
				<View style={styles.cards}>
					{movies.map((movie) => {
						const commonProps = {
							movie,
							onPressLike,
							
							onPress: () => navigation.navigate("FilmScreen", movie),
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
