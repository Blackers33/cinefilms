import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

function InscriptionScreen1() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text style={styles.titrelogo}>Bienvenue sur Cinefilm ! 🎬✨</Text>
      <Text style={styles.titrecontenu}>
        Retrouvez les meilleurs films, événements et échanges entre passionnés
        de cinéma. Rejoignez la communauté et vivez votre passion à fond !{"\n"}
        🍿 Bon divertissement !
      </Text>
      <View>
        <Text style={styles.Input}>Username</Text>
        <LinearGradient
          colors={["rgba(30,28,26,0.8)", "transparent"]}
          start={{ x: 0.26, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <TextInput
            style={styles.champInput}
            onChangeText={(value) => setUsername(value)}
            value={username}
            placeholder="Enter your username"
          ></TextInput>
        </LinearGradient>
      </View>
      <View>
        <Text style={styles.Input}>Email</Text>
        <TextInput
          style={styles.champInput}
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Enter your email"
        ></TextInput>
      </View>
      <View>
        <Text style={styles.Input}>Email</Text>
        <TextInput
          style={styles.champInput}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Choose your password"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
        ></TextInput>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  titrelogo: {
    color: "#c94106",
    fontSize: 35,
  },
  titrecontenu: {
    color: "#c94106",
  },
  champInput: {
    borderWidth: 2,
    borderColor: "#C94106",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  Input: {
    padding: 12,
    fontSize: 16,
    color: "#C94106",
  },
  gradient: {
    padding: 2, // Léger padding pour bien voir le border color
    borderRadius: 100,
  },
  bouton: {
    backgroundColor: "#C94106",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InscriptionScreen1;
