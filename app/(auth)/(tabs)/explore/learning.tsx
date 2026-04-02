import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {LEARNING_ITEMS} from "@/constants/data";
import {LearningCard} from "@/components/habits/cards/LearningCard";
import {usePalette} from "@/hooks/usePalette";

const LearningScreen = () => {
    const palette = usePalette();

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <FlatList
                data={LEARNING_ITEMS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                    <LearningCard item={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 20,
        gap: 12,
    },
});

export default LearningScreen;