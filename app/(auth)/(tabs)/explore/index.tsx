import React, {useState} from "react";
import {Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import {Feather} from "@expo/vector-icons";
import {palette} from "@/constants/palette";
import {POPULAR_HABITS} from "@/constants/popularHabits";
import {PopularHabitCard} from "@/components/habits/cards/PopularHabitCard";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {LEARNING_ITEMS} from "@/constants/data";
import {LearningCard} from "@/components/habits/cards/LearningCard";
import {Link} from "expo-router";

function SectionHeader({title, href}: { title: string; href?: string }) {
    return (
        <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {href ? (
                <Link href={href as any} style={styles.sectionLink}>
                    VIEW ALL
                </Link>
            ) : (
                <Text style={styles.sectionLink}>VIEW ALL</Text>
            )}
        </View>
    );
}

const Explore = () => {
    const {dbUserId} = useCurrentUser();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleAddPopular = async (item: typeof POPULAR_HABITS[0]) => {
        if (!dbUserId) return;

        await createHabit({
            userId: dbUserId,
            name: item.name,
            icon: item.emoji,
            color: item.color,
            type: 'count',
            goalValue: item.goalValue,
            goalUnit: item.goalUnit,
            frequencyType: 'daily',
        });
        Alert.alert('Habit added successfully!');
    }

    const q = query.toLowerCase();

    const filterHabits     = POPULAR_HABITS.filter(i => i.name.toLowerCase().includes(q));
    const filterLearning   = LEARNING_ITEMS.filter(i => i.title.toLowerCase().includes(q));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    {isSearching ? (
                        <TextInput
                            autoFocus
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search habits, clubs..."
                            style={styles.searchInput}
                            onBlur={() => {
                                if (!query) setIsSearching(false);
                            }}
                        />
                    ) : (
                        <Text style={styles.headerTitle}>Explore</Text>
                    )}

                    <Pressable
                        style={styles.searchBtn}
                        onPress={() => {
                            if (isSearching) {
                                setQuery('');
                                setIsSearching(false);
                            } else {
                                setIsSearching(true);
                            }
                        }}
                    >
                        <Feather
                            name={isSearching ? 'x' : 'search'}
                            size={18}
                            color={palette.primary.black[60]}
                        />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {/* Suggested for You */}
                <SectionHeader title="Suggested for You" href="/(auth)/(tabs)/explore/suggested"/>
                <FlatList
                    data={filterHabits}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hList}
                    renderItem={({item}) => (
                        <PopularHabitCard
                            onPress={() => handleAddPopular(item)}
                            item={item}
                        />
                    )}
                />

                {/* Learning */}
                <SectionHeader title="Learning" href="/(auth)/(tabs)/explore/learning"/>
                <FlatList
                    data={filterLearning}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hList}
                    renderItem={({item}) => (
                        <LearningCard key={item.id} item={item}/>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.white,
    },
    header: {
        backgroundColor: palette.primary.white,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: palette.primary.black[10],
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: palette.primary.black[100],
    },
    searchBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: palette.primary.black[10],
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: palette.primary.black[100],
        paddingVertical: 4,
    },
    scroll: {
        paddingTop: 24,
        gap: 24,
    },
    hList: {
        paddingHorizontal: 20,
        gap: 12,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: palette.primary.black[100],
    },
    sectionLink: {
        fontSize: 13,
        fontWeight: "700",
        color: palette.primary.blue[100],
    },
});

export default Explore;

