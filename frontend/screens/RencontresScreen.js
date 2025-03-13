import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/common/UserTopSection";
import { ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MainSection from "../components/RencontresScreen/MainSection";

const mockUser = {
	_id: {
		$oid: "67d18fffda189c6289c03da4",
	},
	username: "Gringo",
	password: "$2b$10$rQnHvbi0SsbtnJyQrKV8Be99XqGfJfH6c1ktJ6NltHqMKQhxRy6yG",
	email: "gringo@gmail.com",
	token: "1gj-mH1869b-OCvhkroWmCDHOZbXhuJY",
	friends: [
		"67d169084d2c595bfbc647d8", "67cff19d8a931e104c9fd319"],
	favGenres: [28, 12, 10751, 14],
	favMovies: [385687, 385128, 10603, 16930, 637],
	__v: 0,
	age: 25,
	avatar:
		"https://e7.pngegg.com/pngimages/547/650/png-clipart-lego-indiana-jones-2-the-adventure-continues-lego-indiana-jones-the-original-adventures-video-game-indiana-jones-toy-raiders-of-the-lost-ark.png",
	biography:
		"J'aime bien le bonjour à tous les jours de la semaine prochaine fois que je ne sais pas si tu as des questions de la semaine prochaine.",
	genre: "Homme",
	location: {
		name: "Bordeaux",
		latitude: 44.851895,
		longitude: -0.587877,
	},
};

export default function RencontresScreen({ navigation }) {
	// const user = mockUser
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();

	const handleAddButton = (id) => {
		console.log(id)
		fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/users/addfriend/${id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				token: user.token
			})
		})
			.then((res) => res.json())
			.then((updatedUser) => {
				console.log("Utilisateur mis à jour :", updatedUser);
				dispatch(setUser(updatedUser))
			})
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			<ImageBackground
				source={require("../assets/backgroundGradient.png")}
				style={{
					flex: 1,
					resizeMode: "cover",
				}}
			>
				<TopSection user={user} />
				<MainSection user={user} handleAddButton={handleAddButton} />
			</ImageBackground>
		</SafeAreaView>
	);
}
