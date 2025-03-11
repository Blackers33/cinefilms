//@author : Charlie

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
	Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Avatar from "../common/Avatar";

export default function ProfilPageComponent({ user }) {
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Avatar uri={user.avatar} size={150} />
			</View>
			<Text style={styles.usernameStyle}>{user.username}</Text>

			<View style={styles.inputContainer}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
					style={styles.scrollViewStyle}
				>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Age</Text>
						<Text style={styles.text}>{user.age} ans</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Votre localisation </Text>

						<Text style={styles.text}>{user.location.latitude}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Genre</Text>

						<Text style={styles.text}>{user.genre}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Tes films favoris</Text>

						<Text style={styles.text}>{user.recherchefilm}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Tes genres favoris</Text>

						<Text style={styles.text}>{user.genrefilm}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.Input}>Biographie</Text>

						<Text style={styles.text}>{user.biography}</Text>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	inputContainer: {
		marginTop: 50,
		paddingRight: 12,
		height: 480,
		alignItems: "flex-start",
		width: "100%",
	},
	champInput: {
		borderWidth: 2,
		borderColor: "#C94106",
		borderRadius: 100,
		overflow: "hidden",
		marginBottom: 10,
		color: "#FFFFFF",
		width: "100%",
	},
	Input: {
		paddingLeft: 12,
		fontSize: 16,
		color: "#C94106",
		fontWeight: "bold",
	},

	text: {
		color: "white",
		fontSize: 16,
		paddingLeft: 15,
	},

	textContainer: {
		paddingBottom: 20,
	},
	usernameStyle: {
		fontSize: 22,
		color: "#C94106",
		fontWeight: "bold",
	},
	avatar: {
		marginTop: 50,
	},
});
