import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'

export default function UserLogged() {
    return (
        <View>
            <Text>User Logged</Text>
            <Loading isVisible = {true}/>
        </View>
    )
}

const styles = StyleSheet.create({})
