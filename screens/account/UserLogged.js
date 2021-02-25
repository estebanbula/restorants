import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { closeSession } from '../../utils/actions'

export default function UserLogged() {
    const navigation = useNavigation()

    return (
        <View>
            <Text>User Logged</Text>
            <Button
                title = "Log out"
                buttonStyle = {styles.button}
                onPress = {() => {
                    closeSession()
                    navigation.navigate("restorants")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#14145c",
        marginVertical: 20
    }
})
