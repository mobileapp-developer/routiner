import {MOOD} from "@/constants/mood";
import {StyleSheet, Text, View} from "react-native";
import {palette} from "@/constants/palette";
import {useMoodRange} from "@/hooks/useHabitStats";
import {useCurrentUser} from "@/hooks/useCurrentUser";

type Props = {
    from: string;
    to: string;
    days: number;
}

export function MoodCard({from, to, days}: Props) {
    const {dbUserId} = useCurrentUser();
    const userId = dbUserId ?? 0;

    const MOOD_EMOJI = Object.fromEntries(MOOD.map(m => [m.id, m.emoji]));

    const moodQuery = useMoodRange(userId, from, to);

    const moodData = Array.from({length: days}, (_, i) => {
        const d = new Date(from);
        d.setDate(d.getDate() + i);

        const dateStr = d.toISOString().split('T')[0];

        const found = moodQuery.data?.find(r => r.date === dateStr);

        return {
            weekday: d.toLocaleDateString('en', {weekday: 'narrow'}),
            mood: found?.mood ?? null,
        };
    });

    return (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.cardIconWrap}>
                <Text style={styles.cardIconEmoji}>😊</Text>
            </View>
            <View>
                <Text style={styles.cardTitle}>Mood</Text>
                <Text style={styles.cardSubtitle}>Avg. Mood</Text>
            </View>
        </View>

        <View style={styles.moodRow}>
            {moodData.map((item, i) => (
                <View key={i} style={styles.moodCol}>
                    <Text style={styles.moodEmoji}>
                        {item.mood ? MOOD_EMOJI[item.mood] : '·'}
                    </Text>
                    <Text style={styles.moodDay}>{item.weekday}</Text>
                </View>
            ))}
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    moodCol: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
    },
    moodEmoji: {
        fontSize: 22,
    },
    moodDay: {
        fontSize: 11,
        color: palette.primary.black[40],
        fontWeight: '500',
    },
    card: {
        backgroundColor: palette.primary.white,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
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
        backgroundColor: palette.primary.black[10],
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconEmoji: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: palette.primary.black[80],
    },
    cardSubtitle: {
        fontSize: 12,
        color: palette.primary.black[40],
    },
})