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
    bgColor: string
};