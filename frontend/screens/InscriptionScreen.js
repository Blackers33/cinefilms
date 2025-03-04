import InscriptionScreen1 from "../components/inscriptionScreen/InscriptionScreen1";
import InscriptionScreen2 from "../components/inscriptionScreen/InscriptionScreen2";
import InscriptionScreen3 from "../components/inscriptionScreen/InscriptionScreen3";
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
} from "react-native";
import { useState } from "react";

export default function InscriptionScreen() {
  const [currentStep, setCurrentStep] = useState(1);

  const handlecommencerbuton = () => {
    setCurrentStep(2);
  };

  const handlesuivantbuton = () => {
    setCurrentStep(3);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "padding"}
    >
      <SafeAreaView>
        {currentStep === 1 && (
          <View>
            <InscriptionScreen1 handleNext={handlecommencerbuton} />
          </View>
        )}
        {currentStep === 2 && (
          <View>
            <InscriptionScreen2 handleNext={handlesuivantbuton} />
          </View>
        )}
        {currentStep === 3 && (
          <View>
            <InscriptionScreen3 />
          </View>
        )}
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
