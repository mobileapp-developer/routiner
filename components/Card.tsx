import {StyleSheet, View} from "react-native";
import {palette} from "@/constants/palette";

const Card = () => {
    return (
        <View style={styles.card}>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 140,
        width: 165,
        borderWidth: 1.5,
        borderRadius: 16,
        borderColor: palette.primary.black[20],
        backgroundColor: palette.primary.white,
        padding: 12,
        gap: 24
    }
})

export default Card;