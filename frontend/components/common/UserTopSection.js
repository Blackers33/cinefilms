import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "./Avatar";


export default function TopSection({ user }) {
	return (
		<View style={styles.topSection}>
			<View style={styles.userSection}>
				<Avatar uri={user.avatar} size={64} />
				<View>
					<Text style={styles.textHello}>Hello,</Text>
					<Text style={styles.textUsername}>{user.username}</Text>
				</View>
			</View>
			<View>
				<Icon name='chatbox-ellipses' size={40} color='#fff' />
			</View>
		</View>
	);
}


const styles = StyleSheet.create({


	topSection: {
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},

	userSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	textHello: {
		color: "#C94106",
		opacity: 0.65,
	},

	textUsername: {
		color: "white",
		fontWeight: 800,
	},
});
