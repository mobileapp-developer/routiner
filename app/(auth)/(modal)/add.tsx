import {Animated, Pressable, StyleSheet, View} from "react-native";
import {useSlideAnimation} from "@/hooks/useSlideAnimation";
import {useRouter} from "expo-router";
import AddModalCard from "@/components/habits/cards/AddModalCard";
import AddMoodCard from "@/components/habits/cards/AddMoodCard";

export default function AddModal() {
    const router = useRouter();
    const {slideValue} = useSlideAnimation();
    return (
        <Pressable style={styles.overlay} onPress={() => router.back()}>
            <Animated.View style={[styles.container, {transform: [{translateY: slideValue}]}]}>
                <Pressable style={styles.cards} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.card}>
                        <AddModalCard
                            title='Quit Bad Habit'
                            subtitle='Never too late...'
                            icon={require('@/assets/icons/shield-failed.png')}
                            onPress={() => router.push('/(auth)/(modal)/quit-habit')}
                        />
                        <AddModalCard
                            title='New Good Habit'
                            subtitle='For a better life'
                            icon={require('@/assets/icons/shield-done.png')}
                            onPress={() => router.push('/(auth)/(modal)/add-habit')}
                        />
                    </View>
                    <AddMoodCard/>
                </Pressable>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingBottom: 100,
        gap: 12,
    },
    cards: {
        flexDirection: 'column',
        gap: 12,
    },
    card: {
        flexDirection: 'row',
        gap: 12,
    },
});