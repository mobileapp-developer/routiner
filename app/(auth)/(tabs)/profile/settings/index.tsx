import {useState} from "react";
import {Alert, Pressable, StyleSheet, Switch, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import BackButton from "@/components/ui/BackButton";
import {useRouter} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";
import {useThemeMode} from "@/hooks/useThemeMode";
import {usePalette} from "@/hooks/usePalette";

export default function Index() {
    const {mode, setUseSystemTheme, setDarkMode} = useThemeMode();
    const [sounds, setSounds]             = useState(false);
    const [vacationMode, setVacationMode] = useState(false);

    const router = useRouter();
    const {signOut} = useAuth();

    const palette = usePalette();

    const handleDarkModeChange = (value: boolean) => {
        setUseSystemTheme(false);
        setDarkMode(value);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/(public)/onboarding');
        } catch (error) {
            console.error('Sign out failed:', error);
            Alert.alert('Sign Out Failed', 'Please try again.');
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <View style={[styles.header, {backgroundColor: palette.primary.white, shadowColor: palette.primary.black[20]}]}>
                <BackButton/>
                <Text style={[styles.headerText, {color: palette.primary.black[100]}]}>Settings</Text>
            </View>

            <View style={styles.labelCont}>
                <Text style={[styles.label, {color: palette.primary.black[40]}]}>GENERAL</Text>
            </View>

            <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                <Pressable style={styles.item} onPress={() => router.push('./settings/general')}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>General</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Use System Theme</Text>
                    <Switch value={mode.useSystemTheme} onValueChange={setUseSystemTheme}/>
                </View>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Dark Mode</Text>
                    <Switch value={mode.isDarkMode} onValueChange={handleDarkModeChange} disabled={mode.useSystemTheme}/>
                </View>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <Pressable style={styles.item} onPress={() => router.push('./settings/security')}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Security</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <Pressable style={styles.item} onPress={() => router.push('./settings/notifications')}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Notifications</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Sounds</Text>
                    <Switch value={sounds} onValueChange={setSounds}/>
                </View>

                <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Vacation Mode</Text>
                    <Switch value={vacationMode} onValueChange={setVacationMode}/>
                </View>
            </View>

            <View style={styles.labelCont}>
                <Text style={[styles.label, {color: palette.primary.black[40]}]}>ABOUT US</Text>
            </View>

            <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                <Pressable style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Rate Routiner</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>About Us</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Support</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item} onPress={handleSignOut}>
                    <Text style={[styles.itemText, {color: palette.primary.redError[100]}]}>Sign Out</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 130,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: "row",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        right: 200
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        paddingTop: 20,
    },
    labelCont: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    section: {
        width: '92%',
        borderRadius: 18,
        alignSelf: 'center'
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
        alignSelf: 'center'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    separator: {
        borderWidth: 1,
        marginHorizontal: 16,
    },
})