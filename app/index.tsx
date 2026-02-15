import {Image, Text, StyleSheet, View, Pressable} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";
import {colors} from "@/theme/colors";
import {useEffect} from "react";

const Splash = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/(public)/onboarding");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.primary.blue[80], colors.primary.blue[100]]}
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                <View style={styles.centerContent}>
                    <Image source={require('../assets/logo.png')}/>
                    <Image style={{position: 'absolute'}} source={require('../assets/Circle BG.png')}/>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Splash;