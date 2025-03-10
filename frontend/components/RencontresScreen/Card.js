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
import Avatar from "../common/Avatar";

export default function Card({ user }) {
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
	image: {
		width: "100%",
		height: Dimensions.get("window").width * 1.1,
		resizeMode: "contain",
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
	biography: {
		marginTop: 10,
		marginBottom: 15,
	},
});
