import {FlatList, Modal, Pressable, StyleSheet, Text, View, useColorScheme} from "react-native";
import {EMOJI} from "@/constants/emoji";
import {usePalette} from "@/hooks/usePalette";
import {useThemeMode} from "@/hooks/useThemeMode";

type Props = {
    visible: boolean;
    selected: string;
    onSelect: (id: string, name: string) => void;
    onClose: () => void;
}

export default function EmojiPicker({visible, selected, onSelect, onClose}: Props) {
    const palette = usePalette();
    const {mode} = useThemeMode();
    const systemTheme = useColorScheme();
    const isDark = mode.useSystemTheme ? systemTheme === 'dark' : mode.isDarkMode;

    return (
        <Modal visible={visible} transparent animationType="slide">
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()} style={[styles.sheet, {backgroundColor: palette.primary.white}]}>
                    <View style={[styles.handle, {backgroundColor: palette.primary.black[20]}]}/>
                    <Text style={[styles.title, {color: palette.primary.black[100]}]}>Choose Icon</Text>

                    <FlatList
                        data={EMOJI}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        columnWrapperStyle={styles.grid}
                        renderItem={({item}) => (
                            <Pressable
                                style={[
                                    styles.emojiItem,
                                    {backgroundColor: isDark ? palette.primary.black[20] : palette.primary.blue[10]},
                                    selected === item.emoji && [styles.emojiSelected, {borderColor: palette.primary.blue[100]}]
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
    },
    emojiText: {
        fontSize: 32,
        textAlign: 'center',
    },
});