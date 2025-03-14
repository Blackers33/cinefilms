import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import Button from "../common/Button";
import Avatar from "../common/Avatar";
import { useState } from "react";
import { AvatarModal } from "../common/AvatarModal";
import CitiesDropdown from "../common/CitiesDropdown";
import DropdownUserGenre from "../common/DropdownUserGenre";

function InscriptionScreen2({
	handleNext,
	age,
	setAge,
	location,
	setLocation,
	genre,
	setGenre,
	avatar,
	setAvatar,
}) {
	const [modalVisible, setModalVisible] = useState(false);
  


	function handleAvatarSelect(avatar) {
		setModalVisible(!modalVisible);
		setAvatar(avatar);
	}

	return (

			<>
			  <View>
  				<AvatarModal
  					modalVisible={modalVisible}
  					setModalVisible={setModalVisible}
  					handleAvatarSelect={handleAvatarSelect}
  				/>
  				<TouchableOpacity
  					style={styles.avatar}
  					activeOpacity={0.8}
  					onPress={() => setModalVisible(!modalVisible)}
  				>
  					<Avatar uri={avatar} size={150} />
  				</TouchableOpacity>
  				<Text style={styles.avatarinstructiontext}>
  					Clique pour choisir ton avatar
  				</Text>
  			</View>
  			<View style={{ flex: 1 }}>
  				<View>
  					<Text style={styles.text}>Age</Text>
  
  					<TextInput
  						placeholderTextColor='grey'
  						onChangeText={setAge}
  						value={age}
  						placeholder='Entre ton âge'
  						inputMode='numeric'
  						style={styles.textInput}
  					/>
  				</View>
  				<View>
  					<Text style={styles.text}>Ta localisation </Text>
  				</View>
  				<CitiesDropdown
  					city={location.name}
  					setLocation={(item) => setLocation(item)}
  				/>
  				<View>
  					<Text style={styles.text}>Genre</Text>
  					<DropdownUserGenre userGenre={genre} setUserGenre={setGenre} />
  				</View>
  				<View style={styles.button}>
  					<Button text='Scène suivante🎬' onPress={handleNext} />
  				</View>
  			</View>
			</>
		
	);
}

const styles = StyleSheet.create({
	text: {
		padding: 12,
		fontSize: 16,
		color: "#C94106",
	},
	textInput: {
		color: "white",
		fontSize: 16,
		paddingLeft: 15,
		backgroundColor: "#333",
	},
	avatar: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	avatarinstructiontext: {
		color: "#c94106",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
	},

	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		padding: 10,
		marginTop: 10,
		width: "100%",
	},

	button: {
		marginTop: 30,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default InscriptionScreen2;
