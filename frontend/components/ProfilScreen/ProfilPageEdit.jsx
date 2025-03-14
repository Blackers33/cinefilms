//@author : Charlie

import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { useState } from "react";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user";
import Avatar from "../common/Avatar";
import { AvatarModal } from "../common/AvatarModal";
import CitiesDropdown from "../common/CitiesDropdown";
import DropdownUserGenre from "../common/DropdownUserGenre";
import { MoviesDropdown } from "../common/MoviesDropdown";
import MoviesScrollView from "../common/MoviesScrollView";
import Button from "./Button";
import MovieGenresEdit from "./MovieGenresEdit";

const Field = ({ title, info, ...props }) => {
	return (
		<View style={styles.field}>
			<Text style={styles.title}>{title}</Text>
			<TextInput {...props} style={styles.text} value={String(info)} />
		</View>
	);
};

export default function ProfilPageEdit({ user, setEdit }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [age, setAge] = useState(user.age);
	const [location, setLocation] = useState(user.location);
	const [genre, setGenre] = useState(user.genre);
	const [username, setUsername] = useState(user.username);
	const [biography, setBiography] = useState(user.biography);
	const [avatar, setAvatar] = useState(user.avatar);
	const [favGenres, setFavGenres] = useState(user.favGenres);
	const [favMovies, setFavMovies] = useState(user.favMovies);
	const dispatch = useDispatch();

	function handleAvatarSelect(avatar) {
		setModalVisible(!modalVisible);
		setAvatar(avatar);
	}

	function handleSetGenres(id) {
		setFavGenres((prev) => {
			if (prev.includes(id)) {
				return prev.filter((genre) => genre !== id);
			} else {
				return [...prev, id];
			}
		});
	}

	function handleSetMovies(id) {
		setFavMovies((prev) => {
			if (prev.includes(id)) {
				return prev.filter((idInArray) => idInArray !== id);
			} else {
				return [...prev, id];
			}
		});
	}

	async function handleSubmit() {
		if (age !== "" || username !== "") {
			const response = await fetch(
				process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/profil/" + user.token,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						age,
						location,
						genre,
						username,
						biography,
						avatar,
						favGenres,
						favMovies,
					}),
				}
			);
			const data = await response.json();
			if (data.result) {
				alert("Profil mis à jour");
				dispatch(setUser(data.profil));

				setEdit(false);
			} else {
				alert(data.message);
			}
		} else {
			alert("Veuillez remplir tous les champs");
		}
	}

	return (
		<>
			<AvatarModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				handleAvatarSelect={handleAvatarSelect}
			/>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.topSection}
					activeOpacity={0.8}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Avatar uri={avatar} size={150} />
					<Text style={styles.fadedText}>cliquer pour modifier</Text>
				</TouchableOpacity>

				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.mainSection}>
						<Field title='Nom' info={username} onChangeText={setUsername} />
						<Field
							title='Age'
							info={age}
							inputMode='numeric'
							onChangeText={setAge}
						/>
						<Text style={styles.title}>Localisation</Text>
						<CitiesDropdown
							city={location.name}
							setLocation={(item) => setLocation(item)}
						/>
						<Text style={styles.title}>Genre</Text>
						<DropdownUserGenre userGenre={genre} setUserGenre={setGenre} />

						<Text style={styles.title}>Tes films favoris</Text>
						<MoviesDropdown setMovie={(id) => handleSetMovies(id)} />
						<MoviesScrollView
							moviesIds={favMovies}
							mode='edit'
							handleDelete={(id) => handleSetMovies(id)}
						/>
						<Text style={styles.title}>Tes genres favoris</Text>
						<MovieGenresEdit list={favGenres} handleSwitch={handleSetGenres} />

						<View>
							<Field
								title='Biographie'
								info={biography}
								onChangeText={setBiography}
								multiline={true}
								maxLength={400}
								key='Biographie'
							/>
						</View>
					</View>
				</ScrollView>
			</View>
			<View style={styles.buttonSection}>
				<Button text='Valider' onPress={() => handleSubmit()}></Button>
				<Button text='Annuler' onPress={setEdit} variant='ghost'></Button>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 9,
		alignItems: "center",
		minWidth: "100%",
	},

	title: {
		paddingLeft: 12,
		fontSize: 16,
		color: "#C94106",
		fontWeight: "bold",
	},

	text: {
		color: "white",
		fontSize: 16,
		paddingLeft: 15,
		backgroundColor: "#333",
		height: 45,
	},

	topSection: {
		margin: 10,
		alignItems: "center",
		gap: 20,
	},
	mainSection: {
		gap: 20,
		width: "95%",
		marginBottom: 100,
	},
	fadedText: {
		position: "absolute",
		top: "45%",
		color: "white",
		backgroundColor: "black",
		opacity: 0.6,
	},
	buttonSection: {
		borderTopWidth: 1,
		flex: 1,
		borderColor: "grey",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 5,
	},
	field: {
		gap: 10,
	},
});
