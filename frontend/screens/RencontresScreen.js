import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/common/UserTopSection";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import MainSection from "../components/RencontresScreen/MainSection";


export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);
	

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
				<MainSection/>
			</ImageBackground>
		</SafeAreaView>
	);
}
