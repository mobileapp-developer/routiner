import React from "react";
import {Image, StyleSheet, View} from "react-native";
import CircularProgress from "@/components/ui/CircularProgress";

interface HabitProgressCircleProps {
    percentage: number;
    iconUrl?: string;
    icon?: React.ReactNode;
    size?: number;
}

const HabitProgressCircle = ({ percentage, iconUrl, icon, size = 56 }: HabitProgressCircleProps) => {
    return (
        <View style={styles.wrapper}>
            <CircularProgress percentage={percentage} size={size} strokeWidth={3} />
            <View style={styles.iconContainer}>
                {iconUrl ? (
                    <Image source={{ uri: iconUrl }} style={styles.icon} />
                ) : (
                    icon
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,},
});

export default HabitProgressCircle;