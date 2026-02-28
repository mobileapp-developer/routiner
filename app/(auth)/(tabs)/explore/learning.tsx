import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {palette} from "@/constants/palette";
import {LEARNING_ITEMS} from "@/constants/data";
import {LearningCard} from "@/components/habits/cards/LearningCard";

const LearningScreen = () => {
    return (
        <View style={styles.container}>
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
        backgroundColor: palette.primary.white,
    },
    list: {
        padding: 20,
        gap: 12,
    },
});

export default LearningScreen;

