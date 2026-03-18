import React, {useState} from 'react';
import {ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUser} from "@clerk/clerk-expo";
import {palette} from "@/constants/palette";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
    const [uploading, setUploading] = useState(false);

    const router = useRouter();
    const {user} = useUser();

    const onSettingsPress = () => router.push('/profile/settings');

    const onAvatarPress = async () => {
        if (!user) return;

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission needed',
                'Please allow photo library access to choose an avatar.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (result.canceled || !result.assets?.length) return;

        try {
            setUploading(true);
            const asset = result.assets[0];

            // Convert local URI -> Blob -> File for Clerk upload
            const blob = await (await fetch(asset.uri)).blob();
            const file = new File([blob], 'avatar.jpg', {
                type: asset.mimeType ?? 'image/jpeg',
            });

            await user.setProfileImage({file});
            await user.reload();
        } catch (e) {
            Alert.alert('Upload failed', 'Could not update avatar. Please try again.');
        } finally {
            setUploading(false);
        }
    }

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
                            <Image source={{uri: user.imageUrl}} style={styles.avatarImage} />
                        ) : null}
                        {uploading ? <ActivityIndicator /> : null}
                    </Pressable>
                    <Text style={styles.userName}>
                        {user?.firstName} {user?.lastName}
                    </Text>
                </View>
            </View>
        </View>
    );
};

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
        flexDirection: 'row'

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
    editButton: {

    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
        paddingHorizontal: 16,
        color: palette.primary.black[100],
    },
});