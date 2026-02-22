import {Tabs} from 'expo-router';
import MyTabBar from '@/src/components/TabBar';
import {Ionicons, MaterialIcons, FontAwesome5} from "@expo/vector-icons";
import {colors} from "@/theme/colors";

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <MyTabBar {...props} />}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Nome',
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Ionicons name='home' size={30} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
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
                        <MaterialIcons name='add-circle' size={60} color={colors.primary.blue[100]}/>
                    )
                }}
            />
            <Tabs.Screen
                name="challenges"
                options={{
                    title: 'Challenges',
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