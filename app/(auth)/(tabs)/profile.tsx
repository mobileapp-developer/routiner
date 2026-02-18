import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import {colors} from "@/theme/colors";

const Profile = () => {
    const {signOut} = useAuth();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.signOutButton}
                onPress={() => signOut()}
            >
                <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary.white,
    },
    signOutButton: {
        height: 52,
        backgroundColor: colors.primary.black[20],
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: 64
    },
    signOutText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary.black[100],
    },
});

export default Profile;
