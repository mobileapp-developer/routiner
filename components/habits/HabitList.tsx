import {FlatList} from "react-native";
import HabitItem from "@/components/habits/HabitItem";
import {HABITS} from "@/constants/habits";

interface HabitsListProps {
    currentValues?: Record<string, number>;
}

const HabitsList = ({ currentValues = {} }: HabitsListProps) => {
    return (
        <FlatList
            data={HABITS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitItem
                    name={item.name}
                    emoji={item.emoji}
                    current={currentValues[item.id] ?? 0}
                    goalValue={item.goalValue}
                    goalUnit={item.goalUnit}
                    color={item.color}
                />
            )}
        />
    );
};

export default HabitsList;
