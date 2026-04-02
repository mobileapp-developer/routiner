import {Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import BackButton from "@/components/ui/BackButton";
import {useGeneralPreferences} from "@/hooks/useGeneralPreferences";
import {usePalette} from "@/hooks/usePalette";

export default function General() {
const {preferences, updatePreference} = useGeneralPreferences();
    const palette = usePalette();

    const showComingSoon = (label: string) => {
        Alert.alert("Coming soon", `${label} settings will be available soon.`);
    };

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <View style={[styles.header, {backgroundColor: palette.primary.white, shadowColor: palette.primary.black[20]}]}>
                <BackButton/>
                <Text style={[styles.headerText, {color: palette.primary.black[100]}]}>General</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.labelCont}>
                    <Text style={[styles.label, {color: palette.primary.black[40]}]}>PREFERENCES</Text>
                </View>

                <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                    <Pressable style={styles.item} onPress={() => showComingSoon("Language")}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Language</Text>
                        <View style={styles.trailingContainer}>
                            <Text style={[styles.trailingText, {color: palette.primary.black[40]}]}>English</Text>
                            <Ionicons name="chevron-forward" size={22} color={palette.primary.black[40]}/>
                        </View>
                    </Pressable>

                    <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                    <Pressable style={styles.item} onPress={() => showComingSoon("Start of Week")}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Start of Week</Text>
                        <View style={styles.trailingContainer}>
                            <Text style={[styles.trailingText, {color: palette.primary.black[40]}]}>Monday</Text>
                            <Ionicons name="chevron-forward" size={22} color={palette.primary.black[40]}/>
                        </View>
                    </Pressable>

                    <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                    <View style={styles.item}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Haptics</Text>
                        <Switch
                            value={preferences.hapticsEnabled}
                            onValueChange={(value) => updatePreference("hapticsEnabled", value)}
                        />
                    </View>
                </View>

                <View style={styles.labelCont}>
                    <Text style={[styles.label, {color: palette.primary.black[40]}]}>DATE & TIME</Text>
                </View>

                <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>24-Hour Time</Text>
                        <Switch
                            value={preferences.is24HourTime}
                            onValueChange={(value) => updatePreference("is24HourTime", value)}
                        />
                    </View>

                    <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                    <View style={styles.item}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Set Time Zone Automatically</Text>
                        <Switch
                            value={preferences.autoTimezone}
                            onValueChange={(value) => updatePreference("autoTimezone", value)}
                        />
                    </View>
                </View>

                <View style={styles.labelCont}>
                    <Text style={[styles.label, {color: palette.primary.black[40]}]}>CONTENT</Text>
                </View>

                <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Streak Celebrations</Text>
                        <Switch
                            value={preferences.streakCelebrations}
                            onValueChange={(value) => updatePreference("streakCelebrations", value)}
                        />
                    </View>

                    <View style={[styles.separator, {borderColor: palette.primary.black[10]}]}/>

                    <View style={styles.item}>
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Reduce Motion</Text>
                        <Switch
                            value={preferences.reduceMotion}
                            onValueChange={(value) => updatePreference("reduceMotion", value)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 130,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: "row",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        paddingHorizontal: 20,
    },
    content: {
        paddingBottom: 28,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 1,
        paddingTop: 20,
    },
    labelCont: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    section: {
        width: "92%",
        borderRadius: 18,
        alignSelf: "center",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
    },
    trailingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    trailingText: {
        fontSize: 14,
        fontWeight: "500",
    },
    separator: {
        borderWidth: 1,
        marginHorizontal: 16,
    },
});
