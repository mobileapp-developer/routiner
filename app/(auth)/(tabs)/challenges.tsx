import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {palette} from "@/constants/palette";

const Search = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Challenges Tab - Testing</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.primary.white,
    },
    text: {
        fontSize: 18,
        color: palette.primary.black[100],
    },
});

export default Search;
