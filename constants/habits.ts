import {palette} from "@/constants/palette";

export const HABITS = [
    {id: 'water',      emoji: '💧',    name: 'Drink water',      goalValue: 2,  goalUnit: 'L',    color: palette.primary.blueInfo[20]},
    {id: 'run',        emoji: '🏃🏻‍♀️',    name: 'Run',              goalValue: 5,  goalUnit: 'km',   color: palette.primary.redError[20]},
    {id: 'read',       emoji: '📖',    name: 'Read books',       goalValue: 20, goalUnit: 'min',  color: palette.primary.green[20]},
    {id: 'meditation', emoji: '🧘🏻‍♀️',    name: 'Meditate',         goalValue: 15, goalUnit: 'min',  color: palette.primary.orangeWarning[20]},
    {id: 'study',      emoji: '🧑🏻‍💻‍️',    name: 'Study',            goalValue: 60, goalUnit: 'min',  color: palette.primary.blue[20]},
    {id: 'journal',    emoji: '📕',    name: 'Journal',          goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[10]},
    {id: 'plant',      emoji: '🌿',    name: 'Grow plants',      goalValue: 1,  goalUnit: 'time', color: palette.primary.green[10]},
    {id: 'sleep',      emoji: '😴',    name: 'Sleep',            goalValue: 8,  goalUnit: 'h',    color: palette.primary.blue[10]},
    {id: 'exercise',   emoji: '💪',    name: 'Exercise',         goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[10]},
    {id: 'walk',       emoji: '🚶‍♂️',    name: 'Walk',             goalValue: 10, goalUnit: 'km',   color: palette.primary.redError[10]},
    {id: 'stretching', emoji: '🙆‍♂️',    name: 'Stretching',       goalValue: 15, goalUnit: 'min',  color: palette.primary.green[20]},
    {id: 'vitamin',    emoji: '💊',    name: 'Take vitamins',    goalValue: 1,  goalUnit: 'time', color: palette.primary.blueInfo[10]},
    {id: 'clean',      emoji: '🧹',    name: 'Clean up',         goalValue: 1,  goalUnit: 'time', color: palette.primary.black[10]},
    {id: 'coding',     emoji: '💻',    name: 'Coding',           goalValue: 60, goalUnit: 'min',  color: palette.primary.blue[20]},
    {id: 'music',      emoji: '🎸',    name: 'Practice music',   goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[20]},
    {id: 'skincare',   emoji: '🧴',    name: 'Skincare routine', goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[10]},
    {id: 'no-sugar',   emoji: '🍎',    name: 'No sugar',         goalValue: 1,  goalUnit: 'time', color: palette.primary.green[10]},
    {id: 'language',   emoji: '🌎',    name: 'Learn a language', goalValue: 20, goalUnit: 'min',  color: palette.primary.blueInfo[20]},
    {id: 'tea',        emoji: '🍵',    name: 'Drink tea',        goalValue: 3,  goalUnit: 'cups', color: palette.primary.orangeWarning[10]},
    {id: 'write',      emoji: '✍️',    name: 'Write',            goalValue: 30, goalUnit: 'min',  color: palette.primary.blue[10]},
    {id: 'yoga',       emoji: '🧘',    name: 'Yoga',             goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[20]},
    {id: 'cooking',    emoji: '👨‍🍳',    name: 'Cooking',          goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[20]},
]

export const POPULAR_HABITS = [
    {id: '1', name: 'Walk',     goalValue: 10, goalUnit: 'km',  emoji: '🚶', color: palette.primary.redError[10]},
    {id: '2', name: 'Swim',     goalValue: 30, goalUnit: 'min', emoji: '🏊', color: palette.primary.blueInfo[20]},
    {id: '3', name: 'Read',     goalValue: 20, goalUnit: 'min', emoji: '📕', color: palette.primary.green[20]},
    {id: '4', name: 'Meditate', goalValue: 15, goalUnit: 'min', emoji: '🧘', color: palette.primary.orangeWarning[20]},
    {id: '5', name: 'Run',      goalValue: 5,  goalUnit: 'km',  emoji: '🏃', color: palette.primary.redError[20]},
    {id: '6', name: 'Water',    goalValue: 2,  goalUnit: 'L',   emoji: '💧', color: palette.primary.blueInfo[20]},
];