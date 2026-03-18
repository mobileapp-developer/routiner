import {useState} from "react";
import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import {palette} from "@/constants/palette";
import {Ionicons} from "@expo/vector-icons";
import BackButton from "@/components/ui/BackButton";
import {useRouter} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

export default function Settings() {
    const [darkMode, setDarkMode]         = useState(false);
    const [sounds, setSounds]             = useState(false);
    const [vacationMode, setVacationMode] = useState(false);

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
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.labelCont}>
                <Text style={styles.label}>GENERAL</Text>
            </View>

            <View style={styles.section}>
                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>General</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={styles.separator}/>

                <View style={styles.item}>
                    <Text style={styles.itemText}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode}/>
                </View>

                <View style={styles.separator}/>

                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>Security</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={styles.separator}/>

                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>Notifications</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <View style={styles.separator}/>

                <View style={styles.item}>
                    <Text style={styles.itemText}>Sounds</Text>
                    <Switch value={sounds} onValueChange={setSounds}/>
                </View>

                <View style={styles.separator}/>

                <View style={styles.item}>
                    <Text style={styles.itemText}>Vacation Mode</Text>
                    <Switch value={vacationMode} onValueChange={setVacationMode}/>
                </View>
            </View>

            <View style={styles.labelCont}>
                <Text style={styles.label}>ABOUT US</Text>
            </View>

            <View style={styles.section}>
                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>Rate Routiner</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>About Us</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item}>
                    <Text style={styles.itemText}>Support</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>

                <Pressable style={styles.item} onPress={handleSignOut}>
                    <Text style={[styles.itemText, {color: palette.primary.redError[100]}]}>Sign Out</Text>
                    <Ionicons name='chevron-forward' size={24} color={palette.primary.black[40]}/>
                </Pressable>
            </View>
        </View>
    )
}

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
        shadowColor: palette.primary.black[20],
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
        color: palette.primary.black[40],
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
        backgroundColor: palette.primary.white,
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
        borderColor: palette.primary.black[10],
        marginHorizontal: 16,
    },
})