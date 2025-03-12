/**
 * @authors Charlie & Sacha
 */

import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ProfilPageEdit from "../components/ProfilScreen/ProfilPageEdit";
import ProfilPageView from "../components/ProfilScreen/ProfilPageView";

const mockUser = {
	_id: {
		$oid: "67cf4657ee764954eda595d1",
	},
	username: "Julie",
	password: "$2b$10$Z4e/QLS..SqeKZ3HOK5K4OLbTxuxcAEDcgYI7o6YcLgULK5jh87q.",
	email: "Julie@gmail.com",
	token: "S3FzKaOU3cI1nb_iFj0DyJrLZhIi_g4M",
	friends: [],
	favGenres: [53, 10770, 878],
	favMovies: ["385687", "19995", "41003", "162641", "562485"],
	__v: 0,
	age: 29,
	avatar:
		"https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_1280.jpg",
	biography:
		"je suis julie, j'aime bcp les films lorem ipsum et je ne me souviens plus de la suite bref je divergeje suis julie, j'aime bcp les films lorem ipsum et je ne me souviens plus de la suite bref je divergeje suis julie, j'aime bcp les films lorem ipsum et je ne me souviens plus de la suite bref je diverge",
	genre: "Alien",
	location: {
		name: "Marseille",
		latitude: 43.282,
		longitude: 5.405,
	},
};

export default function ProfilScreen() {
	const user = useSelector((state) => state.user.value);

	const [edit, setEdit] = useState(false);


	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
		
					{edit ? (
						<ProfilPageEdit user={user} setEdit={()=>setEdit(!edit)}/>
					) : (
						<ProfilPageView user={user} setEdit={()=>setEdit(!edit)}/>
					)}
				
				
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1E1C1A",
	
	},


});
