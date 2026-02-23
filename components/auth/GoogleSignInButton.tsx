import {useCallback, useState} from 'react'
import AuthButton from '../ui/AuthButton'
import {useOAuth} from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

export const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false)
    const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'})

    const handleGoogleSignIn = useCallback(async () => {
        try {
            setLoading(true)

            const {createdSessionId, setActive} = await startOAuthFlow({
                redirectUrl: Linking.createURL('/'),
            })

            if (createdSessionId && setActive) {
                setActive({session: createdSessionId})
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