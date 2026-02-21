import {StyleSheet, Text, Animated, View, TextInput, Pressable} from "react-native";
import BackButton from "@/src/components/BackButton";
import {colors} from "@/theme/colors";
import {Link, useRouter} from "expo-router";
import {useSignIn} from "@clerk/clerk-expo";
import {useState} from "react";
import {Ionicons} from '@expo/vector-icons';
import AuthButton from "@/src/components/AuthButton";

const SignIn = () => {
    const router = useRouter();
    const {signIn, setActive, isLoaded} = useSignIn();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        if (!isLoaded || !signIn) return;

        setLoading(true);
        setError(null);

        try {
            const result = await signIn.create({
                identifier: email.trim(),
                password: password,
            });

            await setActive({session: result.createdSessionId});

            //@ts-ignore
            router.replace('/(auth)/(tabs)/home');
        } catch (err: any) {
            setError(err.errors?.[0]?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (value: string, setValue: (text: string) => void, placeholder: string, isPassword?: boolean) => {
        return (
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputField}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={isPassword}
                />
                {value.length > 0 && (
                    <Pressable style={styles.clearButton} onPress={() => setValue('')}>
                        <Ionicons name="close" size={16} color='black'/>
                    </Pressable>
                )}
                <View
                    style={[
                        styles.underline,
                        {backgroundColor: value ? colors.primary.green[100] : colors.primary.black[40]}
                    ]}
                />
            </View>
        );
    };

    return (
        <Animated.View style={styles.container}>
            <Animated.View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>Continue with E-mail</Text>
            </Animated.View>

            <View style={styles.inputs}>
                <Text style={styles.placeholderText}>E-MAIL</Text>
                {renderInput(email, setEmail, 'Enter your email')}

                <Text style={styles.placeholderText}>PASSWORD</Text>
                {renderInput(password, setPassword, 'Enter your password', true)}

                <Text style={styles.forgotPasswordText}>I forgot my password</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View style={styles.footer}>
                <Link href='/sign-up' style={{marginBottom: 24}}>
                    <Text style={styles.createAccountText}>Don't have an account? Let's create</Text>
                </Link>
                <AuthButton
                    text={loading ? 'Signing in...' : 'Next'}
                    backgroundColor={colors.primary.blue[100]}
                    textColor={colors.primary.white}
                    onPress={handleSignIn}
                    height={52}
                    width={345}
                    borderRadius={40}
                    fontSize={14}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 130,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 40,
        flexDirection: 'row',
        shadowColor: colors.primary.black[20],
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        right: 40,
    },
    inputs: {
        paddingVertical: 24,
    },
    placeholderText: {
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 16,
        letterSpacing: 1,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    inputWrapper: {
        marginBottom: 16,
        paddingHorizontal: 24,
        position: 'relative',
    },
    inputField: {
        height: 48,
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
        paddingRight: 32,
    },
    clearButton: {
        position: 'absolute',
        right: 28,
        top: 12,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primary.black[20],
        justifyContent: 'center',
        alignItems: 'center',
    },
    underline: {
        height: 2,
        borderRadius: 1,
        marginTop: 4,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
        paddingHorizontal: 24,
        marginTop: 8,
        color: colors.primary.black[60],
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        paddingHorizontal: 24,
        marginTop: 12,
    },
    footer: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 32,
        marginVertical: 32,
    },
    createAccountText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0,
        color: colors.primary.blue[100],
    },
});

export default SignIn;
