import {Alert, Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {THabit} from "@/db/schema";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {palette} from "@/constants/palette";
import Swipeable, {SwipeableMethods} from "react-native-gesture-handler/ReanimatedSwipeable";
import {Entypo, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {useRef} from "react";
import CircularProgress from "@/components/ui/CircularProgress";

type Props = {
    habit: THabit,
    currentValue: number,
    onPress: () => void,
    onDelete: () => void,
    onDone: () => void,
    onFail: () => void,
    onSkip: () => void,
    onLogPress: () => void,
}

export default function HabitCard({habit, currentValue, onPress, onDelete, onFail, onSkip, onDone, onLogPress}: Props) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();

    const doneScale     = useRef(new Animated.Value(1)).current;
    const doneBgOpacity = useRef(new Animated.Value(0)).current;
    const doneRotate    = useRef(new Animated.Value(0)).current;
    const swipeableRef  = useRef<SwipeableMethods>(null);

    const handleDonePress = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(doneScale, {
                    toValue: 0.75,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(doneBgOpacity, {
                    toValue: 1,
                    duration: 80,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.spring(doneScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    bounciness: 18,
                    speed: 14,
                }),
                Animated.timing(doneRotate, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(doneBgOpacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            doneRotate.setValue(0);
            swipeableRef.current?.close();
        });

        onDone();
    };

    const handleDeletePress = () => {
        Alert.alert(
            'Delete habit',
            'Are you sure you want to delete this habit?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: onDelete,
                },
            ]
        );
    };

    const rotateInterpolate = doneRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const renderRightActions = () => (
        <View style={styles.rightActions}>
            <Pressable style={[styles.action]} onPress={onFail}>
                <Entypo name='cross' size={24} color={palette.primary.redError[100]}/>
                <Text style={styles.actionLabel}>Fail</Text>
            </Pressable>
            <Pressable style={[styles.action]} onPress={onSkip}>
                <Entypo name="chevron-right" size={24} color={palette.primary.black[100]}/>
                <Text style={styles.actionLabel}>Skip</Text>
            </Pressable>
        </View>
    );

    const renderLeftActions = () => (
        <Animated.View style={styles.leftActions}>
            <Pressable style={[styles.action]} onPress={handleDeletePress}>
                <FontAwesome5 name='trash-alt' size={24} color={palette.primary.redError[100]}/>
                <Text style={styles.actionLabel}>Delete</Text>
            </Pressable>

            <Animated.View style={[styles.action, styles.doneAction, {transform: [{scale: doneScale}]}]}>
                <Animated.View style={[StyleSheet.absoluteFillObject, styles.doneActionFlash, {opacity: doneBgOpacity}]}/>
                <Pressable style={styles.doneActionInner} onPress={handleDonePress}>
                    <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
                        <MaterialIcons name='done-all' size={24} color={palette.primary.green[100]}/>
                    </Animated.View>
                    <Text style={styles.actionLabel}>Done</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );

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

    const getProgressPercentage = () => {
        if (habit.type === 'yesno') return currentValue >= 1 ? 100 : 0;
        const goal = habit.goalValue ?? 1;
        return Math.min(Math.round((currentValue / goal) * 100), 100);
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            overshootLeft={false}
            overshootRight={false}
        >
            <Animated.View style={{transform: [{scale: scaleValue}]}}>
                <Pressable style={styles.card} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                    <View style={styles.left}>
                        <CircularProgress
                            percentage={getProgressPercentage()}
                            size={56}
                            strokeWidth={3}
                            color={palette.primary.blue[100]}
                        />
                        <Text style={styles.icon}>{habit.icon ?? '📌'}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{habit.name}</Text>
                        {renderProgress()}
                    </View>
                    <Pressable style={styles.plusButton} onPress={onLogPress}>
                        <Text style={styles.plus}>+</Text>
                    </Pressable>
                </Pressable>
            </Animated.View>
        </Swipeable>
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
        width: 56,
        height: 56,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        fontSize: 26,
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
    doneAction: {
        overflow: 'hidden',
    },
    doneActionFlash: {
        borderRadius: 20,
        backgroundColor: palette.primary.green[20],
    },
    doneActionInner: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
        gap: 8,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
        gap: 8,
    },
    action: {
        width: 70,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    actionText: {
        fontSize: 20,
        color: palette.primary.black[100],
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: palette.primary.black[100],
    },
});