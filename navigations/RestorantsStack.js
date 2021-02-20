import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Restorants from '../screens/Restorants'

const Stack = createStackNavigator()

export default function RestorantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "restorants"
                component = {Restorants}
                options = {{ title: "Restorants"}}
            />
        </Stack.Navigator>
    )
}
