import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

interface Props {
    value: Date;
    onChange: (date: Date) => void;
}

export default function CustomDateTimePicker({ value, onChange }: Props) {
    const handleChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date) onChange(date);
    };

    return (
        <DateTimePicker
            value={value}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleChange}
        />
    );
}