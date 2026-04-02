import {StyleSheet, Text, View} from "react-native";
import CircularProgress from "@/components/ui/CircularProgress";
import {lightPalette} from "@/constants/palette";

interface HabitItemProps {
    name: string;
    emoji: string;
    current: number;
    goalValue: number;
    goalUnit: string;
    color: string;
}

const HabitItem = ({ name, emoji, current, goalValue, goalUnit }: HabitItemProps) => {
    const percentage = goalValue > 0 ? Math.min(Math.round((current / goalValue) * 100), 100) : 0;

    return (
        <View style={styles.container}>
            <View style={styles.progressWrapper}>
                <CircularProgress percentage={percentage} size={56} strokeWidth={3} color={lightPalette.primary.blue[100]} />
                <Text style={styles.emoji}>{emoji}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.progress}>
                    {current}/{goalValue} {goalUnit.toUpperCase()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        marginVertical: 6,
        gap: 12,
    },
    progressWrapper: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
    },
    emoji: {
        position: "absolute",
        fontSize: 24,
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: "600" },
    progress: { fontSize: 13, color: "#888", marginTop: 2 },
});

export default HabitItem;
