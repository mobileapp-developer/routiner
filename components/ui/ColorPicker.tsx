import {FlatList, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {HABIT_COLORS} from "@/constants/colors";
import {usePalette} from "@/hooks/usePalette";

type Props = {
    visible: boolean;
    selected: string;
    onSelect: (hex: string, name: string) => void;
    onClose: () => void;
}

export default function ColorPicker({visible, selected, onSelect, onClose}: Props) {
    const palette = usePalette();

    return (
        <Modal visible={visible} transparent animationType="slide">
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()}
                           style={[styles.sheet, {backgroundColor: palette.primary.white}]}>
                    <View style={[styles.handle, {backgroundColor: palette.primary.black[20]}]}/>
                    <Text style={[styles.title, {color: palette.primary.black[100]}]}>Choose Color</Text>

                    <FlatList
                        data={HABIT_COLORS}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        columnWrapperStyle={styles.row}
                        renderItem={({item}) => (
                            <Pressable
                                style={[styles.colorItem,
                                    {backgroundColor: item.hex},
                                    selected === item.hex && [styles.colorSelected, {borderColor: palette.primary.blue[100]}]
                                ]}
                                onPress={() => {
                                    onSelect(item.hex, item.name);
                                    onClose();
                                }}
                            />
                        )}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 40,
        gap: 16,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    row: {
        gap: 12,
        justifyContent: 'center',
    },
    colorItem: {
        width: 64,
        height: 64,
        marginVertical: 4,
        borderRadius: 16,
    },
    colorSelected: {
        borderWidth: 1.5,
    },
});