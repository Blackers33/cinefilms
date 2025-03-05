/**
 * @author Sacha
 * usage : import GradientBackground from "../components/GradientBackground";
 * <GradientBackground/>
 * Pour avoir le fond d'écran standard du design Figma (noir et rouge)
 */
import { StyleSheet, View } from "react-native";
import { RadialGradient } from "react-native-gradients";


export default function GradientBackground() {
	const colorList = [
		{ offset: "0%", color: "#61260d", opacity: "1" },
		{ offset: "100%", color: "#1E1C1A", opacity: "1" },
	];
	return (
		<View style={styles.gradientBg}>
			<RadialGradient x='50%' y='50%' rx='50%' ry='50%' colorList={colorList} />
		</View>
	);
}

const styles = StyleSheet.create({
	gradientBg: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});
