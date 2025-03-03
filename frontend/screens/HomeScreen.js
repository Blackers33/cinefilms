import { ScrollView, StyleSheet, Text, View } from "react-native";
import GradientBackground from "../components/common/GradientBackground";
import Avatar from "../components/common/Avatar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import TextInput from "../components/common/TextInput";
import { StatusBar } from "expo-status-bar";

const mockUser = {
	username: "Dominic Torreto",
	avatar:
		"https://static.thefinancialbrand.com/uploads/2010/12/lloyds_tsb_me_hero.jpg",
};

const Card = ({movie}) => {
    return (
			<View style={styles.card}>
			</View>
		);
}

const TopSection = ({ user }) => {
	return (
		<View style={styles.topSection}>
			<View style={styles.userSection}>
				<Avatar uri={user.avatar} size={64} />
				<View style={styles.userSectionText}>
					<Text style={styles.textHello}>Hello,</Text>
					<Text style={styles.textUsername}>{user.username}</Text>
				</View>
			</View>
			<View>
				<Icon name='message' size={40} color='#fff' />
			</View>
		</View>
	);
};

const MainSection = () => {
	const [text, onChangeText] = useState("Useless Text");

	return (
		<View>
			<ScrollView style={styles.mainSection}>
				<View style={styles.searchSection}>
					<View style={{ flex: 3 }}>
						<TextInput placeholder='search' />
					</View>
					<View style={{ flex: 1 }}>
						<TextInput placeholder='filters' variant='light' />
					</View>
				</View>
				<View style={styles.cards}>
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</View>
			</ScrollView>
			{/* <StatusBar style='light' /> */}
		</View>
	);
};

export default function HomeScreen({ navigation }) {
	return (
		<>
			<GradientBackground/>
			<TopSection user={mockUser} />
			<MainSection />
		</>
	);
}

const styles = StyleSheet.create({
	mainSection: {
		padding: 10,
	},

	topSection: {
		/* marginTop: 30, */
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333"
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

	searchSection: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "space-between",
	},
	cards: {
		marginTop: 30,

		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 30,
	},
	card: {
		width: "45%",
		height: 250,
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 10,
		backgroundColor: "#302929",
	},
});
