import {useThemeMode} from "@/hooks/useThemeMode";
import {darkPalette, lightPalette} from "@/constants/palette"
import {useColorScheme} from "react-native";

export const usePalette = () => {
    const {mode} = useThemeMode();
    const systemTheme = useColorScheme();

    const isDark = mode.useSystemTheme ? systemTheme === 'dark' : mode.isDarkMode

    return isDark ? darkPalette : lightPalette;
}