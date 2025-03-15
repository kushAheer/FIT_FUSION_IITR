import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../constants/color";

function Button({ children, onPress, isActive, style }) {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => [
					styles.button,
					pressed && styles.pressed,
				]}
			>
				<View
					style={[
						styles.button,
						isActive ? styles.isActive : styles.flat,
					]}
				>
					<Text
						style={isActive ? styles.isActiveText : styles.flatText}
					>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		padding: 8,
		paddingBlock: 12,
        paddingInline: 16,
		borderRadius: 16,
	},
	flat: {
		backgroundColor: "transparent",
	},
	isActive: {
		backgroundColor: GlobalStyles.colors.secondary,
	},

	isActiveText: {
		color: GlobalStyles.colors.primary,
		textAlign: "center",
	},
	flatText: {
		color: GlobalStyles.colors.primary50,
	},
	pressed: {
		opacity: 0.5,
	},
});
