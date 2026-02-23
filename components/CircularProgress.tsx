import {Text, View} from "react-native";
import Svg, {Circle} from "react-native-svg";

interface Props {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

export default function CircularProgress({
                                             percentage,
                                             size = 64,
                                             strokeWidth = 4,
                                         }: Props) {
    const radius = (size - 4 * strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (percentage / 100) * circumference;

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
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#ffffff"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            <Text style={{color: "#fff", fontSize: 13, fontWeight: "700"}}>
                %{percentage}
            </Text>
        </View>
    );
}
