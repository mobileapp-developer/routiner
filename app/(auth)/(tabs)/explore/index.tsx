import React, {useState} from "react";
<<<<<<< Updated upstream:app/(auth)/(tabs)/explore.tsx
import {Alert, Animated, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
=======
import {Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import {Feather} from "@expo/vector-icons";
import {Link} from "expo-router";
>>>>>>> Stashed changes:app/(auth)/(tabs)/explore/index.tsx
import {palette} from "@/constants/palette";
import {POPULAR_HABITS} from "@/constants/popularHabits";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {PopularHabitCard} from "@/components/habits/PopularHabitCard";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
<<<<<<< Updated upstream:app/(auth)/(tabs)/explore.tsx
import {Challenge, HabitClub, Learning} from "@/constants/types";
import {CHALLENGES, HABIT_CLUBS, LEARNING_ITEMS} from "@/constants/data";
=======
import {LEARNING_ITEMS} from "@/constants/data";
import {LearningCard} from "@/components/habits/cards/LearningCard";
>>>>>>> Stashed changes:app/(auth)/(tabs)/explore/index.tsx

function SectionHeader({title, href}: { title: string; href: string }) {
    return (
        <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Link href={href as any} style={styles.sectionLink}>VIEW ALL</Link>
        </View>
    );
}

function ClubCard({club}: { club: HabitClub }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.clubCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View style={styles.clubIconBox}>
                    <Text style={styles.clubEmoji}>{club.emoji}</Text>
                </View>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubMembers}>{club.members}</Text>
            </Pressable>
        </Animated.View>
    );
}

function ChallengeCard({item}: { item: Challenge }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.challengeCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Ionicons
                    name='time-outline'
                    size={22}
                    color={palette.primary.white}
                    style={{marginBottom: 4}}
                />
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <Text style={styles.challengeTimeLeft}>{item.timeLeft}</Text>

                <View style={styles.challengeProgressBg}>
                    <View style={styles.challengeProgressFill}/>
                </View>

                <View style={styles.challengeFriendsRow}>
                    <View style={styles.challengeAvatarStack}>
                        {Array.from({length: Math.min(item.friendsJoined, 2)}).map(
                            (_, i) => (
                                <View
                                    key={`avatar-${i}`}
                                    style={[styles.challengeAvatar, {left: i * 16}]}
                                />
                            ),
                        )}
                    </View>
                    <Text style={styles.challengeFriendsText}>
                        {item.friendsJoined} friend{item.friendsJoined !== 1 ? "s" : ""}{" "}
                        joined
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}

function LearningCard({item}: { item: Learning }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.learningCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View
                    style={[styles.learningImage, {backgroundColor: item.bgColor}]}
                />
                <View style={styles.learningFooter}>
                    <View style={styles.learningBadge}>
                        <Feather name="book-open" size={11} color="#fff"/>
                    </View>
                    <Text style={styles.learningTitle}>{item.title}</Text>
                </View>
            </Pressable>
        </Animated.View>
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

    const filterHabits   = POPULAR_HABITS.filter(i => i.name.toLowerCase().includes(q));
    const filterLearning = LEARNING_ITEMS.filter(i => i.title.toLowerCase().includes(q));

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
                <SectionHeader title="Suggested for You" href="/explore/suggested" />
                <FlatList
                    data={filterHabits}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20, gap: 12}}
                    renderItem={({item}) => (
                        <PopularHabitCard
                            onPress={() => handleAddPopular(item)}
                            item={item}/>
                    )}
                />

                {/* Learning */}
                <SectionHeader title="Learning" href="/explore/learning" />
                <FlatList
                    data={filterLearning}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hList}
                    renderItem={({item}) => (
                        <LearningCard key={item.id} item={item} />
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
<<<<<<< Updated upstream:app/(auth)/(tabs)/explore.tsx
    suggestedCard: {
        width: 120,
        minHeight: 110,
        borderRadius: 16,
        padding: 14,
        marginRight: 12,
        gap: 4,
        justifyContent: "flex-end",
    },
    suggestedEmoji: {
        fontSize: 30,
        marginBottom: 4,
    },
    suggestedName: {
        fontSize: 15,
        fontWeight: "700",
        color: palette.primary.black[100],
    },
    suggestedGoal: {
        fontSize: 13,
        color: palette.primary.black[60],
    },
    clubCard: {
        width: 130,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
        padding: 14,
        marginRight: 12,
        gap: 6,
    },
    clubIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: palette.primary.blue[10],
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    clubEmoji: {
        fontSize: 24,
    },
    clubName: {
        fontSize: 14,
        fontWeight: "700",
        color: palette.primary.black[100],
    },
    clubMembers: {
        fontSize: 12,
        color: palette.primary.black[40],
    },
    challengeCard: {
        width: 185,
        backgroundColor: palette.primary.blue[100],
        borderRadius: 20,
        padding: 16,
        marginRight: 14,
        gap: 4,
    },
    challengeTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
    },
    challengeTimeLeft: {
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
    },
    challengeProgressBg: {
        height: 5,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginVertical: 8,
    },
    challengeProgressFill: {
        width: "55%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    challengeFriendsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 2,
    },
    challengeAvatarStack: {
        flexDirection: "row",
        position: "relative",
        width: 36,
        height: 24,
    },
    challengeAvatar: {
        position: "absolute",
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: palette.primary.blue[40],
        borderWidth: 2,
        borderColor: palette.primary.blue[100],
    },
    challengeFriendsText: {
        fontSize: 12,
        color: "rgba(255,255,255,0.9)",
    },
    learningCard: {
        width: 185,
        height: 155,
        borderRadius: 18,
        overflow: "hidden",
        marginRight: 14,
        backgroundColor: palette.primary.black[20],
    },
    learningImage: {
        flex: 1,
    },
    learningFooter: {
        backgroundColor: palette.primary.blue[100],
        padding: 12,
        gap: 6,
    },
    learningBadge: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    learningTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
    },
=======
>>>>>>> Stashed changes:app/(auth)/(tabs)/explore/index.tsx
});

export default Explore;

