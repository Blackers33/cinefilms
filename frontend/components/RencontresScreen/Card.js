import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import Avatar from "../common/Avatar";

export default function Card({ user }) {
	const Movie = ({data}) => {
		return (
			<View key={data.id} style={styles.movieItem}>
				<Image
					source={{
						uri: `https://image.tmdb.org/t/p/w200${data.poster_path}`,
					}}
					style={styles.poster}
				/>
			</View>
		);
	};

	return (
		<TouchableWithoutFeedback>
			<View style={styles.card}>
				<View style={styles.userInfo}>
					<Avatar uri={user.avatar} size={64} />
					<Text style={styles.title}>{user.username}</Text>
				</View>
				<View style={styles.biography}>
					<Text style={styles.text}>{user.biography}</Text>
				</View>
				<Text style={styles.title}>Mes films préférés</Text>
				<View>
					{user.favMovies.map((movie) => (
						<Movie data={movie}/>
					))}
				</View>
				<Text style={styles.title}>Mes genres préférés</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	card: {
		width: Dimensions.get("window").width * 0.9,
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 10,
		backgroundColor: "#303232D9",
		marginTop: 20,
		padding: 8,
	},
	userInfo: {
		gap: 12,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		color: "#FFF",
		fontWeight: 600,
		fontSize: 20,
	},
	text: {
		color: "#FFF",
		fontSize: 13,
	},
	biography: {
		marginTop: 10,
		marginBottom: 15,
	},
	movieItem: {
		backgroundColor: "#333",
		borderRadius: 5,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		pading: 2,
	},

	poster: {
		width: 80,
		height: 110,
		borderRadius: 5,
	},
});
