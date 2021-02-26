import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../components/account/LoginForm'

export default function Login() {

    return (
        <KeyboardAwareScrollView
        backgroundColor = "#FFFFFF">
            <Image
                resizeMode = "contain"
                source = {require("../../assets/rest-logo.png")}
                style={styles.image}/>
            <View
                style = {styles.container}>
                    <LoginForm/>
                    <CreateAccount/>
            </View>
            <Divider style = {styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props) {
    const navigation = useNavigation()

    return (
        <Text 
            style = {styles.register}
            onPress = {() => navigation.navigate("register")}>
            ¿You don't have a account yet?{" "}
            <Text style = {styles.btnRegister}>
                Register here
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: "100%",
        marginBottom: 20,
        marginVertical: 10
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#14145c",
        margin: 40
    },
    register: {
        marginTop:  15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister: {
        color: "#14145c",
        fontWeight: "bold"
    }
})
