import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {POPULAR_HABITS} from "@/constants/habits";
import {palette} from "@/constants/palette";

export function PopularHabitCard({item, onPress, fullWidth}: {
    item: typeof POPULAR_HABITS[0],
    onPress: () => void,
    fullWidth?: boolean
}) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();

    return (
        <Animated.View style={[{transform: [{scale: scaleValue}]}, fullWidth && {width: '100%'}]}>
            <Pressable
                style={[styles.habitCard, {backgroundColor: item.color}, fullWidth && styles.habitCardFull]}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.habitEmoji}>{item.emoji}</Text>
                    <View style={styles.pointsContainer}>
                        <Text style={styles.habitPoints}>{item.points} points ⭐</Text>
                    </View>
                </View>
                <Text style={styles.habitName}>{item.name}</Text>
                <View style={styles.goalValueContainer}>
                    <Text style={styles.habitGoal}>{item.goalValue} {item.goalUnit}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    habitCard: {
        height: 110,
        width: 150,
        borderRadius: 16,
        padding: 12,
        gap: 4,
    },
    habitCardFull: {
        width: '100%',
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
    goalValueContainer: {
        width: 110,
        justifyContent: 'center',
        paddingVertical: 2,
        borderRadius: 18
    },
    pointsContainer: {
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: palette.primary.orangeWarning[20],
        borderColor: palette.primary.orangeWarning[80],
        borderWidth: 0.5,
        borderRadius: 10,
    },
    habitPoints: {
        fontSize: 13,
        fontWeight: '600',
        color: palette.primary.orangeWarning[100],
    }
});