import React from 'react';
import {Redirect} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

const AuthIndex = () => {
    const {isLoaded, isSignedIn} = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)/(tabs)/home"/>;
    }
};

export default AuthIndex;