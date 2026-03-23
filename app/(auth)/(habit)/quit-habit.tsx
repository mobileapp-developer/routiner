import {Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import BackButton from "@/components/ui/BackButton";
import {palette} from "@/constants/palette";
import {useState} from "react";
import ColorPicker from "@/components/ui/ColorPicker";
import EmojiPicker from "@/components/ui/EmojiPicker";
import {createHabit} from "@/db/habit";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "expo-router";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {HabitForm} from "@/constants/types";
import {useQueryClient} from "@tanstack/react-query";

export default function QuitHabit() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [form, setForm] = useState<HabitForm>({
        name: "",
        goalValue: "",
        goalUnit: "",
        points: "10",
        icon: "🚬",
        iconName: "Smoking",
        color: "#FFE5D9",
        colorName: "Peach",
        frequencyType: "daily",
        habitType: "yesno",
    });

    const [error, setError] = useState("");
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [pointsDropdownVisible, setPointsDropdownVisible] = useState(false);

    const {dbUserId} = useCurrentUser();
    const {scaleValue, onPressOut, onPressIn} = usePressAnimation();

    const updateForm = (key: keyof HabitForm, value: string) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async () => {
        if (!form.name || !dbUserId) {
            setError("Please enter a habit name");
            return;
        }
        setError("");

        await createHabit({
            userId: dbUserId,
            name: form.name,
            icon: form.icon,
            color: form.color,
            type: 'yesno',
            frequencyType: 'daily',
            points: form.points ? parseInt(form.points) : 10,
        });

        await queryClient.invalidateQueries({
            queryKey: ['daily-goals']
        });

        router.dismissAll();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={[styles.headerText, {right: 115}]}>
                    Quit Bad Habit
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* NAME */}
                <Text style={styles.label}>NAME</Text>
                <View>
                    <TextInput
                        value={form.name}
                        onChangeText={(text) => updateForm("name", text)}
                        placeholder="Smoking"
                        style={styles.input}
                        placeholderTextColor={palette.primary.black[40]}
                    />
                    <View style={styles.separator}/>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>

                {/* ICON AND COLOR */}
                <Text style={styles.label}>ICON AND COLOR</Text>
                <View style={styles.row}>
                    <Pressable style={styles.iconColorCard} onPress={() => setEmojiPickerVisible(true)}>
                        <Text style={styles.iconEmoji}>{form.icon}</Text>
                        <View>
                            <Text style={styles.iconColorTitle}>{form.iconName}</Text>
                            <Text style={styles.iconColorSub}>Icon</Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.iconColorCard} onPress={() => setColorPickerVisible(true)}>
                        <View style={[styles.colorCircle, {backgroundColor: form.color}]}/>
                        <View>
                            <Text style={styles.iconColorTitle}>{form.colorName}</Text>
                            <Text style={styles.iconColorSub}>Color</Text>
                        </View>
                    </Pressable>
                </View>

                {/* POINTS */}
                <Text style={styles.label}>POINTS</Text>
                <View style={styles.pointsRow}>
                    <Pressable style={styles.pointsChip} onPress={() => setPointsDropdownVisible(true)}>
                        <Text style={styles.pointsChipText}>⭐</Text>
                        <Text style={styles.pointsValue}>{form.points ? `${form.points} pts` : 'Choose points'}</Text>
                        <Text style={styles.pointsArrow}>›</Text>
                    </Pressable>
                </View>

                {/* ADD BUTTON */}
                <Animated.View style={[styles.footer, {transform: [{scale: scaleValue}]}]}>
                    <Pressable style={styles.addButton} onPress={handleSubmit} onPressIn={onPressIn}
                               onPressOut={onPressOut}>
                        <Text style={styles.addButtonText}>Quit Habit</Text>
                    </Pressable>
                </Animated.View>
            </ScrollView>

            <ColorPicker
                visible={colorPickerVisible}
                selected={form.color}
                onSelect={(hex, name) => setForm((prev) => ({...prev, color: hex, colorName: name}))}
                onClose={() => setColorPickerVisible(false)}
            />

            <EmojiPicker
                visible={emojiPickerVisible}
                selected={form.icon}
                onSelect={(emoji, name) => setForm((prev) => ({...prev, icon: emoji, iconName: name}))}
                onClose={() => setEmojiPickerVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.blue[10],
    },
    header: {
        height: 130,
        backgroundColor: palette.primary.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: "row",
        shadowColor: palette.primary.black[20],
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "700",
    },
    scroll: {
        padding: 20,
        gap: 8,
        paddingBottom: 40,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: palette.primary.black[100],
        letterSpacing: 1,
        marginBottom: 4,
        marginTop: 16,
    },
    section: {
        backgroundColor: palette.primary.white,
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        borderRadius: 20,
        padding: 16,
    },
    input: {
        fontSize: 22,
        fontWeight: "500",
        color: palette.primary.black[100],
        paddingVertical: 8,
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: palette.primary.black[20],
        marginTop: 8,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    iconColorCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: palette.primary.white,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: palette.primary.black[10],
        padding: 12,
        paddingVertical: 16,
    },
    iconEmoji: {
        fontSize: 28,
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 10,
    },
    iconColorTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: palette.primary.black[100],
    },
    iconColorSub: {
        fontSize: 12,
        color: palette.primary.black[40],
    },
    goalTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    goalValue: {
        fontSize: 20,
        fontWeight: "600",
        color: palette.primary.black[100],
    },
    goalSub: {
        fontSize: 13,
        color: palette.primary.black[40],
    },
    goalBottom: {
        flexDirection: "row",
        gap: 8,
        marginTop: 12,
        flexWrap: 'wrap',
    },
    goalChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: palette.primary.blue[10],
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    goalChipText: {
        fontSize: 13,
        color: palette.primary.black[80],
    },
    addButton: {
        backgroundColor: palette.primary.blue[100],
        borderRadius: 40,
        padding: 18,
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: palette.primary.white,
    },
    footer: {
        marginTop: 16,
    },
    error: {
        color: "red",
        fontSize: 13,
        marginTop: 4,
    },
    pointsRow: {
        backgroundColor: palette.primary.white,
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        borderRadius: 20,
        padding: 4,
    },
    pointsChip: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 8,
    },
    pointsChipText: {
        fontSize: 24,
    },
    pointsValue: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: palette.primary.black[100],
    },
    pointsArrow: {
        fontSize: 24,
        color: palette.primary.black[40],
    },
});