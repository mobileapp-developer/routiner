import {useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useSignUp} from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {HABITS} from "@/constants/habits";
import {palette} from "@/constants/palette";
import BackButton from "@/components/ui/BackButton";
import AuthButton from "@/components/ui/AuthButton";
import {createUser} from "@/db/user";
import {createHabit} from "@/db/habit";

const Page = () => {
    const router = useRouter();
    const {setActive} = useSignUp();
    const {sessionId, clerkId, firstName} = useLocalSearchParams();
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

    const handleNext = async () => {
        if (!selectedHabit) return;

        const gender = await AsyncStorage.getItem('gender');
        const habit = HABITS.find(h => h.id === selectedHabit);

        const newUser = await createUser({
            clerkId: clerkId as string,
            name: firstName as string ?? 'User',
            gender: gender ?? 'other',
        });

        await createHabit({
<<<<<<< Updated upstream
            userId: newUser.lastInsertRowId,
            name: habit!.text,
            icon: habit!.emoji,
            type: 'yesno',
=======
            userId:        newUser.lastInsertRowId,
            name:          habit!.name,
            icon:          habit!.emoji,
            type:          'yesno',
>>>>>>> Stashed changes
            frequencyType: 'daily',
        });

        await AsyncStorage.removeItem('gender');
        await setActive!({session: sessionId as string});
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
                            <Text style={styles.habitText}>{habit.name}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>

            <View style={styles.footer}>
                <AuthButton
                    text='Next'
                    backgroundColor={selectedHabit ? palette.primary.blue[100] : palette.primary.black[20]}
                    textColor={palette.primary.white}
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
        shadowColor: palette.primary.black[20],
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
        color: palette.primary.black[60],
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 24,
        flexWrap: 'wrap',
        rowGap: 24,
    },
    card: {
        height: 140,
        width: 180,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: palette.primary.black[20],
        backgroundColor: palette.primary.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        gap: 24
    },
    selectedCard: {
        borderColor: palette.primary.blue[100],
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