import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
const genresData = require("../common/genres.json");


export default function FiltersSection({ filters, setFilters }) {
	const sort = [
		{ label: "Popularité ⇂  ", value: "popularity.desc" },
		{ label: "Popularité ↾ ", value: "popularity.asc" },

		{ label: "Recettes ⇂", value: "revenue.desc" },
		{ label: "Recettes ↾", value: "revenue.asc" },

		{ label: "Date de sortie ⇂", value: "primary_release_date.desc" },
		{ label: "Date de sortie ↾", value: "primary_release_date.asc" },

		{ label: "Titre (A-Z)", value: "title.asc" },
		{ label: "Titre (Z-A)", value: "title.desc" },

		{ label: "Note moyenne ⇂", value: "vote_average.desc" },
		{ label: "Note moyenne ↾", value: "vote_average.asc" },

		{ label: "Nb de votes ⇂", value: "vote_count.desc" },
		{ label: "Nb de votes ↾", value: "vote_count.asc" },
	];
    
	const handleFilterChange = (filterName, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterName]: value,
		}));
	};

	const genres = genresData.map((genre) => ({
		label: genre.name,
		value: genre.id,
	}));

	const DropdownComponent = ({ title, dataset, filterKey, icon }) => {
		const value = filters[filterKey];

		const renderItem = (item) => {
			return (
				<View style={styles.item}>
					<Text style={styles.textItem}>{item.label}</Text>
					{item.value === value && (
						<FontAwesome
							style={styles.icon}
							color='white'
							name='angle-left'
							size={16}
						/>
					)}
				</View>
			);
		};

		return (
			<Dropdown
				containerStyle={styles.containerStyle}
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={dataset}
				maxHeight={500}
				labelField='label'
				valueField='value'
				placeholder={title}
				value={value}
				onChange={(item) => handleFilterChange(filterKey, item.value)}
				renderLeftIcon={() => (
					<FontAwesome
						style={styles.icon}
						color='white'
						name={icon}
						size={16}
					/>
				)}
				renderItem={renderItem}
				activeColor='none'
				autoScroll={false}
			/>
		);
	};

	return (
		<View style={styles.filterSection}>
			<DropdownComponent
				title='Trier...'
				filterKey='sort'
				dataset={sort}
				icon='bars'
			/>
			<DropdownComponent
				title='Genres'
				filterKey='genres'
				dataset={genres}
				icon='film'
			/>
			{(filters.sort || filters.genres) && (
				<TouchableOpacity
					onPress={() =>
						setFilters({
							sort: null,
							genres: null,
						})
					}
				>
					<View style={styles.reset}>
						<Text style={{ color: "white" }}>Reset</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	filterSection: {
		flexWrap: "wrap",
		flexDirection: "row",
		width: "100%",
		gap: 5,
		justifyContent: "center",
		marginTop: 10,
	},
	dropdown: {
		height: 25,
		width: 150,
		opacity: 0.8,
		borderRadius: 12,
		padding: 12,
		backgroundColor: "rgba(0,0,0, .4) ",
	},
	reset: {
		height: 25,
		width: 50,
		opacity: 0.8,
		borderRadius: 12,
		backgroundColor: "rgba(0,0,0, .4) ",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		marginRight: 3,
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textItem: {
		flex: 1,
		fontSize: 16,
		color: "white",
	},
	placeholderStyle: {
		fontSize: 12,
		color: "white",
	},
	selectedTextStyle: {
		fontSize: 12,
		color: "white",
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	containerStyle: {
		borderRadius: 10,
		backgroundColor: "rgba(0, 0, 0, 0.8) ",
	},
});
