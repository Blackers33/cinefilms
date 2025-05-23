/**
 * usage : import Avatar from "../components/common/Avatar";
 * <Avatar uri={user.avatar} size={64} />
 * 
 */

import { Image, View } from "react-native";


export default function Avatar({
	uri,
	size = 32,
}) {

	return (
		<View
			style={{
				width: size,
				height: size,
				borderWidth: 1,
				borderRadius: 100,
				borderColor: "rgba(198, 198, 198, 0.38)",
			}}
		>
			<Image
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 100,
				}}
				source={
					uri
						? { uri }
						: require("../../assets/logo/placeholder/avatar.png")
				}
			/>
		</View>
	);
}

