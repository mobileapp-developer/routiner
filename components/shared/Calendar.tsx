import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, useColorScheme} from 'react-native';
import {usePalette} from "@/hooks/usePalette";
import {useThemeMode} from "@/hooks/useThemeMode";

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const ITEM_WIDTH = 48;
const ITEM_HEIGHT = 64;
const ITEM_MARGIN = 6;

interface HorizontalCalendarProps {
    onDaySelect?: (date: Date) => void;
}

const PAST_DAYS = 30;
const FUTURE_DAYS = 6;

const generateDays = () => {
    const today = new Date();
    const total = PAST_DAYS + 1 + FUTURE_DAYS;

    return Array.from({length: total}, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - PAST_DAYS + i);
        return date;
    });
};

const HorizontalCalendar = ({onDaySelect}: HorizontalCalendarProps) => {
    const palette = usePalette();
    const {mode} = useThemeMode();
    const systemTheme = useColorScheme();
    const isDark = mode.useSystemTheme ? systemTheme === 'dark' : mode.isDarkMode;

    const days = useRef(generateDays()).current;
    const todayIndex = days.findIndex(d => d.toDateString() === new Date().toDateString());
    const [selectedIndex, setSelectedIndex] = useState(todayIndex);
    const listRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            //@ts-ignore
            listRef.current?.scrollToIndex({index: todayIndex, viewPosition: 0.5});
        }, 100);
    }, []);

    const handlePress = (index: number) => {
        setSelectedIndex(index);
        onDaySelect?.(days[index]);
    };

    return (
        <FlatList
            ref={listRef}
            data={days}
            horizontal
            keyExtractor={(_, i) => String(i)}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(_, i) => ({
                length: ITEM_WIDTH + ITEM_MARGIN * 2,
                offset: (ITEM_WIDTH + ITEM_MARGIN * 2) * i,
                index: i
            })}
            contentContainerStyle={styles.list}
            renderItem={({item, index}) => (
                <Pressable
                    onPress={() => handlePress(index)}
                    style={[
                        styles.day,
                        {backgroundColor: isDark ? palette.primary.black[20] : palette.primary.white},
                        index === selectedIndex && [styles.daySelected, {borderColor: palette.primary.blue[100]}],
                    ]
                    }>
                    <Text
                        style={[styles.number, {color: palette.primary.black[100]}, index === selectedIndex && [styles.textSelected, {color: palette.primary.blue[100]}]]}>
                        {item.getDate()}
                    </Text>
                    <Text
                        style={[styles.name, {color: palette.primary.black[40]}, index === selectedIndex && [styles.textSelected, {color: palette.primary.blue[100]}]]}>
                        {DAY_NAMES[item.getDay()]}
                    </Text>
                </Pressable>
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 12,
        paddingVertical: 12
    },
    day: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginHorizontal: ITEM_MARGIN,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    daySelected: {
        borderColor: '#4F52FF'
    },
    number: {
        fontSize: 18,
        fontWeight: '600',
    },
    name: {
        fontSize: 11,
        fontWeight: '500',
        marginTop: 2
    },
    textSelected: {
        color: '#4F52FF'
    },
});

export default HorizontalCalendar;