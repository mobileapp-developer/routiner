import {Animated, Text, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import {useEffect, useRef} from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
    percentage:     number;
    size?:          number;
    strokeWidth?:   number;
    color?:         string;
    showLabel?:     boolean;
    fontSize?:      number;
}

export default function CircularProgress({
                                             percentage,
                                             size = 64,
                                             strokeWidth = 4,
                                             color = '#4F46E5',
                                             showLabel = false,
                                             fontSize = 13,
                                         }: Props) {
    const radius = (size - 4 * strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: percentage,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [percentage]);

    const strokeDashoffset = animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Svg width={size} height={size} style={{position: "absolute"}}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            {showLabel && (
                <Text style={{color, fontSize: fontSize, fontWeight: "700"}}>
                    {percentage}%
                </Text>
            )}
        </View>
    );
}
