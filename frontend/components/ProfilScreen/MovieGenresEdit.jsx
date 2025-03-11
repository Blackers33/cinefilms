import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import genres from "../common/genres.json";

export default function MovieGenresEdit({ list, handleSwitch }) {

	return (
		<View style={styles.container}>
			{genres.map((el, index) => (
				<TouchableOpacity onPress={() => handleSwitch(el.id)}>
					<View
						key={index}
						style={list.includes(el.id) ? styles.view : styles.ghostView}
					>
						<Text style={list.includes(el.id) ? styles.text : styles.ghostText}>
							{el.name}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	view: {
		borderWidth: 1,
		padding: 4,
		borderRadius: 100,
		borderColor: "#ddd",
		paddingHorizontal: 15,
	},
	ghostView: {
		borderWidth: 1,
		padding: 4,
		borderRadius: 100,
		borderColor: "#444",
		paddingHorizontal: 15,
	},
	text: {
		color: "#fff",
	},
	ghostText: {
		color: "#555",
	},
});
