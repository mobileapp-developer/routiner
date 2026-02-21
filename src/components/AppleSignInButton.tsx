import { useState, useCallback } from 'react'
import AuthButton from './AuthButton'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

export const AppleSignInButton = () => {
    const [loading, setLoading] = useState(false)
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' })

    const handleAppleSignIn = useCallback(async () => {
        try {
            setLoading(true)

            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/'),
            })

            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId })
            }
        } catch (err) {
            console.error('Apple OAuth error:', err)
        } finally {
            setLoading(false)
        }
    }, [startOAuthFlow])

    return (
        <AuthButton
            icon="logo-apple"
            text={'Apple'}
            onPress={handleAppleSignIn}
            loading={loading}
            backgroundColor="#000"
            textColor="#fff"
            iconColor="#fff"
            borderColor="#333"
            height={40}
            width={120}
            borderRadius={32}
            fontSize={14}
        />
    )
}
