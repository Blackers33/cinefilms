import { StyleSheet, Text, View } from "react-native";
import genres from "./genres.json";
/**
 * 
 * prend en paramètre un tableau d'Ids de genres. exemple : [53,10770,878]
 * usage : <MovieGenresDisplay list={array}/>
 * retourne une vue cool
 * 
 */
export default function MovieGenresDisplay({ list }) {
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