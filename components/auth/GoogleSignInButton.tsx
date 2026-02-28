import {useCallback, useState} from 'react'
import AuthButton from '../ui/AuthButton'
import {useOAuth} from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import {useRouter} from "expo-router";

WebBrowser.maybeCompleteAuthSession()

export const GoogleSignInButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'})

    const handleGoogleSignIn = useCallback(async () => {
        try {
            setLoading(true)

            const {createdSessionId, setActive, signUp} = await startOAuthFlow({
                redirectUrl: Linking.createURL('/'),
            })

            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId })

                const isNewUser = signUp?.createdUserId

                if (isNewUser) {
                    router.push({
                        pathname: '/(public)/(register)/gender',
                        params: {
                            sessionId: createdSessionId,
                            clerkId: signUp.createdUserId,
                            firstName: signUp.firstName ?? '',
                        }
                    })
                } else {
                    router.replace('/(auth)/(tabs)/home')
                }
            }

        } catch (err) {
            console.error('Google OAuth error:', err)
        } finally {
            setLoading(false)
        }
    }, [startOAuthFlow])

    return (
        <AuthButton
            icon="logo-google"
            text={'Google'}
            onPress={handleGoogleSignIn}
            loading={loading}
            backgroundColor="#FFF"
            textColor="#000"
            iconColor="#000"
            borderColor="#E5E5E5"
            height={40}
            width={120}
            borderRadius={32}
            fontSize={14}
        />
    )
}