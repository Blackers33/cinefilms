import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InscriptionScreen from "./screens/InscriptionScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import { StyleSheet } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import FilmScreen from "./screens/FilmScreen";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { user },
});



const Tab = createBottomTabNavigator();

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
			<Tab.Screen name='Events' component={HomeScreen} />
			<Tab.Screen name='Rencontres' component={HomeScreen} />
		</Tab.Navigator>
	);
}

export default function App() {
  return (

			<Provider store={store}>
				<NavigationContainer>
					
					<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='TabNavigator' component={TabNavigator} />

						<Stack.Screen name='Connexion' component={ConnexionScreen} />
						<Stack.Screen name='Inscription' component={InscriptionScreen} />
						<Stack.Screen name='FilmScreen' component={FilmScreen} />
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style='light' />
			</Provider>

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


