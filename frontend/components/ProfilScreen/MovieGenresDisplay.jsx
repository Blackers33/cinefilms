import { StyleSheet, Text, View } from "react-native";
import genres from "../common/genres.json";

export default function MovieGenresDisplay({ list }) {
	console.log(genres);
	return (
		<View style={styles.container}>
			{list.map((el, index) => (
				<View key={index} style={styles.view}>
					<Text style={styles.text}>{genres.find((e) => e.id === el).name}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flexDirection :"row",
        flexWrap : "wrap",
        gap: 10
    },
    view: {
        borderWidth:1,
        padding: 4,
        borderRadius: 100,
        borderColor: "#ddd",
        paddingHorizontal: 15
    },
    text : {
        color: "#fff"
    }
})