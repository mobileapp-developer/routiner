import {useEffect, useRef} from "react";
import {Animated} from "react-native";

/* Hook for smooth slide animation */
export function useSlideAnimation() {
    const slideValue = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        Animated.spring(slideValue, {
            toValue: 0,
            friction: 8,
            tension: 60,
            useNativeDriver: true,
        }).start();
    }, []);
    return {slideValue};
}