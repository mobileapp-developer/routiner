import React, {useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUser} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useTotalPoints} from "@/hooks/useTotalPoints";
import {usePointsLogs} from "@/hooks/usePointsLogs";
import {ActivityItem} from "@/constants/types";
import {usePalette} from "@/hooks/usePalette";

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

function ActivityCard({item, palette}: {item: ActivityItem, palette: ReturnType<typeof usePalette>}) {
    return (
        <View style={[styles.activityCard, {backgroundColor: palette.primary.white}] }>
            <View style={styles.activityLeft}>
                <Text style={[styles.activityTitle, {color: palette.primary.black[100]}]}>
                    {item.points > 0 ? `${item.points} points earned!` : `${Math.abs(item.points)} points lost!`}
                </Text>
                <Text style={[styles.activitySub, {color: palette.primary.black[40]}]}>{item.habitName} • {formatDate(item.loggedAt)}</Text>
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

    const palette = usePalette();

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
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <View style={[styles.header, {backgroundColor: palette.primary.white, borderBottomColor: palette.primary.black[10]}]}>
                <View style={styles.section}>
                    <Text style={[styles.screenTitle, {color: palette.primary.black[100]}]}>Profile</Text>
                    <View style={[styles.settingsButton, {borderColor: palette.primary.black[20]}]}>
                        <Pressable onPress={onSettingsPress}>
                            <Ionicons name='settings' size={24} color={palette.primary.black[40]}/>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.profile}>
                    <Pressable onPress={onAvatarPress} disabled={uploading} style={[styles.avatar, {backgroundColor: palette.primary.green[20]}]}>
                        {user?.imageUrl ? (
                            <Image source={{uri: user.imageUrl}} style={styles.avatarImage}/>
                        ) : null}
                        {uploading ? <ActivityIndicator/> : null}
                    </Pressable>
                    <View style={styles.userNameContainer}>
                        <Text style={[styles.userName, {color: palette.primary.black[100]}]}>{user?.firstName} {user?.lastName}</Text>
                        <View style={[styles.pointsContainer, {
                            backgroundColor: palette.primary.orangeWarning[20],
                            borderColor: palette.primary.orangeWarning[80],}] }>
                            <FontAwesome5 name='medal' size={16} color={palette.primary.orangeWarning[100]}/>
                            <Text style={[styles.habitPoints, {color: palette.primary.orangeWarning[100],}]}>{totalPoints}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={activityData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scroll}
                ListHeaderComponent={
                    <View style={[styles.activityHeader, {backgroundColor: palette.primary.white}]}>
                        <Text style={[styles.activityTitle2, {color: palette.primary.black[60]}]}>
                            Showing last {activityPeriod === 'week' ? 'week' : 'month'} activity
                        </Text>
                        <View style={[styles.filter, {backgroundColor: palette.primary.black[10]}]}>
                            <Pressable
                                style={[styles.filterBtn, activityPeriod === 'week' && [styles.filterBtnActive, {backgroundColor: palette.primary.white}]]}
                                onPress={() => setActivityPeriod('week')}
                            >
                                <Text style={[styles.filterText, {color: palette.primary.black[40]}, activityPeriod === 'week' && [styles.filterTextActive, {color: palette.primary.blue[100]}]]}>Week</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.filterBtn, activityPeriod === 'month' && [styles.filterBtnActive, {backgroundColor: palette.primary.white}]]}
                                onPress={() => setActivityPeriod('month')}
                            >
                                <Text style={[styles.filterText, {color: palette.primary.black[40]}, activityPeriod === 'month' && [styles.filterTextActive, {color: palette.primary.blue[100]}]]}>Month</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                renderItem={({item}) => <ActivityCard item={item} palette={palette}/>}
                ListEmptyComponent={
                    <Text style={[styles.empty, {color: palette.primary.black[40]}]}>No activity yet</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 20,
        borderBottomWidth: 1.5,
        gap: 12,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
    },
    settingsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 20,
        borderWidth: 1,
    },
    profile: {
        flexDirection: 'row',
    },
    avatar: {
        height: 56,
        width: 56,
        borderRadius: 28,
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
        borderWidth: 0.5,
        borderRadius: 18,
    },
    habitPoints: {
        fontSize: 16,
        fontWeight: '600',
    },
    scroll: {
        paddingBottom: 120,
        gap: 12,
    },
    activityHeader: {
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
    },
    filter: {
        flexDirection: 'row',
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
        // color is applied dynamically from palette
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextActive: {
        // color is applied dynamically from palette
        fontWeight: '600',
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    activitySub: {
        fontSize: 12,
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
        fontSize: 13,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
});