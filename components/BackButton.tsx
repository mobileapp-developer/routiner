import {useRouter} from "expo-router";
import {Animated, Pressable, StyleSheet} from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import {palette} from "@/constants/palette";
import {useRef} from "react";

const BackButton = () => {
    const router = useRouter();

    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={styles.buttonContainer}>
            <Pressable onPress={() => router.back()} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Ionicons name='chevron-back' size={24} color='grey'/>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: 55,
        height: 55,
        borderRadius: 19,
        borderColor: palette.primary.black[10],
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BackButton;
