import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "./Avatar";


export default function TopSection({ user, navigation }) {
	return (
		<View style={styles.topSection}>
			<TouchableOpacity
				style={styles.userSection}
				onPress={()=>navigation.navigate("Profil")}
			>
				<Avatar uri={user.avatar} size={64} />
				<View>
					<Text style={styles.textHello}>Hello,</Text>
					<Text style={styles.textUsername}>{user.username}</Text>
				</View>
			</TouchableOpacity>
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
