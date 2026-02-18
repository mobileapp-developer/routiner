import React, {useRef, useCallback} from 'react';
import {Text, StyleSheet, Pressable, Animated, Alert, Platform, ViewStyle, TextStyle} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import {useSignInWithApple} from '@clerk/clerk-expo';
import {useRouter} from 'expo-router';

interface AppleSignInButtonProps {
    onSignInComplete?: () => void;
    backgroundColor?: string;
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
}

export function AppleSignInButton({
                                      onSignInComplete,
                                      backgroundColor = '#000',
                                      iconColor = '#fff',
                                      borderColor,
                                      height,
                                      width,
                                      borderRadius,
                                      style,
                                      textStyle
                                  }: AppleSignInButtonProps) {
    const {startAppleAuthenticationFlow} = useSignInWithApple();
    const router = useRouter();

    if (Platform.OS !== 'ios') return null;

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

    const handleAppleSignIn = async () => {
        try {
            const {createdSessionId, setActive} = await startAppleAuthenticationFlow();

            if (createdSessionId && setActive) {
                await setActive({session: createdSessionId});
                onSignInComplete ? onSignInComplete() : router.replace('/');
            }
        } catch (err: any) {
            if (err.code === 'ERR_REQUEST_CANCELED') return;
            Alert.alert('Error', err.message || 'An error occurred during Apple Sign-In');
            console.error('Apple Sign-In error:', JSON.stringify(err, null, 2));
        }
    };

    return (
        <Animated.View style={[{transform: [{scale: scaleValue}], width: width || '100%'}, style]}>
            <Pressable
                onPress={handleAppleSignIn}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                accessibilityRole="button"
                style={[
                    styles.button,
                    {
                        backgroundColor,
                        borderColor: borderColor || backgroundColor,
                        height: height,
                        width: width,
                        borderRadius: borderRadius ?? 32,
                    }
                ]}>
                <Ionicons name="logo-apple" size={24} color={iconColor}/>
                <Text
                    style={[
                        styles.buttonText,
                        textStyle
                    ]}
                >
                    Apple
                </Text>
            </Pressable>
        </Animated.View>
    );
}

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
        color: 'white',
        fontSize: 14,
    },
});
