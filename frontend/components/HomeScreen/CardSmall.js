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
import { BlurView } from "expo-blur";
import { useState } from "react";

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

				<TouchableOpacity
					style={styles.likeSection}
					onPress={() => onPressLike(movie.id)}
				>
					<BlurView
						experimentalBlurMethod='dimezisBlurView'
						intensity={50}
						tint='dark'
						style={styles.likeSectionBlurview}
					>
						<Icon
							name={movie.isLiked ? "heart" : "heart-outline"}
							size={20}
							color={movie.isLiked ? "#ec412f" : "#fff"}
						/>
						{movie.likes > 0 &&<Text style={styles.text}>{movie.likes}</Text>}
					</BlurView>
				</TouchableOpacity>
				<View style={styles.movieInfo}>
					<Text style={styles.title}>{movie.title}</Text>
					<View style={styles.bottomSection}>
						<View style={styles.bottomButton}>
							<Icon
								name='calendar-number-outline'
								size={18}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>0</Text>
						</View>
						<View style={styles.bottomButton}>
							<Icon
								name='chatbox-ellipses-outline'
								size={18}
								color='#fff'
								style={{ marginTop: 2, marginRight: 2 }}
							/>
							<Text style={styles.text}>{movie.comments || 0}</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

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
		justifyContent: "space-between",
		flex: 1,
	},
	title: {
		color: "#FFF",
		fontWeight: 600,
		marginLeft: 5,
	},
	text: {
		color: "#FFF",
		fontSize: 15,
	},
	bottomSection: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 5,
	},
	likeSectionBlurview: {
		borderColor: "rgba(255,255,255,0.5)",
		borderWidth: 0.5,
		padding: 10,
		borderRadius: 100,
		overflow: "hidden",
		flexDirection : "row",
		gap: 5
	},
	likeSection: {
		position: "absolute",
		right: 0,
		top: 0,
		padding: 12,
	},
	bottomButton: {
		flexDirection: "row",
		alignItems: "center",
	},
});
