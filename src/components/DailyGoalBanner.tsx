import {useAuth} from "@clerk/clerk-expo";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {useDailyGoals} from "@/hooks/useDailyGoal";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import CircularProgress from "@/src/components/CircularProgress";
import {getUser} from "@/src/db/user";
import {colors} from "@/theme/colors";

const DailyGoalBanner = () => {
    const router = useRouter();
    const {userId: clerkId} = useAuth();
    const [userId, setUserId] = useState<number | null>(null);
    const {completed, total} = useDailyGoals(userId ?? 0);
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    useEffect(() => {
        if (!clerkId) return;
        getUser(clerkId).then((result) => {
            console.log("result:", result);
            if (result[0]) setUserId(result[0].id);
        });
    }, [clerkId]);

    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                onPress={() => router.push("/(auth)/(tabs)/home")}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <LinearGradient
                    colors={["#000DFF", "#6B73FF"]}
                    style={styles.container}
                    start={{x: 0.5, y: 0.2}}
                    end={{x: 0, y: 0.5}}
                >
                    {/* Content */}
                    <View style={styles.content}>
                        <View style={styles.progressBarContainer}>
                            <CircularProgress percentage={percentage}/>
                        </View>
                        <View>
                            <Text style={styles.dailyButtonTitle}>
                                Your daily goals almost done! 🔥
                            </Text>
                            <Text style={styles.dailyButtonText}>
                                {completed} of {total} completed
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 82,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    progressBarContainer: {
        right: 16,
    },
    dailyButtonTitle: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24,
        letterSpacing: 0,
        color: colors.primary.white,
    },
    dailyButtonText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        letterSpacing: 0,
        color: colors.primary.blue[40],
    },
});

export default DailyGoalBanner;
