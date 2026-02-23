import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import {palette} from "@/constants/palette";
import {useRouter} from "expo-router";

const Profile = () => {
    const router = useRouter();
    const {signOut} = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/(public)/onboarding');
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.signOutButton}
                onPress={handleSignOut}
            >
                <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.white,
    },
    signOutButton: {
        height: 52,
        backgroundColor: palette.primary.black[20],
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: 64
    },
    signOutText: {
        fontSize: 14,
        fontWeight: '600',
        color: palette.primary.black[100],
    },
});

export default Profile;
