import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DropdownUserGenre({userGenre, setUserGenre}) {
	return (
		<Dropdown
			style={styles.dropdowngenre}
			selectedTextStyle={styles.selectedTextStyle}
			containerStyle={styles.containerStyle}
			itemTextStyle={styles.itemTextStyle}
			activeColor='false'
			maxHeight={300}
			data={[
				{ name: "Homme", id: 1 },
				{ name: "Femme", id: 2 },
				{ name: "Autres", id: 3 },
			]}
			placeholder={userGenre}
			labelField='name'
			valueField='id'
			placeholderStyle={{
				color: "white",
				fontSize: 14,
			}}
			onChange={(value) => setUserGenre(value)}
			value={userGenre}
		/>
	);
}

const styles = StyleSheet.create({
	selectedTextStyle: {
		fontSize: 14,
		color: "white",
	},
	containerStyle: {
		backgroundColor: "black",
		borderRadius: 10,
	},
	itemTextStyle: {
		color: "#ffffff",
		fontSize: 14,
	},
	dropdowngenre: {
		backgroundColor: "#333",
		height: 45,
		paddingLeft: 15,
	},
});
