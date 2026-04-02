import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DARK_MODE_KEY = "dark-mode";

type ThemeMode = {
    isDarkMode: boolean;
    useSystemTheme: boolean;
};

const defaultMode: ThemeMode = {
    isDarkMode: false,
    useSystemTheme: true,
};

type Props = {
    mode: ThemeMode;
    setDarkMode: (mode: boolean) => void;
    setUseSystemTheme: (useSystemTheme: boolean) => void;
};

export const ThemeModeContext = createContext<Props>({
    mode: defaultMode,
    setDarkMode: () => {},
    setUseSystemTheme: () => {},
})

const isValidThemeMode = (value: unknown): value is ThemeMode => {
    if (!value || typeof value !== "object") return false;
    const data = value as Record<string, unknown>;
    return [
        "isDarkMode",
        "useSystemTheme",
    ].every((key) => typeof data[key] === "boolean");
}

export const ThemeModeProvider = ({children}: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(defaultMode);

    useEffect(() => {
        const hydrate = async () => {
            try {
                const raw = await AsyncStorage.getItem(DARK_MODE_KEY);
                if (!raw) return;

                const parsed = JSON.parse(raw) as unknown;
                if (!isValidThemeMode(parsed)) {
                    await AsyncStorage.removeItem(DARK_MODE_KEY);
                    return;
                }
                setMode(parsed);
            } catch (error: any) {
                console.error(error.message);
            }
        }
        hydrate();
    }, []);

    const persistThemeMode = async (nextMode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(nextMode));
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const setDarkMode = (value: boolean) => {
        setMode((prev) => {
            const next = {
                ...prev,
                isDarkMode: value
            };
            void persistThemeMode(next);
            return next;
        });
    };

    const setUseSystemTheme = (value: boolean) => {
        setMode((prev) => {
            const next = {
                ...prev,
                useSystemTheme: value
                };
            void persistThemeMode(next);
            return next;
        });
    };

    return (
        <ThemeModeContext.Provider value={{mode, setDarkMode, setUseSystemTheme}}>
            {children}
        </ThemeModeContext.Provider>
    )
};