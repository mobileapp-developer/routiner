import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import BackButton from "@/components/ui/BackButton";
import {palette} from "@/constants/palette";

const SECURITY_PREFS_KEY = "security-preferences";

type SecurityPreferences = {
    biometricUnlock: boolean;
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    hideActivityStatus: boolean;
};

const defaultPreferences: SecurityPreferences = {
    biometricUnlock: false,
    twoFactorAuth: false,
    loginAlerts: true,
    hideActivityStatus: false,
};

const isValidSecurityPreferences = (value: unknown): value is SecurityPreferences => {
    if (!value || typeof value !== "object") return false;
    const data = value as Record<string, unknown>;
    return [
        "biometricUnlock",
        "twoFactorAuth",
        "loginAlerts",
        "hideActivityStatus",
    ].every((key) => typeof data[key] === "boolean");
};

export default function SecurityScreen() {
    const [preferences, setPreferences] = useState<SecurityPreferences>(defaultPreferences);

    useEffect(() => {
        hydrateSecurityPreferences();
    }, []);

    const persistPreferences = async (nextPreferences: SecurityPreferences) => {
        try {
            await AsyncStorage.setItem(SECURITY_PREFS_KEY, JSON.stringify(nextPreferences));
        } catch (error) {
            console.error("Failed to save security preferences", error);
        }
    };

    const hydrateSecurityPreferences = async () => {
        try {
            const raw = await AsyncStorage.getItem(SECURITY_PREFS_KEY);
            if (!raw) return;

            const parsed = JSON.parse(raw) as unknown;
            if (!isValidSecurityPreferences(parsed)) {
                await AsyncStorage.removeItem(SECURITY_PREFS_KEY);
                return;
            }

            setPreferences(parsed);
        } catch (error) {
            console.error("Failed to load security preferences", error);
        }
    };

    const updatePreference = (key: keyof SecurityPreferences, value: boolean) => {
        setPreferences((prev) => {
            const next = {
                ...prev,
                [key]: value,
            };

            void persistPreferences(next);
            return next;
        });
    };

    const showComingSoon = (label: string) => {
        Alert.alert("Coming soon", `${label} will be available soon.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>Security</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.labelCont}>
                    <Text style={styles.label}>ACCOUNT SECURITY</Text>
                </View>

                <View style={styles.section}>
                    <Pressable style={styles.item} onPress={() => showComingSoon("Change Password")}>
                        <Text style={styles.itemText}>Change Password</Text>
                        <Ionicons name='chevron-forward' size={22} color={palette.primary.black[40]}/>
                    </Pressable>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Biometric Unlock</Text>
                        <Switch
                            value={preferences.biometricUnlock}
                            onValueChange={(value) => updatePreference("biometricUnlock", value)}
                        />
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Two-Factor Authentication</Text>
                        <Switch
                            value={preferences.twoFactorAuth}
                            onValueChange={(value) => updatePreference("twoFactorAuth", value)}
                        />
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>Login Alerts</Text>
                        <Switch
                            value={preferences.loginAlerts}
                            onValueChange={(value) => updatePreference("loginAlerts", value)}
                        />
                    </View>

                    <View style={styles.separator}/>

                    <Pressable style={styles.item} onPress={() => showComingSoon("Active Sessions")}>
                        <Text style={styles.itemText}>Active Sessions</Text>
                        <Ionicons name='chevron-forward' size={22} color={palette.primary.black[40]}/>
                    </Pressable>
                </View>

                <View style={styles.labelCont}>
                    <Text style={styles.label}>PRIVACY</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Hide Activity Status</Text>
                        <Switch
                            value={preferences.hideActivityStatus}
                            onValueChange={(value) => updatePreference("hideActivityStatus", value)}
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
    separator: {
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        marginHorizontal: 16,
    },
});
