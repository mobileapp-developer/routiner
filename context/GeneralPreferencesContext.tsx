import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GENERAL_PREFS_KEY = "general-preferences";

export type GeneralPreferences = {
    hapticsEnabled: boolean;
    is24HourTime: boolean;
    autoTimezone: boolean;
    streakCelebrations: boolean;
    reduceMotion: boolean;
};

export const defaultPreferences: GeneralPreferences = {
    hapticsEnabled: true,
    is24HourTime: false,
    autoTimezone: true,
    streakCelebrations: true,
    reduceMotion: false,
};

type Props = {
    preferences: GeneralPreferences;
    updatePreference: (key: keyof GeneralPreferences, value: boolean) => void
};

export const GeneralPreferencesContext = createContext<Props | undefined>(undefined);

const isValidGeneralPreferences = (value: unknown): value is GeneralPreferences => {
    if (!value || typeof value !== "object") return false;
    const data = value as Record<string, unknown>;
    return [
        "hapticsEnabled",
        "is24HourTime",
        "autoTimezone",
        "streakCelebrations",
        "reduceMotion",
    ].every((key) => typeof data[key] === "boolean");
};

export const GeneralPreferencesProvider = ({children}: { children: React.ReactNode }) => {
    const [preferences, setPreferences] = useState<GeneralPreferences>(defaultPreferences);

    useEffect(() => {
        const hydrate = async () => {
            try {
                const raw = await AsyncStorage.getItem(GENERAL_PREFS_KEY);
                if (!raw) return;
                const parsed = JSON.parse(raw) as unknown;
                if (!isValidGeneralPreferences(parsed)) {
                    await AsyncStorage.removeItem(GENERAL_PREFS_KEY);
                    return;
                }
                setPreferences(parsed);
            } catch (error) {
                console.error("Failed to load general preferences", error);
            }
        };
        void hydrate();
    }, []);

    const persistPreferences = async (nextPreferences: GeneralPreferences) => {
        try {
            await AsyncStorage.setItem(GENERAL_PREFS_KEY, JSON.stringify(nextPreferences));
        } catch (error) {
            console.error("Failed to save general preferences", error);
        }
    };

    const updatePreference = (key: keyof GeneralPreferences, value: boolean) => {
        setPreferences((prev) => {
            const next = {...prev, [key]: value};
            void persistPreferences(next);
            return next;
        });
    };

    return (
        <GeneralPreferencesContext.Provider value={{preferences, updatePreference}}>
            {children}
        </GeneralPreferencesContext.Provider>)
}