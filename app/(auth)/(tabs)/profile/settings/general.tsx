import {Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import BackButton from "@/components/ui/BackButton";
import {palette} from "@/constants/palette";
import {useGeneralPreferences} from "@/hooks/useGeneralPreferences";

export default function General() {
const {preferences, updatePreference} = useGeneralPreferences();

    const showComingSoon = (label: string) => {
        Alert.alert("Coming soon", `${label} settings will be available soon.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>General</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.labelCont}>
                    <Text style={styles.label}>PREFERENCES</Text>
                </View>

                <View style={styles.section}>
                    <Pressable style={styles.item} onPress={() => showComingSoon("Language")}>
                        <Text style={styles.itemText}>Language</Text>
                        <View style={styles.trailingContainer}>
                            <Text style={styles.trailingText}>English</Text>
                            <Ionicons name="chevron-forward" size={22} color={palette.primary.black[40]}/>
                        </View>
                    </Pressable>

                    <View style={styles.separator}/>

                    <Pressable style={styles.item} onPress={() => showComingSoon("Start of Week")}>
                        <Text style={styles.itemText}>Start of Week</Text>
                        <View style={styles.trailingContainer}>
                            <Text style={styles.trailingText}>Monday</Text>
                            <Ionicons name="chevron-forward" size={22} color={palette.primary.black[40]}/>
                        </View>
                    </Pressable>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Haptics</Text>
                        <Switch
                            value={preferences.hapticsEnabled}
                            onValueChange={(value) => updatePreference("hapticsEnabled", value)}
                        />
                    </View>
                </View>

                <View style={styles.labelCont}>
                    <Text style={styles.label}>DATE & TIME</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>24-Hour Time</Text>
                        <Switch
                            value={preferences.is24HourTime}
                            onValueChange={(value) => updatePreference("is24HourTime", value)}
                        />
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Set Time Zone Automatically</Text>
                        <Switch
                            value={preferences.autoTimezone}
                            onValueChange={(value) => updatePreference("autoTimezone", value)}
                        />
                    </View>
                </View>

                <View style={styles.labelCont}>
                    <Text style={styles.label}>CONTENT</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Streak Celebrations</Text>
                        <Switch
                            value={preferences.streakCelebrations}
                            onValueChange={(value) => updatePreference("streakCelebrations", value)}
                        />
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Reduce Motion</Text>
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
        backgroundColor: "#f8f8f8",
    },
    header: {
        height: 130,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: "row",
        shadowColor: palette.primary.black[20],
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
        color: palette.primary.black[40],
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
        backgroundColor: palette.primary.white,
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
        color: palette.primary.black[100],
    },
    trailingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    trailingText: {
        fontSize: 14,
        fontWeight: "500",
        color: palette.primary.black[40],
    },
    separator: {
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        marginHorizontal: 16,
    },
});
