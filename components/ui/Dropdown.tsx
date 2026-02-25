import {Modal, Pressable, StyleSheet, Text} from "react-native";
import {palette} from "@/constants/palette";

type Option = {
    label: string;
    value: string;
}

type Props = {
    visible: boolean;
    options: Option[];
    selected: string;
    onSelect: (value: string) => void;
    onClose: () => void;
}

export default function Dropdown({visible, options, selected, onSelect, onClose}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()} style={styles.menu}>
                    {options.map((option) => (
                        <Pressable
                            key={option.value}
                            style={[
                                styles.option,
                                selected === option.value && styles.optionSelected
                            ]}
                            onPress={() => {
                                onSelect(option.value);
                                onClose();
                            }}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === option.value && styles.optionTextSelected
                            ]}>
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    menu: {
        backgroundColor: palette.primary.white,
        borderRadius: 16,
        overflow: 'hidden',
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: palette.primary.black[10],
    },
    optionSelected: {
        backgroundColor: palette.primary.blue[10],
    },
    optionText: {
        fontSize: 15,
        color: palette.primary.black[100],
    },
    optionTextSelected: {
        fontWeight: '600',
        color: palette.primary.blue[100],
    },
});