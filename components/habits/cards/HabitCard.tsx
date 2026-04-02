import {Alert, Animated, Easing, Pressable, StyleSheet, Text, View} from "react-native";
import {THabit} from "@/db/schema";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import Swipeable, {SwipeableMethods} from "react-native-gesture-handler/ReanimatedSwipeable";
import {Entypo, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {useRef} from "react";
import CircularProgress from "@/components/ui/CircularProgress";
import {usePalette} from "@/hooks/usePalette";

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
    const palette = usePalette();

    const doneScale     = useRef(new Animated.Value(1)).current;
    const doneBgOpacity = useRef(new Animated.Value(0)).current;
    const doneRotate    = useRef(new Animated.Value(0)).current;
    const failScale     = useRef(new Animated.Value(1)).current;
    const failBgOpacity = useRef(new Animated.Value(0)).current;
    const failShake     = useRef(new Animated.Value(0)).current;
    const skipScale     = useRef(new Animated.Value(1)).current;
    const skipBgOpacity = useRef(new Animated.Value(0)).current;
    const skipShift     = useRef(new Animated.Value(0)).current;
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
            onDone();
        });
    };
    
    const handleFailPress = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(failScale, {
                    toValue: 0.75,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(failBgOpacity, {
                    toValue: 1,
                    duration: 90,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.sequence([
                    Animated.spring(failScale, {
                        toValue: 1.08,
                        useNativeDriver: true,
                        bounciness: 12,
                        speed: 18,
                    }),
                    Animated.spring(failScale, {
                        toValue: 1,
                        useNativeDriver: true,
                        bounciness: 14,
                        speed: 18,
                    }),
                ]),
                Animated.timing(failShake, {
                    toValue: 1,
                    duration: 240,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(failBgOpacity, {
                    toValue: 0,
                    duration: 260,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            failShake.setValue(0);
            swipeableRef.current?.close();
            onFail();
        });
    };

    const handleSkipPress = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(skipScale, {
                    toValue: 0.75,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(skipBgOpacity, {
                    toValue: 1,
                    duration: 90,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.sequence([
                    Animated.spring(skipScale, {
                        toValue: 1.06,
                        useNativeDriver: true,
                        bounciness: 12,
                        speed: 18,
                    }),
                    Animated.spring(skipScale, {
                        toValue: 1,
                        useNativeDriver: true,
                        bounciness: 14,
                        speed: 18,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(skipShift, {
                        toValue: 22,
                        duration: 110,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                    Animated.timing(skipShift, {
                        toValue: 12,
                        duration: 90,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(skipShift, {
                        toValue: 26,
                        duration: 110,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                    Animated.timing(skipShift, {
                        toValue: 0,
                        duration: 120,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(skipBgOpacity, {
                    toValue: 0,
                    duration: 260,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            skipShift.setValue(0);
            swipeableRef.current?.close();
            onSkip();
        });
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

    const failShakeInterpolate = failShake.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: [0, -12, 10, -8, 0],
    });

    const renderRightActions = () => (
        <Animated.View style={[styles.rightActions, {borderColor: palette.primary.black[10], backgroundColor: palette.primary.white}]}>
            <Animated.View style={[styles.action, styles.failAction, {transform: [{scale: failScale}]}]}>
                <Animated.View style={[StyleSheet.absoluteFillObject, styles.failActionFlash, {opacity: failBgOpacity, backgroundColor: palette.primary.redError[20]}]}/>
                <Pressable style={styles.actionInner} onPress={handleFailPress}>
                    <Animated.View style={{transform: [{translateX: failShakeInterpolate}]}}>
                        <Entypo name='cross' size={24} color={palette.primary.redError[100]}/>
                    </Animated.View>
                    <Text style={[styles.actionLabel, {color: palette.primary.black[100]}]}>Fail</Text>
                </Pressable>
            </Animated.View>
            
            <Animated.View style={[styles.action, styles.skipAction, {transform: [{scale: skipScale}]}]}>
                <Animated.View style={[StyleSheet.absoluteFillObject, styles.skipActionFlash, {opacity: skipBgOpacity, backgroundColor: palette.primary.orangeWarning[20]}]}/>
                <Pressable style={styles.actionInner} onPress={handleSkipPress}>
                    <Animated.View style={{transform: [{translateX: skipShift}]}}>
                        <Entypo name="chevron-right" size={24} color={palette.primary.black[100]}/>
                    </Animated.View>
                    <Text style={[styles.actionLabel, {color: palette.primary.black[100]}]}>Skip</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );

    const renderLeftActions = () => (
        <Animated.View style={[styles.leftActions, {borderColor: palette.primary.black[10], backgroundColor: palette.primary.white}]}>
            <Pressable style={[styles.action]} onPress={handleDeletePress}>
                <FontAwesome5 name='trash-alt' size={24} color={palette.primary.redError[100]}/>
                <Text style={[styles.actionLabel, {color: palette.primary.black[100]}]}>Delete</Text>
            </Pressable>

            <Animated.View style={[styles.action, styles.doneAction, {transform: [{scale: doneScale}]}]}>
                <Animated.View style={[StyleSheet.absoluteFillObject, styles.doneActionFlash, {opacity: doneBgOpacity, backgroundColor: palette.primary.green[20]}]}/>
                <Pressable style={styles.doneActionInner} onPress={handleDonePress}>
                    <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
                        <MaterialIcons name='done-all' size={24} color={palette.primary.green[100]}/>
                    </Animated.View>
                    <Text style={[styles.actionLabel, {color: palette.primary.black[100]}]}>Done</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );

    const renderProgress = () => {
        if (habit.type === 'yesno') {
            const done = currentValue >= 1;
            return <Text style={[styles.progress, {color: palette.primary.black[40]}]}>{done ? '✅ Виконано' : '❌ Не виконано'}</Text>
        }
        if (habit.type === 'count' || habit.type === 'time') {
            const goal = habit.goalValue ?? 1;
            return (
                <Text style={[styles.progress, {color: palette.primary.black[40]}]}>{currentValue}/{goal} {habit.goalUnit ?? ''}</Text>
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
                <Pressable
                    style={[styles.card, {backgroundColor: palette.primary.white, borderColor: palette.primary.black[10]}]}
                    onPress={onPress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                >
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
                        <Text style={[styles.name, {color: palette.primary.black[100]}]}>{habit.name}</Text>
                        {renderProgress()}
                    </View>
                    <Pressable 
                        style={[styles.plusButton, {borderColor: palette.primary.black[10]}]}
                        onPress={onLogPress}
                        disabled={getProgressPercentage() === 100}
                    >
                        {getProgressPercentage() === 100 ? (
                            <MaterialIcons name="done" size={28} color={palette.primary.green[100]} />
                        ) : (
                            <Text style={[styles.plus, {color: palette.primary.black[100]}]}>+</Text>
                        )}
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
        borderWidth: 1,
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
    },
    plusButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        fontSize: 30,
    },
    doneAction: {
        overflow: 'hidden',
    },
    failAction: {
        overflow: 'hidden',
    },
    skipAction: {
        overflow: 'hidden',
    },
    doneActionFlash: {
        borderRadius: 20,
    },
    failActionFlash: {
        borderRadius: 20,
    },
    skipActionFlash: {
        borderRadius: 20,
    },
    doneActionInner: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    actionInner: {
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
        gap: 8,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 24,
        borderWidth: 1.5,
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
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
});