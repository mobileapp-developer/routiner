import React, {useRef, useCallback} from 'react';
import {Text, StyleSheet, Pressable, Animated, ViewStyle, TextStyle} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

type AuthButtonProps = {
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    text: string;
    onPress?: () => void;
    loading?: boolean;
    error?: string | null;
    backgroundColor: string;
    textColor?: string;
    iconColor?: string;
    borderColor?: string;
    height?: number;
    width?: number | `${number}%`;
    borderRadius?: number;
    fontSize?: number;
    fontWeight?: number;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const AuthButton = ({
                        icon,
                        text,
                        onPress,
                        backgroundColor,
                        textColor = '#fff',
                        iconColor = '#fff',
                        borderColor,
                        height,
                        width,
                        borderRadius,
                        fontSize,
                        style,
                        textStyle
                    }: AuthButtonProps) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = useCallback(() => {
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, [scaleValue]);

    const onPressOut = useCallback(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    }, [scaleValue]);

    return (
        <Animated.View style={[{transform: [{scale: scaleValue}], width: width}, style]}>
            <Pressable
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                accessibilityRole="button"
                style={[
                    styles.button,
                    {
                        backgroundColor,
                        borderColor: borderColor || backgroundColor,
                        height: height,
                        width: '100%',
                        borderRadius: borderRadius ?? 32,
                    }
                ]}
            >
                {icon && <Ionicons name={icon} size={24} color={iconColor}/>}
                <Text
                    style={[
                        styles.buttonText,
                        {color: textColor, fontSize: fontSize || 18},
                        textStyle
                    ]}
                >
                    {text}
                </Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        minHeight: 56,
        borderWidth: 1,
        gap: 10,
    },
    buttonText: {
        fontWeight: "600",
    },
});

export default AuthButton;