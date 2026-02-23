import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import AuthButton from "@/components/AuthButton";
import BackButton from "@/components/BackButton";
import {palette} from "@/constants/palette";

const Page = () => {
	const router = useRouter();
	const [selectedGender, setSelectedGender] = useState<string | null>(null);

	const handleNext = async () => {
		if (!selectedGender) return;
		await AsyncStorage.setItem("gender", selectedGender);
		router.push("/(auth)/(register)/habit");
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.headerText}>Create Account</Text>
			</View>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Choose your gender</Text>
			</View>

			<View style={styles.cards}>
				<Pressable onPress={() => setSelectedGender("male")}>
					<View style={[styles.card, selectedGender === "male" && styles.selectedCard]}>
						<Text style={styles.emoji}>🤷🏻</Text>
						<Text style={styles.genderText}>Male</Text>
					</View>
				</Pressable>

				<Pressable onPress={() => setSelectedGender("female")}>
					<View style={[styles.card, selectedGender === "female" && styles.selectedCard]}>
						<Text style={styles.emoji}>🙋🏻‍♀️</Text>
						<Text style={styles.genderText}>Female</Text>
					</View>
				</Pressable>
			</View>

			<View style={styles.footer}>
				<AuthButton
					text="Next"
					backgroundColor={palette.primary.blue[100]}
					textColor={palette.primary.white}
					onPress={() => handleNext()}
					height={52}
					width={345}
					borderRadius={40}
					fontSize={14}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		height: 130,
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 18,
		paddingTop: 40,
		flexDirection: "row",
		shadowColor: palette.primary.black[20],
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	headerText: {
		fontSize: 28,
		fontWeight: "700",
		right: 85
	},
	titleContainer: {
		paddingLeft: 16,
		paddingTop: 24
	},
	title: {
		fontSize: 18,
		fontWeight: "500",
		lineHeight: 24,
		letterSpacing: 0
	},
	cards: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingTop: 24
	},
	card: {
		height: 140,
		width: 165,
		borderWidth: 2,
		borderRadius: 16,
		borderColor: palette.primary.black[20],
		backgroundColor: palette.primary.white,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
		gap: 24
	},
	selectedCard: {
		borderColor: palette.primary.blue[100]
	},
	emoji: {
		fontSize: 44,
		fontWeight: "700",
		lineHeight: 48,
		letterSpacing: -1
	},
	genderText: {
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
		letterSpacing: 0
	},
	footer: {
		flex: 1,
		marginTop: 32,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingVertical: 32,
		marginVertical: 32
	}
});

export default Page;
