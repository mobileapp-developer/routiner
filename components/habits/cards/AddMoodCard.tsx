import React from "react";
import {Animated, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {useQueryClient} from "@tanstack/react-query";
import {logMood} from "@/db/mood";
import {MOOD} from "@/constants/mood";
import {toDateKey} from "@/constants/date";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {MOOD_QUERY_KEY, useTodayMood} from "@/hooks/useTodayMood";
import {usePalette} from "@/hooks/usePalette";

interface AddMoodCardProps {
    selectedDate?: Date;
}

export default function AddMoodCard({selectedDate}: AddMoodCardProps) {
    const targetDate = toDateKey(selectedDate ?? new Date());
    const queryClient = useQueryClient();
    const {dbUserId} = useCurrentUser();
    const {mood: selected} = useTodayMood(dbUserId, selectedDate);
    const palette = usePalette();

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
        <Animated.View style={[styles.card, {backgroundColor: palette.primary.white}]}>
            <View style={styles.left}>
                <Text style={[styles.title, {color: palette.primary.black[100]}]}>
                    {isToday ? 'Add Mood' : 'Mood'}
                </Text>
                <Text style={[styles.subtitle, {color: palette.primary.black[40]}]}>
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
                            {borderColor: palette.primary.black[10], backgroundColor: palette.primary.white},
                            selected === item.id && [styles.emojiSelected, {borderColor: palette.primary.blue[100], backgroundColor: palette.primary.blue[10]}],
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
        borderRadius: 20,
        padding: 16,
    },
    left: {
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
    },
    emojiButton: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    emoji: {
        fontSize: 24,
    },
    emojiSelected: {
        borderWidth: 1.5,
    },
    emojiDimmed: {
        opacity: 0.3,
    },
});
