import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Pressable, StyleSheet, Text} from "react-native";
import {POPULAR_HABITS} from "@/constants/popularHabits";
import {palette} from "@/constants/palette";

export function PopularHabitCard({item, onPress}: { item: typeof POPULAR_HABITS[0], onPress: () => void }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();

    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={[styles.habitCard, {backgroundColor: item.color}]}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={styles.habitEmoji}>{item.emoji}</Text>
                <Text style={styles.habitName}>{item.name}</Text>
                <Text style={styles.habitGoal}>{item.goal}</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    habitCard: {
        height: 100,
        width: 130,
        borderRadius: 16,
        padding: 12,
        gap: 4,
    },
    habitEmoji: {
        fontSize: 28,
    },
    habitName: {
        fontSize: 15,
        fontWeight: '600',
        color: palette.primary.black[100],
    },
    habitGoal: {
        fontSize: 13,
        color: palette.primary.black[60],
    },
});