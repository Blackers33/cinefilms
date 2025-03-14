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
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";


export default function ProfilScreen() {
	const user = useSelector((state) => state.user.value);

	const [edit, setEdit] = useState(false);


	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
					{edit ? (
						<ProfilPageEdit user={user} setEdit={() => setEdit(!edit)} />
					) : (
						<ProfilPageView user={user} setEdit={() => setEdit(!edit)} />
					)}
				</KeyboardAvoidingView>
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
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
