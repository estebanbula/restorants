import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Restorants from '../screens/restorants/Restorants'
import AddRestorants from '../screens/restorants/AddRestorants'

const Stack = createStackNavigator()

export default function RestorantsStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "restorants"
                component = {Restorants}
                options = {{ title: "Restorants"}}
            />
            <Stack.Screen
            name = "add-restorants"
            component = {AddRestorants}
            options = {{ title: "Add Restorants"}}
            />
    </Stack.Navigator>
    )
}
