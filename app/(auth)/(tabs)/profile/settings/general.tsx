import {StyleSheet, Text, View} from "react-native";
import BackButton from "@/components/ui/BackButton";
import {palette} from "@/constants/palette";

export default function General() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>General</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 130,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: "row",
        shadowColor: palette.primary.black[20],
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        paddingHorizontal: 20
    },
});