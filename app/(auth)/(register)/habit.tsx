import {useState} from "react";
import {useRouter} from "expo-router";
import {useUser} from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text, StyleSheet, Pressable, ScrollView} from "react-native";
import {colors} from "@/theme/colors";
import BackButton from "@/src/components/BackButton";
import AuthButton from "@/src/components/AuthButton";
import {createUser} from "@/src/db/user";
import {createHabit} from "@/src/db/habit";

// Define a list of predefined habits
const HABITS = [
    {id: 'water',      emoji: '💧', text: 'Drink water'},
    {id: 'run',        emoji: '🏃🏻‍♀️', text: 'Run'},
    {id: 'read',       emoji: '📖', text: 'Read books'},
    {id: 'meditation', emoji: '🧘🏻‍♀️', text: 'Meditate'},
    {id: 'study',      emoji: '🧑🏻‍💻‍️', text: 'Study'},
    {id: 'journal',    emoji: '📕', text: 'Journal'},
    {id: 'plant',      emoji: '🌿‍', text: 'Grow plants'},
    {id: 'sleep',      emoji: '😴', text: 'Sleep'}
]

const Page = () => {
    const {user} = useUser();
    const router = useRouter();
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

    const handleNext = async () => {
        if (!selectedHabit) return;

        const gender = await AsyncStorage.getItem('gender');
        const habit = HABITS.find(h => h.id === selectedHabit)

        console.log('Saved data:', {
            clerkId: user?.id,
            name:    user?.firstName,
            gander:  gender,
            habit:   habit?.text,
            emoji:   habit?.emoji,
        });

        const newUser = await createUser({
            clerkId: user!.id,
            name: user!.firstName ?? 'User',
            gender: gender ?? 'other',
        });

        const newHabit = await createHabit({
            userId: newUser.lastInsertRowId,
            name: habit!.text,
            icon: habit!.emoji,
            type: 'yesno',
            frequencyType: 'daily',
        })

        await AsyncStorage.removeItem('gender');

        router.replace('/(auth)/(tabs)/home');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>Create Account</Text>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose your first habit</Text>
                <Text style={styles.subtitle}>You may add more habits later</Text>
            </View>

            <View style={styles.cards}>
                {HABITS.map((habit) => (
                    <Pressable key={habit.id} onPress={() => setSelectedHabit(habit.id)}>
                        <View style={[styles.card, selectedHabit === habit.id && styles.selectedCard]}>
                            <Text style={styles.emoji}>{habit.emoji}</Text>
                            <Text style={styles.habitText}>{habit.text}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>

            <View style={styles.footer}>
                <AuthButton
                    text='Next'
                    backgroundColor={selectedHabit ? colors.primary.blue[100] : colors.primary.black[20]}
                    textColor={colors.primary.white}
                    onPress={handleNext}
                    height={52}
                    width={345}
                    borderRadius={40}
                    fontSize={14}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 130,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: 'row',
        shadowColor: colors.primary.black[20],
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        right: 85,
    },
    titleContainer: {
        paddingLeft: 16,
        paddingTop: 24,
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.primary.black[60],
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 24,
        flexWrap: 'wrap', // Allow cards to wrap to the next line
        rowGap: 24, // Add space between rows of cards
    },
    card: {
        height: 140,
        width: 180,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: colors.primary.black[20],
        backgroundColor: colors.primary.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        gap: 24
    },
    selectedCard: {
        borderColor: colors.primary.blue[100],
    },
    emoji: {
        fontSize: 44,
        fontWeight: '700',
        lineHeight: 48,
        letterSpacing: -1,
    },
    habitText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0,
    },
    footer: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 32,
        marginVertical: 32,
    },
})

export default Page;