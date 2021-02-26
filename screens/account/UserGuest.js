import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import Loading from '../../components/Loading'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style = {styles.viewBody}>
            
            <Image
                source = {require("../../assets/rest-logo.png")}
                resizeMode = "contain"
                style = {styles.image}/>
            <Text style = {styles.title}>¡Welcome!</Text>
            <Text style = {styles.title}>You must log in form more options</Text>
            <Button
                buttonStyle = { styles.button}
                title = "Sing in"
                onPress = {() => navigation.navigate("login")}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        backgroundColor: "#FFFFFF"
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
        alignContent: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#14145c",
        marginVertical: 20
    }
})
