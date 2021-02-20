import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RestorantsStack from './RestorantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestorantsStack from './TopRestorantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
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