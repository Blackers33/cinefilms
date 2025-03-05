import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InscriptionScreen from "./screens/InscriptionScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Connexion" component={ConnexionScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
