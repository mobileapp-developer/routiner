import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from "@/theme/colors";

const Search = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search Tab - Testing</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary.white,
    },
    text: {
        fontSize: 18,
        color: colors.primary.black[100],
    },
});

export default Search;
