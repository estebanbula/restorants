import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

import RestorantsStack from './RestorantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestorantsStack from './TopRestorantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    const scheme = useColorScheme()

    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "restorants":
                iconName = "food-apple-outline"
                break;
            case "favorites":
                iconName = "folder-heart-outline"
                break;
            case "toprestorants":
                iconName = "trophy-outline"
                break;
            case "search":
                iconName = "magnify"
                break;
            case "account":
                iconName = "account-outline"
                break;
        }

        return (
            <Icon
                type = "material-community"
                name = {iconName}
                size = {22}
                color = {color}
            />
        )
    }

    return (
        <NavigationContainer theme = {scheme === "dark" ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
                initialRouteName = "restorants"
                tabBarOptions = {{
                    inactiveTintColor: "#047bb2",
                    activeTintColor: "#14145c"
                }}
                screenOptions = {({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name = "restorants"
                    component = {RestorantsStack}
                    options={{ title: "Restorants"}}
                />
                <Tab.Screen
                    name = "favorites"
                    component = {FavoritesStack}
                    options={{ title: "Favorites"}}
                />
                <Tab.Screen
                    name = "toprestorants"
                    component = {TopRestorantsStack}
                    options={{ title: "MVP's"}}
                />
                <Tab.Screen
                    name = "search"
                    component = {SearchStack}
                    options={{ title: "Search"}}
                />
                <Tab.Screen
                    name = "account"
                    component = {AccountStack}
                    options={{ title: "Account"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}