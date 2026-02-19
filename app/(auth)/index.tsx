import React from 'react';
import {StyleSheet} from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import {colors} from "@/theme/colors";
import {Redirect} from "expo-router";

const AuthIndex = () => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)/(tabs)/home" />;
    }
};

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)/(tabs)/home" />;
    }
};

export default AuthIndex;