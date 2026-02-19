import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from "@/theme/colors";

const Home = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Morning!</Text>
                    <Text style={styles.subtitle}>Here is your progress for today</Text>
                </View>

                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Your habits will appear here.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary.white,
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
        marginTop: 20,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.primary.black[100],
    },
    subtitle: {
        fontSize: 16,
        color: colors.primary.black[60],
        marginTop: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyStateText: {
        fontSize: 16,
        color: colors.primary.black[40],
    },
});

export default Home;
