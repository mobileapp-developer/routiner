import {Challenge, HabitClub, Learning} from "@/constants/types";

export const HABIT_CLUBS: HabitClub[] = [
    {id: "1", name: "Cat Lovers", members: "462 members",  emoji: "🐱"},
    {id: "2", name: "Istanbul",   members: "+500 members", emoji: "🏙️"},
    {id: "3", name: "Runners",    members: "336 members",  emoji: "🏃‍♂️"},
];

export const CHALLENGES: Challenge[] = [
    {id: "1", title: "Best Runners! 🎉", timeLeft: "5 days 13 hours left", friendsJoined: 2,},
    {id: "2", title: "Best Bikers! 🎊",  timeLeft: "2 days 11 hours left", friendsJoined: 1,},
];

export const LEARNING_ITEMS: Learning[] = [
    {id: "1", title: "Why should we drink water often?", bgColor: "#89CFF0", image: require('@/assets/images/image1.jpg')},
    {id: "2", title: "Benefits of regular walking",      bgColor: "#AAAAAA", image: require('@/assets/images/image2.jpg')},
];