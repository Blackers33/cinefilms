import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextInputStyled from "../common/TextInput";
import Icon from "react-native-vector-icons/Ionicons";


export default function SearchSection({search, setSearch, onSubmitEditing, cardsLarge, handlePressSearchIcon, handleSetSize}) {
	return (
		<View style={styles.searchSection}>
			<View style={{ flex: 5 }}>
				<TextInputStyled
					value={search}
					onChangeText={setSearch}
					placeholder='search'
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handlePressSearchIcon}>
					<View style={styles.button}>
						<Icon
							name={search.length > 0 ? "close" : "search-sharp"}
							size={24}
							color='#bbb'
						/>
					</View>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleSetSize}>
					<View style={styles.button}>
						<Icon
							name={cardsLarge ? "tablet-portrait-outline" : "grid-outline"}
							size={24}
							color='#bbb'
						/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: "row",
        padding: 10,
        gap: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 100,
    },
});

