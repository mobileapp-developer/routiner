import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import {colors} from "@/theme/colors";

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const ITEM_WIDTH = 48;
const ITEM_HEIGHT = 64;
const ITEM_MARGIN = 6;

interface HorizontalCalendarProps {
    onDaySelect?: (date: Date) => void;
}

interface HorizontalCalendarProps {
    onDaySelect?: (date: Date) => void;
    daysCount?: number;
}

const generateDays = (count = 60) => {
    const today = new Date();

    return Array.from({length: count}, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - 7 + i);
        return date;
    });
};

const HorizontalCalendar = ({onDaySelect}: HorizontalCalendarProps) => {
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
                    style={[styles.day, index === selectedIndex && styles.daySelected]
                    }>
                    <Text style={[styles.number, index === selectedIndex && styles.textSelected]}>
                        {item.getDate()}
                    </Text>
                    <Text style={[styles.name, index === selectedIndex && styles.textSelected]}>
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
        backgroundColor: colors.primary.white,
        borderColor: 'transparent',
    },
    daySelected: {
        borderColor: '#4F52FF'
    },
    number: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D3F'
    },
    name: {
        fontSize: 11,
        fontWeight: '500',
        color: '#9B9BAD',
        marginTop: 2
    },
    textSelected: {
        color: '#4F52FF'
    },
});

export default HorizontalCalendar;