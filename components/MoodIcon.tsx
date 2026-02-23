import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    Animated, Pressable,
} from 'react-native';
import * as Haptics from "expo-haptics";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Mood {
    emoji: string;
    backgroundColor: string;
    label?: string;
}

export const DEFAULT_MOODS: Mood[] = [
    {emoji: '😇', backgroundColor: '#DCE9F9', label: 'Calm'},
    {emoji: '😊', backgroundColor: '#FFF3CD', label: 'Joyful'},
    {emoji: '😎', backgroundColor: '#D4EDDA', label: 'Cool'},
    {emoji: '🥰', backgroundColor: '#FADADD', label: 'Loving'},
    {emoji: '😂', backgroundColor: '#FFF0E0', label: 'Laughing'},
    {emoji: '😴', backgroundColor: '#E8E0F0', label: 'Sleepy'},
    {emoji: '😤', backgroundColor: '#FFE4E1', label: 'Angry'},
    {emoji: '😢', backgroundColor: '#E0EEF8', label: 'Sad'},
    {emoji: '🤔', backgroundColor: '#EDF3E0', label: 'Confused'},
    {emoji: '🥳', backgroundColor: '#FDE8F5', label: 'Party'},
];

interface EmojiMoodButtonProps {
    moods?: Mood[];
    initialIndex?: number;
    size?: number;
    onMoodChange?: (mood: Mood, index: number) => void;
    style?: StyleProp<ViewStyle>;
}

const STORAGE_KEY = '@mood_index';

const EmojiMoodButton: React.FC<EmojiMoodButtonProps> = ({
                                                             moods = DEFAULT_MOODS,
                                                             initialIndex = 0,
                                                             size = 90,
                                                             onMoodChange,
                                                             style,
                                                         }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loadMood = async () => {
            try {
                const storedIndex = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedIndex !== null) {
                    setCurrentIndex(parseInt(storedIndex));
                }
            } catch (error: any) {
                console.error('Error loading mood:', error);
            }
        };
        loadMood();
    })

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

    const onPress = async () => {
        const nextIndex = (currentIndex + 1) % moods.length;
        setCurrentIndex(nextIndex);
        onMoodChange?.(moods[nextIndex], nextIndex);

        try {
            await AsyncStorage.setItem(STORAGE_KEY, nextIndex.toString());
        } catch (error: any) {
            console.warn('Failed to save mood:', error);
        }
    };

    const currentMood = moods[currentIndex];
    const emojiSize = size * 0.45;

    return (
        <Pressable onPress={onPress}
                   onPressIn={onPressIn}
                   onPressOut={onPressOut}
                   style={style}>
            <Animated.View
                style={[styles.circle, {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: currentMood.backgroundColor,
                    transform: [{scale: scaleValue}],
                },
                ]}>
                <Text style={{fontSize: emojiSize}}>{currentMood.emoji}</Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EmojiMoodButton;