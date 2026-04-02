import {useContext} from "react";
import {ThemeModeContext} from "@/context/ThemeModeContext";

export const useThemeMode = () => useContext(ThemeModeContext);