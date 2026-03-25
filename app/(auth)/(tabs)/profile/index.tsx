import React, {useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUser} from "@clerk/clerk-expo";
import {palette} from "@/constants/palette";
import {useRouter} from "expo-router";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useTotalPoints} from "@/hooks/useTotalPoints";
import {usePointsLogs} from "@/hooks/usePointsLogs";

type ActivityItem = {
    id: number;
    points: number;
    date: string;
    loggedAt: string | null;
    habitName: string;
}

function formatDate(loggedAt: string | null) {
    if (!loggedAt) return '';
    const date = new Date(loggedAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return `Today, ${date.toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit'})}`;
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${date.toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit'})}`;
    }
    return `${date.toLocaleDateString('en', {day: 'numeric', month: 'short'})}, ${date.toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit'})}`;
}

function ActivityCard({item}: {item: ActivityItem}) {
    return (
        <View style={styles.activityCard}>
            <View style={styles.activityLeft}>
                <Text style={styles.activityTitle}>
                    {item.points > 0 ? `${item.points} points earned!` : `${Math.abs(item.points)} points lost!`}
                </Text>
                <Text style={styles.activitySub}>{item.habitName} • {formatDate(item.loggedAt)}</Text>
            </View>
            <View style={[styles.activityIcon, {backgroundColor: item.points > 0 ? palette.primary.green[10] : palette.primary.redError[10]}]}>
                <Ionicons
                    name={item.points > 0 ? 'arrow-up' : 'arrow-down'}
                    size={20}
                    color={item.points > 0 ? palette.primary.green[100] : palette.primary.redError[100]}
                />
            </View>
        </View>
    );
}

export default function Profile() {
    const [uploading, setUploading] = useState(false);
    const [activityPeriod, setActivityPeriod] = useState<'week' | 'month'>('week');

    const router = useRouter();
    const {user} = useUser();
    const {dbUserId} = useCurrentUser();
    const {data: totalPoints} = useTotalPoints(dbUserId);

    const getDateRange = () => {
        const today = new Date();
        const to = today.toISOString().split('T')[0];
        const from = new Date(today);
        from.setDate(today.getDate() - (activityPeriod === 'week' ? 7 : 30));
        return {from: from.toISOString().split('T')[0], to};
    };

    const {from, to} = getDateRange();
    const {data: activityData = []} = usePointsLogs(dbUserId, from, to);

    const onSettingsPress = () => router.push('/profile/settings');

    const onAvatarPress = async () => {
        if (!user) return;
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission needed', 'Please allow photo library access to choose an avatar.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });
        if (result.canceled || !result.assets?.length) return;
        try {
            setUploading(true);
            const asset = result.assets[0];
            const mimeType = asset.mimeType ?? 'image/jpeg';
            const base64 = asset.base64;
            if (!base64) {
                Alert.alert('Upload failed', 'Could not read selected image. Please try again.');
                return;
            }
            await user.setProfileImage({file: `data:${mimeType};base64,${base64}`});
            await user.reload();
        } catch (e) {
            Alert.alert('Upload failed', 'Could not update avatar. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.section}>
                    <Text style={styles.screenTitle}>Profile</Text>
                    <View style={styles.settingsButton}>
                        <Pressable onPress={onSettingsPress}>
                            <Ionicons name='settings' size={24} color={palette.primary.black[40]}/>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.profile}>
                    <Pressable onPress={onAvatarPress} disabled={uploading} style={styles.avatar}>
                        {user?.imageUrl ? (
                            <Image source={{uri: user.imageUrl}} style={styles.avatarImage}/>
                        ) : null}
                        {uploading ? <ActivityIndicator/> : null}
                    </Pressable>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                        <View style={styles.pointsContainer}>
                            <FontAwesome5 name='medal' size={16} color={palette.primary.orangeWarning[100]}/>
                            <Text style={styles.habitPoints}>{totalPoints}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={activityData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scroll}
                ListHeaderComponent={
                    <View style={styles.activityHeader}>
                        <Text style={styles.activityTitle2}>
                            Showing last {activityPeriod === 'week' ? 'week' : 'month'} activity
                        </Text>
                        <View style={styles.filter}>
                            <Pressable
                                style={[styles.filterBtn, activityPeriod === 'week' && styles.filterBtnActive]}
                                onPress={() => setActivityPeriod('week')}
                            >
                                <Text style={[styles.filterText, activityPeriod === 'week' && styles.filterTextActive]}>Week</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.filterBtn, activityPeriod === 'month' && styles.filterBtnActive]}
                                onPress={() => setActivityPeriod('month')}
                            >
                                <Text style={[styles.filterText, activityPeriod === 'month' && styles.filterTextActive]}>Month</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                renderItem={({item}) => <ActivityCard item={item}/>}
                ListEmptyComponent={
                    <Text style={styles.empty}>No activity yet</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.black[10],
    },
    header: {
        backgroundColor: palette.primary.white,
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: palette.primary.black[10],
        gap: 12,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: palette.primary.black[100],
        marginBottom: 4,
    },
    settingsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 20,
        borderColor: palette.primary.black[20],
        borderWidth: 1,
    },
    profile: {
        flexDirection: 'row',
    },
    avatar: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: palette.primary.green[20],
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        height: '100%',
        width: '100%',
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        color: palette.primary.black[100],
    },
    userNameContainer: {
        flexDirection: 'column',
        paddingHorizontal: 16,
    },
    pointsContainer: {
        marginRight: 110,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: palette.primary.orangeWarning[20],
        borderColor: palette.primary.orangeWarning[80],
        borderWidth: 0.5,
        borderRadius: 18,
    },
    habitPoints: {
        fontSize: 16,
        fontWeight: '600',
        color: palette.primary.orangeWarning[100],
    },
    scroll: {
        paddingBottom: 120,
        gap: 12,
    },
    activityHeader: {
        backgroundColor: palette.primary.white,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    activityTitle2: {
        fontSize: 14,
        fontWeight: '500',
        color: palette.primary.black[60],
    },
    filter: {
        flexDirection: 'row',
        backgroundColor: palette.primary.black[10],
        borderRadius: 10,
        padding: 3,
        gap: 4,
    },
    filterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
    },
    filterBtnActive: {
        backgroundColor: palette.primary.white,
    },
    filterText: {
        fontSize: 14,
        color: palette.primary.black[40],
        fontWeight: '500',
    },
    filterTextActive: {
        color: palette.primary.blue[100],
        fontWeight: '600',
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.primary.white,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
    },
    activityLeft: {
        gap: 4,
        flex: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: palette.primary.black[100],
    },
    activitySub: {
        fontSize: 12,
        color: palette.primary.black[40],
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        textAlign: 'center',
        color: palette.primary.black[40],
        fontSize: 13,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
});