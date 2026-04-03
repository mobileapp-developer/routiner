import {Animated, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {useSlideAnimation} from "@/hooks/useSlideAnimation";
import {usePalette} from "@/hooks/usePalette";
import {FREQUENCY_OPTIONS, GOAL_UNIT_OPTIONS, HABIT_TYPE_OPTIONS} from "@/constants/habitOptions";
import {EditableField, setHabitEditSelection} from "@/stores/habitEditSelection";

type Option = {
	label: string;
	value: string;
};

const FIELD_CONFIG: Record<EditableField, {title: string; options: Option[]}> = {
	frequencyType: {
		title: "Repeat Frequency",
		options: FREQUENCY_OPTIONS,
	},
	habitType: {
		title: "Habit Type",
		options: HABIT_TYPE_OPTIONS,
	},
	goalUnit: {
		title: "Goal Unit",
		options: GOAL_UNIT_OPTIONS,
	},
	points: {
		title: "Points",
		options: [],
	},
};

function isEditableField(value?: string): value is EditableField {
	return value === "frequencyType" || value === "goalUnit" || value === "points" || value === "habitType";
}

export default function EditHabit() {
	const router = useRouter();
	const {slideValue} = useSlideAnimation();
	const palette = usePalette();
	const {field, selected} = useLocalSearchParams<{
		field?: string;
		selected?: string;
	}>();
    const [pointsValue, setPointsValue] = useState(selected ?? "");

	const isValidField = isEditableField(field);

	useEffect(() => {
		if (!isValidField) {
			router.back();
		}
	}, [isValidField, router]);

	if (!isValidField) {
		return null;
	}

	const config = FIELD_CONFIG[field];

	const handleSelect = (value: string) => {
		setHabitEditSelection(field, value);
		router.back();
	};

    const handleSavePoints = () => {
        const value = pointsValue.trim();
        if (!value) return;

        const numericValue = Number(value);
        if (Number.isNaN(numericValue) || numericValue <= 0) return;

        handleSelect(String(Math.floor(numericValue)));
    };

	return (
		<KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
			<Pressable style={styles.overlay} onPress={() => router.back()}>
				<Animated.View style={[styles.sheet, {backgroundColor: palette.primary.white, transform: [{translateY: slideValue}]}]}>
					<Pressable style={styles.content} onPress={(event) => event.stopPropagation()}>
						<View style={[styles.handle, {backgroundColor: palette.primary.black[20]}]}/>
						<Text style={[styles.title, {color: palette.primary.black[100]}]}>{config.title}</Text>

                        {field === "points" ? (
                            <>
                                <View style={styles.pointsInputRow}>
                                    <TextInput
                                        style={[styles.pointsInput, {color: palette.primary.black[100]}]}
                                        value={pointsValue}
                                        onChangeText={(text) => setPointsValue(text.replace(/[^0-9]/g, ""))}
                                        keyboardType="numeric"
                                        placeholder={selected || "10"}
                                        placeholderTextColor={palette.primary.black[40]}
                                        autoFocus
                                    />
                                    <Text style={[styles.pointsLabel, {color: palette.primary.black[40]}]}>pts</Text>
                                </View>
                                <Pressable
                                    style={[styles.saveButton, {backgroundColor: palette.primary.blue[100]}]}
                                    onPress={handleSavePoints}
                                    disabled={!pointsValue}
                                >
                                    <Text style={[styles.saveButtonText, {color: palette.primary.white}]}>Save</Text>
                                </Pressable>
                            </>
                        ) : (
							<View style={styles.optionsList}>
								{config.options.map((option) => {
									const isSelected = selected === option.value;

									return (
										<Pressable
											key={option.value}
											style={[
												styles.option,
												{
													borderColor: isSelected ? palette.primary.blue[100] : palette.primary.black[10],
													backgroundColor: isSelected ? palette.primary.blue[10] : palette.primary.white,
												},
											]}
											onPress={() => handleSelect(option.value)}
										>
											<Text style={[styles.optionText, {color: palette.primary.black[100]}]}>{option.label}</Text>
										</Pressable>
									);
								})}
							</View>
                        )}
					</Pressable>
				</Animated.View>
			</Pressable>
        </KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "flex-end",
	},
	sheet: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingBottom: 32,
	},
	content: {
		padding: 24,
		gap: 16,
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		alignSelf: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
	},
	optionsList: {
		gap: 10,
	},
	option: {
		borderWidth: 1,
		borderRadius: 14,
		paddingVertical: 14,
		paddingHorizontal: 16,
	},
	optionText: {
		fontSize: 16,
		fontWeight: "600",
	},
			pointsInputRow: {
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				gap: 8,
			},
			pointsInput: {
				fontSize: 48,
				fontWeight: "700",
				textAlign: "center",
				minWidth: 120,
			},
			pointsLabel: {
				fontSize: 24,
				fontWeight: "500",
			},
			saveButton: {
				borderRadius: 40,
				padding: 18,
				alignItems: "center",
			},
			saveButtonText: {
				fontSize: 16,
				fontWeight: "700",
			},
});

