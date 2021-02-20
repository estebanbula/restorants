import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopRestorants from '../screens/TopRestorants'

const Stack = createStackNavigator()

export default function TopRestorantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "toprestorants"
                component = {TopRestorants}
                options = {{ title: "MVP's"}}
            />
        </Stack.Navigator>
    )
}
