import React, {useRef, useState} from "react";
import {Alert, Animated, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import {Feather} from "@expo/vector-icons";
import {palette} from "@/constants/palette";
import {POPULAR_HABITS} from "@/constants/habits";
import {PopularHabitCard} from "@/components/habits/cards/PopularHabitCard";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {LEARNING_ITEMS} from "@/constants/data";
import {LearningCard} from "@/components/habits/cards/LearningCard";
import {Link} from "expo-router";
import {useQueryClient} from "@tanstack/react-query";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {HABITS_QUERY_KEY} from "@/hooks/useHabits";

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
    const queryClient = useQueryClient();
    const {dbUserId} = useCurrentUser();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const searchWidth  = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(1)).current;
    const inputOpacity = useRef(new Animated.Value(0)).current;

    const openSearch = () => {
        setIsSearching(true);
        Animated.parallel([
            Animated.timing(searchWidth, {toValue: 1, duration: 300, useNativeDriver: false}),
            Animated.timing(titleOpacity, {toValue: 0, duration: 150, useNativeDriver: true}),
            Animated.timing(inputOpacity, {toValue: 1, duration: 300, useNativeDriver: true}),
        ]).start();
    };

    const closeSearch = () => {
        Animated.parallel([
            Animated.timing(searchWidth,  {toValue: 0, duration: 250, useNativeDriver: false}),
            Animated.timing(titleOpacity, {toValue: 1, duration: 250, useNativeDriver: true}),
            Animated.timing(inputOpacity, {toValue: 0, duration: 150, useNativeDriver: true}),
        ]).start(() => {
            setIsSearching(false);
            setQuery('');
        });
    };

    const animatedWidth = searchWidth.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 320],
    });

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
            points: item.points,
        });
        Alert.alert('Habit added successfully!');
        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        });
        await queryClient.invalidateQueries({
            queryKey: HABITS_QUERY_KEY
        });
    }

    const q = query.toLowerCase();

    const filterHabits   = POPULAR_HABITS.filter(i => i.name.toLowerCase().includes(q));
    const filterLearning = LEARNING_ITEMS.filter(i => i.title.toLowerCase().includes(q));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Animated.Text style={[styles.headerTitle, {opacity: titleOpacity}]} numberOfLines={1}>
                        Explore
                    </Animated.Text>

                    {isSearching && (
                        <Animated.View style={[styles.searchInputWrapper, {width: animatedWidth}]}>
                            <Animated.View style={{flex: 1, opacity: inputOpacity}}>
                                <TextInput
                                    autoFocus
                                    value={query}
                                    onChangeText={setQuery}
                                    placeholder="Search habits..."
                                    placeholderTextColor={palette.primary.black[40]}
                                    style={styles.searchInput}
                                />
                            </Animated.View>
                        </Animated.View>
                    )}

                    <Pressable
                        style={styles.searchBtn}
                        onPress={isSearching ? closeSearch : openSearch}
                        hitSlop={8}
                    >
                        <Feather
                            name={isSearching ? 'x' : 'search'}
                            size={20}
                            color={palette.primary.black[100]}
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
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
        height: 44,
    },
    headerTitle: {
        position: 'absolute',
        left: 0,
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
        flexShrink: 0,
    },
    searchInputWrapper: {
        height: 40,
        backgroundColor: palette.primary.black[10],
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        fontSize: 15,
        fontWeight: '500',
        color: palette.primary.black[100],
        paddingVertical: 12,
        paddingHorizontal: 16,
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

