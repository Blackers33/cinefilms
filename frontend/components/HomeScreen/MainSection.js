import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Card from "./Card";
import TextInput from "../common/TextInput";

export default function MainSection({ movies, search, setSearch, setMoviesSearched, onSubmitEditing }) {

    function handlePressIcon() {
        setSearch("")
        setMoviesSearched([])
    }


	return (
		<View>
			<ScrollView>
				<View style={styles.searchSection}>
					<View style={{ flex: 3 }}>
						<TextInput
							value={search}
							onChangeText={setSearch}
							placeholder='search'
							icon={search.length > 0 ? "close" : "search-sharp"}
							onPressIcon={handlePressIcon}
                            onSubmitEditing={onSubmitEditing}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<TextInput placeholder='filters' variant='light' />
					</View>
				</View>
				<View style={styles.cards}>
					{movies.map((movie) => (
						<Card movie={movie} key={movie.id} />
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	searchSection: {
		flexDirection: "row",
		padding: 10,
		gap: 10,
		justifyContent: "space-between",
	},
	cards: {
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
