import React,  { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'

import Loading from '../../components/Loading'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from '@react-navigation/native'

export default function Restorants({ navigation }) {
    const [user, setUser] = useState(null)
    const { colors } = useTheme()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    if (user === null) {
        return <Loading isVisible = {true}/>
    }

    return (
        <View style = {styles.view}>
            <Text style ={{ color: colors.text }}>Restorants</Text>
            {
                user && (
                <Icon
                    type = "material-community"
                    name = "plus"
                    color = "#14145c"
                    reverse
                    containerStyle = {styles.addContainer}
                    onPress = {() => navigation.navigate("add-restorants")} />
                )
            }
            <Text>Restorants 2</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    addContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
