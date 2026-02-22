import * as Haptics from "expo-haptics";
import {useCallback, useRef} from "react";
import {Animated} from "react-native";

interface UsePressAnimationOptions {
	toValue?: number;
	haptics?: boolean;
	hapticStyle?: Haptics.ImpactFeedbackStyle;
}

export const usePressAnimation = ({
	toValue = 0.96,
	haptics = true,
	hapticStyle = Haptics.ImpactFeedbackStyle.Light
}: UsePressAnimationOptions = {}) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const onPressIn = useCallback(() => {
		Animated.spring(scaleValue, {
			toValue,
			friction: 8,
			tension: 100,
			useNativeDriver: true
		}).start();
		if (haptics) {
			Haptics.impactAsync(hapticStyle);
		}
	}, [scaleValue, toValue, haptics, hapticStyle]);

	const onPressOut = useCallback(() => {
		Animated.spring(scaleValue, {
			toValue: 1,
			friction: 4,
			tension: 40,
			useNativeDriver: true
		}).start();
	}, [scaleValue]);

	return { scaleValue, onPressIn, onPressOut };
};
