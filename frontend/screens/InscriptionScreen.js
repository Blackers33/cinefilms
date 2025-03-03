import InscriptionScreen1 from "../components/inscriptionScreen/InscriptionScreen1";
import InscriptionScreen2 from "../components/inscriptionScreen/InscriptionScreen2";
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";


export default function InscriptionScreen() {
  
  const [isStep1Visible, setIsStep1Visible] = useState(true); 

  const handlecommencerbuton = () => {
    setIsStep1Visible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        
      {isStep1Visible && <InscriptionScreen1 />}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bouton}
          onPress={() => handlecommencerbuton()}
        >
          <Text style={styles.text}>Commencer </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1C1A",
    alignItems: "center",
    justifyContent: "center",
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
