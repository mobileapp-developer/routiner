import {Image, StyleSheet, View, Text, FlatList, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "@/theme/colors";
import AuthButton from "@/components/AuthButton";
import {useRef, useState} from "react";
import {useRouter} from "expo-router";
import {AppleSignInButton} from "@/components/AppleSignInButton";

const ONBOARDING_SCREENS = [
    {
        id: 1,
        title1: 'Create',
        title2: 'Good Habits',
        description1: 'Change your life by slowly adding new healthy',
        description2: 'habits and sticking to them.',
        image: require('../../assets/onboarding1.png'),
    },
    {
        id: 2,
        title1: 'Track',
        title2: 'Your Progress',
        description1: 'Everyday you become one step closer to',
        description2: "your goal. Don't give up!",
        image: require('../../assets/onboarding2.png'),
    },
    {
        id: 3,
        title1: 'State Together',
        title2: 'and Strong',
        description1: 'sfddsf',
        description2: 'fsd',
        image: require('../../assets/onboarding3.png'),
    }
]

const {width} = Dimensions.get('window');

const OnBoarding = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    const onViewableItemsChanged = useRef(({viewableItems}: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({item}: any) => (
        <View style={{width: width}}>
            <View style={styles.contentWrapper}>
                <View style={styles.centerContent}>
                    <Image source={item.image}/>
                </View>

                <View style={styles.textContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title1}</Text>
                        <Text style={styles.title}>{item.title2}</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>{item.description1}</Text>
                        <Text style={styles.description}>{item.description2}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.primary.blue[80], colors.primary.blue[100]]}
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                <FlatList
                    ref={flatListRef}
                    data={ONBOARDING_SCREENS}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                    keyExtractor={(item) => item.id}
                />

                <View style={styles.paginationContainer}>
                    {ONBOARDING_SCREENS.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === activeIndex ? styles.activeDot : null
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <AuthButton
                        text='Continue with Email'
                        icon='mail-open-outline'
                        backgroundColor={colors.primary.white}
                        textColor={colors.primary.black[100]}
                        iconColor={colors.primary.black[100]}
                        onPress={() => router.push('/sign-in')}
                        height={60}
                        borderRadius={32}

                    />
                    <View style={styles.otherButtons}>
                        <AppleSignInButton
                            backgroundColor={colors.primary.black[100]}
                            textColor={colors.primary.white}
                            iconColor={colors.primary.white}
                            height={40}
                            width={120}
                            borderRadius={32}
                            fontSize={14}
                        />
                        <AuthButton
                            text='Google'
                            backgroundColor={colors.primary.white}
                            textColor={colors.primary.black[100]}
                            iconColor={colors.primary.black[100]}
                            icon='logo-google'
                            onPress={() => router.dismiss()}
                            height={40}
                            width={120}
                            borderRadius={32}
                            fontSize={14}
                        />
                        <AuthButton
                            text='Facebook'
                            backgroundColor={colors.primary.white}
                            textColor={colors.primary.black[100]}
                            iconColor={colors.primary.blue[100]}
                            icon='logo-facebook'
                            onPress={() => router.dismiss()}
                            height={40}
                            width={120}
                            borderRadius={32}
                            fontSize={14}
                        />
                    </View>
                </View>

                <View style={styles.privacyContainer}>
                    <Text style={styles.privacyText}>By continuing you agree Terms of Services & Privacy Policy</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    contentWrapper: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 20
    },
    textContent: {
        flex: 1,
        bottom: 20
    },
    titleContainer: {
        paddingBottom: 12,
    },
    title: {
        fontSize: 48,
        fontWeight: '800',
        color: colors.primary.white,
        marginHorizontal: 24,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.primary.white,
        marginHorizontal: 24,
        paddingTop: 4,
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 270,
        left: 24,
        gap: 18,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary.blue[40],
    },
    activeDot: {
        width: 8,
        height: 8,
        backgroundColor: colors.primary.white,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 140,
        left: 16,
        right: 16,
    },
    otherButtons: {
        flexDirection: 'row',
        top: 20,
        justifyContent: 'space-between',
    },
    privacyContainer: {
        bottom: 60
    },
    privacyText: {
        fontSize: 13,
        fontWeight: '400',
        color: colors.primary.black[40],
        textAlign: 'center',
    },
});

export default OnBoarding;