import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import avatars from "./avatars.json";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Modal } from "react-native";


export function AvatarModal({
	modalVisible,
	setModalVisible,
	handleAvatarSelect,
}) {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(!modalVisible)}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Avatar</Text>
					<ScrollView style={styles.scrollContainer}>
						{avatars.map((item) => (
							<TouchableOpacity
								key={item.id}
								onPress={() => handleAvatarSelect(item.url)}
							>
								<Image
									source={{
										uri: item.url,
									}}
									style={styles.avatarImage}
								/>
							</TouchableOpacity>
						))}
					</ScrollView>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<FontAwesome
								style={styles.iconclose}
								name='close'
								size={25}
								color={"#C94106"}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}


const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: "80%",
		backgroundColor: "rgba(146, 140, 135, 0.8)",
		borderRadius: 15,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		color: "#C94106",
	},
	scrollContainer: {
		width: "100%",
		maxHeight: 500,
		flexDirection: "column",
		alignContent: "center",
	},
	avatarImage: {
		width: 120,
		height: 120,
		borderRadius: 10,
		marginBottom: 10,
		resizeMode: "cover",
		margin: "auto",
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
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",

		marginTop: 10,
	},

});
