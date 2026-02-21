import React from 'react';
import {useUser} from "@clerk/clerk-expo";
import {View, Text, StyleSheet} from 'react-native';
import {colors} from "@/theme/colors";
import IconButton from "@/src/components/IconButton";
import MoodIcon from "@/src/components/MoodIcon";

const Home = () => {
    const {user} = useUser();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconButtonsContainer}>
                    <IconButton icon={require('../../../assets/icons/calendar.png')}
                                onPress={() => console.log('pressed')}
                    />
                    <IconButton icon={require('../../../assets/icons/notification.png')}
                                onPress={() => console.log('pressed')}
                    />
                </View>

                {/* Text section */}
                <View style={styles.greeting}>
                    <View style={styles.content}>
                        <Text style={styles.mainText}>Hi, {user?.firstName} 👋🏻</Text>
                        <Text style={styles.subText}>Let's make habit together</Text>
                    </View>

                    <View style={styles.moodIcon}>
                        <MoodIcon size={60} initialIndex={1}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary.blue[10],
    },
    content: {
        paddingVertical: 16,
        flex: 2
    },
    header: {
        paddingBottom: 16,
        backgroundColor: colors.primary.white,
        paddingHorizontal: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.primary.black[10],
    },
    iconButtonsContainer: {
        marginTop: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    greeting: {
        flexDirection: 'row',
    },
    mainText: {
        fontSize: 26,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
        paddingVertical: 10
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        color: colors.primary.black[40],
    },
    moodIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
});

export default Home;
