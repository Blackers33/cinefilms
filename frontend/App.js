//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import InscriptionScreen from "./screens/InscriptionScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import FilmScreen from "./screens/FilmScreen";
import createEventScreen from "./screens/NewEventScreen";
import ProfilScreen from "./screens/ProfilScreen";

//redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

//style
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
	reducer: { user },
});

const TabNavigator = () => {
	return (
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
			<Tab.Screen name='Events' component={EventScreen} />
			<Tab.Screen name='Rencontres' component={HomeScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	NavigationBar.setBackgroundColorAsync("black");
	return (
		<NavigationContainer>
			<Provider store={store}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Connexion' component={ConnexionScreen} />
					<Stack.Screen name='TabNavigator' component={TabNavigator} />
					<Stack.Screen name='Inscription' component={InscriptionScreen} />
					<Stack.Screen
						name='CreateEventScreen'
						component={createEventScreen}
					/>
					<Stack.Screen name='Film' component={FilmScreen} />
					<Stack.Screen name='Profil' component={ProfilScreen} />
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
}
