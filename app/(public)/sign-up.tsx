import {Animated, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import BackButton from "@/components/BackButton";
import {useRouter} from "expo-router";
import AuthButton from "@/components/AuthButton";
import {colors} from "@/theme/colors";
import {Ionicons} from "@expo/vector-icons";
import {useSignUp} from "@clerk/clerk-expo";
import {useCallback, useState} from "react";

const SignUp = () => {
    const router = useRouter();

    const {signUp, setActive, isLoaded} = useSignUp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSignUpPress = useCallback(async () => {
        if (!isLoaded || loading) return;

        try {
            setLoading(true);
            setErrorMessage(null);

            if (!email || !password) {
                console.log('Email or password empty');
                return;
            }

            if (password.length < 8) {
                setErrorMessage('Password must be at least 8 characters.');
                return;
            }

            await signUp.create({
                emailAddress: email,
                password: password,
                firstName: name,
                lastName: surname,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setPendingVerification(true);

        } catch (error: any) {
            const clerkError = error?.errors?.[0];

            if (clerkError?.meta?.paramName === 'password') {
                setErrorMessage('Password is too weak or compromised.');
            } else if (clerkError?.meta?.paramName === 'email_address') {
                setErrorMessage('Invalid email address.');
            } else {
                setErrorMessage(clerkError?.longMessage || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    }, [isLoaded, loading, signUp, email, password]);

    const onVerifyPress = useCallback(async () => {
        if (!isLoaded || loading) return;

        try {
            setLoading(true);

            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === 'complete') {
                await setActive({session: result.createdSessionId});
                //@ts-ignore
                router.replace('/(auth)/(register)/gender');
            } else {
                console.log('Verification status:', result.status);
            }
        } catch (err: any) {
            console.log('Verification error:', JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    }, [isLoaded, loading, code, signUp, setActive, router]);

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

    if (pendingVerification) {
        return (
            <Animated.View style={styles.container}>
                <Animated.View style={styles.header}>
                    <BackButton/>
                    <Text style={styles.headerText}>Verify Email</Text>
                </Animated.View>

                <View style={styles.inputs}>
                    <Text style={styles.placeholderText}>VERIFICATION CODE</Text>
                    {renderInput(code, setCode, 'Enter code')}
                </View>

                <View style={styles.footer}>
                    <AuthButton
                        text={loading ? 'Verifying...' : 'Verify'}
                        backgroundColor={colors.primary.blue[100]}
                        textColor={colors.primary.white}
                        onPress={onVerifyPress}
                        height={52}
                        width={345}
                        borderRadius={40}
                        fontSize={14}
                    />
                </View>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={styles.container}>
            <Animated.View style={styles.header}>
                <BackButton/>
                <Text style={styles.headerText}>Create Account</Text>
            </Animated.View>

            <View style={styles.inputs}>
                <Text style={styles.placeholderText}>NAME</Text>
                {renderInput(name, setName, 'Enter your name')}

                <Text style={styles.placeholderText}>SURNAME</Text>
                {renderInput(surname, setSurname, 'Enter your surname')}

                <Text style={styles.placeholderText}>E-MAIL</Text>
                {renderInput(email, setEmail, 'Enter your email')}

                <Text style={styles.placeholderText}>PASSWORD</Text>
                {renderInput(password, setPassword, 'Enter your password', true)}

                {errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
            </View>

            <View style={styles.footer}>
                <AuthButton
                    text={loading ? 'Signing in...' : 'Next'}
                    backgroundColor={colors.primary.blue[100]}
                    textColor={colors.primary.white}
                    onPress={onSignUpPress}
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
        right: 85,
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

export default SignUp;