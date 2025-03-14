import { SafeAreaView } from "react-native-safe-area-context";
import UserTopSection from "../components/common/UserTopSection";
import MainSection from "../components/HomeScreen/MainSection";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);
	const isFocused = useIsFocused();
	

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			<StatusBar style='light' />
			<ImageBackground
				source={require("../assets/backgroundGradient.png")}
				style={{
					flex: 1,
					resizeMode: "cover",
				}}
			>
				<UserTopSection user={user} navigation={navigation} />
				<MainSection navigation={navigation} user={user} isFocused={isFocused}/>
			</ImageBackground>
		</SafeAreaView>
	);
}
