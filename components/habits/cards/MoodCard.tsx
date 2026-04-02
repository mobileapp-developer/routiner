import {MOOD} from "@/constants/mood";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {addDaysToDateKey, fromDateKey} from "@/constants/date";
import {useMoodRange} from "@/hooks/useHabitStats";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {usePalette} from "@/hooks/usePalette";

type Props = {
    from: string;
    to: string;
    days: number;
}

export function MoodCard({from, to, days}: Props) {
    const {dbUserId} = useCurrentUser();
    const userId = dbUserId ?? 0;
    const palette = usePalette();

    const MOOD_EMOJI = Object.fromEntries(MOOD.map(m => [m.id, m.emoji]));

    const moodQuery = useMoodRange(userId, from, to);
    const moodByDate = new Map((moodQuery.data ?? []).map((row) => [row.date, row.mood]));

    const moodData = Array.from({length: days}, (_, i) => {
        const dateStr = addDaysToDateKey(from, i);
        const d = fromDateKey(dateStr);

        return {
            weekday: d.toLocaleDateString('uk-UA', {day: '2-digit'}),
            mood: moodByDate.get(dateStr) ?? null,
        };
    });

    return (
        <View style={[styles.card, {backgroundColor: palette.primary.white, shadowColor: palette.primary.black[100]}]}>
            <View style={styles.cardHeader}>
                <View style={[styles.cardIconWrap, {backgroundColor: palette.primary.black[10]}]}>
                    <Text style={styles.cardIconEmoji}>😊</Text>
                </View>
                <View>
                    <Text style={[styles.cardTitle, {color: palette.primary.black[80]}]}>Mood</Text>
                    <Text style={[styles.cardSubtitle, {color: palette.primary.black[40]}]}>Avg. Mood</Text>
                </View>
            </View>

            <View style={styles.moodRowContainer}>
                <ScrollView
                    horizontal
                    style={styles.moodScroll}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.moodContent,
                        days <= 7 && styles.moodContentCompact,
                    ]}
                >
                    {moodData.map((item, i) => (
                        <View key={i} style={styles.moodCol}>
                            <Text style={styles.moodEmoji}>
                                {item.mood ? MOOD_EMOJI[item.mood] : '·'}
                            </Text>
                            <Text style={[styles.moodDay, {color: palette.primary.black[40]}]}>{item.weekday}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    moodRowContainer: {
        width: '100%',
    },
    moodScroll: {
        width: '100%',
    },
    moodContent: {
        flexDirection: 'row',
        paddingVertical: 8,
        gap: 4,
    },
    moodContentCompact: {
        width: '100%',
        justifyContent: 'space-between',
    },
    moodCol: {
        alignItems: 'center',
        gap: 6,
        minWidth: 28,
    },
    moodEmoji: {
        fontSize: 22,
    },
    moodDay: {
        fontSize: 11,
        fontWeight: '500',
    },
    card: {
        borderRadius: 20,
        padding: 16,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconEmoji: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 12,
    },
})