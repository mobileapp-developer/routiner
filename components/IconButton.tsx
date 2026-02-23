import React from 'react';
import {Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, StyleSheet, ViewStyle,} from 'react-native';
import {palette} from "@/constants/palette";

interface IconButtonProps {
    icon: ImageSourcePropType;
    onPress: () => void;
    size?: number;
    iconSize?: number;
    backgroundColor?: string;
    borderRadius?: number;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
}

const IconButton: React.FC<IconButtonProps> = ({
                                                   icon,
                                                   onPress,
                                                   size = 60,
                                                   iconSize = 30,
                                                   backgroundColor = '#F5F5F7',
                                                   borderRadius,
                                                   disabled = false,
                                                   style,
                                                   iconStyle,
                                               }) => {
    const computedBorderRadius = borderRadius ?? size * 0.28;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                {
                    width: size,
                    height: size,
                    borderRadius: computedBorderRadius,
                    backgroundColor,
                    opacity: disabled ? 0.4 : 1,
                },
                style,
            ]}
        >
            <Image
                source={icon}
                style={[
                    {
                        width: iconSize,
                        height: iconSize,
                        resizeMode: 'contain',
                    },
                    iconStyle,
                ]}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: palette.primary.black[10],
        borderWidth: 1,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
});

export default IconButton;