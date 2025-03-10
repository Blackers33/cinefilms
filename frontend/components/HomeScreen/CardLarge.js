/**
 * <Card/> component used for displaying movies in HomeScreen
 * @param {movie}
 */

import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

export default function Card({ movie, onPress, onPressLike }) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.card}>
				<ImageBackground
					source={
						movie.poster_path
							? { uri: "https://image.tmdb.org/t/p/w780" + movie.poster_path }
							: require("../../assets/logo/placeholder/poster.png")
					}
					style={styles.image}
				/>
				<View style={styles.movieInfo}>
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.text}>{movie.overview}</Text>
					<View style={styles.bottomSection}>
						<TouchableOpacity onPress={() => onPressLike(movie.id)}>
							<View style={styles.bottomButton}>
								<Icon
									name='heart'
									size={20}
									color={movie.isLiked ? "#ec412f" : "#fff"}
									style={{ marginTop: 2, marginRight: 2 }}
								/>
								<Text style={styles.text}>
									{movie.likes || 0} Likes
								</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.bottomButton}>
							<Icon
								name='calendar-number-outline'
								size={20}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>0 Events</Text>
						</View>
						<View style={styles.bottomButton}>
							<Icon
								name='chatbox-ellipses-outline'
								size={20}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>
								{movie.comments || 0} Comments
							</Text>
						</View>
					</View>
				</View>
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
		backgroundColor: "#303232",
		overflow: "hidden",
		marginTop: 20,
	},
	image: {
		width: "100%",
		height: Dimensions.get("window").width * 1.1,
		resizeMode: "contain",
	},
	movieInfo: {
		padding: 8,
		gap: 12,
		minHeight: 70,
		justifyContent: "space-between",
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
	bottomSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	bottomButton: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#bbb",
		padding: 5,
		borderRadius: 10,
	},
});
