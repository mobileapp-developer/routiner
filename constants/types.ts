import {ImageSourcePropType} from "react-native";
import {THabit} from "@/db/schema";

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

export type HabitWithProgress = {
    habit: THabit;
    currentValue: number;
};

export type DailyGoalResult = {
    total: number;
    completed: number;
};

export type ActivityItem = {
    id: number;
    points: number;
    date: string;
    loggedAt: string | null;
    habitName: string;
};

export type FrequencyType = "daily" | "weekly_times" | "monthly";

export type HabitType = 'yesno' | 'count' | 'time';