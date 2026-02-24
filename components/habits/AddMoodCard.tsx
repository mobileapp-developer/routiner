import React from "react";
import {Animated, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {logMood} from "@/db/mood";
import {MOOD} from "@/constants/mood";
import {palette} from "@/constants/palette";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useTodayMood} from "@/hooks/useTodayMood";

export default function AddMoodCard() {
    const {dbUserId} = useCurrentUser();
    const {mood: selected, setMood: setSelected} = useTodayMood(dbUserId);

    const onSelect = async (id: string) => {
        setSelected(id);

        if (!dbUserId) return;

        const today = new Date().toISOString().split('T')[0];

        await logMood({
            userId: dbUserId,
            mood: id as 'angry' | 'sad' | 'neutral' | 'good' | 'happy',
            date: today,
        });

        console.log('Mood saved:', id, 'for user:', dbUserId);
    }

    return (
        <Animated.View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.title}>Add Mood</Text>
                <Text style={styles.subtitle}>How're you feeling?</Text>
            </View>

            <FlatList
                horizontal={true}
                data={MOOD}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Pressable onPress={() => onSelect(item.id)} style={[
                        styles.emojiButton,
                        selected === item.id && styles.emojiSelected
                    ]}>
                        <Text style={styles.emoji}>
                            {item.emoji}
                        </Text>
                    </Pressable>
                )}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.primary.white,
        borderRadius: 20,
        padding: 16,
    },
    left: {
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: palette.primary.black[100],
    },
    subtitle: {
        fontSize: 14,
        color: palette.primary.black[40],
    },
    emojiButton: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
    },
    emoji: {
        fontSize: 24,
    },
    emojiSelected: {
        borderWidth: 1.5,
        borderColor: palette.primary.blue[100],
        backgroundColor: palette.primary.blue[10],
    },
});