import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import RegisterForm from '../../components/account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                resizeMode = "contain"
                source = {require("../../assets/rest-logo.png")}
                style={styles.image}/>
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: "100%",
        marginBottom: 20,
        marginVertical: 10
    }
})
