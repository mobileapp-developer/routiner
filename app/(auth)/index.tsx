import React from 'react';
import {useAuth} from "@clerk/clerk-expo";
import {Redirect} from "expo-router";

const AuthIndex = () => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)/(tabs)/home" />;
    }
};

export default AuthIndex;