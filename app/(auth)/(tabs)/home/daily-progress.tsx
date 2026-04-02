import {Animated, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import CircularProgress from "@/components/ui/CircularProgress";
import {lightPalette} from "@/constants/palette";
import {LinearGradient} from "expo-linear-gradient";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "expo-router";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {getBannerText} from "@/components/habits/DailyGoalBanner";
import {useCompletedHabits} from "@/hooks/useCompletedHabits";
import {StatusBar} from "expo-status-bar";

export default function DailyProgress() {
    const {dbUserId} = useCurrentUser();
    const {completed, total, goals} = useCompletedHabits(dbUserId ?? 0);
    const {scaleValue, onPressOut, onPressIn} = usePressAnimation();

    const router = useRouter();

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const remainingHabits = goals?.filter(goal => !goal.isCompleted) || [];

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <LinearGradient
                colors={["#000DFF", "#6B73FF"]}
                style={styles.container}
                start={{x: 0.7, y: 0.7}}
                end={{x: 0, y: 0.5}}>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.text}>{getBannerText(percentage)}</Text>
                    </View>
                    <View style={styles.circularProgress}>
                        <CircularProgress size={320} strokeWidth={20} fontSize={40} percentage={percentage}
                                          color={lightPalette.primary.white} showLabel/>
                    </View>
                    <View style={styles.textSection}>
                        <Text style={styles.text}>{completed} of {total} completed</Text>
                    </View>

                    {percentage !== 100 && (
                        <View style={styles.textSection2}>
                            <Text style={styles.text}>Just do it:</Text>
                        </View>
                    )}
                    {percentage < 100 && (
                        <FlatList
                            data={remainingHabits}
                            keyExtractor={(item) => item.habit.id.toString()}
                            style={styles.list}
                            contentContainerStyle={styles.listContent}
                            renderItem={({item}) => (
                                <Animated.View style={{transform: [{scale: scaleValue}]}}>
                                    <View style={styles.card}>
                                        <View style={styles.left}>
                                            <Text style={styles.icon}>{item.habit.icon ?? '📌'}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text style={styles.name}>{item.habit.name}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            )}
                        />
                    )}
                </View>

                {/* Button */}
                <View style={styles.footer}>
                    <Animated.View style={{transform: [{scale: scaleValue}]}}>
                        <Pressable
                            onPress={() => router.back()}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Continue completing habits</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {},
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
    },
    circularProgress: {
        marginBottom: 10,
    },
    textSection: {
        paddingHorizontal: 32,
        alignItems: "center",
        marginBottom: 20,
    },
    textSection2: {
        alignSelf: 'flex-start',
        paddingHorizontal: 32,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        textAlign: 'center',
        color: lightPalette.primary.white
    },
    list: {
        width: '100%',
        marginTop: 20,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        backgroundColor: lightPalette.primary.white,
        borderWidth: 1,
        borderColor: lightPalette.primary.black[10],
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
        color: lightPalette.primary.black[100],
    },
    footer: {
        paddingBottom: 60,
    },
    button: {
        backgroundColor: lightPalette.primary.white,
        marginHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 32
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: lightPalette.primary.blue[100],
    }
})
