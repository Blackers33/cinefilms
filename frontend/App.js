import { StyleSheet } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
	
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let iconName = "";

							if (route.name === "Home") {
								iconName = "home";
							} else if (route.name === "Events") {
								iconName = "calendar-number-outline";
							} else if (route.name === "Rencontres") {
								iconName = "people-outline";
							}

							return <Icon name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: "#C94106",
						tabBarInactiveTintColor: "gray",
						headerShown: false,
						tabBarStyle: { position: "absolute" },
						tabBarBackground: () => (
							<BlurView
								experimentalBlurMethod='dimezisBlurView'
								tint='dark'
								intensity={50}
								style={StyleSheet.absoluteFill}
							/>
						),
					})}
				>
					<Tab.Screen name='Home' component={HomeScreen} />

					<Tab.Screen name='Events' component={HomeScreen} />
					<Tab.Screen name='Rencontres' component={HomeScreen} />
				</Tab.Navigator>
			</NavigationContainer>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


