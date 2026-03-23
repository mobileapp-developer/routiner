import {Tabs, usePathname} from 'expo-router';
import MyTabBar from '@/components/layout/TabBar';
import {FontAwesome5, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {palette} from "@/constants/palette";

export default function TabLayout() {
    const pathname = usePathname();
    const hideTabBar = pathname.startsWith('/profile/settings')
        || pathname.startsWith('/explore/suggested')
    || pathname.startsWith('/explore/learning');

    return (
        <Tabs tabBar={(props) => (hideTabBar ? null : <MyTabBar {...props} />)}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Ionicons name='home' size={30} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Ionicons name='compass' size={32} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="new"
                options={{
                    title: 'New',
                    headerShown: false,
                    tabBarIcon: () => (
                        <MaterialIcons name='add-circle' size={60} color={palette.primary.blue[100]}/>
                    )
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: 'Activity',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name='medal' size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='person' size={size} color={color}/>
                    )
                }}
            />

        </Tabs>
    );
}