import {ImageSourcePropType} from "react-native";

export type HabitClub = {
    id: string;
    name: string;
    members: string;
    emoji: string
};

export type Challenge = {
    id: string;
    title: string;
    timeLeft: string;
    friendsJoined: number;
};

export type Learning = {
    id: string;
    title: string;
    bgColor: string;
    image: ImageSourcePropType;
};

export type HabitForm = {
    name: string;
    goalValue: string;
    goalUnit: string;
    points: string;
    icon: string;
    iconName: string;
    color: string;
    colorName: string;
    frequencyType: FrequencyType;
    habitType: HabitType;
};

export type FrequencyType = "daily" | "weekly_times" | "monthly";

export type HabitType = 'yesno' | 'count' | 'time';