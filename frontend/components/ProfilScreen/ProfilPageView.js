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
import MoviesScrollView from "../common/MoviesScrollView";
import Button from "./Button";
import MovieGenresDisplay from "./MovieGenresDisplay";

const Field = ({ title, info }) => {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			{info && <Text style={styles.text}>{info}</Text>}
		</View>
	);
};

export default function ProfilPageView({ user, setEdit }) {
	return (
		<>
			<View style={styles.container}>
				<View style={styles.topSection}>
					<Avatar uri={user.avatar} size={150} />
					<Text style={styles.usernameText}>{user.username}</Text>
				</View>

				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.mainSection}>

						<Field title='Tes films favoris' />
						<MoviesScrollView moviesIds={user.favMovies} />
						<Field title='Tes genres favoris' />
						<MovieGenresDisplay list={user.favGenres}/>
						<Field title='Biographie' info={user.biography} />
						<Field title='Localisation' info={user.location.name} />
						<Field title='Age' info={user.age + " ans"} />
						<Field title='Genre' info={user.genre} />

					</View>
				</ScrollView>
			</View>
			<View style={styles.buttonSection}>
				<Button text='Modifier' onPress={setEdit}></Button>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 8,
	},

	title: {
		fontSize: 16,
		color: "#C94106",
		fontWeight: "bold",
	},

	text: {
		color: "white",
		fontSize: 16,
	},

	usernameText: {
		fontSize: 22,
		color: "#C94106",
		fontWeight: "bold",
	},
	topSection: {
		margin: 10,
		alignItems: "center",
		gap: 20,
	},
	mainSection: {
		gap: 20,
		marginLeft : 15,
	
	},
	buttonSection: {
		borderTopWidth: 1,
		flex: 1,
		borderColor: "grey",
		alignItems: "center",
		justifyContent: "center",
	},
});
