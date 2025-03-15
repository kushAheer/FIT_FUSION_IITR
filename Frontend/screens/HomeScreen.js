import { Text, StyleSheet, View } from "react-native";

function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text>Home</Text>
		</View>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
