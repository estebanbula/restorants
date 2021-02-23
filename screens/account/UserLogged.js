import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function UserLogged() {
    return (
        <View>
            <Text>User Logged</Text>
            <Loading isVisible = {true} text = "Waiting..."/>
        </View>
    )
}

const styles = StyleSheet.create({})
