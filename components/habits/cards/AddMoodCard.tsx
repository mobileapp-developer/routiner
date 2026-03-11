import React from "react";
import {Animated, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {logMood} from "@/db/mood";
import {MOOD} from "@/constants/mood";
import {palette} from "@/constants/palette";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {MOOD_QUERY_KEY, useTodayMood} from "@/hooks/useTodayMood";
import {useQueryClient} from "@tanstack/react-query";

interface AddMoodCardProps {
    selectedDate?: Date;
}

export default function AddMoodCard({selectedDate}: AddMoodCardProps) {
    const targetDate = (selectedDate ?? new Date()).toISOString().split('T')[0];
    const queryClient = useQueryClient();
    const {dbUserId} = useCurrentUser();
    const {mood: selected} = useTodayMood(dbUserId, selectedDate);

    const isToday = !selectedDate ||
        selectedDate.toDateString() === new Date().toDateString();

    const onSelect = async (id: string) => {
        if (!isToday || !dbUserId) return;

        await logMood({
            userId: dbUserId,
            mood: id as 'angry' | 'sad' | 'neutral' | 'good' | 'happy',
            date: targetDate,
        });

        await queryClient.invalidateQueries({
            queryKey: [...MOOD_QUERY_KEY, dbUserId, targetDate]
        });
    }

    return (
        <Animated.View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.title}>
                    {isToday ? 'Add Mood' : 'Mood'}
                </Text>
                <Text style={styles.subtitle}>
                    {isToday ? "How're you feeling?" : selected ? 'Mood that day' : 'No mood logged'}
                </Text>
            </View>

            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={MOOD}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() => onSelect(item.id)}
                        disabled={!isToday}
                        style={[
                            styles.emojiButton,
                            selected === item.id && styles.emojiSelected,
                            !isToday && selected !== item.id && styles.emojiDimmed,
                        ]}
                    >
                        <Text style={styles.emoji}>{item.emoji}</Text>
                    </Pressable>
                )}
            />
        </Animated.View>
    );
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
        marginLeft: 12,
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
    emojiDimmed: {
        opacity: 0.3,
    },
});
