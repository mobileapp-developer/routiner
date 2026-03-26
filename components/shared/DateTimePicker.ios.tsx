import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {StyleSheet, View} from 'react-native';

interface Props {
    value: Date;
    onChange: (date: Date) => void;
}

export default function CustomDateTimePicker({ value, onChange }: Props) {
    const handleChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date) onChange(date);
    };

    return (
        <View style={styles.container}>
            <DateTimePicker
                value={value}
                mode="time"
                display="inline"
                onChange={handleChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        paddingRight: 16,
    }
});