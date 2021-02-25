import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Loading from '../Loading'

export default function LoginForm() {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())

    const [errorEmail, seterrorEmail] = useState("")
    const [errorPassword, seterrorPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doLoginUser = () => {
        if (!validateData) {
            return;
        }
        console.log("login")
    }

    const validateData = () => {
        seterrorConfirm("")
        seterrorEmail("")
        seterrorPassword("")
        let isValid = true 

        if(!validateEmail(formData.email)){
            seterrorEmail("You must enter a valid email")
            isValid = false
        }

        if (size(formData.password) < 8){
            seterrorPassword("Your password must have more than 8 caracters")
            isValid = false
        }

        return isValid
    }

    return (
        <View style = {styles.container}>
            <Input
                defaultValue = {formData.email}
                errorMessage = {errorEmail}
                containerStyle = {styles.input}
                keyboardType = "email-address"
                label = "Your email address:"
                leftIcon = {
                    <Icon
                        type = "material-community"
                        name = "email-outline" 
                        iconStyle = {styles.icon}
                    />
                }
                placeholder = "Email"
                onChange = {(e) => onChange(e, "email")}/>
            <Input
                defaultValue = {formData.password}
                errorMessage = {errorPassword}
                containerStyle = {styles.input}
                label = "Password:"
                placeholder = "Password"
                password = {true}
                secureTextEntry = {!showPassword}
                leftIcon = {
                    <Icon
                        type = "material-community"
                        name = "lock-outline" 
                        iconStyle = {styles.icon}
                    />}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = { () => setShowPassword(!showPassword) }
                    />
                }
                onChange = {(e) => onChange(e, "password")}/>
            <Button
                title = "Log in"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.button}
                onPress = {() => doLoginUser()}/>
            <Loading isVisible = {loading}/>
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "", password: ""
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#14145c",
        marginVertical: 20
    },
    icon: {
        color: "#14145c"
    }
})
