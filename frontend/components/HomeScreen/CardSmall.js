/**
 * <Card/> component used for displaying movies in HomeScreen
 * @param {movie}
 */

import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";


export default function Card({ movie }){

	return (
		<TouchableWithoutFeedback onPress={() => console.log("press")}>
			<View style={styles.card}>
				<ImageBackground
					source={{
						uri: movie.poster_path
							? "https://image.tmdb.org/t/p/w780" + movie.poster_path
							: "https://www.theyearinpictures.co.uk/images//image-placeholder.png",
					}}
					style={styles.image}
				/>
				<View style={styles.movieInfo}>
					<Text style={styles.title}>{movie.title}</Text>
					<View style={styles.bottomSection}>
						<View style={{ flexDirection: "row" }}>
							<Icon
								name='heart'
								size={10}
								color={movie.liked ? '#ec412f' : '#fff'}
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>{movie.likes?.length || 0} Likes</Text>
						</View>
						<View style={{ flexDirection: "row" }}>
							<Icon
								name='calendar-number-outline'
								size={10}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>Events</Text>
						</View>
						<View style={{ flexDirection: "row" }}>
							<Icon
								name='chatbox-ellipses-outline'
								size={10}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>Comments</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		width: Dimensions.get("window").width * 0.48,
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 10,
		backgroundColor: "#303232",
		overflow: "hidden",
		marginTop: 20,
	},
	image: {
		width: "100%",
		height: Dimensions.get("window").width * 0.65,
		resizeMode: "contain",
	},
	movieInfo: {
		padding: 2,
		gap: 12,
		minHeight: 70,
		justifyContent: "space-between",
	},
	title: {
		color: "#FFF",
		fontWeight: 600,
	},
	text: {
		color: "#FFF",
		fontSize: 10,
	},
	bottomSection: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 5,
	},
});
