import {FlatList, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {palette} from "@/constants/palette";
import {EMOJI} from "@/constants/emoji";

type Props = {
    visible: boolean;
    selected: string;
    onSelect: (id: string, name: string) => void;
    onClose: () => void;
}

export default function EmojiPicker({visible, selected, onSelect, onClose}: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()} style={styles.sheet}>
                    <View style={styles.handle}/>
                    <Text style={styles.title}>Choose Icon</Text>

                    <FlatList
                        data={EMOJI}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        columnWrapperStyle={styles.grid}
                        renderItem={({item}) => (
                            <Pressable
                                style={[
                                    styles.emojiItem,
                                    {backgroundColor: palette.primary.blue[10]},
                                    selected === item.emoji && styles.emojiSelected
                                ]}
                                onPress={() => {
                                    onSelect(item.emoji, item.name);
                                    onClose();
                                }}
                            >
                                <Text style={styles.emojiText}>{item.emoji}</Text>
                            </Pressable>
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
        backgroundColor: palette.primary.white,
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
        backgroundColor: palette.primary.black[20],
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: palette.primary.black[100],
        textAlign: 'center',
    },
    grid: {
        gap: 12,
        justifyContent: 'center',
    },
    emojiItem: {
        width: 64,
        height: 64,
        marginVertical: 4,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiSelected: {
        borderWidth: 1.5,
        borderColor: palette.primary.blue[100],
    },
    emojiText: {
        fontSize: 32,
        textAlign: 'center',
    },
});