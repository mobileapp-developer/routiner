import {palette} from "@/constants/palette";

export const HABITS = [
    {id: 'walk',       emoji: '🚶',    name: 'Walk',             goalValue: 10, goalUnit: 'km',   color: palette.primary.redError[10],       points: 10},
    {id: 'swim',       emoji: '🏊',    name: 'Swim',             goalValue: 30, goalUnit: 'min',  color: palette.primary.blueInfo[20],       points: 30},
    {id: 'read',       emoji: '📕',    name: 'Read',             goalValue: 20, goalUnit: 'min',  color: palette.primary.green[20],          points: 20},
    {id: 'meditation', emoji: '🧘',    name: 'Meditate',         goalValue: 15, goalUnit: 'min',  color: palette.primary.orangeWarning[20],  points: 15},
    {id: 'run',        emoji: '🏃',    name: 'Run',              goalValue: 5,  goalUnit: 'km',   color: palette.primary.redError[20],       points: 50},
    {id: 'water',      emoji: '💧',    name: 'Water',            goalValue: 2,  goalUnit: 'L',    color: palette.primary.blueInfo[20],       points: 20},
    {id: 'study',      emoji: '🧑🏻‍💻‍️',    name: 'Study',            goalValue: 60, goalUnit: 'min',  color: palette.primary.blue[20],           points: 60},
    {id: 'journal',    emoji: '📕',    name: 'Journal',          goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[10],       points: 10},
    {id: 'plant',      emoji: '🌿',    name: 'Grow plants',      goalValue: 1,  goalUnit: 'time', color: palette.primary.green[10],          points: 100},
    {id: 'sleep',      emoji: '😴',    name: 'Sleep',            goalValue: 8,  goalUnit: 'h',    color: palette.primary.blue[10],           points: 80},
    {id: 'exercise',   emoji: '💪',    name: 'Exercise',         goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[10],  points: 30},
    {id: 'stretching', emoji: '🙆‍♂️',    name: 'Stretching',       goalValue: 15, goalUnit: 'min',  color: palette.primary.green[20],          points: 30},
    {id: 'vitamin',    emoji: '💊',    name: 'Take vitamins',    goalValue: 1,  goalUnit: 'time', color: palette.primary.blueInfo[10],       points: 40},
    {id: 'clean',      emoji: '🧹',    name: 'Clean up',         goalValue: 1,  goalUnit: 'time', color: palette.primary.black[10],          points: 100},
    {id: 'coding',     emoji: '💻',    name: 'Coding',           goalValue: 60, goalUnit: 'min',  color: palette.primary.blue[20],           points: 60},
    {id: 'music',      emoji: '🎸',    name: 'Practice music',   goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[20],  points: 30},
    {id: 'skincare',   emoji: '🧴',    name: 'Skincare routine', goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[10],       points: 80},
    {id: 'no-sugar',   emoji: '🍎',    name: 'No sugar',         goalValue: 1,  goalUnit: 'time', color: palette.primary.green[10],          points: 100},
    {id: 'language',   emoji: '🌎',    name: 'Learn a language', goalValue: 20, goalUnit: 'min',  color: palette.primary.blueInfo[20],       points: 100},
    {id: 'tea',        emoji: '🍵',    name: 'Drink tea',        goalValue: 3,  goalUnit: 'cups', color: palette.primary.orangeWarning[10],  points: 30},
    {id: 'write',      emoji: '✍️',    name: 'Write',            goalValue: 30, goalUnit: 'min',  color: palette.primary.blue[10],           points: 30},
    {id: 'yoga',       emoji: '🧘',    name: 'Yoga',             goalValue: 30, goalUnit: 'min',  color: palette.primary.orangeWarning[20],  points: 30},
    {id: 'cooking',    emoji: '👨‍🍳',    name: 'Cooking',          goalValue: 1,  goalUnit: 'time', color: palette.primary.redError[20],       points: 50},
]

export const POPULAR_HABITS = HABITS.slice(0, 6);