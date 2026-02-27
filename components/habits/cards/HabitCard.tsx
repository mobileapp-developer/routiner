import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {THabit} from "@/db/schema";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {palette} from "@/constants/palette";

type Props = {
    habit: THabit,
    currentValue: number,
    onPress: () => void,
    onDelete: () => void,
}

export default function HabitCard({habit, currentValue, onPress, onDelete}: Props) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();

    const renderProgress = () => {
        if (habit.type === 'yesno') {
            const done = currentValue >= 1;
            return <Text style={styles.progress}>{done ? '✅ Виконано' : '❌ Не виконано'}</Text>
        }
        if (habit.type === 'count' || habit.type === 'time') {
            const goal = habit.goalValue ?? 1;
            return (
                <Text style={styles.progress}>{currentValue}/{goal} {habit.goalUnit ?? ''}</Text>
            );
        }
    }

    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable style={styles.card} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                <View style={styles.left}>
                    <Text style={styles.icon}>{habit.icon ?? '📌'}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{habit.name}</Text>
                    {renderProgress()}
                </View>
                <Pressable style={styles.plusButton} onPress={onDelete}>
                    <Text style={styles.plus}>+</Text>
                </Pressable>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: palette.primary.white,
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        borderRadius: 24,
        marginBottom: 12,
    },
    left: {
        marginRight: 12,
    },
    icon: {
        fontSize: 28,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    progress: {
        fontSize: 13,
        color: '#888',
    },
    plusButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        fontSize: 30,
        color: palette.primary.black[100],
    },
});