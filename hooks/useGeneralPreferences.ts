import {useContext} from "react";
import {GeneralPreferencesContext} from "@/context/GeneralPreferencesContext";

export const useGeneralPreferences = () => useContext(GeneralPreferencesContext);