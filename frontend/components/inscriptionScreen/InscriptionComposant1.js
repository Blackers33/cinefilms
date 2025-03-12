import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

function InscriptionScreen1({
  handleNext,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [emailError, setEmailError] = useState(false);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handlecommencebuton = () => {
    if (EMAIL_REGEX.test(email)) {
      handleNext();
    } else {
      setEmailError(true);
    }
  };

  return (
    <View>
      <Text style={styles.titrelogo}>
        Commencer votre inscription sur Cinefilms
      </Text>

      <View>
        <Text style={styles.titreInput}>Nom d'utilisateur</Text>

        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder="Entrez votre nom d'utilisateur"
        ></TextInput>
      </View>
      <View>
        <Text style={styles.titreInput}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Entrez votre email"
          autoCorrect={false}
        ></TextInput>
      </View>
      <View>
        <Text style={styles.titreInput}>Mot de passe</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Créez votre mot de passe"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
        ></TextInput>
      </View>
      <View style={styles.button}>
        <Button text="C'est parti" onPress={handlecommencebuton} />
        {emailError && (
          <Text style={styles.text}>
            Merci de saisir une adresse e-mail valide
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titrelogo: {
    color: "#c94106",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 85,
    textAlign: "center",
    marginTop:70,
  },
  titrecontenu: {
    color: "#c94106",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },

  titreInput: {
    padding: 12,
    fontSize: 16,
    color: "#C94106",
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InscriptionScreen1;
