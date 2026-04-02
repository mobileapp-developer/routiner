import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {Alert, Platform, Pressable, StyleSheet, Switch, Text, View} from "react-native";
import * as Notifications from "expo-notifications";
import {SchedulableTriggerInputTypes} from "expo-notifications";
import BackButton from "@/components/ui/BackButton";
// @ts-ignore
import CustomDateTimePicker from "@/components/shared/DateTimePicker";
import Constants from "expo-constants";
import {usePalette} from "@/hooks/usePalette";

const NOTIFICATION_PREFS_KEY = "notification-preferences";

type NotificationPreferences = {
    enabled: boolean;
    hour: number;
    minute: number;
};

Notifications.setNotificationHandler({
    // @ts-ignore
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationsScreen() {
    const [allowNotifications, setAllowNotifications] = useState(false);
    const [targetDate, setTargetDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const palette = usePalette();

    useEffect(() => {
        hydrateNotificationSettings();
    }, []);

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    console.log("Project ID:", projectId);

    const savePreferences = async (enabled: boolean, date: Date) => {
        const payload: NotificationPreferences = {
            enabled,
            hour: date.getHours(),
            minute: date.getMinutes(),
        };
        await AsyncStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(payload));
    };

    const hydrateNotificationSettings = async () => {
        const raw = await AsyncStorage.getItem(NOTIFICATION_PREFS_KEY);
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw) as NotificationPreferences;
            const restoredDate = new Date();
            restoredDate.setHours(parsed.hour, parsed.minute, 0, 0);

            setTargetDate(restoredDate);

            if (!parsed.enabled) {
                setAllowNotifications(false);
                return;
            }

            const {status} = await Notifications.getPermissionsAsync();
            if (status === 'granted') {
                setAllowNotifications(true);
            } else {
                setAllowNotifications(false);
                await savePreferences(false, restoredDate);
            }
        } catch {
            await AsyncStorage.removeItem(NOTIFICATION_PREFS_KEY);
        }
    };

    const handleToggleNotifications = async (value: boolean) => {
        if (value) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert("Error", "Permission for notifications was denied");
                setAllowNotifications(false);
                await savePreferences(false, targetDate);
                return;
            }

            await scheduleDailyNotification(targetDate);
            setAllowNotifications(true);
            await savePreferences(true, targetDate);
        } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
            setAllowNotifications(false);
            setIsPickerOpen(false);
            await savePreferences(false, targetDate);
        }
    };

    const handleDateChange = async (newDate: Date) => {
        setTargetDate(newDate);
        await savePreferences(allowNotifications, newDate);
        if (allowNotifications) {
            await scheduleDailyNotification(newDate);
        }
    };

    async function scheduleDailyNotification(date: Date) {
        await Notifications.cancelAllScheduledNotificationsAsync();

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
            });
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Good Morning! ☀️",
                body: "It's time to start your daily routine!",
            },
            trigger: {
                type: SchedulableTriggerInputTypes.CALENDAR,
                hour: date.getHours(),
                minute: date.getMinutes(),
                repeats: true,
            },
        });
    }

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <View style={[styles.header, {backgroundColor: palette.primary.white, shadowColor: palette.primary.black[20]}]}>
                <BackButton />
                <Text style={[styles.headerText, {color: palette.primary.black[100]}]}>Notifications</Text>
            </View>

            <View style={styles.labelCont}>
                <Text style={[styles.label, {color: palette.primary.black[40]}]}>NOTIFICATIONS</Text>
            </View>

            <View style={[styles.section, {backgroundColor: palette.primary.white}]}>
                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Allow Notifications</Text>
                    <Switch
                        value={allowNotifications}
                        onValueChange={handleToggleNotifications}
                    />
                </View>

                {allowNotifications && (
                    <Pressable
                        onPress={() => setIsPickerOpen((prev) => !prev)}
                        style={[styles.item, { borderTopWidth: 1, borderTopColor: palette.primary.black[10] }]}
                    >
                        <Text style={[styles.itemText, {color: palette.primary.black[100]}]}>Reminder Time</Text>
                        <Text style={[styles.itemText, {color: palette.primary.black[40]}]}>
                            {targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </Pressable>
                )}
            </View>

            {allowNotifications && isPickerOpen && (
                <CustomDateTimePicker
                    value={targetDate}
                    onChange={handleDateChange}
                />
            )}
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
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        paddingHorizontal: 20
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        paddingTop: 20
    },
    labelCont: { paddingHorizontal: 16, paddingBottom: 16 },
    section: { width: '92%', borderRadius: 18, alignSelf: 'center', overflow: 'hidden' },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
    itemText: { fontSize: 16, fontWeight: '500', alignSelf: 'center' },
});