import { SafeAreaView } from "react-native-safe-area-context";
import UserTopSection from "../components/common/UserTopSection";
import { ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MainSection from "../components/RencontresScreen/MainSection";
import { setUser } from "../reducers/user";


export default function RencontresScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();

	const handleAddButton = (id) => {
		fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/users/addfriend/${id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				token: user.token
			})
		})
			.then((res) => res.json())
			.then((updatedUser) => {
				dispatch(setUser({friends : updatedUser.friends}))
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
				<UserTopSection user={user} navigation={navigation} />
				<MainSection user={user} handleAddButton={handleAddButton} />
			</ImageBackground>
		</SafeAreaView>
	);
}
