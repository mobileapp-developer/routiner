import {StyleSheet, View} from "react-native";
import {colors} from "@/theme/colors";

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
        borderColor: colors.primary.black[20],
        backgroundColor: colors.primary.white,
        padding: 12,
        gap: 24
    }
})

export default Card;